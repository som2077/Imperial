#!/usr/bin/env node

/**
 * SaaS Starter Kit - Project Rebranding & Rename CLI
 *
 * Quickly customizes and rebrands the starter kit across:
 * - package.json (name, description)
 * - src/config/site.ts (name, shortName, description, mailSupport, creator, socials)
 * - src/lib/i18n/dictionaries/*.ts (en, es, de, fr, hi appName)
 * - README.md (project headline)
 *
 * Usage:
 *   Interactive:
 *     npm run rename
 *   Non-interactive (flags):
 *     npm run rename -- --name "Apex AI" --short "Apex" --slug "apex-ai" -y
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

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed: Record<string, string | boolean> = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "-y" || arg === "--yes" || arg === "--non-interactive") {
      parsed.yes = true;
    } else if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith("-")) {
        parsed[key] = next;
        i++;
      } else {
        parsed[key] = true;
      }
    }
  }

  return parsed;
}

async function main() {
  const rootDir = process.cwd();
  const pkgPath = path.join(rootDir, "package.json");
  const siteConfigPath = path.join(rootDir, "src", "config", "site.ts");
  const readmePath = path.join(rootDir, "README.md");
  const i18nDir = path.join(rootDir, "src", "lib", "i18n", "dictionaries");

  if (!fs.existsSync(pkgPath) || !fs.existsSync(siteConfigPath)) {
    console.error(
      `${c.yellow}❌ Error: Must be executed in the root directory of the SaaS starter kit.${c.reset}`
    );
    process.exit(1);
  }

  // Read current package.json
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  let siteContent = fs.readFileSync(siteConfigPath, "utf-8");

  // Extract current values from site.ts
  const currentNameMatch = siteContent.match(/name:\s*"([^"]*)"/);
  const currentShortMatch = siteContent.match(/shortName:\s*"([^"]*)"/);
  const currentMailMatch = siteContent.match(/mailSupport:\s*"([^"]*)"/);
  const currentCreatorNameMatch = siteContent.match(/creator:\s*\{[\s\S]*?name:\s*"([^"]*)"/);
  const currentCreatorTwitterMatch = siteContent.match(/creator:\s*\{[\s\S]*?twitter:\s*"([^"]*)"/);

  const defaultName = currentNameMatch ? currentNameMatch[1] : "SaaS Starter Kit";
  const defaultShort = currentShortMatch ? currentShortMatch[1] : "SaaS Starter";
  const defaultSlug = pkgJson.name || slugify(defaultName);
  const defaultDesc =
    pkgJson.description ||
    "The ultra-maintainable, production-ready full-stack boilerplate built with Next.js 16, Supabase, Drizzle ORM, Lemon Squeezy billing, and Vercel AI SDK.";
  const defaultEmail = currentMailMatch ? currentMailMatch[1] : "support@example.com";
  const defaultCreator = currentCreatorNameMatch ? currentCreatorNameMatch[1] : "SaaS Builder";
  const defaultTwitter = currentCreatorTwitterMatch
    ? currentCreatorTwitterMatch[1]
    : "@saas_builder";

  const cliArgs = parseArgs();
  const isAutoYes = Boolean(cliArgs.yes);

  console.log(`
${c.cyan}${c.bold}================================================================${c.reset}
  🚀  ${c.bold}SaaS Starter Kit - Project Rebranding & Rename Tool${c.reset}
${c.cyan}================================================================${c.reset}
  Easily customize your project name, branding, and metadata 
  across configuration, i18n dictionaries, and package.json.
`);

  let name = (cliArgs.name as string) || "";
  let shortName = (cliArgs.short as string) || "";
  let slug = (cliArgs.slug as string) || "";
  let description = (cliArgs.desc as string) || (cliArgs.description as string) || "";
  let email = (cliArgs.email as string) || "";
  let creator = (cliArgs.creator as string) || "";
  let twitter = (cliArgs.twitter as string) || "";

  // If interactive mode (TTY available and not fully supplied via CLI args)
  if (!name && process.stdin.isTTY && !isAutoYes) {
    const rl = readline.createInterface({ input, output });

    try {
      const ask = async (promptText: string, defaultVal: string) => {
        const answer = await rl.question(
          `${c.bold}${promptText}${c.reset} ${c.dim}[${defaultVal}]${c.reset}: `
        );
        return answer.trim() ? answer.trim() : defaultVal;
      };

      name = await ask("1. Project Full Name", defaultName);
      shortName = await ask("2. Brand / Short Name", name.split(" ")[0] || defaultShort);
      slug = await ask("3. Package Slug (kebab-case)", slugify(name) || defaultSlug);
      description = await ask("4. Short Description", defaultDesc);
      email = await ask("5. Support Email", defaultEmail);
      creator = await ask("6. Creator / Company Name", defaultCreator);
      twitter = await ask("7. Creator Twitter / X Handle", defaultTwitter);

      console.log(`
${c.cyan}----------------------------------------------------------------${c.reset}
${c.bold}Review New Project Configuration:${c.reset}
  ${c.dim}Full Name:     ${c.reset}${c.green}${name}${c.reset}
  ${c.dim}Short Name:    ${c.reset}${c.green}${shortName}${c.reset}
  ${c.dim}Package Slug:  ${c.reset}${c.green}${slug}${c.reset}
  ${c.dim}Description:   ${c.reset}${c.dim}${description}${c.reset}
  ${c.dim}Support Email: ${c.reset}${c.cyan}${email}${c.reset}
  ${c.dim}Creator:       ${c.reset}${c.magenta}${creator}${c.reset} (${twitter})
${c.cyan}----------------------------------------------------------------${c.reset}
`);

      const confirm = await rl.question(`${c.bold}Apply these changes now? (Y/n)${c.reset}: `);
      if (confirm.trim().toLowerCase() === "n" || confirm.trim().toLowerCase() === "no") {
        console.log(`\n${c.yellow}⚠️  Operation cancelled. No files were modified.${c.reset}\n`);
        rl.close();
        return;
      }
    } finally {
      rl.close();
    }
  } else {
    // Fill in defaults for missing CLI flags
    name = name || defaultName;
    shortName = shortName || name.split(" ")[0] || defaultShort;
    slug = slug || slugify(name) || defaultSlug;
    description = description || defaultDesc;
    email = email || defaultEmail;
    creator = creator || defaultCreator;
    twitter = twitter || defaultTwitter;
  }

  console.log(`\n${c.blue}⚡ Updating configuration files...${c.reset}`);
  const modifiedFiles: string[] = [];

  // 1. Update package.json
  pkgJson.name = slug;
  pkgJson.description = description;
  fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2) + "\n", "utf-8");
  modifiedFiles.push("package.json");

  // 2. Update src/config/site.ts
  siteContent = siteContent.replace(/name:\s*"[^"]*",/, `name: ${JSON.stringify(name)},`);
  siteContent = siteContent.replace(
    /shortName:\s*"[^"]*",/,
    `shortName: ${JSON.stringify(shortName)},`
  );
  siteContent = siteContent.replace(
    /description:\s*[\r\n\s]*"[^"]*",/,
    `description:\n    ${JSON.stringify(description)},`
  );
  siteContent = siteContent.replace(
    /mailSupport:\s*"[^"]*",/,
    `mailSupport: ${JSON.stringify(email)},`
  );

  // Update creator object
  siteContent = siteContent.replace(
    /creator:\s*\{[\s\S]*?name:\s*"[^"]*",[\s\S]*?twitter:\s*"[^"]*",[\s\S]*?\}/,
    `creator: {\n    name: ${JSON.stringify(creator)},\n    twitter: ${JSON.stringify(twitter)},\n  }`
  );

  // Update socials.twitter if handle is provided
  if (twitter) {
    const twitterHandle = twitter.replace(/^@/, "");
    siteContent = siteContent.replace(
      /twitter:\s*"https:\/\/x\.com\/[^"]*",/,
      `twitter: "https://x.com/${twitterHandle}",`
    );
  }

  fs.writeFileSync(siteConfigPath, siteContent, "utf-8");
  modifiedFiles.push("src/config/site.ts");

  // 3. Update i18n dictionaries (en, es, de, fr, hi)
  const langFiles = ["en.ts", "es.ts", "de.ts", "fr.ts", "hi.ts"];
  for (const langFile of langFiles) {
    const langFilePath = path.join(i18nDir, langFile);
    if (fs.existsSync(langFilePath)) {
      let langContent = fs.readFileSync(langFilePath, "utf-8");
      langContent = langContent.replace(/appName:\s*"[^"]*"/, `appName: ${JSON.stringify(name)}`);
      fs.writeFileSync(langFilePath, langContent, "utf-8");
      modifiedFiles.push(`src/lib/i18n/dictionaries/${langFile}`);
    }
  }

  // 4. Update README.md top title
  if (fs.existsSync(readmePath)) {
    let readmeContent = fs.readFileSync(readmePath, "utf-8");
    readmeContent = readmeContent.replace(/^#\s+.*/m, `# ${name} 🚀`);
    fs.writeFileSync(readmePath, readmeContent, "utf-8");
    modifiedFiles.push("README.md");
  }

  // 5. Format modified files with Prettier
  try {
    execSync(`npx prettier --write ${modifiedFiles.map((f) => `"${f}"`).join(" ")}`, {
      stdio: "pipe",
    });
  } catch {
    // Non-fatal if prettier formatting fails in background
  }

  console.log(`
${c.green}${c.bold}🎉 Project successfully rebranded to "${name}"!${c.reset}

${c.bold}Updated files:${c.reset}
${modifiedFiles.map((f) => `  ${c.dim}✓${c.reset} ${c.cyan}${f}${c.reset}`).join("\n")}

${c.bold}Next Steps:${c.reset}
  1. Verify changes: ${c.dim}git diff${c.reset}
  2. Start your dev server: ${c.dim}npm run dev${c.reset}
  3. Run full project checks: ${c.dim}npm run check${c.reset}
`);
}

main().catch((err) => {
  console.error("\n❌ Unexpected error running rename script:", err);
  process.exit(1);
});
