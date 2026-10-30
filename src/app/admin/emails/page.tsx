import { EmailPreviewClient } from "./email-preview-client";

export const metadata = {
  title: "Transactional Email Studio | Admin Platform",
  description: "Preview, test, and manage transactional email templates.",
};

export default function AdminEmailsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Email Templates Studio</h1>
        <p className="text-muted-foreground mt-1">
          Inspect responsive transactional emails, simulate mobile devices, and dispatch test
          copies.
        </p>
      </div>

      <EmailPreviewClient />
    </div>
  );
}
