const TOKEN_KEY = "authToken";
const TOKEN_EXPIRED_EVENT = "auth:token-expired";

export function saveAuthToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = atob(normalizedPayload);

    return JSON.parse(decodedPayload);
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const payload = decodeToken(token);

  if (!payload?.exp) {
    return true;
  }

  return payload.exp * 1000 <= Date.now();
}

export function getValidAuthToken() {
  const token = getAuthToken();

  if (!token) {
    return null;
  }

  if (isTokenExpired(token)) {
    removeAuthToken();
    return null;
  }

  return token;
}

export function getTokenExpirationTime(token) {
  const payload = decodeToken(token);

  if (!payload?.exp) {
    return null;
  }

  return payload.exp * 1000;
}

export function notifyTokenExpired() {
  window.dispatchEvent(new Event(TOKEN_EXPIRED_EVENT));
}

export function subscribeToTokenExpiration(callback) {
  window.addEventListener(TOKEN_EXPIRED_EVENT, callback);

  return () => {
    window.removeEventListener(TOKEN_EXPIRED_EVENT, callback);
  };
}
