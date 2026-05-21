function TicketSummaryCard({ error, isLoading, summary, ticketTitle }) {
  if (!isLoading && !summary && !error) {
    return null;
  }

  return (
    <section className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
            AI summary
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950">
            {ticketTitle || "Ticket summary"}
          </h2>
        </div>
        {summary?.model && (
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            {summary.model}
          </span>
        )}
      </div>

      {isLoading && (
        <div className="mt-4 space-y-3">
          <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
        </div>
      )}

      {!isLoading && error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {!isLoading && summary?.summary && (
        <div className="mt-4 whitespace-pre-line rounded-lg bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
          {summary.summary}
        </div>
      )}
    </section>
  );
}

export default TicketSummaryCard;
