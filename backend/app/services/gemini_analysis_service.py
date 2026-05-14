import json
import re

from app.config import GEMINI_API_KEY, GEMINI_MODEL
from app.services.law_cache_service import load_space_a_laws
from app.services.llm_client import LLMClient


llm_client = LLMClient(
    api_key=GEMINI_API_KEY,
    models=[
        GEMINI_MODEL,
        "gemini-2.5-flash-lite",
    ],
)


def analyze_contract_clauses(
    clauses: list[str],
    language: str = "zh-TW"
) -> list[dict]:
    space_a_laws = load_space_a_laws()

    prompt = f"""
你是台灣租賃契約法律分析 AI。

你的唯一判斷依據，是下方 SPACE A 法規知識庫。
不得捏造法規，不得使用外部知識。

========================
SPACE A 法規知識庫：
{space_a_laws}
========================

以下是使用者租賃契約條款：

{json.dumps(clauses, ensure_ascii=False, indent=2)}

請逐條分析：

1. 是否違反 SPACE A 中的法規依據。
2. 是否有不合理或需要提醒承租人的風險。
3. 若條款合法，請說明其合法原因。
4. 若 OCR 文字明顯不完整或語句斷裂，請標示為「需注意」，不要直接判定違法。
5. 不得自行發明 SPACE A 之外的法規。

輸出語言：
{language}

輸出格式只能是 JSON 陣列，不要 markdown，不要 ```json。

[
  {{
    "clause": "原條款",
    "risk_level": "high / medium / low",
    "status": "違法 / 需注意 / 合法",
    "reason": "原因",
    "law_reference": "引用 SPACE A 資料，若無則填 N/A",
    "law_url": "法源網址，若無則填 N/A",
    "suggestion": "建議修改方式，若無則填 N/A"
  }}
]
"""

    response_text = llm_client.generate(prompt)

    return parse_json_response(response_text)


def parse_json_response(text: str) -> list[dict]:
    text = text.strip()

    text = re.sub(r"^```json", "", text)
    text = re.sub(r"^```", "", text)
    text = re.sub(r"```$", "", text)
    text = text.strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return [
            {
                "clause": "系統無法解析 AI 回傳格式",
                "risk_level": "medium",
                "status": "分析格式錯誤",
                "reason": text,
                "law_reference": "N/A",
                "law_url": "N/A",
                "suggestion": "請調整 prompt 或重新分析"
            }
        ]