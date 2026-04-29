import { useState } from "react";
import {
  ShieldCheck,
  UploadCloud,
  FileText,
  Languages,
  Scale,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from "lucide-react";
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

  const highCount = result?.results?.filter((item) => item.risk_level === "high").length || 0;
  const mediumCount = result?.results?.filter((item) => item.risk_level === "medium").length || 0;
  const lowCount = result?.results?.filter((item) => item.risk_level === "low").length || 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-600 p-2 text-white shadow-lg shadow-blue-200">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight text-slate-900">
                RentalGuard AI
              </p>
              <p className="text-xs text-slate-500">Lease Risk Analyzer</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="hover:text-blue-600">核心功能</a>
            <a href="#analyze" className="hover:text-blue-600">開始分析</a>
            <a href="#result" className="hover:text-blue-600">分析結果</a>
          </div>

          <a
            href="#analyze"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow-md hover:bg-blue-700"
          >
            立即使用
          </a>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            <Sparkles size={16} />
            AI LegalTech 租約風險分析工具
          </div>

          <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
            3 秒看懂租約裡的
            <span className="block bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
              隱藏風險
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            上傳租賃契約，系統會使用 Gemini OCR 讀取文字，
            並根據 SPACE A 法規資料庫分析違法條款、疑似竄改與不合理內容。
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#analyze"
              className="rounded-2xl bg-blue-600 px-7 py-4 text-center font-black text-white shadow-xl shadow-blue-200 hover:bg-blue-700"
            >
              開始分析契約
            </a>

            <a
              href="#features"
              className="rounded-2xl border border-slate-300 bg-white px-7 py-4 text-center font-black text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-700"
            >
              查看功能
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            <MiniStat value="OCR" label="契約辨識" />
            <MiniStat value="AI" label="法律分析" />
            <MiniStat value="4+" label="多語言" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-blue-200/40 blur-3xl" />

          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">分析預覽</p>
                <h3 className="text-xl font-black">租約風險摘要</h3>
              </div>
              <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                Demo
              </div>
            </div>

            <PreviewCard
              icon={<AlertTriangle size={20} />}
              title="疑似竄改"
              text="通知地址被改成「現場」，可能造成送達認定不明。"
              color="red"
            />

            <PreviewCard
              icon={<Scale size={20} />}
              title="法律比對"
              text="系統根據 SPACE A 法規資料庫進行條款分析。"
              color="amber"
            />

            <PreviewCard
              icon={<CheckCircle size={20} />}
              title="合法條款"
              text="條款疑義時，應作有利於承租人之解釋。"
              color="green"
            />
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <p className="font-bold text-blue-600">Core Features</p>
          <h2 className="mt-2 text-3xl font-black">核心功能</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          <FeatureCard icon={<FileText />} title="Gemini OCR" text="辨識租賃契約圖片與 PDF 內容。" />
          <FeatureCard icon={<Scale />} title="法規比對" text="根據 SPACE A 法規資料進行分析。" />
          <FeatureCard icon={<AlertTriangle />} title="竄改偵測" text="抓出地址、押金、戶籍等可疑修改。" />
          <FeatureCard icon={<Languages />} title="多語言輸出" text="支援繁中、英文、日文、越文。" />
        </div>
      </section>

      <section id="analyze" className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <UploadCloud size={30} />
            </div>

            <h2 className="mt-5 text-3xl font-black">上傳租賃契約</h2>
            <p className="mt-3 text-slate-600">
              支援圖片與 PDF。建議使用清楚、完整、不要歪斜的契約圖片。
            </p>
          </div>

          <div className="mt-8 rounded-[1.5rem] border-2 border-dashed border-blue-200 bg-blue-50/50 p-10 text-center hover:border-blue-400 hover:bg-blue-50">
            <UploadCloud className="mx-auto mb-4 text-blue-600" size={42} />

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="mx-auto block max-w-sm cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm"
            />

            {file ? (
              <p className="mt-4 font-bold text-blue-700">
                已選擇：{file.name}
              </p>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                請選擇租賃契約圖片或 PDF
              </p>
            )}
          </div>

          <div className="mt-7">
            <label className="mb-2 block font-bold text-slate-700">分析語言</label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 font-medium shadow-sm outline-none focus:border-blue-500"
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
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-5 text-lg font-black text-white shadow-xl shadow-blue-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
          >
            {loading && <Loader2 className="animate-spin" size={22} />}
            {loading ? "AI 正在分析契約..." : "開始分析"}
          </button>

          {loading && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">
              <p className="font-bold text-slate-800">分析流程進行中</p>
              <div className="mt-3 space-y-2">
                <p>1. Gemini OCR 正在讀取契約文字</p>
                <p>2. 系統正在切分契約條款</p>
                <p>3. AI 正在比對 SPACE A 法規資料</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {result && (
        <section id="result" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-bold text-blue-600">Analysis Result</p>
              <h2 className="mt-2 text-3xl font-black">分析結果</h2>
              <p className="mt-2 text-slate-600">
                以下結果僅供參考，不構成正式法律意見。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <SummaryCard title="高風險" value={highCount} color="red" />
            <SummaryCard title="需注意" value={mediumCount} color="amber" />
            <SummaryCard title="合法 / 低風險" value={lowCount} color="green" />
          </div>

          <div className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-slate-100 shadow-2xl">
            <div className="mb-4 flex items-center gap-2">
              <FileText size={20} />
              <h3 className="font-black">OCR 辨識文字</h3>
            </div>

            <pre className="max-h-[360px] overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-900 p-5 text-sm leading-7 text-slate-200">
              {result.ocr_text}
            </pre>
          </div>

          <div className="mt-10 space-y-6">
            {result.results.map((item, index) => (
              <ResultCard key={index} item={item} index={index + 1} />
            ))}
          </div>
        </section>
      )}

      <footer className="border-t border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">
        RentalGuard AI © 2026 — AI 租賃契約風險分析系統
      </footer>
    </main>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
      <p className="text-xl font-black text-blue-700">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100 hover:-translate-y-1 hover:shadow-xl transition">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
        {icon}
      </div>
      <h3 className="text-lg font-black">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function PreviewCard({ icon, title, text, color }) {
  const colorMap = {
    red: "border-red-500 bg-red-50 text-red-700",
    amber: "border-amber-500 bg-amber-50 text-amber-700",
    green: "border-green-500 bg-green-50 text-green-700",
  };

  return (
    <div className={`mb-4 rounded-2xl border-l-4 p-5 ${colorMap[color]}`}>
      <div className="flex items-center gap-3 font-black">
        {icon}
        {title}
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function SummaryCard({ title, value, color }) {
  const colorMap = {
    red: "bg-red-50 text-red-700 border-red-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    green: "bg-green-50 text-green-700 border-green-100",
  };

  return (
    <div className={`rounded-[1.5rem] border p-6 shadow-sm ${colorMap[color]}`}>
      <p className="text-sm font-bold">{title}</p>
      <p className="mt-3 text-4xl font-black">{value}</p>
      <p className="mt-2 text-sm opacity-80">條款數量</p>
    </div>
  );
}

export default UploadPage;