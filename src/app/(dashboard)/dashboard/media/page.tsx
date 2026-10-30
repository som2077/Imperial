import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserMediaAssets } from "@/server/actions/media";
import { MediaUploader } from "@/components/dashboard/media-uploader";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function MediaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { assets = [] } = await getUserMediaAssets();

  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Media & Storage</h1>
            <Badge variant="outline" className="gap-1 text-xs">
              <Sparkles className="text-primary h-3 w-3" />
              Cloudinary Powered
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            Upload images, avatars, and documents with auto-optimizations (WebP/AVIF) and on-the-fly
            transformations.
          </p>
        </div>
      </div>

      <MediaUploader initialAssets={assets} />
    </div>
  );
}
