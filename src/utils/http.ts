import { VITE_APP_URL } from "$env/static/private";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type AxiosHeaderValue =
  | AxiosHeaders
  | string
  | string[]
  | number
  | boolean
  | null;

interface RawAxiosHeaders {
  [key: string]: AxiosHeaderValue;
}

export class AxiosHeaders {
  private headers: Record<string, string> = {};

  constructor(headers?: RawAxiosHeaders | AxiosHeaders | string) {
    if (!headers) return;

    if (typeof headers === "string") {
      headers.split("\n").forEach((line) => {
        const [key, value] = line.split(":").map((s) => s.trim());
        if (key && value) this.headers[key] = value;
      });
    } else if (headers instanceof AxiosHeaders) {
      this.headers = { ...headers.headers };
    } else {
      this.headers = { ...headers };
    }
  }
}

export type RequestConfig = {
  url: string;
  method?: HttpMethod;
  data?: any;
  params?: Record<string, string | number>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

export interface HttpResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<D>;
  request?: any;
}

const controllers = new Set<AbortController>();

// 🔹 helper: build query string
function buildUrl(url: string, params?: RequestConfig["params"]) {
  if (!params) return url;

  const query = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)]),
  ).toString();

  return `${url}?${query}`;
}

// 🔹 core request
async function request<T>(config: RequestConfig): Promise<T> {
  const controller = new AbortController();
  controllers.add(controller);

  const { url, method = "GET", data, params, headers = {}, signal } = config;

  const finalUrl = `${VITE_APP_URL}${buildUrl(url, params)}`;

  try {
    const res = await fetch(finalUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
      signal: signal ?? controller.signal,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Request failed");
    }

    return res.json();
  } finally {
    controllers.delete(controller);
  }
}

// 🔹 shortcuts
const get = <T>(url: string, config?: Omit<RequestConfig, "url" | "method">) =>
  request<T>({ url, method: "GET", ...config });

const post = <T>(
  url: string,
  data?: any,
  config?: Omit<RequestConfig, "url" | "method" | "data">,
) => request<T>({ url, method: "POST", data, ...config });

const put = <T>(
  url: string,
  data?: any,
  config?: Omit<RequestConfig, "url" | "method" | "data">,
) => request<T>({ url, method: "PUT", data, ...config });

const del = <T>(url: string, config?: Omit<RequestConfig, "url" | "method">) =>
  request<T>({ url, method: "DELETE", ...config });

// 🔹 cancel all requests
function cancelAll() {
  controllers.forEach((c) => c.abort());
  controllers.clear();
}

// 🔹 detect cancel
function isCancel(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

export const http = {
  get,
  post,
  put,
  delete: del,
  request,
  cancelAll,
  isCancel,
};
