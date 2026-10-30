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

interface TeamInviteEmailProps {
  inviterName?: string;
  workspaceName?: string;
  role?: string;
  inviteLink?: string;
}

export function TeamInviteEmail({
  inviterName = "Alex Rivera",
  workspaceName = "Acme Corp Workspace",
  role = "member",
  inviteLink = "http://localhost:3000/dashboard/team",
}: TeamInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Join {workspaceName} on SaaS Starter Kit</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Team Invitation 👥</Heading>
          <Text style={paragraph}>
            <strong>{inviterName}</strong> has invited you to collaborate in the{" "}
            <strong>{workspaceName}</strong> workspace with the role of <strong>{role}</strong>.
          </Text>

          <Section style={detailsBox}>
            <Text style={detailText}>
              <strong>Workspace:</strong> {workspaceName}
            </Text>
            <Text style={detailText}>
              <strong>Role Permission:</strong> {role.toUpperCase()}
            </Text>
            <Text style={detailText}>
              <strong>Expires In:</strong> 7 days
            </Text>
          </Section>

          <Section style={btnContainer}>
            <Button style={button} href={inviteLink}>
              Accept Invitation & Join Team
            </Button>
          </Section>

          <Text style={subtext}>
            If you were not expecting this invitation, you can safely ignore this email.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            SaaS Starter Kit • Secure B2B Multi-Tenancy & Workspace Collaboration
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default TeamInviteEmail;

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

const detailsBox: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "16px 20px",
  marginBottom: "24px",
};

const detailText: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "22px",
  color: "#334155",
  margin: "4px 0",
};

const btnContainer: React.CSSProperties = {
  textAlign: "center" as const,
  margin: "28px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#4f46e5",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 28px",
};

const subtext: React.CSSProperties = {
  fontSize: "12px",
  color: "#94a3b8",
  textAlign: "center" as const,
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
