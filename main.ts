// THE WORLD — Wednesday 18 November 2026.
// Copies the front-page image to /output/entry.png.
// Node 22, stdlib only. Deterministic: the output bytes are a plain copy
// of entry.png, so repeated runs are byte-identical.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const outDir = "/output";
const out = join(outDir, "entry.png");

if (!existsSync(src)) {
  console.error(`error: entry.png is missing — expected it next to main.ts in ${here}`);
  process.exit(1);
}

// The competition gate rejects images over 1 MiB, so fail loudly here
// instead of submitting an entry that can never be judged.
const MAX_BYTES = 1048576;
const size = statSync(src).size;
if (size > MAX_BYTES) {
  console.error(`error: entry.png is ${size} bytes, over the ${MAX_BYTES}-byte limit`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, out);
console.log(`wrote ${out}`);
