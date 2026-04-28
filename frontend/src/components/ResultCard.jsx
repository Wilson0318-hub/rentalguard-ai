function ResultCard({ item }) {
  const styleMap = {
    high: {
      border: "border-red-500",
      badge: "bg-red-100 text-red-700",
      title: "text-red-700",
      icon: "🚨",
    },
    medium: {
      border: "border-amber-500",
      badge: "bg-amber-100 text-amber-700",
      title: "text-amber-700",
      icon: "⚠️",
    },
    low: {
      border: "border-green-500",
      badge: "bg-green-100 text-green-700",
      title: "text-green-700",
      icon: "✅",
    },
  };

  const current = styleMap[item.risk_level] || styleMap.medium;

  return (
    <div className={`rounded-2xl border-l-8 ${current.border} bg-white p-6 shadow-md`}>
      <div className="flex items-center justify-between gap-4">
        <h3 className={`text-xl font-bold ${current.title}`}>
          {current.icon} {item.status}
        </h3>

        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${current.badge}`}>
          {item.risk_level}
        </span>
      </div>

      <div className="mt-5 space-y-4 text-slate-700">
        <InfoBlock label="條款" value={item.clause} />
        <InfoBlock label="原因" value={item.reason} />
        <InfoBlock label="法規依據" value={item.law_reference} />
        <InfoBlock label="建議" value={item.suggestion} />

        {item.law_url && item.law_url !== "無" && (
          <div>
            <p className="font-bold">法規連結</p>
            <a
              href={item.law_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              查看法律原文
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div>
      <p className="font-bold">{label}</p>
      <p className="mt-1 leading-7 text-slate-600">{value || "無"}</p>
    </div>
  );
}

export default ResultCard;