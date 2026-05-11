import tempfile
from pathlib import Path

from app.config import GEMINI_API_KEY, GEMINI_MODEL
from app.services.llm_client import LLMClient


llm_client = LLMClient(
    api_key=GEMINI_API_KEY,
    models=[
        GEMINI_MODEL,
        "gemini-2.5-flash-lite",
    ],
)


def extract_text_from_file(
    file_bytes: bytes,
    filename: str
) -> str:
    suffix = Path(filename).suffix or ".tmp"

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
        temp_file.write(file_bytes)
        temp_path = temp_file.name

    uploaded_file = llm_client.upload_file(temp_path)

    prompt = """
你是一個 OCR 文字辨識工具。
請從這份租賃契約圖片或 PDF 中，完整擷取所有可見文字。

規則：
1. 不要分析法律。
2. 不要加入自己的解釋。
3. 保留條款順序。
4. 如果有頁碼，也保留頁碼。
5. 只輸出 OCR 文字。
"""

    response_text = llm_client.generate(
        model=GEMINI_MODEL,
        contents=[uploaded_file, prompt]
    )

    return response_text.strip()