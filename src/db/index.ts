import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Fallback to valid mock postgres URL during build time if placeholder is present
const connectionString =
  process.env.DATABASE_URL &&
  !process.env.DATABASE_URL.includes("[YOUR-PASSWORD]") &&
  !process.env.DATABASE_URL.includes("[YOUR-PROJECT]")
    ? process.env.DATABASE_URL
    : "postgres://postgres:postgres@127.0.0.1:5432/postgres";

// Prevent creating multiple connection pools during hot-reloading in development
const globalForDb = globalThis as unknown as {
  postgresClient: ReturnType<typeof postgres> | undefined;
};

const client =
  globalForDb.postgresClient ??
  postgres(connectionString, {
    prepare: false,
    max: process.env.NODE_ENV === "production" ? 10 : 3,
    idle_timeout: 20,
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.postgresClient = client;
}

export const db = drizzle(client, { schema });
