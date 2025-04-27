import axios, { AxiosHeaders, Method } from "axios";
import { AUTH_LOGIN, AUTH_SIGNUP, REFRESH_TOKEN } from "./queries";

const PROXY_API = "/api/proxy"; // This is your Next.js API route

export function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export async function apiClient<TInput = any, TOutput = any>(
  path: string,
  method: Method = "GET",
  data?: TInput,
  contentType: "json" | "form" = "json",
  withCredentials: boolean = false,
  headers?: AxiosHeaders
): Promise<TOutput> {
  const accessToken = getCookie("access_token") || "";

  const finalHeaders: Record<string, string> = {
    ...headers,
    Authorization: `Bearer ${accessToken}`,
  };

  const targetUrl = path.startsWith("/api/v1")
    ? PROXY_API + "?url=" + path
    : path;

  const payload = data; // Direct call expects data in body

  try {
    const response = await axios.request<TOutput>({
      url: targetUrl,
      method: method, // Always POST to proxy, but can be actual method internally
      headers: finalHeaders,
      withCredentials,
      data: payload,
    });

    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.error || error?.message || "API Error";
    throw new Error(message);
  }
}

export async function loginUser(emailOrUsername: string, password: string) {
  return apiClient<
    { query: string },
    { access_token: string; token_type: string; refresh_token: string }
  >(
    "/api/v1/gql",
    "POST",
    {
      query: AUTH_LOGIN(emailOrUsername, password),
    },
    "json"
  );
}

export async function refreshToken() {
  return apiClient<{ query: string }>(
    "/api/v1/gql",
    "POST",
    {
      query: REFRESH_TOKEN(),
    },
    "json",
    true
  );
}

export async function signUpUser(data: {
  fname: string;
  lname: string;
  code: string;
  phone: string;
  email: string;
  password: string;
}) {
  return apiClient<
    { query: string },
    {
      id: number;
      fname: string;
      lname: string;
      code: string;
      phone: string;
      email: string;
      role: string;
    }
  >(
    "/api/v1/gql",
    "POST",
    {
      query: AUTH_SIGNUP(data),
    },
    "json"
  );
}
