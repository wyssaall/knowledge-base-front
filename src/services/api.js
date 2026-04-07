const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const buildHeaders = (withAuth = false, extraHeaders = {}) => {
  const headers = { "Content-Type": "application/json", ...extraHeaders };
  if (withAuth) {
    const token = localStorage.getItem("token");
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

const api = {
  get: (path, withAuth = false) =>
    apiRequest(path, { method: "GET", headers: buildHeaders(withAuth) }),
  post: (path, body, withAuth = false) =>
    apiRequest(path, {
      method: "POST",
      headers: buildHeaders(withAuth),
      body: JSON.stringify(body),
    }),
  put: (path, body, withAuth = false) =>
    apiRequest(path, {
      method: "PUT",
      headers: buildHeaders(withAuth),
      body: JSON.stringify(body),
    }),
  patch: (path, body, withAuth = false) =>
    apiRequest(path, {
      method: "PATCH",
      headers: buildHeaders(withAuth),
      body: JSON.stringify(body),
    }),
  delete: (path, withAuth = false) =>
    apiRequest(path, { method: "DELETE", headers: buildHeaders(withAuth) }),
};

export { API_BASE_URL };
export default api;
