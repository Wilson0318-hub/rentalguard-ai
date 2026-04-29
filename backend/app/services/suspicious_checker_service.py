
def check_suspicious_terms(clauses: list[str]) -> list [dict]:
    suspicious_rules = [
        {
            "keyword": "現場",
            "expected": "地址",
            "category": "通知送達",
            "risk_level": "medium",
            "reason": "通知送達條款通常應以契約所記載之地址為準，若被改成「現場」，可能造成通知送達認定不明確。"
        },
        {
            "keyword": "押金全額沒收",
            "expected": "依法返還押金或合理違約金",
            "category": "押金",
            "risk_level": "high",
            "reason": "押金不得任意全額沒收，可能過度加重承租人責任。"
        },
        {
            "keyword": "不得遷入戶籍",
            "expected": "不得限制承租人依法遷入戶籍",
            "category": "戶籍",
            "risk_level": "high",
            "reason": "禁止承租人遷入戶籍可能違反租賃住宅相關規範。"
        },
        {
            "keyword": "押金為三個月",
            "expected": "押金不得超過二個月租金",
            "category": "押金",
            "risk_level": "high",
            "reason": "押金超過二個月租金，可能違反住宅租賃定型化契約規範。"
        },
        {
            "keyword": "不得申報租賃所得",
            "expected": "不得限制承租人依法申報或申請補助",
            "category": "稅務 / 補助",
            "risk_level": "high",
            "reason": "限制承租人申報租賃相關資料，可能損害承租人權益。"
        }
    ]

    findings = []

    for clause in clauses:
        for rule in suspicious_rules:
            if rule["keyword"] in clause:
                findings.append({
                    "clause": clause,
                    "risk_level": rule["risk_level"],
                    "status": "疑似竄改",
                    "reason": rule["reason"],
                    "law_reference": f"可疑用語檢查：{rule['category']}",
                    "law_url": "",
                    "suggestion": f"建議確認此處是否應為「{rule['expected']}」，目前出現「{rule['keyword']}」可能有風險。"
                })

    return findings

