import { put, del, list } from "@vercel/blob";
import { Readable } from "stream";

const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || "";

export class VercelBlobClient {
  constructor(private token: string = BLOB_READ_WRITE_TOKEN) {}

  async createBlob(
    filePath: string,
    file: File | Blob | Readable,
    contentType?: string
  ) {
    console.log(filePath);
    return await put(filePath, file, {
      access: "public",
      token: this.token,
      contentType,
      addRandomSuffix: true,
    });
  }

  async readBlob(url: string) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch blob: ${res.statusText}`);
    return await res.blob();
  }

  async updateBlob(
    oldUrl: string,
    newPath: string,
    file: File | Blob | Readable,
    contentType?: string
  ) {
    // delete old
    await this.deleteBlob(oldUrl);
    // upload new
    return await this.createBlob(newPath, file, contentType);
  }

  async deleteBlob(blobUrl: string) {
    return await del(blobUrl, {
      token: this.token,
    });
  }

  async listBlobs(prefix = "") {
    console.log(prefix, "prefix");
    return await list({ token: this.token, prefix });
  }
}
