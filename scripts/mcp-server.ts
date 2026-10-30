#!/usr/bin/env node

/**
 * Built-in Model Context Protocol (MCP) Server for SaaS Starter Kit
 * Allows AI Coding Agents (Claude Code, Cursor, Gemini CLI) to introspect
 * the repository's database schema, server actions, REST APIs, and architecture.
 *
 * Usage:
 *   node scripts/mcp-server.ts
 * Or in Claude Desktop / Cursor mcp config:
 *   "saas-kit": {
 *     "command": "node",
 *     "args": ["/path/to/scripts/mcp-server.ts"]
 *   }
 */

import readline from "readline";

interface JsonRpcRequest {
  jsonrpc: string;
  id?: string | number;
  method: string;
  params?: Record<string, unknown>;
}

const TOOLS = [
  {
    name: "get_stack_info",
    description: "Returns the core architectural stack and dependencies of the SaaS starter kit.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_database_schema",
    description:
      "Returns the complete PostgreSQL/Drizzle schema tables, relationships, and columns.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_api_routes",
    description:
      "Lists all public REST API v1 endpoints, webhook receivers, and AI streaming routes.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_server_actions",
    description:
      "Lists all Next.js Server Actions grouped by domain (auth, mfa, team, billing, admin, gdpr).",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

function handleToolCall(name: string): string {
  switch (name) {
    case "get_stack_info":
      return JSON.stringify(
        {
          framework: "Next.js 16 (App Router, Turbopack, Standalone Docker)",
          ui: "React 19, Tailwind CSS v4 (@theme inline), Lucide Icons, Shadcn UI patterns",
          auth: "Supabase Auth (SSR cookies, Magic Link OTP, 2FA/MFA TOTP, OAuth Google/GitHub)",
          botProtection: "Cloudflare Turnstile Captcha",
          database: "PostgreSQL with Drizzle ORM (Type-safe schema, migrations, relations)",
          aiEngine:
            "Vercel AI SDK v7 with Copilot Studio (CodeBlock, ReasoningDisplay, SmartInput)",
          billing: "Stripe & Lemon Squeezy (Subscriptions, Customer Portal, Per-Seat Billing)",
          stateManagement: "Zustand with localStorage persist middleware",
          rateLimiting: "Sliding-Window Token Bucket Limiter (RFC 429 compliant)",
          quality: "Prettier with Tailwind plugin, ESLint, TypeScript Strict Mode, Playwright E2E",
        },
        null,
        2
      );

    case "get_database_schema":
      return JSON.stringify(
        {
          tables: [
            {
              name: "profiles",
              description: "Public user profiles linked to Supabase auth.users",
              columns: [
                "id (uuid)",
                "email (text)",
                "full_name (text)",
                "avatar_url (text)",
                "role ('user' | 'admin')",
                "created_at",
                "updated_at",
              ],
            },
            {
              name: "organizations",
              description: "B2B Organization Workspaces",
              columns: [
                "id (uuid)",
                "name (text)",
                "slug (text)",
                "owner_id (uuid -> profiles.id)",
                "created_at",
                "updated_at",
              ],
            },
            {
              name: "organization_members",
              description: "Workspace memberships and RBAC roles",
              columns: [
                "id (uuid)",
                "organization_id (uuid)",
                "user_id (uuid)",
                "role ('owner' | 'admin' | 'member')",
                "created_at",
              ],
            },
            {
              name: "organization_invitations",
              description: "Pending team email invitations with secure tokens",
              columns: [
                "id (uuid)",
                "organization_id (uuid)",
                "email (text)",
                "role (text)",
                "token (text)",
                "expires_at",
                "created_at",
              ],
            },
            {
              name: "subscriptions",
              description: "Customer billing records synced with Stripe / Lemon Squeezy",
              columns: [
                "id (uuid)",
                "user_id (uuid)",
                "lemon_squeezy_customer_id",
                "lemon_squeezy_subscription_id",
                "status ('active'|'cancelled')",
                "variant_id",
                "renews_at",
              ],
            },
            {
              name: "api_keys",
              description: "Hashed developer API keys for Public REST API v1 (sk_live_...)",
              columns: [
                "id (uuid)",
                "user_id (uuid)",
                "name (text)",
                "key_prefix (text)",
                "key_hash (text)",
                "last_used_at",
                "created_at",
              ],
            },
            {
              name: "webhook_endpoints",
              description: "User outgoing webhook subscriptions with HMAC secret (whsec_...)",
              columns: [
                "id (uuid)",
                "organization_id (uuid)",
                "user_id (uuid)",
                "url (text)",
                "secret (text)",
                "events (jsonb)",
                "is_active (boolean)",
                "created_at",
              ],
            },
            {
              name: "notifications",
              description: "In-app notifications for user activity & alerts",
              columns: [
                "id (uuid)",
                "user_id (uuid)",
                "title (text)",
                "message (text)",
                "type ('info'|'success'|'warning'|'error')",
                "is_read (boolean)",
                "created_at",
              ],
            },
            {
              name: "media_assets",
              description: "Cloudinary CDN uploads, responsive formats & metadata",
              columns: [
                "id (uuid)",
                "user_id (uuid)",
                "public_id (text)",
                "secure_url (text)",
                "resource_type (text)",
                "format (text)",
                "bytes (integer)",
                "width (integer)",
                "height (integer)",
                "created_at",
              ],
            },
            {
              name: "cron_job_logs",
              description: "Audit trail for scheduled automation jobs & worker runs",
              columns: [
                "id (uuid)",
                "job_name (text)",
                "status ('success'|'error')",
                "summary (text)",
                "duration_ms (integer)",
                "created_at",
              ],
            },
          ],
        },
        null,
        2
      );

    case "list_api_routes":
      return JSON.stringify(
        {
          publicApiV1: [
            {
              path: "/api/v1/me",
              method: "GET",
              auth: "Bearer sk_live_...",
              description: "Returns current authenticated developer profile",
            },
            {
              path: "/api/v1/metrics",
              method: "GET",
              auth: "Bearer sk_live_...",
              description: "Returns workspace usage, API keys count, webhooks count",
            },
            {
              path: "/api/v1/events",
              method: "POST",
              auth: "Bearer sk_live_...",
              description: "Ingests custom business events into the starter kit",
            },
          ],
          cronAutomation: [
            {
              path: "/api/cron/[job]",
              method: "POST",
              auth: "Bearer CRON_SECRET",
              description:
                "RFC-compliant cron runner executing webhook-retries, trial-reminders, or db-cleanup",
            },
          ],
          emailStudio: [
            {
              path: "/api/emails/preview",
              method: "GET",
              description: "Renders live HTML/React email templates for visual inspector",
            },
          ],
          aiStudio: [
            {
              path: "/api/ai/chat",
              method: "POST",
              rateLimit: "10 req/min",
              description: "Streams Vercel AI SDK chat responses with tool calls",
            },
          ],
          webhooks: [
            {
              path: "/api/webhooks/stripe",
              method: "POST",
              description: "Handles Stripe checkout & subscription lifecycle events",
            },
            {
              path: "/api/webhooks/lemonsqueezy",
              method: "POST",
              description: "Handles Lemon Squeezy subscription webhooks",
            },
          ],
          authCallbacks: [
            {
              path: "/auth/callback",
              method: "GET",
              description: "Exchanges code for session (Magic Links, OAuth, Password Reset)",
            },
          ],
        },
        null,
        2
      );

    case "list_server_actions":
      return JSON.stringify(
        {
          auth: ["login", "signup", "signInWithOtp", "signInWithOAuth", "resetPassword", "logout"],
          mfa: [
            "getMfaFactorsAction",
            "enrollMfaAction",
            "verifyMfaEnrollmentAction",
            "unenrollMfaAction",
          ],
          team: [
            "getOrCreateUserOrganization",
            "inviteMemberAction",
            "removeMemberAction",
            "cancelInvitationAction",
            "getOrganizationSeatUsageAction",
          ],
          apiKeys: ["createApiKeyAction", "getApiKeysAction", "revokeApiKeyAction"],
          webhooks: [
            "createWebhookAction",
            "getWebhooksAction",
            "toggleWebhookAction",
            "deleteWebhookAction",
            "sendWebhookTestPingAction",
          ],
          media: [
            "createSignedUploadAction",
            "saveMediaAssetAction",
            "deleteMediaAssetAction",
            "getUserMediaAssetsAction",
          ],
          cron: ["triggerCronJobAction", "getCronLogsAction"],
          admin: [
            "getAdminStatsAction",
            "listAdminUsersAction",
            "startImpersonationAction",
            "stopImpersonationAction",
          ],
          gdpr: ["exportUserDataAction", "deleteAccountAction"],
          notifications: [
            "getNotificationsAction",
            "markAsReadAction",
            "markAllAsReadAction",
            "createNotificationAction",
          ],
        },
        null,
        2
      );

    default:
      return JSON.stringify({ error: `Unknown tool: ${name}` });
  }
}

// Setup stdio JSON-RPC server
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  if (!line.trim()) return;

  try {
    const request: JsonRpcRequest = JSON.parse(line);

    if (request.method === "initialize") {
      const response = {
        jsonrpc: "2.0",
        id: request.id,
        result: {
          protocolVersion: "2024-11-05",
          serverInfo: {
            name: "saas-starter-kit-mcp",
            version: "1.0.0",
          },
          capabilities: {
            tools: {},
          },
        },
      };
      process.stdout.write(JSON.stringify(response) + "\n");
      return;
    }

    if (request.method === "notifications/initialized") {
      // Acknowledgement, no response required
      return;
    }

    if (request.method === "tools/list") {
      const response = {
        jsonrpc: "2.0",
        id: request.id,
        result: {
          tools: TOOLS,
        },
      };
      process.stdout.write(JSON.stringify(response) + "\n");
      return;
    }

    if (request.method === "tools/call") {
      const toolName = (request.params?.name as string) || "";
      const resultText = handleToolCall(toolName);
      const response = {
        jsonrpc: "2.0",
        id: request.id,
        result: {
          content: [
            {
              type: "text",
              text: resultText,
            },
          ],
        },
      };
      process.stdout.write(JSON.stringify(response) + "\n");
      return;
    }

    // Default error for unhandled methods
    if (request.id !== undefined) {
      process.stdout.write(
        JSON.stringify({
          jsonrpc: "2.0",
          id: request.id,
          error: {
            code: -32601,
            message: `Method not found: ${request.method}`,
          },
        }) + "\n"
      );
    }
  } catch (err) {
    process.stderr.write(`MCP Server Error: ${err}\n`);
  }
});
