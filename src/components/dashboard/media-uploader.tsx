"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  UploadCloud,
  FileImage,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Loader2,
  Sparkles,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import {
  getMediaUploadSignature,
  recordMediaAsset,
  deleteMediaAsset,
} from "@/server/actions/media";
import type { MediaAsset } from "@/db/schema";

interface MediaUploaderProps {
  initialAssets?: MediaAsset[];
  onUploadSuccess?: (url: string) => void;
  folder?: string;
  compact?: boolean;
}

export function MediaUploader({
  initialAssets = [],
  onUploadSuccess,
  folder = "user_uploads",
  compact = false,
}: MediaUploaderProps) {
  const [assets, setAssets] = useState<MediaAsset[]>(initialAssets);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (id: string, url: string) => {
    // Generate Cloudinary auto-optimized URL
    const optimizedUrl = url.includes("cloudinary.com")
      ? url.replace("/upload/", "/upload/f_auto,q_auto/")
      : url;

    navigator.clipboard.writeText(optimizedUrl);
    setCopiedId(id);
    toast.success("Optimized URL copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadFile = async (file: File) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    try {
      // 1. Request signed parameters from server
      const sigRes = await getMediaUploadSignature(folder);
      if (!sigRes.success || !sigRes.data) {
        throw new Error(sigRes.error || "Failed to generate upload signature.");
      }

      setUploadProgress(30);
      const { signature, timestamp, apiKey, cloudName, isMock } = sigRes.data;

      let uploadedData: {
        public_id: string;
        url: string;
        secure_url: string;
        format?: string;
        bytes?: number;
        width?: number;
        height?: number;
        resource_type?: string;
      };

      if (!isMock && cloudName && apiKey) {
        // 2. Direct upload to Cloudinary API
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", String(timestamp));
        formData.append("signature", signature);
        formData.append("folder", sigRes.data.folder);

        setUploadProgress(60);

        const uploadEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
        const res = await fetch(uploadEndpoint, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || "Upload to Cloudinary failed.");
        }

        uploadedData = await res.json();
      } else {
        // Dev fallback simulation
        setUploadProgress(70);
        await new Promise((r) => setTimeout(r, 600));

        const mockId = `mock_${Date.now()}`;
        const previewUrl = URL.createObjectURL(file);
        uploadedData = {
          public_id: mockId,
          url: previewUrl,
          secure_url: previewUrl,
          format: file.type.split("/")[1] || "png",
          bytes: file.size,
          width: 800,
          height: 600,
          resource_type: file.type.startsWith("image/") ? "image" : "raw",
        };
      }

      setUploadProgress(90);

      // 3. Persist asset metadata into Drizzle
      const saveRes = await recordMediaAsset({
        publicId: uploadedData.public_id,
        url: uploadedData.url,
        secureUrl: uploadedData.secure_url,
        format: uploadedData.format,
        bytes: uploadedData.bytes,
        width: uploadedData.width,
        height: uploadedData.height,
        resourceType: uploadedData.resource_type,
        folder: sigRes.data.folder,
      });

      if (saveRes.success && saveRes.asset) {
        setAssets((prev) => [saveRes.asset!, ...prev]);
        toast.success("File uploaded and optimized successfully!");
        if (onUploadSuccess) {
          onUploadSuccess(saveRes.asset.secureUrl);
        }
      } else {
        toast.success("Upload completed (dev simulation).");
      }
    } catch (err: unknown) {
      console.error("Upload error:", err);
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (id: string, publicId: string) => {
    try {
      const res = await deleteMediaAsset(id, publicId);
      if (res.success) {
        setAssets((prev) => prev.filter((a) => a.id !== id));
        toast.success("Media asset removed.");
      } else {
        toast.error(res.error || "Failed to remove asset.");
      }
    } catch {
      toast.error("Failed to delete asset.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const droppedFile = e.dataTransfer.files[0];
          if (droppedFile) handleUploadFile(droppedFile);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all ${
          isDragging
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-border hover:border-primary/50 hover:bg-muted/30"
        } ${isUploading ? "pointer-events-none opacity-60" : ""}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) handleUploadFile(selected);
          }}
          accept="image/*,application/pdf"
          className="hidden"
        />

        <div className="bg-primary/10 text-primary mb-3 flex h-14 w-14 items-center justify-center rounded-full shadow-inner transition-transform group-hover:scale-110">
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <UploadCloud className="h-6 w-6" />
          )}
        </div>

        <p className="text-sm font-semibold">
          {isUploading
            ? `Uploading to Cloudinary (${uploadProgress}%)...`
            : "Click to upload or drag & drop files here"}
        </p>
        <p className="text-muted-foreground mt-1 text-xs">
          PNG, JPEG, WebP, GIF, SVG or PDF (Max 10MB) • Auto-Optimized with WebP/AVIF
        </p>

        {isUploading && (
          <div className="bg-muted mt-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Asset Grid */}
      {!compact && assets.length === 0 && (
        <Card className="py-8 text-center">
          <CardContent className="space-y-2">
            <ImageIcon className="text-muted-foreground/40 mx-auto h-8 w-8" />
            <p className="text-sm font-semibold">No media assets yet</p>
            <p className="text-muted-foreground text-xs">
              Upload files above to optimize and transform them via Cloudinary CDN.
            </p>
          </CardContent>
        </Card>
      )}

      {!compact && assets.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">Uploaded Media Assets</CardTitle>
                <CardDescription className="text-xs">
                  Files securely stored on Cloudinary with on-the-fly transformations.
                </CardDescription>
              </div>
              <Badge variant="outline" className="gap-1 text-xs">
                <Sparkles className="text-primary h-3 w-3" />
                {assets.length} assets
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-card border-border hover:border-primary/40 group relative flex flex-col overflow-hidden rounded-lg border transition-all"
                >
                  <div className="bg-muted relative flex h-36 w-full items-center justify-center overflow-hidden">
                    {asset.resourceType === "image" ? (
                      <Image
                        src={asset.secureUrl}
                        alt="Asset preview"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform group-hover:scale-105"
                        unoptimized={
                          asset.secureUrl.startsWith("blob:") || asset.secureUrl.startsWith("data:")
                        }
                      />
                    ) : (
                      <FileImage className="text-muted-foreground h-12 w-12" />
                    )}
                  </div>

                  <div className="space-y-1.5 p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold uppercase">{asset.format || "file"}</span>
                      {asset.bytes && (
                        <span className="text-muted-foreground">
                          {Math.round(asset.bytes / 1024)} KB
                        </span>
                      )}
                    </div>

                    {asset.width && asset.height && (
                      <p className="text-muted-foreground text-[11px]">
                        Dimensions: {asset.width} × {asset.height} px
                      </p>
                    )}

                    <div className="border-border flex items-center justify-between border-t pt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(asset.id, asset.secureUrl)}
                        className="h-7 gap-1 px-2 text-xs"
                      >
                        {copiedId === asset.id ? (
                          <>
                            <Check className="text-primary h-3 w-3" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </Button>

                      <div className="flex items-center gap-1">
                        <a
                          href={asset.secureUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-primary text-muted-foreground p-1"
                          title="Open original"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(asset.id, asset.publicId)}
                          className="hover:text-destructive text-muted-foreground p-1"
                          title="Delete asset"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
