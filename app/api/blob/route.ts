import { NextRequest, NextResponse } from "next/server";
import { VercelBlobClient } from "@/lib/blob";

const blobClient = new VercelBlobClient();

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "hello" });
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type");
  console.log(JSON.stringify(req));
  // --- UPLOAD ---
  if (contentType?.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("file") as File;
    const blobBasePath = form.get("blobBasePath");
    if (!file || !blobBasePath) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    try {
      const blob = await blobClient.createBlob(
        `${blobBasePath}/${file.name}`,
        file
      );
      return NextResponse.json(blob);
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }
  }

  // --- JSON Requests ---
  const body = await req.json();
  const { action, blobBasePath } = body;
  console.log({ action, blobBasePath });
  // --- LIST ---
  if (action === "list" && blobBasePath) {
    try {
      const blobs = await blobClient.listBlobs(blobBasePath);
      console.log(blobs);
      return NextResponse.json({ blobs });
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { error: "Failed to list blobs" },
        { status: 500 }
      );
    }
  }

  // --- DELETE ---
  if (action === "delete") {
    const { url } = body;
    if (!url)
      return NextResponse.json({ error: "Missing blob URL" }, { status: 400 });

    try {
      const result = await blobClient.deleteBlob(url);
      return NextResponse.json(result);
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { error: "Failed to delete blob" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
