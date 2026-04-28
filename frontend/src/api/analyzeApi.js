export async function analyzeContract(file, language = "zh-TW") {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("language", language);

  const response = await fetch("http://localhost:8000/api/analyze", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("契約分析失敗，請稍後再試");
  }

  return await response.json();
}