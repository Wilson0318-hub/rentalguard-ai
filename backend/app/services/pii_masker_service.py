import re 


def mask_pii(text:str) -> str:
    """
    將租約 OCR 文字中的常見個資轉成不可識別標籤。
    """

    text = mask_taiwan_id(text)
    text = mask_phone(text)
    text = mask_email(text)
    text = mask_bank_account(text)
    text = mask_uniform_invoice_number(text)
    text = mask_address(text)

    return text

def mask_taiwan_id(text: str) -> str:
    """
    台灣身分證字號，例如 A123456789。
    """
    pattern = r"\b[A-Z][12]\d{8}\b"
    return re.sub(pattern, "[身分證字號]", text)


def mask_phone(text: str) -> str:
    """
    台灣手機號碼，例如 0912345678、0912-345-678、0912 345 678。
    """
    pattern = r"\b09\d{2}[-\s]?\d{3}[-\s]?\d{3}\b"
    return re.sub(pattern, "[手機號碼]", text)


def mask_email(text: str) -> str:
    """
    Email，例如 test@gmail.com。
    """
    pattern = r"\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b"
    return re.sub(pattern, "[Email]", text)


def mask_bank_account(text: str) -> str:
    """
    銀行帳號或長數字。
    避免誤傷短日期或條號，所以只遮 10 到 16 位連續數字。
    """
    pattern = r"\b\d{10,16}\b"
    return re.sub(pattern, "[銀行帳號或長數字]", text)


def mask_uniform_invoice_number(text: str) -> str:
    """
    統一編號，8 位數字。
    這個容易誤判，所以只在前後有統一編號、統編、公司等關鍵字時處理。
    """
    pattern = r"(統一編號|統編|公司統編)[:：\s]*\d{8}"
    return re.sub(pattern, lambda m: f"{m.group(1)}：[統一編號]", text)


def mask_address(text: str) -> str:
    """
    台灣地址初版。
    可遮常見格式：縣市 + 區鄉鎮市 + 路街段巷弄號樓。
    """
    pattern = (
        r"[\u4e00-\u9fa5]{2,3}(市|縣)"
        r"[\u4e00-\u9fa5]{1,4}(區|鄉|鎮|市)"
        r"[\u4e00-\u9fa5A-Za-z0-9０-９一二三四五六七八九十段路街巷弄號樓室之\-]+"
    )

    return re.sub(pattern, "[地址]", text)