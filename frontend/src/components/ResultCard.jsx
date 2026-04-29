import {
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  ExternalLink,
  Lightbulb,
  Scale,
  FileText,
} from "lucide-react";

function ResultCard({ item, index }) {
  const styleMap = {
    high: {
      wrapper: "border-red-200 bg-red-50/40",
      left: "border-red-500",
      badge: "bg-red-100 text-red-700",
      title: "text-red-700",
      icon: <ShieldAlert size={24} />,
      label: "高風險",
    },
    medium: {
      wrapper: "border-amber-200 bg-amber-50/40",
      left: "border-amber-500",
      badge: "bg-amber-100 text-amber-700",
      title: "text-amber-700",
      icon: <AlertTriangle size={24} />,
      label: "需注意",
    },
    low: {
      wrapper: "border-green-200 bg-green-50/40",
      left: "border-green-500",
      badge: "bg-green-100 text-green-700",
      title: "text-green-700",
      icon: <CheckCircle size={24} />,
      label: "低風險",
    },
  };

  const current = styleMap[item.risk_level] || styleMap.medium;

  return (
    <article className={`overflow-hidden rounded-[1.5rem] border bg-white shadow-lg ${current.wrapper}`}>
      <div className={`border-l-8 ${current.left} p-6`}>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white ${current.title} shadow-sm`}>
              {current.icon}
            </div>

            <div>
              <p className="text-sm font-bold text-slate-400">
                條款 #{index}
              </p>
              <h3 className={`text-2xl font-black ${current.title}`}>
                {item.status}
              </h3>
            </div>
          </div>

          <span className={`w-fit rounded-full px-4 py-2 text-sm font-black ${current.badge}`}>
            {current.label}
          </span>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-5">
          <InfoBlock
            icon={<FileText size={18} />}
            label="條款"
            value={item.clause}
          />

          <InfoBlock
            icon={<AlertTriangle size={18} />}
            label="原因"
            value={item.reason}
          />

          <InfoBlock
            icon={<Scale size={18} />}
            label="法規依據"
            value={item.law_reference}
          />

          <InfoBlock
            icon={<Lightbulb size={18} />}
            label="建議"
            value={item.suggestion}
          />

          {item.law_url && item.law_url !== "無" && (
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2 font-black text-slate-800">
                <ExternalLink size={18} />
                法規連結
              </div>

              <a
                href={item.law_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold text-blue-600 underline"
              >
                查看法律原文
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function InfoBlock({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2 font-black text-slate-800">
        {icon}
        {label}
      </div>

      <p className="whitespace-pre-wrap leading-8 text-slate-600">
        {value || "無"}
      </p>
    </div>
  );
}

export default ResultCard;