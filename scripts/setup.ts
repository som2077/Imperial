#!/usr/bin/env node

/**
 * SaaS Starter Kit - First-Time Setup Wizard
 *
 * Automated initialization script for developers:
 * - Checks Node.js runtime compatibility (v18+)
 * - Ensures .env.local exists (copies from .env.example)
 * - Prompts to rebrand the project via rename script
 * - Displays database synchronization instructions
 *
 * Usage:
 *   npm run setup
 */

import fs from "node:fs";
import path from "node:path";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { execSync } from "node:child_process";

// CLI ANSI colors
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
};

async function main() {
  const rootDir = process.cwd();
  const envExamplePath = path.join(rootDir, ".env.example");
  const envLocalPath = path.join(rootDir, ".env.local");

  console.log(`
${c.cyan}${c.bold}================================================================${c.reset}
  🚀  ${c.bold}SaaS Starter Kit - Fast-Track Setup Wizard${c.reset}
${c.cyan}================================================================${c.reset}
  Welcome! This wizard gets your production-ready SaaS environment
  configured and ready to launch in less than 2 minutes.
`);

  // 1. Runtime Compatibility Check
  const nodeVersionMajor = parseInt(process.versions.node.split(".")[0], 10);
  if (nodeVersionMajor < 18) {
    console.error(
      `${c.yellow}⚠️ Warning: Node.js 18+ is required. You are using v${process.versions.node}. Please update Node.js.${c.reset}`
    );
  } else {
    console.log(
      `  ${c.green}✓${c.reset} Node.js runtime: ${c.bold}v${process.versions.node}${c.reset} (Compatible)`
    );
  }

  // 2. Environment File Initialization
  if (!fs.existsSync(envLocalPath)) {
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envLocalPath);
      console.log(
        `  ${c.green}✓${c.reset} Created ${c.bold}.env.local${c.reset} from ${c.dim}.env.example${c.reset}`
      );
    } else {
      console.log(`  ${c.yellow}⚠️ .env.example not found.${c.reset}`);
    }
  } else {
    console.log(`  ${c.green}✓${c.reset} ${c.bold}.env.local${c.reset} already exists`);
  }

  // 3. Optional Rebranding
  if (process.stdin.isTTY) {
    const rl = readline.createInterface({ input, output });

    try {
      const askRebrand = await rl.question(
        `\n${c.bold}Would you like to customize and rebrand your project name now? (Y/n)${c.reset}: `
      );

      if (askRebrand.trim().toLowerCase() !== "n" && askRebrand.trim().toLowerCase() !== "no") {
        try {
          execSync("npx tsx scripts/rename-project.ts", { stdio: "inherit" });
        } catch {
          // Handled inside rename script
        }
      }

      // Optional Commercial License Key Registration
      const askLicense = await rl.question(
        `\n${c.bold}Do you have a Commercial License Key? (Enter key or press Enter to skip)${c.reset}: `
      );
      const cleanKey = askLicense.trim().toUpperCase();
      if (cleanKey) {
        let envContent = fs.readFileSync(envLocalPath, "utf-8");
        if (envContent.includes("SAAS_KIT_LICENSE_KEY=")) {
          envContent = envContent.replace(
            /SAAS_KIT_LICENSE_KEY=.*$/m,
            `SAAS_KIT_LICENSE_KEY="${cleanKey}"`
          );
        } else {
          envContent += `\n# Commercial License Registration\nSAAS_KIT_LICENSE_KEY="${cleanKey}"\n`;
        }
        fs.writeFileSync(envLocalPath, envContent);
        console.log(
          `  ${c.green}✓${c.reset} Commercial License Key registered in ${c.bold}.env.local${c.reset}`
        );
      }
    } finally {
      try {
        rl.close();
      } catch {
        // Already closed
      }
    }
  }

  // 4. Summary & Next Steps
  console.log(`
${c.green}${c.bold}================================================================${c.reset}
  🎉  ${c.bold}Environment Ready! Next Steps to Launch:${c.reset}
${c.green}================================================================${c.reset}

  ${c.bold}1. Configure Service Credentials:${c.reset}
     Open ${c.cyan}.env.local${c.reset} and provide:
     • Supabase URL & Anon Key (from supabase.com)
     • Database URL (PostgreSQL)
     • Lemon Squeezy API Key & Webhook Secret

  ${c.bold}2. Synchronize Database Tables:${c.reset}
     ${c.dim}$${c.reset} ${c.blue}npm run db:push${c.reset}

  ${c.bold}3. Launch Turbopack Dev Server:${c.reset}
     ${c.dim}$${c.reset} ${c.green}npm run dev${c.reset}
     Navigate to ${c.cyan}http://localhost:3000${c.reset}

  ${c.bold}4. Verify Test Suite & Quality Gates:${c.reset}
     ${c.dim}$${c.reset} ${c.magenta}npm run check${c.reset}
     ${c.dim}$${c.reset} ${c.magenta}npm run test:e2e${c.reset}
`);
}

main().catch((err) => {
  console.error("❌ Setup failed:", err);
  process.exit(1);
});
