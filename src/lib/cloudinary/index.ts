import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with environment variables
const cloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudName && apiKey && apiSecret);
}

export function getCloudinaryPublicConfig() {
  return {
    cloudName: cloudName || "",
    apiKey: apiKey || "",
    isConfigured: isCloudinaryConfigured(),
  };
}

export interface UploadSignatureResult {
  timestamp: number;
  signature: string;
  folder: string;
  apiKey: string;
  cloudName: string;
  isMock: boolean;
}

/**
 * Generates a signed upload signature for direct browser-to-Cloudinary uploads.
 * If credentials are not configured yet (e.g. dev mode), returns a simulated response
 * so the UI and upload flows function seamlessly during testing.
 */
export function generateUploadSignature(folder = "saas_media"): UploadSignatureResult {
  const timestamp = Math.round(Date.now() / 1000);

  if (!isCloudinaryConfigured()) {
    return {
      timestamp,
      signature: "mock_signature_dev_mode",
      folder,
      apiKey: apiKey || "mock_api_key",
      cloudName: cloudName || "demo",
      isMock: true,
    };
  }

  const paramsToSign: Record<string, string | number> = {
    folder,
    timestamp,
  };

  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret!);

  return {
    timestamp,
    signature,
    folder,
    apiKey: apiKey!,
    cloudName: cloudName!,
    isMock: false,
  };
}

/**
 * Deletes an asset from Cloudinary by its public ID.
 */
export async function deleteCloudinaryAsset(
  publicId: string,
  resourceType: "image" | "raw" | "video" = "image"
) {
  if (!isCloudinaryConfigured()) {
    return { result: "ok", mock: true };
  }

  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}

export default cloudinary;
