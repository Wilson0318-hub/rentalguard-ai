import tempfile
from google import genai
from app.config import GEMINI_API_KEY, GEMINI_MODEL

client = genai.Client(api_key=GEMINI_API_KEY)

def extract_text_from_file(file_bytes: bytes, filename: str) -> str:
    suffix = filename.split(".")[-1]

    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{suffix}") as temp_file:
        temp_file.write(file_bytes)
        temp_path = temp_file.name

    uploaded_file = client.files.upload(file=temp_path)

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

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=[uploaded_file, prompt]
    )

    return response.text.strip()