import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_ASTRAPH_AI_API;

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request);
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request);
}

async function proxyRequest(request: NextRequest) {
  const { pathname, searchParams, search } = new URL(
    request.url,
    "http://localhost"
  );
  const path = searchParams.get("url") || "/";
  let searchQuery = search.replace("url=" + path, "");
  searchQuery = searchQuery.length === 1 ? "" : searchQuery;

  const targetUrl = `${API_URL}${path}${pathname.replace(
    "/api/proxy",
    ""
  )}${searchQuery}`;

  const headers = new Headers(request.headers);
  headers.delete("host"); // Remove host header if exists

  let body: BodyInit | undefined = undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const json = await request.json();
      body = JSON.stringify(json);
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await request.text();
      body = text;
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = formData;
    } else {
      const text = await request.text();
      body = text;
    }
  }
  
  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    credentials: "include", // Forward cookies if needed
  });

  const responseBody = await response.arrayBuffer();

  const proxiedResponse = new NextResponse(responseBody, {
    status: response.status,
    headers: response.headers,
  });

  return proxiedResponse;
}
