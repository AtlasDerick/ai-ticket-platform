const statusStyles = {
  open: "bg-blue-50 text-blue-700 ring-blue-200",
  in_progress: "bg-amber-50 text-amber-700 ring-amber-200",
  resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  closed: "bg-slate-100 text-slate-700 ring-slate-200",
};

const priorityStyles = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-cyan-50 text-cyan-700",
  high: "bg-orange-50 text-orange-700",
  urgent: "bg-red-50 text-red-700",
};

function formatLabel(value) {
  return value?.replaceAll("_", " ") || "Unknown";
}

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${
        statusStyles[status] || statusStyles.open
      }`}
    >
      {formatLabel(status)}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold capitalize ${
        priorityStyles[priority] || priorityStyles.medium
      }`}
    >
      {formatLabel(priority)}
    </span>
  );
}
