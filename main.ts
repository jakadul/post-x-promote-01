// Post-x-promote entry (Node 22, standard library only).
//
// The entry is the X post itself, not this program: the house reads the post's
// replies, reposts and quotes through FxTwitter and ranks by their sum. This
// program therefore has one job, done strictly: publish POST.json to /output so
// the gate can look up which post to read.
//
// It refuses a placeholder or a malformed address with a non-zero exit instead
// of writing a file the house would reject, because a refused entry is never
// graded however good the post is.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(BOT_DIR, 'POST.json');

const raw = readFileSync(source, 'utf8');

let doc: unknown;
try {
  doc = JSON.parse(raw);
} catch (err) {
  console.error(`POST.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

// The gate reads an X post's address out of POST.json: x.com or twitter.com,
// optionally www. or mobile., or the /i/web/status/<id> form. Anything else is
// invalid, and an invalid entry scores 0 whatever the post did.
const url = (doc as { url?: unknown })?.url;
const SHAPE =
  /^https?:\/\/(?:www\.|mobile\.)?(?:x|twitter)\.com\/(?:\w+\/status|i\/web\/status)\/(\d+)(?:[?#].*)?$/;
if (typeof url !== 'string' || !SHAPE.test(url)) {
  console.error(
    `POST.json must hold {"url": "https://x.com/<handle>/status/<id>"}; got ${JSON.stringify(url)}. ` +
      'Replace the placeholder with the real post before entering.',
  );
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const target = join(OUTPUT_DIR, 'POST.json');
copyFileSync(source, target);

// Echo the address so a local run shows which post the gate will read.
const written = JSON.parse(readFileSync(target, 'utf8')) as { url: string };
console.log(`published POST.json for ${written.url}`);
