"use client";

import { useState } from "react";
import { updateProfileAction } from "@/server/actions/profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AvatarUpload } from "@/components/dashboard/avatar-upload";

interface SettingsFormProps {
  email: string;
  initialFullName: string;
  initialAvatarUrl?: string | null;
  userId: string;
}

export function SettingsForm({
  email,
  initialFullName,
  initialAvatarUrl,
  userId,
}: SettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(initialFullName);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl || null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", fullName);
    if (avatarUrl) {
      formData.append("avatarUrl", avatarUrl);
    }

    const result = await updateProfileAction(formData);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Profile updated successfully!");
    }

    setLoading(false);
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your account details, photo, and display name.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AvatarUpload
            userId={userId}
            currentAvatarUrl={avatarUrl}
            onUploadComplete={(url) => setAvatarUrl(url)}
          />

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} disabled className="bg-muted cursor-not-allowed" />
            <p className="text-muted-foreground text-xs">
              Your email is managed by Supabase Authentication.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
