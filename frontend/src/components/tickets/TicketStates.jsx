export function TicketsLoadingState() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <div className="flex animate-pulse items-center gap-4" key={item}>
            <div className="h-11 w-11 rounded-lg bg-slate-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-2/3 rounded bg-slate-200" />
              <div className="h-3 w-1/2 rounded bg-slate-100" />
            </div>
            <div className="hidden h-7 w-20 rounded-full bg-slate-100 sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TicketsEmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-sm font-bold text-cyan-700">
        0
      </div>
      <h2 className="mt-4 text-lg font-semibold text-slate-950">No tickets yet</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        New tickets from the backend queue will appear here once they are created.
      </p>
    </div>
  );
}

export function TicketsErrorState({ message, onRetry }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-red-800">Unable to load tickets</h2>
          <p className="mt-1 text-sm text-red-700">{message}</p>
        </div>
        <button
          className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
          type="button"
          onClick={onRetry}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
