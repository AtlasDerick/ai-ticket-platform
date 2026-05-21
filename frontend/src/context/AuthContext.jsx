import { useCallback, useEffect, useMemo, useState } from "react";

import { login as loginRequest, logout as logoutRequest } from "../services/authService";
import {
  getTokenExpirationTime,
  getValidAuthToken,
  subscribeToTokenExpiration,
} from "../services/tokenService";
import AuthContext from "./authContextValue";

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getValidAuthToken());

  const handleLogin = useCallback(async (credentials) => {
    const nextToken = await loginRequest(credentials);
    setToken(nextToken);
  }, []);

  const handleLogout = useCallback(() => {
    logoutRequest();
    setToken(null);
  }, []);

  useEffect(() => {
    return subscribeToTokenExpiration(handleLogout);
  }, [handleLogout]);

  useEffect(() => {
    if (!token) {
      return undefined;
    }

    const expiresAt = getTokenExpirationTime(token);
    const delay = expiresAt ? Math.max(expiresAt - Date.now(), 0) : 0;
    const timeoutId = window.setTimeout(handleLogout, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [handleLogout, token]);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      login: handleLogin,
      logout: handleLogout,
      token,
    }),
    [handleLogin, handleLogout, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
