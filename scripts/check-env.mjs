#!/usr/bin/env node

import fs from "fs";
import path from "path";

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "DATABASE_URL",
  "DIRECT_URL",
];

const placeholders = [
  "[project-ref]",
  "[password]",
  "[YOUR-PASSWORD]",
  "[region]",
  "your-anon-key",
  "your-service-role-key",
  "sk-...",
];

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    console.error("❌ .env file not found. Copy .env.example to .env first.");
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, "utf8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function isPlaceholder(value) {
  if (!value?.trim()) return true;
  return placeholders.some((p) => value.includes(p));
}

const env = loadEnv();
let ok = true;

console.log("\nClinicFlow AI — environment check\n");

for (const key of required) {
  const value = env[key];
  if (isPlaceholder(value)) {
    console.log(`❌ ${key} — not set or still a placeholder`);
    ok = false;
  } else {
    console.log(`✅ ${key}`);
  }
}

const optional = ["SUPABASE_SERVICE_ROLE_KEY", "OPENAI_API_KEY"];
for (const key of optional) {
  const value = env[key];
  if (isPlaceholder(value)) {
    console.log(`⚠️  ${key} — optional for now (needed for intake/PDF/AI later)`);
  } else {
    console.log(`✅ ${key}`);
  }
}

console.log("");
if (ok) {
  console.log("All required variables look good. Next: npm run db:push\n");
  process.exit(0);
} else {
  console.log("Fix the items above in .env, then run: npm run setup:check\n");
  process.exit(1);
}
