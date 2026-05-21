function DashboardLayout({ children, onLogout }) {
  const navItems = ["Tickets", "Insights", "Customers", "Settings"];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-slate-200 bg-white px-5 py-6 lg:block">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-700 text-sm font-bold text-white">
            AI
          </div>
          <div>
            <p className="text-sm font-bold text-slate-950">Ticket Intel</p>
            <p className="text-xs text-slate-500">Support operations</p>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <button
              className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                item === "Tickets"
                  ? "bg-cyan-50 text-cyan-800"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
              key={item}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
                Dashboard
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                Ticket Command Center
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 sm:block">
                Live ticket queue
              </div>
              <button
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                type="button"
                onClick={onLogout}
              >
                Sign out
              </button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
