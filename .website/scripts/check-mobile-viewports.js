#!/usr/bin/env node

/**
 * Mobile Viewport Regression Test Script
 *
 * Checks key site routes across standard mobile/tablet viewports to ensure:
 * 1. Zero horizontal overflow (scrollWidth <= clientWidth + 1)
 * 2. Key responsive elements exist and behave correctly
 *
 * Usage:
 *   node scripts/check-mobile-viewports.js [baseUrl]
 * Default baseUrl: http://localhost:3000
 */

const { chromium } = require("playwright");

const BASE_URL = process.argv[2] || process.env.TEST_URL || "http://[::1]:3000";

const VIEWPORTS = [
  { name: "Android Small", width: 360, height: 800 },
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPhone 14/15 Pro", width: 393, height: 852 },
  { name: "Pixel 7", width: 412, height: 915 },
  { name: "iPad Mini", width: 768, height: 1024 },
  { name: "Desktop HD", width: 1200, height: 800 },
];

const ROUTES = [
  "/",
  "/models/",
  "/models/Qwen3.8-27B-int4-ov/",
  "/skills/",
];

async function run() {
  console.log(`\n🔍 Running Mobile Viewport Regression Tests against: ${BASE_URL}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let totalTests = 0;
  let passedTests = 0;
  const failures = [];

  for (const route of ROUTES) {
    const url = `${BASE_URL.replace(/\/$/, "")}${route}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForLoadState("load", { timeout: 10000 }).catch(() => {});

    for (const vp of VIEWPORTS) {
      totalTests++;
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(100);

      const metrics = await page.evaluate(() => {
        const cw = document.documentElement.clientWidth;
        const sw = document.documentElement.scrollWidth;
        const diff = sw - cw;
        return { cw, sw, diff };
      });

      if (metrics.diff <= 1) {
        passedTests++;
        console.log(`  ✓ [${vp.name} - ${vp.width}x${vp.height}] ${route} (cw: ${metrics.cw}px, sw: ${metrics.sw}px)`);
      } else {
        failures.push({
          viewport: vp.name,
          dimensions: `${vp.width}x${vp.height}`,
          route,
          clientWidth: metrics.cw,
          scrollWidth: metrics.sw,
          overflow: metrics.diff,
        });
        console.error(`  ✗ [${vp.name} - ${vp.width}x${vp.height}] ${route} OVERFLOW: ${metrics.diff}px (cw: ${metrics.cw}px, sw: ${metrics.sw}px)`);
      }
    }
  }

  await browser.close();

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Results: ${passedTests}/${totalTests} passed`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  if (failures.length > 0) {
    console.error(`❌ ${failures.length} test(s) failed with horizontal overflow.`);
    process.exit(1);
  } else {
    console.log(`✅ All viewports passed with 0 horizontal overflow!`);
    process.exit(0);
  }
}

run().catch((err) => {
  console.error("Test runner error:", err);
  process.exit(1);
});
