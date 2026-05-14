

---

# 🔧 G-Lens 環境設定（Config Guide）

## 1️⃣ 必要版本（統一）

```text
Node.js：20（LTS）
Python：3.11（建議）
```

檢查版本：

```bash
node -v
python --version
```

---

## 2️⃣ 下載專案

```bash
git clone <repo-url>
cd G-Lens
```

---

# 🟦 前端設定（React + Tailwind）

## 1️⃣ 安裝套件

```bash
cd frontend
npm install
```

---

## 2️⃣ 安裝 Tailwind（如果還沒裝）

```bash
npm install tailwindcss @tailwindcss/vite
```

---

## 3️⃣ 設定 `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

## 4️⃣ 設定 `src/index.css`

```css
@import "tailwindcss";
```

---

## 5️⃣ 安裝 icon 套件

```bash
npm install lucide-react
```

---

## 6️⃣ 啟動前端

```bash
npm run dev
```

開啟：

```text
http://localhost:5173
```

---

# 🟨 後端設定（FastAPI）

## 1️⃣ 建立虛擬環境

```bash
cd backend
python -m venv venv
```

---

## 2️⃣ 啟動虛擬環境

### Windows

```bash
venv\Scripts\activate
```

---

## 3️⃣ 安裝套件

```bash
pip install -r requirements.txt
```

（如果沒有 requirements.txt）

```bash
pip install fastapi uvicorn python-multipart python-dotenv google-genai pandas openpyxl
```

---

## 4️⃣ 設定 `.env`

在 `backend/` 建立：

```text
.env
```

內容：

```env
GEMINI_API_KEY=你的APIKEY
GEMINI_MODEL=gemini-2.5-flash
```

---

## 5️⃣ 啟動後端

```bash
uvicorn app.main:app --reload
```

開啟：

```text
http://127.0.0.1:8000/docs
```

---

# 📦 必備檔案（一定要有）

```text
backend/
 ├── .env           ← API KEY（不能上傳 GitHub）
 ├── requirements.txt
frontend/
 ├── package.json
 ├── vite.config.js
```

---

# 🚫 不要上傳 GitHub

`.gitignore` 要有：

```text
node_modules/
venv/
.env
__pycache__/
```

---

# ⚡ 一句話流程

```text
前端 npm install → npm run dev
後端 pip install → uvicorn
```




