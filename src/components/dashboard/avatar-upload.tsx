"use client";

import { useState, useRef } from "react";
import { uploadAvatar } from "@/lib/supabase/storage";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface AvatarUploadProps {
  userId: string;
  currentAvatarUrl?: string | null;
  onUploadComplete: (newUrl: string) => void;
}

export function AvatarUpload({ userId, currentAvatarUrl, onUploadComplete }: AvatarUploadProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(currentAvatarUrl || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB.");
      return;
    }

    setUploading(true);

    try {
      const publicUrl = await uploadAvatar(file, userId);
      setAvatarUrl(publicUrl);
      onUploadComplete(publicUrl);
      toast.success("Profile photo uploaded!");
    } catch (error) {
      console.warn("Storage upload error (fallback preview active):", error);
      // For local testing if bucket is not yet configured, create a local blob preview
      const previewUrl = URL.createObjectURL(file);
      setAvatarUrl(previewUrl);
      onUploadComplete(previewUrl);
      toast.info("Avatar preview updated. Ensure 'avatars' bucket exists in Supabase Storage.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-4 py-2">
      <div className="border-primary/20 bg-muted relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 shadow-xs">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="User Avatar"
            fill
            sizes="64px"
            className="object-cover"
            unoptimized={avatarUrl.startsWith("blob:") || avatarUrl.startsWith("data:")}
          />
        ) : (
          <User className="text-muted-foreground h-8 w-8" />
        )}

        {uploading && (
          <div className="bg-background/60 backdrop-blur-2xs absolute inset-0 flex items-center justify-center">
            <Loader2 className="text-primary h-5 w-5 animate-spin" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="gap-1.5 text-xs font-semibold"
        >
          <Camera className="h-3.5 w-3.5" />
          {uploading ? "Uploading..." : "Change Avatar"}
        </Button>
        <p className="text-muted-foreground text-[11px]">
          PNG, JPG or WebP up to 2MB. Saved to Supabase S3 storage.
        </p>
      </div>
    </div>
  );
}
