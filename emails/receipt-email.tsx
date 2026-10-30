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

interface ReceiptEmailProps {
  customerName?: string;
  invoiceId?: string;
  planName?: string;
  amount?: string;
  date?: string;
  portalUrl?: string;
}

export function ReceiptEmail({
  customerName = "Alex Rivera",
  invoiceId = "INV-2026-08492",
  planName = "Pro Plan (Monthly)",
  amount = "$29.00",
  date = "October 10, 2026",
  portalUrl = "http://localhost:3000/dashboard/billing",
}: ReceiptEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Receipt for your payment to SaaS Starter Kit ({invoiceId})</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Payment Confirmed ✅</Heading>
          <Text style={paragraph}>
            Hi {customerName}, thank you for your subscription. We have received your payment for{" "}
            <strong>{planName}</strong>.
          </Text>

          <Section style={receiptBox}>
            <div style={row}>
              <span style={label}>Invoice ID:</span>
              <span style={value}>{invoiceId}</span>
            </div>
            <div style={row}>
              <span style={label}>Billing Date:</span>
              <span style={value}>{date}</span>
            </div>
            <div style={row}>
              <span style={label}>Item:</span>
              <span style={value}>{planName}</span>
            </div>
            <div style={totalRow}>
              <span style={totalLabel}>Total Paid:</span>
              <span style={totalValue}>{amount}</span>
            </div>
          </Section>

          <Section style={btnContainer}>
            <Button style={button} href={portalUrl}>
              Manage Billing & Download PDF
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Need tax details or VAT invoice? Access your Stripe Customer Portal at any time from
            your workspace settings.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ReceiptEmail;

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

const receiptBox: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "16px 20px",
  marginBottom: "24px",
};

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 0",
  fontSize: "13px",
};

const label: React.CSSProperties = {
  color: "#64748b",
};

const value: React.CSSProperties = {
  fontWeight: "600",
  color: "#0f172a",
};

const totalRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0 4px",
  marginTop: "8px",
  borderTop: "1px dashed #cbd5e1",
};

const totalLabel: React.CSSProperties = {
  fontWeight: "700",
  fontSize: "14px",
  color: "#0f172a",
};

const totalValue: React.CSSProperties = {
  fontWeight: "700",
  fontSize: "16px",
  color: "#059669",
};

const btnContainer: React.CSSProperties = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#059669",
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
  margin: "24px 0 16px",
};

const footer: React.CSSProperties = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "18px",
};
