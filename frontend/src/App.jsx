import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import useAuth from "./hooks/useAuth";
import useRoute from "./hooks/useRoute";
import LoginPage from "./pages/LoginPage";
import TicketDashboardPage from "./pages/TicketDashboardPage";

function App() {
  const { isAuthenticated, login, logout } = useAuth();
  const { navigate, path } = useRoute();

  const handleLogin = async (credentials) => {
    await login(credentials);
    navigate("/tickets", { replace: true });
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (path === "/login") {
    return (
      <PublicRoute isAuthenticated={isAuthenticated} navigate={navigate}>
        <LoginPage onLogin={handleLogin} />
      </PublicRoute>
    );
  }

  return (
    <ProtectedRoute isAuthenticated={isAuthenticated} navigate={navigate}>
      <TicketDashboardPage onLogout={handleLogout} />
    </ProtectedRoute>
  );
}

export default App;
