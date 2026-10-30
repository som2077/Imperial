import {
  pgTable,
  text,
  timestamp,
  uuid,
  jsonb,
  boolean,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Public profiles table linked to Supabase auth.users
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(), // Matches Supabase auth.users.id
  email: text("email").notNull(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  role: text("role").default("user").notNull(), // 'user' | 'admin'
  onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),
  rolePersona: text("role_persona"), // 'founder' | 'developer' | 'product_manager' | 'designer' | 'growth' | 'other'
  companySize: text("company_size"), // 'solo' | '2-10' | '11-50' | '50+'
  projectGoal: text("project_goal"), // 'saas' | 'ai_app' | 'mobile_web' | 'client' | 'other'
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Lemon Squeezy Subscriptions
export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    lemonSqueezyCustomerId: text("lemon_squeezy_customer_id").notNull(),
    lemonSqueezySubscriptionId: text("lemon_squeezy_subscription_id").notNull().unique(),
    orderId: text("order_id"),
    status: text("status").notNull(), // 'active', 'cancelled', 'expired', 'past_due', 'paused', 'unpaid'
    variantId: text("variant_id").notNull(), // Lemon Squeezy product variant ID
    renewsAt: timestamp("renews_at", { withTimezone: true }),
    endsAt: timestamp("ends_at", { withTimezone: true }),
    trialEndsAt: timestamp("trial_ends_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("idx_subscriptions_user_id").on(table.userId)]
);

// Commercial Starter Kit Licenses
export const licenses = pgTable(
  "licenses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    licenseKey: text("license_key").notNull().unique(), // e.g., 'KIT-ABCD-1234-EFGH'
    orderId: text("order_id").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerName: text("customer_name"),
    githubUsername: text("github_username"),
    status: text("status").default("active").notNull(), // 'active' | 'revoked' | 'expired'
    planType: text("plan_type").default("standard").notNull(), // 'standard' | 'extended'
    activationsCount: integer("activations_count").default(0).notNull(),
    maxActivations: integer("max_activations").default(1).notNull(),
    githubInviteSent: boolean("github_invite_sent").default(false).notNull(),
    claimedAt: timestamp("claimed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_licenses_license_key").on(table.licenseKey),
    index("idx_licenses_customer_email").on(table.customerEmail),
  ]
);

// Webhook audit trail
export const webhookEvents = pgTable("webhook_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventName: text("event_name").notNull(),
  payload: jsonb("payload").notNull(),
  processed: boolean("processed").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// B2B Organizations / Workspaces
export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logoUrl: text("logo_url"),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Organization Members & Roles
export const organizationMembers = pgTable(
  "organization_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    role: text("role").default("member").notNull(), // 'owner' | 'admin' | 'member'
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_org_members_user_id").on(table.userId),
    index("idx_org_members_org_id").on(table.organizationId),
  ]
);

// Organization Email Invitations
export const organizationInvitations = pgTable("organization_invitations", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  role: text("role").default("member").notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Developer API Keys
export const apiKeys = pgTable("api_keys", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  keyPrefix: text("key_prefix").notNull(), // e.g. "sk_live_ab12..."
  keyHash: text("key_hash").notNull().unique(),
  lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Outgoing Webhook Endpoints
export const webhookEndpoints = pgTable("webhook_endpoints", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  description: text("description"),
  secret: text("secret").notNull(), // whsec_...
  events: jsonb("events").$type<string[]>().notNull(), // ["user.created", "subscription.updated", ...]
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Outgoing Webhook Deliveries (Audit & Latency log)
export const webhookDeliveries = pgTable(
  "webhook_deliveries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    endpointId: uuid("endpoint_id")
      .notNull()
      .references(() => webhookEndpoints.id, { onDelete: "cascade" }),
    event: text("event").notNull(),
    payload: jsonb("payload").notNull(),
    responseStatus: integer("response_status"),
    responseBody: text("response_body"),
    durationMs: integer("duration_ms"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("idx_webhook_deliveries_endpoint_id").on(table.endpointId)]
);

// In-App Notifications Table
export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id").references(() => organizations.id, {
      onDelete: "cascade",
    }),
    title: text("title").notNull(),
    message: text("message").notNull(),
    type: text("type").default("info").notNull(), // 'info' | 'success' | 'warning' | 'alert'
    isRead: boolean("is_read").default(false).notNull(),
    link: text("link"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_notifications_user_id").on(table.userId),
    index("idx_notifications_unread").on(table.userId, table.isRead),
  ]
);

export const mediaAssets = pgTable(
  "media_assets",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    publicId: text("public_id").notNull(),
    url: text("url").notNull(),
    secureUrl: text("secure_url").notNull(),
    format: text("format"),
    bytes: integer("bytes"),
    width: integer("width"),
    height: integer("height"),
    resourceType: text("resource_type").default("image").notNull(),
    folder: text("folder"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_media_assets_user_id").on(table.userId),
    index("idx_media_assets_created_at").on(table.createdAt),
  ]
);

