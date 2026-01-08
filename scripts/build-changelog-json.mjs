import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import "dotenv/config";

// ----------------------------------------------------
// CONFIG
// ----------------------------------------------------
const REPO = "hexswitch-studios/haven";
const TOKEN = process.env.GH_CHANGELOG_TOKEN;

const OUTPUT_FILE = path.join(process.cwd(), "static/changelog/releases.json");

// ----------------------------------------------------
// FETCH RELEASES
// ----------------------------------------------------
async function fetchReleases() {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/releases?per_page=100`,
    {
      headers: {
        Authorization: `token ${TOKEN}`,
        "User-Agent": "changelog-fetcher",
      },
    }
  );

  if (!res.ok) {
    console.error("GitHub API error:", await res.text());
    process.exit(1);
  }

  return res.json();
}

// ----------------------------------------------------
// PARSING HELPERS
// ----------------------------------------------------

// Extract bullet items or treat as a single block of text
function extractItems(block) {
  const lines = block
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const items = [];
  const bulletRegex = /^[-*+]\s+(.*)$/;

  for (let line of lines) {
    const match = line.match(bulletRegex);
    if (match) {
      items.push(match[1]);
    }
  }

  // If structured bullets found → return them
  if (items.length > 0) return items;

  // Otherwise treat entire block as a single item
  return [block];
}

// Parse the markdown body into structured sections
function parseReleaseBody(md) {
  if (!md) return [];

  const sectionRegex = /^##\s+(.*)$/gm;
  const matches = [...md.matchAll(sectionRegex)];

  // No headings at all → treat entire release as one unlabelled block
  if (matches.length === 0) {
    return [
      {
        title: null,
        items: extractItems(md),
      },
    ];
  }

  const sections = [];

  for (let i = 0; i < matches.length; i++) {
    const title = matches[i][1].trim();
    const start = matches[i].index + matches[i][0].length;

    const end = i + 1 < matches.length ? matches[i + 1].index : md.length;

    const content = md.slice(start, end).trim();

    sections.push({
      title,
      items: extractItems(content),
    });
  }

  return sections;
}

// ----------------------------------------------------
// MAIN BUILD SCRIPT
// ----------------------------------------------------
async function build() {
  if (!TOKEN) {
    console.error("Error: Missing GITHUB_TOKEN environment variable.");
    process.exit(1);
  }

  console.log("Fetching releases from GitHub...");
  const releases = await fetchReleases();

  // Sort newest → oldest
  releases.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  const output = releases.map((r) => ({
    id: r.id,
    tag: r.tag_name,
    name: r.name,
    created_at: r.created_at,
    published_at: r.published_at,
    url: r.html_url,
    sections: parseReleaseBody(r.body),
  }));

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });

  // Write JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`Changelog generated → ${OUTPUT_FILE}`);
}

build();
