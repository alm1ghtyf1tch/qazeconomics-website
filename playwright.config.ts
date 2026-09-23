import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: { channel: "chromium" },
  },
  webServer: [
    {
      command: "npx tsx tests/fixtures/supabase-server.ts",
      url: "http://127.0.0.1:54329/health",
      reuseExistingServer: false,
    },
    {
      command: "npm run dev -- --hostname 127.0.0.1 --port 3100",
      url: "http://127.0.0.1:3100/admin/login",
      reuseExistingServer: false,
      timeout: 120000,
      env: {
        NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54329",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "fixture-publishable-key",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "",
      },
    },
  ],
});
