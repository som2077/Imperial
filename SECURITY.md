# Security Policy 🛡️

We take the security and integrity of the **SaaS Starter Kit** very seriously. This document outlines how to responsibly report vulnerabilities and what versions are supported.

---

## 🔒 Supported Versions

We actively support the latest stable releases of the starter kit with security patches:

| Version | Supported          |
| ------- | ------------------ |
| 3.x.x   | :white_check_mark: |
| 2.x.x   | :x:                |
| < 2.0   | :x:                |

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability within this repository, **please do not disclose it publicly via a GitHub issue or social media.**

Instead, please report vulnerabilities privately:

1. **Email**: Send detailed information to [somgautam2077@gmail.com](mailto:somgautam2077@gmail.com).
2. **GitHub Security Advisory**: Open a private draft security advisory under the repository's [Security Advisories](https://github.com/som2077/saas-kit-website/security/advisories) tab.

### Please include the following details in your report:

- Type of issue (e.g. CSRF, SQL Injection, Auth Bypass, Remote Code Execution).
- Step-by-step instructions or Proof of Concept (PoC) to reproduce the vulnerability.
- Affected files, routes, or Server Actions.
- Suggested mitigation or fix, if available.

### Response Timeline

- **Initial Acknowledgement**: Within 24-48 hours.
- **Triage & Assessment**: Within 3-5 business days.
- **Fix & Patch Release**: Critical vulnerabilities will be patched as a priority update.

---

## 🛡️ Built-in Security Protections

The starter kit comes pre-configured with industry-standard security safeguards:

- **CSRF & Origin Verification**: Next.js Server Actions origin headers validation.
- **Cryptographic Signatures**: Webhook payloads signed with HMAC SHA-256 (`crypto.createHmac`).
- **Constant-Time Comparison**: `crypto.timingSafeEqual` prevents timing attack side-channels.
- **Rate Limiting**: Sliding-window token bucket algorithm protecting public endpoints against DDoS.
- **Bot Protection**: Cloudflare Turnstile Captcha verification with dev-mode bypass.
- **Database Injection Safeguards**: Drizzle ORM parametrized query builders eliminate SQL injection risks.
