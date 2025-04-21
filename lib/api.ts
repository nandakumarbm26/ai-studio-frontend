import axios, { AxiosHeaders, Method } from "axios";

const PROXY_API = "/api/proxy"; // This is your Next.js API route

export async function apiClient<TInput = any, TOutput = any>(
  path: string,
  method: Method = "GET",
  data?: TInput,
  contentType: "json" | "form" = "json",
  headers?: AxiosHeaders
): Promise<TOutput> {
  const finalHeaders: Record<string, string> = {
    ...(headers || {}),
  };

  let body: any = null;

  if (data) {
    if (contentType === "json") {
      finalHeaders["Content-Type"] = "application/json";
      body = data;
    } else if (contentType === "form") {
      finalHeaders["Content-Type"] = "application/x-www-form-urlencoded";
      const formData = new URLSearchParams();
      Object.entries(data as Record<string, string>).forEach(([key, value]) => {
        formData.append(key, value);
      });
      body = Object.fromEntries(formData); // Send form data as string
    }
  }

  try {
    let res = undefined;
    if (path.startsWith("/api/v1")) {
      res = await axios.post<TOutput>(PROXY_API, {
        url: path,
        method,
        headers: finalHeaders,
        body,
      });
    } else {
      res = await axios.post<TOutput>(path, {
        headers: finalHeaders,
        body,
      });
    }

    return res.data;
  } catch (err: any) {
    const message = err.response?.data?.error || err.message || "API Error";
    throw new Error(message);
  }
}

export async function loginUser(emailOrUsername: string, password: string) {
  return apiClient<
    { username: string; password: string },
    { access_token: string; token_type: string }
  >(
    "/api/v1/auth/token",
    "POST",
    { username: emailOrUsername, password },
    "form"
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
    typeof data,
    {
      id: number;
      fname: string;
      lname: string;
      code: string;
      phone: string;
      email: string;
    }
  >("/api/v1/auth/signup", "POST", data, "json");
}
