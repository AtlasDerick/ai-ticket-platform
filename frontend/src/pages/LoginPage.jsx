import LoginForm from "../components/auth/LoginForm";
import AuthLayout from "../layouts/AuthLayout";

function LoginPage({ onLogin }) {
  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Welcome back
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            Sign in to your account
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Use your workspace credentials to continue.
          </p>
        </div>

        <LoginForm onLogin={onLogin} />
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
