def merge_analysis_results(
    suspicious_results: list[dict],
    ai_results: list[dict]
) -> list[dict]:
    merged_results = []
    used_ai_indexes = set()

    for suspicious_item in suspicious_results:
        matched_ai_index = find_matching_ai_result(
            suspicious_item,
            ai_results
        )

        if matched_ai_index is not None:
            ai_item = ai_results[matched_ai_index]
            used_ai_indexes.add(matched_ai_index)

            merged_item = merge_single_result(
                suspicious_item,
                ai_item
            )

            merged_results.append(merged_item)
        else:
            merged_results.append(suspicious_item)

    for index, ai_item in enumerate(ai_results):
        if index not in used_ai_indexes:
            merged_results.append(ai_item)

    return merged_results


def find_matching_ai_result(
    suspicious_item: dict,
    ai_results: list[dict]
) -> int | None:
    suspicious_clause = suspicious_item.get("clause", "")

    for index, ai_item in enumerate(ai_results):
        ai_clause = ai_item.get("clause", "")

        if is_same_clause(suspicious_clause, ai_clause):
            return index

    return None


def is_same_clause(text_a: str, text_b: str) -> bool:
    if not text_a or not text_b:
        return False

    if text_a in text_b:
        return True

    if text_b in text_a:
        return True

    overlap_count = 0

    for sentence in text_a.split("。"):
        sentence = sentence.strip()

        if len(sentence) >= 8 and sentence in text_b:
            overlap_count += 1

    return overlap_count >= 1


def merge_single_result(
    suspicious_item: dict,
    ai_item: dict
) -> dict:
    return {
        "clause": suspicious_item.get("clause") or ai_item.get("clause"),
        "risk_level": get_higher_risk_level(
            suspicious_item.get("risk_level"),
            ai_item.get("risk_level")
        ),
        "status": build_status(
            suspicious_item.get("status"),
            ai_item.get("status")
        ),
        "reason": build_reason(
            suspicious_item.get("reason"),
            ai_item.get("reason")
        ),
        "law_reference": build_law_reference(
            suspicious_item.get("law_reference"),
            ai_item.get("law_reference")
        ),
        "law_url": suspicious_item.get("law_url") or ai_item.get("law_url", ""),
        "suggestion": build_suggestion(
            suspicious_item.get("suggestion"),
            ai_item.get("suggestion")
        )
    }


def get_higher_risk_level(
    suspicious_level: str | None,
    ai_level: str | None
) -> str:
    priority = {
        "high": 3,
        "medium": 2,
        "low": 1
    }

    suspicious_score = priority.get(suspicious_level, 1)
    ai_score = priority.get(ai_level, 1)

    if suspicious_score >= ai_score:
        return suspicious_level or "medium"

    return ai_level or "medium"


def build_status(
    suspicious_status: str | None,
    ai_status: str | None
) -> str:
    if suspicious_status and ai_status:
        return f"{suspicious_status}，{ai_status}"

    return suspicious_status or ai_status or "需注意"


def build_reason(
    suspicious_reason: str | None,
    ai_reason: str | None
) -> str:
    reasons = []

    if suspicious_reason:
        reasons.append(f"可疑檢查：{suspicious_reason}")

    if ai_reason:
        reasons.append(f"AI 法規分析：{ai_reason}")

    return "\n".join(reasons)


def build_law_reference(
    suspicious_reference: str | None,
    ai_reference: str | None
) -> str:
    references = []

    if suspicious_reference and suspicious_reference != "無":
        references.append(suspicious_reference)

    if ai_reference and ai_reference != "無":
        references.append(ai_reference)

    if not references:
        return "無"

    return "；".join(references)


def build_suggestion(
    suspicious_suggestion: str | None,
    ai_suggestion: str | None
) -> str:
    suggestions = []

    if suspicious_suggestion and suspicious_suggestion != "無":
        suggestions.append(suspicious_suggestion)

    if ai_suggestion and ai_suggestion != "無":
        suggestions.append(ai_suggestion)

    if not suggestions:
        return "無須修改。"

    return "\n".join(suggestions)