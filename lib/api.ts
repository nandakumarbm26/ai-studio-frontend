// api.ts
import axios, { AxiosRequestConfig, Method } from "axios";

export const BASE_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function apiClient<TInput = any, TOutput = any>(
  path: string,
  method: Method = "GET",
  data?: TInput,
  contentType: "json" | "form" = "json"
): Promise<TOutput> {
  const config: AxiosRequestConfig = {
    url: path,
    method,
    headers: {},
  };

  if (data) {
    if (contentType === "json") {
      config.headers!["Content-Type"] = "application/json";
      config.data = data;
    } else if (contentType === "form") {
      config.headers!["Content-Type"] = "application/x-www-form-urlencoded";
      const formData = new URLSearchParams();
      Object.entries(data as Record<string, string>).forEach(([key, value]) => {
        formData.append(key, value);
      });
      config.data = formData;
    }
  }

  try {
    const res = await axiosInstance.request<TOutput>(config);
    return res.data;
  } catch (err: any) {
    const message = err.response?.data?.detail || err.message || "API Error";
    throw new Error(message);
  }
}

export async function loginUser(emailOrUsername: string, password: string) {
  return apiClient<
    { username: string; password: string },
    { access_token: string; token_type: string }
  >("/token", "POST", { username: emailOrUsername, password }, "form");
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
    typeof data,
    {
      id: number;
      fname: string;
      lname: string;
      code: string;
      phone: string;
      email: string;
    }
  >("/signup", "POST", data, "json");
}
