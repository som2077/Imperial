import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { WelcomeEmail } from "emails/welcome-email";
import { TeamInviteEmail } from "emails/team-invite-email";
import { MagicLinkEmail } from "emails/magic-link-email";
import { ReceiptEmail } from "emails/receipt-email";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "welcome";

  let emailComponent;

  switch (type) {
    case "welcome":
      emailComponent = WelcomeEmail({
        name: "Alex Rivera",
        loginUrl: "http://localhost:3000/dashboard",
      });
      break;
    case "team-invite":
      emailComponent = TeamInviteEmail({
        inviterName: "Sarah Chen",
        workspaceName: "Acme Corp Workspace",
        role: "admin",
        inviteLink: "http://localhost:3000/dashboard/team",
      });
      break;
    case "magic-link":
      emailComponent = MagicLinkEmail({
        email: "alex@example.com",
        code: "749201",
        magicLink: "http://localhost:3000/auth/callback?code=mock_code",
      });
      break;
    case "receipt":
      emailComponent = ReceiptEmail({
        customerName: "Alex Rivera",
        invoiceId: "INV-2026-9481",
        planName: "Pro Tier (Annual)",
        amount: "$290.00",
        date: "October 10, 2026",
        portalUrl: "http://localhost:3000/dashboard/billing",
      });
      break;
    default:
      return new NextResponse("Unknown email type", { status: 400 });
  }

  const html = await render(emailComponent);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
