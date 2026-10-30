#!/usr/bin/env node

/**
 * SaaS Starter Kit - Upstream Sync & Update Assistant
 *
 * Automated helper for developers to pull new features, bugfixes,
 * and security patches from the official SAAS-Kit upstream repository
 * safely without overwriting their custom code.
 *
 * Usage:
 *   npm run sync:upstream
 *   npm run sync:upstream -- --check
 *   npm run sync:upstream -- --yes
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const OFFICIAL_UPSTREAM_URL = "https://github.com/som2077/saas-kit-template.git";

// ANSI colors
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
};

function run(cmd: string, silent = true): string {
  try {
    const result = execSync(cmd, {
      encoding: "utf-8",
      stdio: silent ? ["pipe", "pipe", "pipe"] : "inherit",
    });
    return result ? result.trim() : "";
  } catch (error: unknown) {
    if (silent) {
      return "";
    }
    throw error;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes("--check");
  const autoYes = args.includes("--yes") || args.includes("-y");

  console.log(`
${c.cyan}${c.bold}================================================================${c.reset}
  🔄  ${c.bold}SAAS-Kit - Upstream Feature & Update Sync Tool${c.reset}
${c.cyan}================================================================${c.reset}
  Safely pull official features, improvements, and fixes into your project.
`);

  // 1. Verify Git Repository
  const isGit = run("git rev-parse --is-inside-work-tree");
  if (isGit !== "true") {
    console.error(`${c.red}❌ Error: Not inside a valid git repository.${c.reset}`);
    process.exit(1);
  }

  // 2. Check Remote Remotes
  const remotesOutput = run("git remote -v");
  let hasUpstream = remotesOutput.includes("upstream\t");

  if (!hasUpstream) {
    console.log(`  ${c.yellow}ℹ️ 'upstream' remote not detected.${c.reset}`);
    console.log(`  Adding official remote: ${c.bold}${OFFICIAL_UPSTREAM_URL}${c.reset}...`);
    try {
      run(`git remote add upstream ${OFFICIAL_UPSTREAM_URL}`);
      hasUpstream = true;
      console.log(`  ${c.green}✓${c.reset} Successfully added ${c.bold}upstream${c.reset} remote.`);
    } catch {
      console.error(
        `${c.red}❌ Could not automatically add upstream remote. Please run: git remote add upstream ${OFFICIAL_UPSTREAM_URL}${c.reset}`
      );
      process.exit(1);
    }
  } else {
    console.log(`  ${c.green}✓${c.reset} Upstream remote configured.`);
  }

  // 3. Inspect Commercial License Status
  let licenseKey = process.env.SAAS_KIT_LICENSE_KEY || "";
  const envLocalPath = path.join(process.cwd(), ".env.local");
  if (!licenseKey && fs.existsSync(envLocalPath)) {
    const envMatch = fs
      .readFileSync(envLocalPath, "utf-8")
      .match(/SAAS_KIT_LICENSE_KEY="?([^"\n]+)"?/);
    if (envMatch) {
      licenseKey = envMatch[1].trim();
    }
  }

  if (licenseKey) {
    console.log(
      `  ${c.green}✓${c.reset} Commercial License: ${c.bold}${licenseKey.slice(0, 8)}...${c.reset} (Registered)`
    );
  } else {
    console.log(
      `  ${c.dim}ℹ️ Running in Open-Source mode. Commercial licenses unlock priority upstream modules.${c.reset}`
    );
  }

  // 4. Fetch from Upstream
  console.log(`\n  📡 Fetching latest updates from upstream...`);
  try {
    run("git fetch upstream", false);
    console.log(`  ${c.green}✓${c.reset} Upstream changes fetched.`);
  } catch {
    console.error(
      `${c.red}❌ Failed to fetch from upstream. Check your internet connection or repository access.${c.reset}`
    );
    process.exit(1);
  }

  // 4. Compare commits
  const currentBranch = run("git rev-parse --abbrev-ref HEAD") || "main";
  const newCommitsCountStr = run(`git rev-list --count HEAD..upstream/main`);
  const newCommitsCount = parseInt(newCommitsCountStr, 10) || 0;

  if (newCommitsCount === 0) {
    console.log(`
  ${c.green}${c.bold}✨ All caught up!${c.reset}
  Your branch (${c.bold}${currentBranch}${c.reset}) is already 100% up to date with official SAAS-Kit releases.
`);
    process.exit(0);
  }

  console.log(`
  ${c.cyan}${c.bold}📦 Found ${newCommitsCount} new upstream commit(s)!${c.reset}
`);

  // Display recent upstream commits
  const commitLog = run(`git log HEAD..upstream/main --oneline -n 6`);
  console.log(`${c.dim}${commitLog}${c.reset}\n`);

  // Show summary of modified files
  const statSummary = run(`git diff --stat HEAD..upstream/main`);
  const lines = statSummary.split("\n");
  const lastLine = lines[lines.length - 1] || "";
  console.log(`  ${c.magenta}Files changed:${c.reset} ${lastLine.trim()}\n`);

  if (checkOnly) {
    console.log(`  Check complete. Updates are available.`);
    process.exit(0);
  }

  // 5. Prompt to Merge or create Safe Branch
  const rl = readline.createInterface({ input, output });

  try {
    let shouldProceed = autoYes;

    if (!shouldProceed) {
      const answer = await rl.question(
        `  ${c.bold}Would you like to sync these updates into a safe branch? (Y/n)${c.reset}: `
      );
      const trimmed = answer.trim().toLowerCase();
      shouldProceed = trimmed === "" || trimmed === "y" || trimmed === "yes";
    }

    if (!shouldProceed) {
      console.log(
        `\n  ${c.dim}No changes made. You can sync anytime with: npm run sync:upstream${c.reset}\n`
      );
      process.exit(0);
    }

    // Generate safe timestamped branch
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 16);
    const safeBranch = `upstream-sync-${timestamp}`;

    console.log(`\n  🌿 Creating safe isolated branch: ${c.bold}${safeBranch}${c.reset}...`);
    run(`git checkout -b ${safeBranch}`, false);

    console.log(`  🔀 Merging upstream/main into ${c.bold}${safeBranch}${c.reset}...`);
    try {
      run(`git merge upstream/main`, false);
      console.log(`
${c.green}${c.bold}================================================================${c.reset}
  🎉  ${c.bold}Successfully Merged Upstream Updates!${c.reset}
${c.green}================================================================${c.reset}

  Next Steps:
  1. Verify everything builds cleanly:
     ${c.bold}npm run check${c.reset}
     ${c.bold}npm run test:e2e${c.reset}
  2. If all tests pass, merge this branch into your main branch:
     ${c.bold}git checkout ${currentBranch}${c.reset}
     ${c.bold}git merge ${safeBranch}${c.reset}
     ${c.bold}git push origin ${currentBranch}${c.reset}
`);
    } catch {
      console.log(`
${c.yellow}${c.bold}⚠️ Merge conflict detected!${c.reset}
  Don't worry! Your main branch (${currentBranch}) is untouched and safe.
  Resolve the conflicting files in VS Code, then run:
    ${c.bold}git add . && git commit -m "merge: sync upstream updates"${c.reset}
`);
    }
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error("An unexpected error occurred:", err);
  process.exit(1);
});