export const cronJobLogs = pgTable(
  "cron_job_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    jobName: text("job_name").notNull(),
    status: text("status").notNull(), // 'success' | 'failed' | 'running'
    itemsProcessed: integer("items_processed").default(0).notNull(),
    durationMs: integer("duration_ms").default(0).notNull(),
    errorDetails: text("error_details"),
    triggeredBy: text("triggered_by").default("system-cron").notNull(), // 'system-cron' | 'manual-admin'
    executedAt: timestamp("executed_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_cron_job_logs_name").on(table.jobName),
    index("idx_cron_job_logs_executed_at").on(table.executedAt),
  ]
);

// Enterprise Activity & Audit Logs
export const activityLogs = pgTable(
  "activity_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id").references(() => organizations.id, {
      onDelete: "cascade",
    }),
    action: text("action").notNull(), // e.g. 'user.login', 'team.member_invited', 'api_key.created'
    entityType: text("entity_type").notNull(), // 'auth' | 'team' | 'api_key' | 'media' | 'billing' | 'onboarding'
    entityId: text("entity_id"),
    description: text("description").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_activity_logs_user_id").on(table.userId),
    index("idx_activity_logs_org_id").on(table.organizationId),
    index("idx_activity_logs_created_at").on(table.createdAt),
    index("idx_activity_logs_action").on(table.action),
  ]
);

// Relationships
export const profilesRelations = relations(profiles, ({ many }) => ({
  subscriptions: many(subscriptions),
  ownedOrganizations: many(organizations),
  organizationMemberships: many(organizationMembers),
  apiKeys: many(apiKeys),
  webhookEndpoints: many(webhookEndpoints),
  notifications: many(notifications),
  mediaAssets: many(mediaAssets),
  activityLogs: many(activityLogs),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(profiles, {
    fields: [subscriptions.userId],
    references: [profiles.id],
  }),
}));

export const organizationsRelations = relations(organizations, ({ one, many }) => ({
  owner: one(profiles, {
    fields: [organizations.ownerId],
    references: [profiles.id],
  }),
  members: many(organizationMembers),
  invitations: many(organizationInvitations),
  webhookEndpoints: many(webhookEndpoints),
  activityLogs: many(activityLogs),
}));

export const organizationMembersRelations = relations(organizationMembers, ({ one }) => ({
  organization: one(organizations, {
    fields: [organizationMembers.organizationId],
    references: [organizations.id],
  }),
  user: one(profiles, {
    fields: [organizationMembers.userId],
    references: [profiles.id],
  }),
}));

export const apiKeysRelations = relations(apiKeys, ({ one }) => ({
  user: one(profiles, {
    fields: [apiKeys.userId],
    references: [profiles.id],
  }),
}));

export const webhookEndpointsRelations = relations(webhookEndpoints, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [webhookEndpoints.organizationId],
    references: [organizations.id],
  }),
  user: one(profiles, {
    fields: [webhookEndpoints.userId],
    references: [profiles.id],
  }),
  deliveries: many(webhookDeliveries),
}));

export const webhookDeliveriesRelations = relations(webhookDeliveries, ({ one }) => ({
  endpoint: one(webhookEndpoints, {
    fields: [webhookDeliveries.endpointId],
    references: [webhookEndpoints.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(profiles, {
    fields: [notifications.userId],
    references: [profiles.id],
  }),
  organization: one(organizations, {
    fields: [notifications.organizationId],
    references: [organizations.id],
  }),
}));

export const mediaAssetsRelations = relations(mediaAssets, ({ one }) => ({
  user: one(profiles, {
    fields: [mediaAssets.userId],
    references: [profiles.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(profiles, {
    fields: [activityLogs.userId],
    references: [profiles.id],
  }),
  organization: one(organizations, {
    fields: [activityLogs.organizationId],
    references: [organizations.id],
  }),
}));

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type License = typeof licenses.$inferSelect;
export type NewLicense = typeof licenses.$inferInsert;
export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type OrganizationMember = typeof organizationMembers.$inferSelect;
export type OrganizationInvitation = typeof organizationInvitations.$inferSelect;
export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;
export type WebhookEndpoint = typeof webhookEndpoints.$inferSelect;
export type NewWebhookEndpoint = typeof webhookEndpoints.$inferInsert;
export type WebhookDelivery = typeof webhookDeliveries.$inferSelect;
export type NewWebhookDelivery = typeof webhookDeliveries.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type MediaAsset = typeof mediaAssets.$inferSelect;
export type NewMediaAsset = typeof mediaAssets.$inferInsert;
export type CronJobLog = typeof cronJobLogs.$inferSelect;
export type NewCronJobLog = typeof cronJobLogs.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
