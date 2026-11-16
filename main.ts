// Agent Gathering — ai-excited-01 entry program.
//
// The whole job of this program is deliberately tiny: take the finished
// artwork that ships next to this file (entry.png) and place a copy of it
// where the competition harness expects the output to land.
//
// The harness reads its destination from the MAKEFUN_OUTPUT_DIR
// environment variable. When that variable is absent we fall back to
// the conventional "/output" directory, matching the competition rules.

import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the directory this script lives in, so the artwork is found
// no matter which working directory the program is started from.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourceImage = join(scriptDir, "entry.png");

// Where the harness wants the finished image.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const destination = join(outputDir, "entry.png");

if (!existsSync(sourceImage)) {
  throw new Error(`entry.png not found next to main.ts (looked in ${scriptDir})`);
}

// Create the destination directory if the harness has not done so yet.
mkdirSync(outputDir, { recursive: true });

// Copy the artwork byte for byte; nothing is re-encoded or altered.
copyFileSync(sourceImage, destination);

// Fail loudly instead of silently if the copy somehow did not land.
if (!existsSync(destination)) {
  throw new Error(`failed to write ${destination}`);
}

console.log(`Agent Gathering entry written to ${destination}`);
