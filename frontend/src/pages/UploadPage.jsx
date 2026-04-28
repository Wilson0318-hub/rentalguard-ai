import { useState } from "react";
import { analyzeContract } from "../api/analyzeApi";
import ResultCard from "../components/ResultCard";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("zh-TW");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) {
      alert("請先上傳租賃契約檔案");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const data = await analyzeContract(file, language);
      setResult(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="text-xl font-bold text-blue-700">
          RentalGuard AI
        </div>

        <div className="hidden gap-6 text-sm text-slate-600 md:flex">
          <a href="#features">功能</a>
          <a href="#analyze">開始分析</a>
          <a href="#result">分析結果</a>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
        <div>
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            AI 租賃契約風險分析工具
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
            3 秒看懂租約裡的
            <span className="text-blue-700"> 隱藏風險</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            上傳租賃契約，系統會透過 Gemini OCR 擷取文字，
            並根據 SPACE A 法規資料分析可能違法、不合理或需要注意的條款。
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="#analyze"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-700"
            >
              立即分析
            </a>

            <a
              href="#features"
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-white"
            >
              查看功能
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">
              分析範例
            </p>

            <div className="mt-4 rounded-xl border-l-4 border-red-500 bg-white p-4">
              <p className="font-bold text-red-600">高風險條款</p>
              <p className="mt-2 text-sm text-slate-600">
                押金為三個月，提前解約押金全額沒收。
              </p>
            </div>

            <div className="mt-4 rounded-xl border-l-4 border-amber-500 bg-white p-4">
              <p className="font-bold text-amber-600">需要注意</p>
              <p className="mt-2 text-sm text-slate-600">
                通知地址被異常修改，可能影響送達認定。
              </p>
            </div>

            <div className="mt-4 rounded-xl border-l-4 border-green-500 bg-white p-4">
              <p className="font-bold text-green-600">合法條款</p>
              <p className="mt-2 text-sm text-slate-600">
                條款疑義時，應作有利於承租人之解釋。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-bold">核心功能</h2>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-4">
          <FeatureCard title="Gemini OCR" text="辨識圖片或 PDF 中的契約文字。" />
          <FeatureCard title="法律比對" text="根據 SPACE A 法規資料進行分析。" />
          <FeatureCard title="風險分級" text="標示高風險、注意與合法條款。" />
          <FeatureCard title="多語言" text="支援繁中、英文、日文、越文輸出。" />
        </div>
      </section>

      <section id="analyze" className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-bold">上傳租賃契約</h2>
          <p className="mt-2 text-slate-600">
            支援圖片與 PDF。建議先使用清楚的契約截圖測試。
          </p>

          <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="mx-auto block"
            />

            {file && (
              <p className="mt-4 text-sm font-medium text-blue-700">
                已選擇：{file.name}
              </p>
            )}
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-semibold">分析語言</label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            >
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="vi">Tiếng Việt</option>
            </select>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-md hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "AI 分析中..." : "開始分析"}
          </button>
        </div>
      </section>

      {result && (
        <section id="result" className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-bold">分析結果</h2>

          <div className="mt-6 rounded-2xl bg-slate-900 p-6 text-slate-100">
            <h3 className="mb-3 font-bold">OCR 辨識文字</h3>
            <pre className="whitespace-pre-wrap text-sm leading-7">
              {result.ocr_text}
            </pre>
          </div>

          <div className="mt-8 space-y-5">
            {result.results.map((item, index) => (
              <ResultCard key={index} item={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h3 className="font-bold text-blue-700">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

export default UploadPage;