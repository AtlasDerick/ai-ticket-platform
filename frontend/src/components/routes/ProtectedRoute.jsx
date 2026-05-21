import { useEffect } from "react";

function ProtectedRoute({ children, isAuthenticated, navigate }) {
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
