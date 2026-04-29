import time
import random
from typing import List, Optional
from google import genai


class LLMClient:
    def __init__(
        self,
        api_key: str,
        models: Optional[List[str]] = None,
        max_retries: int = 3,
        cooldown_seconds: int = 30,
        failure_threshold: int = 5,
    ):
        self.client = genai.Client(api_key=api_key)

        self.models = models or [
            "gemini-3.1-flash-lite-preview",
            "gemini-3-flash-preview",
            "gemini-2.5-flash",
            "gemini-2.5-flash-lite",

        ]

        self.retry_delays = [2, 4, 8][:max_retries]

        self.fail_count = 0
        self.failure_threshold = failure_threshold
        self.cooldown_seconds = cooldown_seconds
        self.last_fail_time = 0
        self.state = "CLOSED"

    def _is_available(self) -> bool:
        if self.state == "OPEN":
            elapsed = time.time() - self.last_fail_time

            if elapsed > self.cooldown_seconds:
                print("熔斷器進入 HALF_OPEN，嘗試恢復")
                self.state = "HALF_OPEN"
                return True

            print("熔斷器 OPEN，暫停請求")
            return False

        return True

    def _on_success(self):
        self.fail_count = 0
        self.state = "CLOSED"

    def _on_failure(self):
        self.fail_count += 1
        self.last_fail_time = time.time()

        if self.fail_count >= self.failure_threshold:
            print("熔斷器觸發 OPEN")
            self.state = "OPEN"

    def _generate_with_retry(self, prompt: str, model: str) -> str:
        for i, delay in enumerate(self.retry_delays):
            try:
                response = self.client.models.generate_content(
                    model=model,
                    contents=prompt,
                )

                return response.text

            except Exception as e:
                print(f"Retry {i + 1} | {model} 失敗：{e}")

                if i == len(self.retry_delays) - 1:
                    raise e

                sleep_seconds = delay + random.uniform(0, 1.5)
                time.sleep(sleep_seconds)

    def generate(self, prompt: str) -> str:
        if not self._is_available():
            raise Exception("LLM 暫時不可用，請稍後再試")

        last_error = None

        for model in self.models:
            try:
                print(f"使用模型：{model}")

                result = self._generate_with_retry(prompt, model)

                self._on_success()
                return result

            except Exception as e:
                print(f"模型 {model} 失敗：{e}")
                self._on_failure()
                last_error = e

        raise last_error