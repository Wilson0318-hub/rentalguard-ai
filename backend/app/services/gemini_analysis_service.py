import json
import re
from google import genai
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

def analyze_contract_clauses(clauses: list[str], language: str = "zh-TW") -> list[dict]:
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

1. 是否違法
2. 是否疑似惡意修改
3. 是否不合理
4. 是否合法
5. 是否有文字異常（例如錯字、替換字）

輸出格式只能 JSON：

[
 {{
   "clause": "原條款",
   "risk_level": "high / medium / low",
   "status": "違法 / 疑似竄改 / 需注意 / 合法",
   "reason": "原因",
   "law_reference": "引用 SPACE A 資料",
   "law_url": "法源網址",
   "suggestion": "建議修改"
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
                "law_url": "",
                "suggestion": "請調整 prompt 或重新分析"
            }
        ]