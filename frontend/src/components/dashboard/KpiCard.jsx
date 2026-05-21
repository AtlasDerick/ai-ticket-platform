function KpiCard({ label, value, helper, tone = "slate" }) {
  const toneClasses = {
    slate: "bg-slate-100 text-slate-700",
    cyan: "bg-cyan-50 text-cyan-800",
    amber: "bg-amber-50 text-amber-800",
    emerald: "bg-emerald-50 text-emerald-800",
    red: "bg-red-50 text-red-800",
  };

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
        </div>
        <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
          {helper}
        </span>
      </div>
    </article>
  );
}

export default KpiCard;
