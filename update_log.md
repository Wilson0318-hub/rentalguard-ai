# G-Lens 更新日誌（Update Log）

## v0.2.0 - G-Lens MVP 核心流程完成

### ✨ 新增功能

* 整合 Gemini OCR 文件辨識流程
* 支援 PDF / 圖片上傳分析
* 新增個資去識別化（PII Masking）機制
* 建立統一 LLMClient 架構
* 加入 Retry / Fallback / 熔斷器機制


---

# 🔒 個資保護機制

系統已加入 Regex-based PII Masking：

目前支援遮罩：

* 身分證字號
* 手機號碼
* Email
* 地址
* 銀行帳號
* 統一編號

範例：

```text id="2qt4bq"
A123456789 → [身分證字號]
0912-345-678 → [手機號碼]
test@gmail.com → [Email]
台北市信義區... → [地址]
```

---

# 🧠 AI 系統架構升級

重構 Gemini 呼叫架構：

建立統一 `LLMClient`

目前支援：

* Gemini OCR
* SPACE A 法規分析
* 未來多語言分析
* 未來多模態擴充

新增防護機制：

* Retry 重試機制
* 指數退避（Exponential Backoff）
* Model Fallback 模型降級
* Circuit Breaker 熔斷器

---

# ⚖️ SPACE A 法規分析流程

目前主流程：

```text id="1d7u5t"
使用者上傳租約
→ Gemini OCR
→ PII 個資遮罩
→ 條款切段
→ SPACE A 法規分析
→ 前端顯示分析結果
```

---

# 🛠 目前技術架構

## Frontend

```text id="d7f7kn"
React
Vite
TailwindCSS
```

## Backend

```text id="4we6u5"
FastAPI
```

## AI / OCR

```text id="8vjlwm"
Gemini API
```

---

# 🚧 目前待優化項目

目前持續優化：

* 條款切段準確率
* OCR 格式穩定性
* 長租約上下文處理
* 前端 UI/UX 重構（v2）

---

# 🎯 下一階段開發

下一步預計：

* 前端 Dashboard v2
* AI 法律分析視覺化
* OCR 預覽頁面
* 條款分析卡片化
* 歷史紀錄系統
* 多語言支援

---

# 📌 Git Commit 建議

```bash id="nzth5z"
git add .
git commit -m "feat: 完成 Gemini OCR、PII 遮罩與 SPACE A 分析流程"
git push origin dev
```

如果是 main：

```bash id="djnq8g"
git push origin main
```
