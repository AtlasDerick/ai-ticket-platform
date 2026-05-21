import { useCallback, useEffect, useState } from "react";

function getCurrentPath() {
  return window.location.pathname;
}

function useRoute() {
  const [path, setPath] = useState(getCurrentPath);

  const navigate = useCallback((nextPath, { replace = false } = {}) => {
    if (nextPath === window.location.pathname) {
      return;
    }

    if (replace) {
      window.history.replaceState(null, "", nextPath);
    } else {
      window.history.pushState(null, "", nextPath);
    }

    setPath(nextPath);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return {
    navigate,
    path,
  };
}

export default useRoute;
