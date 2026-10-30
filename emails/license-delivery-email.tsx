import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface LicenseDeliveryEmailProps {
  customerName?: string;
  licenseKey?: string;
  planName?: string;
  orderId?: string;
  githubUsername?: string;
  repoUrl?: string;
  claimUrl?: string;
}

export function LicenseDeliveryEmail({
  customerName = "Developer",
  licenseKey = "KIT-8F92-4B1C-99E0",
  planName = "SAAS-Kit Commercial Lifetime License",
  orderId = "ORD-2026-94812",
  githubUsername,
  repoUrl = "https://github.com/som2077/saas-kit-template",
  claimUrl = "http://localhost:3000/claim",
}: LicenseDeliveryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your SAAS-Kit Commercial License & GitHub Access ({licenseKey})</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Welcome to SAAS-Kit! 🚀</Heading>
          <Text style={paragraph}>
            Hi {customerName}, thank you for purchasing <strong>{planName}</strong>. Your license is
            active and your repository access is ready.
          </Text>

          {/* License Credentials Box */}
          <Section style={credentialsBox}>
            <Text style={boxTitle}>YOUR COMMERCIAL LICENSE KEY</Text>
            <div style={keyDisplay}>
              <code>{licenseKey}</code>
            </div>
            <div style={detailRow}>
              <span style={detailLabel}>Order ID:</span>
              <span style={detailValue}>{orderId}</span>
            </div>
            <div style={detailRow}>
              <span style={detailLabel}>Plan:</span>
              <span style={detailValue}>{planName}</span>
            </div>
            {githubUsername && (
              <div style={detailRow}>
                <span style={detailLabel}>GitHub Account:</span>
                <span style={detailValue}>@{githubUsername}</span>
              </div>
            )}
          </Section>

          {/* Action CTAs */}
          <Section style={ctaSection}>
            <Button style={primaryButton} href="https://github.com/som2077/saas-kit-template/invitations">
              Accept GitHub Invitation 🐙
            </Button>
            <Button style={secondaryButton} href={claimUrl}>
              Manage License / Claim Portal
            </Button>
          </Section>

          <Hr style={divider} />

          {/* Quick Start Instructions */}
          <Heading as="h3" style={subheading}>
            ⚡ 3-Minute Quick Start
          </Heading>
          <Text style={codeInstruction}>
            1. Clone the official repository:
            <br />
            <code>git clone {repoUrl}.git</code>
          </Text>
          <Text style={codeInstruction}>
            2. Run the automated fast-track setup wizard:
            <br />
            <code>npm install && npm run setup</code>
          </Text>
          <Text style={codeInstruction}>
            3. Stay updated anytime safely:
            <br />
            <code>npm run sync:upstream</code>
          </Text>

          <Hr style={divider} />

          <Text style={footer}>
            Need assistance or have questions? Join our Discord community or reply directly to this
            email.
            <br />
            &copy; {new Date().getFullYear()} SAAS-Kit. Licensed to {customerName}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default LicenseDeliveryEmail;

// Inline CSS Styles for universal email client compatibility
const main = {
  backgroundColor: "#09090b",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  color: "#f4f4f5",
  padding: "40px 0",
};

const container = {
  backgroundColor: "#18181b",
  border: "1px solid #27272a",
  borderRadius: "16px",
  padding: "40px",
  margin: "0 auto",
  maxWidth: "580px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "800",
  color: "#ffffff",
  marginBottom: "16px",
  letterSpacing: "-0.025em",
};

const subheading = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#ffffff",
  marginTop: "24px",
  marginBottom: "12px",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#a1a1aa",
  marginBottom: "24px",
};

const credentialsBox = {
  backgroundColor: "#121215",
  border: "1px solid #3f3f46",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "28px",
};

const boxTitle = {
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.1em",
  color: "#a1a1aa",
  textTransform: "uppercase" as const,
  marginBottom: "10px",
};

const keyDisplay = {
  backgroundColor: "#27272a",
  border: "1px solid #52525b",
  borderRadius: "8px",
  padding: "14px",
  textAlign: "center" as const,
  fontSize: "20px",
  fontWeight: "800",
  letterSpacing: "0.08em",
  color: "#38bdf8",
  marginBottom: "18px",
};

const detailRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  color: "#d4d4d8",
  padding: "4px 0",
};

const detailLabel = {
  color: "#71717a",
};

const detailValue = {
  fontWeight: "600",
  color: "#f4f4f5",
};

const ctaSection = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const primaryButton = {
  backgroundColor: "#7c3aed",
  color: "#ffffff",
  fontWeight: "700",
  fontSize: "15px",
  borderRadius: "10px",
  padding: "12px 28px",
  display: "inline-block",
  textDecoration: "none",
  marginRight: "8px",
  marginBottom: "10px",
};

const secondaryButton = {
  backgroundColor: "#27272a",
  color: "#f4f4f5",
  fontWeight: "600",
  fontSize: "14px",
  borderRadius: "10px",
  border: "1px solid #3f3f46",
  padding: "12px 24px",
  display: "inline-block",
  textDecoration: "none",
  marginBottom: "10px",
};

const divider = {
  borderColor: "#27272a",
  margin: "24px 0",
};

const codeInstruction = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#a1a1aa",
  marginBottom: "12px",
};

const footer = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#71717a",
  marginTop: "24px",
  textAlign: "center" as const,
};
