// Build-time generator for the Open Graph image.
//
// The dynamic /opengraph-image route was 500-erroring on Cloudflare Workers
// (interopDefault failure for the edge-runtime route under OpenNext). The
// site has no need for request-time generation; the image is identical for
// every page. So we pre-render once at build time as public/og.png and
// reference it from metadata.
//
// Run as part of cf:build:
//   node scripts/generate-og-image.mjs
//
// Output: public/og.png (1200x630, ~30-50 KB).

import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url)) + "/..";
const OUT_PATH = `${ROOT}/public/og.png`;

const W = 1200;
const H = 630;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#F6EFE4"/>

  <!-- Logo: rising sun + child silhouette -->
  <g transform="translate(96, 80)">
    <svg width="88" height="70" viewBox="0 0 200 160">
      <circle cx="100" cy="90" r="52" fill="#E8873C"/>
      <circle cx="100" cy="78" r="10" fill="#1F3A44"/>
      <path d="M 90 88 Q 90 118 84 138 L 116 138 Q 110 118 110 88 Z" fill="#1F3A44"/>
      <rect x="20" y="136" width="160" height="5" rx="2.5" fill="#1F3A44"/>
    </svg>
    <text x="120" y="34" font-family="ui-serif, Georgia, serif" font-size="36" font-weight="600" fill="#1F3A44" letter-spacing="-0.7">Kinder Horizon</text>
    <text x="120" y="60" font-family="ui-sans-serif, system-ui, sans-serif" font-size="14" font-weight="500" letter-spacing="2.5" fill="#2C4A55">FOUNDATION</text>
  </g>

  <!-- Title -->
  <g transform="translate(96, 290)">
    <text x="0" y="0" font-family="ui-serif, Georgia, serif" font-size="62" font-weight="600" fill="#1F3A44" letter-spacing="-1.5">
      <tspan x="0" dy="0">Communication is a human right,</tspan>
      <tspan x="0" dy="78" font-style="italic" font-weight="400" fill="#2C4A55">not a premium feature.</tspan>
    </text>
    <text x="0" y="200" font-family="ui-sans-serif, system-ui, sans-serif" font-size="24" fill="#2C4A55">
      Free, open-source AAC for non-verbal children. Privacy-first. Offline. RTL-native.
    </text>
  </g>

  <!-- Footer -->
  <g transform="translate(0, ${H - 60})">
    <text x="96" y="0" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" font-weight="500" letter-spacing="2.9" fill="#4F8A99">KINDERHORIZON.ORG</text>
    <text x="${W - 96}" y="0" text-anchor="end" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" font-weight="500" letter-spacing="2.9" fill="#4F8A99">BC SOCIETY S0085100</text>
  </g>
</svg>`;

mkdirSync(dirname(OUT_PATH), { recursive: true });

const buffer = await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, quality: 92 })
  .toBuffer();

writeFileSync(OUT_PATH, buffer);
console.log(`og.png written: ${buffer.length} bytes`);
