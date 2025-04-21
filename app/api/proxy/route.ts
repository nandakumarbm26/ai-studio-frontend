import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_ASTRAPH_AI_API;

export async function POST(request: Request) {
  const { url, method, headers, body } = await request.json();
  console.log({ url, method, headers, body });
  if (!url) {
    return NextResponse.json({ error: "Missing target URL" }, { status: 400 });
  }

  const completeUrl = API_URL + url;

  // Prepare request options
  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...headers,
      "Content-Type": headers["Content-Type"] || "application/json", // Default to JSON if not specified
    },
  };

  if (body) {
    // If the content is form, serialize it correctly
    if (headers["Content-Type"] === "application/x-www-form-urlencoded") {
      // Use URLSearchParams to serialize form data
      const formData = new URLSearchParams();
      Object.entries(body as Record<string, string>).forEach(([key, value]) => {
        formData.append(key, value);
      });
      fetchOptions.body = formData.toString(); // Pass serialized string for form data
    } else {
      // For JSON data, directly stringify it
      fetchOptions.body = body;
    }
  }

  try {
    const response = await fetch(completeUrl, fetchOptions);
    const responseBody = await response.json();
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Proxy request failed", details: String(error) },
      { status: 500 }
    );
  }
}
