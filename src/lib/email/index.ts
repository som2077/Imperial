import { Resend } from "resend";
import { WelcomeEmail } from "emails/welcome-email";
import { TeamInviteEmail } from "emails/team-invite-email";
import { MagicLinkEmail } from "emails/magic-link-email";
import { ReceiptEmail } from "emails/receipt-email";
import { LicenseDeliveryEmail } from "emails/license-delivery-email";
import { siteConfig } from "@/config/site";

export const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react?: React.ReactElement;
  html?: string;
  text?: string;
}

export async function sendEmail({ to, subject, react, html, text }: SendEmailOptions) {
  const from = process.env.EMAIL_FROM || `${siteConfig.shortName} <onboarding@resend.dev>`;

  // Development fallback: Log email content to terminal for easy testing without spending API quota
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_dummy") {
    console.log("----------------------------------------");
    console.log(`📨 [Email Simulated in Dev] To: ${Array.isArray(to) ? to.join(", ") : to}`);
    console.log(`📌 Subject: ${subject}`);
    console.log("----------------------------------------");
    return { success: true, simulated: true };
  }

  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      react,
      html,
      text,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return { success: false, error };
  }
}

/**
 * High-Level Transactional Email Dispatchers
 */

export async function sendWelcomeEmail({
  to,
  name,
  loginUrl,
}: {
  to: string;
  name: string;
  loginUrl?: string;
}) {
  return sendEmail({
    to,
    subject: `Welcome to ${siteConfig.name}, ${name}! 🚀`,
    react: WelcomeEmail({ name, loginUrl }),
  });
}

export async function sendTeamInviteEmail({
  to,
  inviterName,
  workspaceName,
  role,
  inviteLink,
}: {
  to: string;
  inviterName: string;
  workspaceName: string;
  role: string;
  inviteLink: string;
}) {
  return sendEmail({
    to,
    subject: `Join ${workspaceName} on ${siteConfig.name}`,
    react: TeamInviteEmail({ inviterName, workspaceName, role, inviteLink }),
  });
}

export async function sendMagicLinkEmail({
  to,
  magicLink,
  code,
}: {
  to: string;
  magicLink: string;
  code: string;
}) {
  return sendEmail({
    to,
    subject: `Your 1-click login link for ${siteConfig.name}`,
    react: MagicLinkEmail({ magicLink, code, email: to }),
  });
}

export async function sendReceiptEmail({
  to,
  customerName,
  invoiceId,
  planName,
  amount,
  date,
  portalUrl,
}: {
  to: string;
  customerName: string;
  invoiceId: string;
  planName: string;
  amount: string;
  date?: string;
  portalUrl?: string;
}) {
  return sendEmail({
    to,
    subject: `Receipt for payment (${invoiceId})`,
    react: ReceiptEmail({ customerName, invoiceId, planName, amount, date, portalUrl }),
  });
}

export async function sendLicenseDeliveryEmail({
  to,
  customerName,
  licenseKey,
  orderId,
  planName,
  githubUsername,
  claimUrl,
}: {
  to: string;
  customerName: string;
  licenseKey: string;
  orderId: string;
  planName?: string;
  githubUsername?: string;
  claimUrl?: string;
}) {
  return sendEmail({
    to,
    subject: `Your ${siteConfig.name} License Key & GitHub Access 🚀`,
    react: LicenseDeliveryEmail({
      customerName,
      licenseKey,
      orderId,
      planName,
      githubUsername,
      claimUrl,
    }),
  });
}
