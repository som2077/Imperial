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

interface MagicLinkEmailProps {
  magicLink?: string;
  code?: string;
  email?: string;
}

export function MagicLinkEmail({
  magicLink = "http://localhost:3000/auth/callback?code=mock_code_123456",
  code = "849201",
  email = "alex@example.com",
}: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your 1-click login link for SaaS Starter Kit</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Sign in to your account 🔐</Heading>
          <Text style={paragraph}>
            We received a sign-in request for <strong>{email}</strong>. Click the button below to
            log in instantly without entering a password.
          </Text>

          <Section style={btnContainer}>
            <Button style={button} href={magicLink}>
              Click Here to Sign In
            </Button>
          </Section>

          <Section style={codeBox}>
            <Text style={codeLabel}>Or use this 6-digit confirmation code:</Text>
            <Text style={codeText}>{code}</Text>
          </Section>

          <Text style={subtext}>
            This link and code will expire in 10 minutes. If you did not request this email, no
            action is needed and your account remains safe.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            SaaS Starter Kit Security Team • Never share this code with anyone.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default MagicLinkEmail;

const main: React.CSSProperties = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: "40px 0",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px 40px",
  borderRadius: "12px",
  border: "1px solid #e6ebf1",
  maxWidth: "560px",
};

const heading: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#1a1f36",
  marginBottom: "16px",
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#4f566b",
  marginBottom: "20px",
};

const btnContainer: React.CSSProperties = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#0284c7",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 28px",
};

const codeBox: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  border: "1px dashed #cbd5e1",
  borderRadius: "8px",
  padding: "12px",
  textAlign: "center" as const,
  marginBottom: "20px",
};

const codeLabel: React.CSSProperties = {
  fontSize: "12px",
  color: "#64748b",
  marginBottom: "6px",
};

const codeText: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "700",
  letterSpacing: "4px",
  color: "#0f172a",
  fontFamily: "monospace",
  margin: "0",
};

const subtext: React.CSSProperties = {
  fontSize: "12px",
  color: "#94a3b8",
  lineHeight: "18px",
  marginBottom: "16px",
};

const hr: React.CSSProperties = {
  borderColor: "#e6ebf1",
  margin: "24px 0 16px",
};

const footer: React.CSSProperties = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "18px",
};
