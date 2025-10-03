const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "https://example.mockapi.io";

const defaultHeaders: HeadersInit = { "Content-Type": "application/json" };

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { ...defaultHeaders, ...(init?.headers || {}) },
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const data = await res.json();
      message = (data?.message as string) ?? message;
    } catch {}
    throw { message, status: res.status } as { message: string; status: number };
  }

  // algunos endpoints de mockapi devuelven vacío
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const https = {
  get:  <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put:  <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
