import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';

// ── Configuration ──────────────────────────────────────────────
const NOTION_API_KEY = process.env.NOTION_API_KEY;

// Notion page ID → _data file mapping
// Each Notion page should contain a code block with the raw YAML content.
const PAGES = [
  {
    pageId: process.env.NOTION_PAGE_PUB_INTL,
    file: 'publist_international.yml',
    label: 'International Publications',
  },
  {
    pageId: process.env.NOTION_PAGE_PUB_NATIONAL,
    file: 'publist_national.yml',
    label: 'National Publications',
  },
  {
    pageId: process.env.NOTION_PAGE_MEMBERS,
    file: 'member_all.yml',
    label: 'Members',
  },
];

if (!NOTION_API_KEY) {
  console.error('Missing NOTION_API_KEY');
  process.exit(1);
}

for (const p of PAGES) {
  if (!p.pageId) {
    console.error(`Missing page ID env var for: ${p.label}`);
    process.exit(1);
  }
}

const notion = new Client({ auth: NOTION_API_KEY });
const DATA_DIR = path.resolve(process.cwd(), '_data');

// ── Fetch all blocks from a Notion page ────────────────────────

async function fetchBlocks(blockId) {
  const blocks = [];
  let cursor;
  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      ...(cursor && { start_cursor: cursor }),
    });
    blocks.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return blocks;
}

// ── Extract YAML text from page blocks ─────────────────────────
// Looks for code blocks and concatenates their plain text content.
// If no code block found, falls back to all paragraph/text content.

function extractYaml(blocks) {
  // First: try code blocks (preferred — YAML pasted in a code block)
  const codeTexts = blocks
    .filter(b => b.type === 'code')
    .map(b => b.code.rich_text.map(t => t.plain_text).join(''));

  if (codeTexts.length > 0) {
    return codeTexts.join('\n');
  }

  // Fallback: concatenate all paragraph text
  const paraTexts = blocks
    .filter(b => b.type === 'paragraph')
    .map(b => b.paragraph.rich_text.map(t => t.plain_text).join(''));

  return paraTexts.join('\n');
}

// ── Main ───────────────────────────────────────────────────────

async function main() {
  const changed = [];

  for (const { pageId, file, label } of PAGES) {
    console.log(`Fetching: ${label} (${pageId})`);
    const blocks = await fetchBlocks(pageId);
    const yamlContent = extractYaml(blocks);

    if (!yamlContent.trim()) {
      console.warn(`  Warning: no content found for ${label}, skipping`);
      continue;
    }

    const filePath = path.join(DATA_DIR, file);
    const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';

    if (existing.trim() !== yamlContent.trim()) {
      fs.writeFileSync(filePath, yamlContent + '\n', 'utf8');
      console.log(`  Updated: ${label}`);
      changed.push(label);
    } else {
      console.log(`  No changes`);
    }
  }

  // Output for GitHub Actions
  const outputFile = process.env.GITHUB_OUTPUT;
  if (changed.length > 0) {
    console.log(`\nChanged: ${changed.join(', ')}`);
    if (outputFile) {
      fs.appendFileSync(outputFile, `changed=true\n`);
      fs.appendFileSync(outputFile, `changes=${changed.join(', ')}\n`);
    }
  } else {
    console.log('\nNo changes detected.');
    if (outputFile) {
      fs.appendFileSync(outputFile, `changed=false\n`);
    }
  }
}

main().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
