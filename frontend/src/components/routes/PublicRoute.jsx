import { useEffect } from "react";

function PublicRoute({ children, isAuthenticated, navigate }) {
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tickets", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return children;
}

export default PublicRoute;
