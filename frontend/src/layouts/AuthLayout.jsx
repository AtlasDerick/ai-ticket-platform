function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <section className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-950/30 lg:grid-cols-[1fr_0.9fr]">
          <div className="hidden bg-cyan-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">
                AI Ticket Platform
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight">
                Bring every support signal into focus.
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-cyan-50">
                Sign in to triage tickets, review customer context, and keep your operations moving with clarity.
              </p>
            </div>

            <div className="rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-medium text-cyan-50">
                Secure access with JWT authentication.
              </p>
            </div>
          </div>

          <div className="px-6 py-10 sm:px-10 lg:px-12">{children}</div>
        </section>
      </div>
    </main>
  );
}

export default AuthLayout;
