import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name?: string;
  loginUrl?: string;
}

export function WelcomeEmail({
  name = "there",
  loginUrl = "http://localhost:3000/login",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to SaaS Starter Kit — Your workspace is ready!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Welcome aboard, {name}! 🚀</Heading>
          <Text style={paragraph}>
            We are excited to have you join our platform. Your account is fully configured and ready
            for production.
          </Text>

          <Section style={cardSection}>
            <Text style={cardTitle}>Here is what you can do next:</Text>
            <Text style={cardItem}>• Explore your AI Copilot Studio & generative tools</Text>
            <Text style={cardItem}>• Invite team members to collaborate in your workspace</Text>
            <Text style={cardItem}>• Generate developer API keys for programmatic access</Text>
            <Text style={cardItem}>• Setup Two-Factor Authentication (2FA) for extra security</Text>
          </Section>

          <Section style={btnContainer}>
            <Button style={button} href={loginUrl}>
              Open Your Dashboard
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Need assistance? Feel free to reply directly to this email or visit our{" "}
            <Link href="http://localhost:3000/docs" style={link}>
              Documentation Portal
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;

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

const cardSection: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "16px 20px",
  marginBottom: "24px",
};

const cardTitle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#0f172a",
  marginBottom: "8px",
};

const cardItem: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "22px",
  color: "#475569",
  margin: "4px 0",
};

const btnContainer: React.CSSProperties = {
  textAlign: "center" as const,
  margin: "28px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#0f172a",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 28px",
};

const hr: React.CSSProperties = {
  borderColor: "#e6ebf1",
  margin: "28px 0 16px",
};

const footer: React.CSSProperties = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "18px",
};

const link: React.CSSProperties = {
  color: "#4f46e5",
  textDecoration: "underline",
};
