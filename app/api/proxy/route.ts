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
  const query = new URLSearchParams(request.url);
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

  const body =
    request.method !== "GET" && request.method !== "HEAD"
      ? await request.clone().arrayBuffer()
      : undefined;

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
