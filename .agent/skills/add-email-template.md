---
name: add-email-template
description: Create React Email transactional email templates, preview them in the Email Studio, and dispatch via Resend.
---

# Skill: Add Email Template & Transactional Sender

This skill guides an AI agent through creating and dispatching transactional emails.

## 1. Create React Email Component (`emails/<template-name>.tsx`)

Author standard React components using `@react-email/components`:

```tsx
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Tailwind,
} from "@react-email/components";

interface InvoiceEmailProps {
  customerName?: string;
  amount?: string;
  invoiceUrl?: string;
}

export default function InvoiceEmail({
  customerName = "Valued Customer",
  amount = "$29.00",
  invoiceUrl = "https://example.com/invoice",
}: InvoiceEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-slate-50 py-10 font-sans">
          <Container className="mx-auto max-w-lg rounded-xl bg-white p-8 shadow-sm">
            <Heading className="text-xl font-bold text-slate-900">Your Receipt</Heading>
            <Text className="text-slate-600">
              Hi {customerName}, thank you for your payment of {amount}.
            </Text>
            <Button
              href={invoiceUrl}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Download Invoice
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
```

## 2. Previewing Email Templates

- Run the local visual preview server: `npm run email` (accessible on `http://localhost:3001`).
- Or open the in-app Email Studio at `/admin/emails` to preview live templates directly.

## 3. Dispatching Emails via Resend (`src/lib/email/index.ts`)

```ts
import { resend } from "@/lib/email";
import InvoiceEmail from "@/../emails/invoice-email";

export async function sendInvoiceEmail(to: string, amount: string) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to,
    subject: "Your SaaS Subscription Invoice",
    react: InvoiceEmail({ amount }),
  });
}
```
