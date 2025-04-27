"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Upload, Trash2 } from "lucide-react";

type BlobFile = {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
};

export function BlobUploader({
  className,
  blobBasePath = "uploads",
  title,
  description,
}: {
  className?: string | undefined;
  blobBasePath?: string;
  title: string;
  description: string;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<BlobFile[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const res = await fetch("/api/blob", {
      method: "POST",
      body: JSON.stringify({ action: "list", blobBasePath }),
    });
    const data = await res.json();
    setFiles(data.blobs.blobs);
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("blobBasePath", blobBasePath);
    const res = await fetch("/api/blob", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      fetchFiles();
    }

    setUploading(false);
  };

  const deleteBlob = async (url: string) => {
    await fetch("/api/blob", {
      method: "POST",
      body: JSON.stringify({ url, action: "delete", blobBasePath }),
      headers: { "Content-Type": "application/json" },
    });
    fetchFiles();
  };

  return (
    <Card className={"mx-auto p-4 space-y-4 " + className}>
      <CardContent className="space-y-4 p-0 w-full">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p>{description}</p>
        </div>
        <div className="flex items-center gap-2 w-full">
          <Input type="file" ref={fileInputRef} />
          <Button onClick={handleUpload} disabled={uploading}>
            {uploading ? (
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            Upload
          </Button>
        </div>

        <div className="space-y-2 w-full">
          {files.length === 0 && (
            <p className="text-sm text-muted-foreground">No files uploaded.</p>
          )}
          {files.map((blob) => (
            <div
              key={blob.pathname}
              className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted"
            >
              <a
                href={blob.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {blob.pathname.split("/").pop()}
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteBlob(blob.url)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
