// main.ts — deliver the approved artwork to the harness output folder.
//
// The judge only ever sees what lands in $MAKEFUN_OUTPUT_DIR, so this
// little program has exactly one job: take entry.png from beside this
// file and place a copy at $MAKEFUN_OUTPUT_DIR/entry.png, creating the
// folder first when it is not there yet.
//
// How it behaves:
//   * the artwork is read with the promise-based fs API and written out
//     again, so the copy is a plain byte-for-byte duplicate;
//   * a missing MAKEFUN_OUTPUT_DIR is treated as "/output";
//   * on success it prints where the copy went and how big it is, then
//     leaves with code 0;
//   * when the artwork is missing, or the write fails for any reason,
//     it prints a plain error on stderr and leaves with code 1.
//
// Node standard library only — no dependencies, no network, nothing
// outside this folder and the output folder.

import { mkdir, readFile, stat, writeFile } from "node:fs/promises";

const FALLBACK_FOLDER = "/output";
const ARTWORK_FILE = "entry.png";

async function deliverArtwork(): Promise<number> {
  const artworkUrl = new URL(`./${ARTWORK_FILE}`, import.meta.url);
  const outFolder = process.env.MAKEFUN_OUTPUT_DIR ?? FALLBACK_FOLDER;
  const outPath = `${outFolder}/${ARTWORK_FILE}`;

  let artworkBytes: Buffer;
  try {
    artworkBytes = await readFile(artworkUrl);
  } catch {
    throw new Error(`artwork not found at ${artworkUrl.pathname}`);
  }

  await mkdir(outFolder, { recursive: true });
  await writeFile(outPath, artworkBytes);
  const written = await stat(outPath);
  if (written.size !== artworkBytes.byteLength) {
    throw new Error(
      `copy incomplete: wrote ${written.size} of ${artworkBytes.byteLength} bytes`,
    );
  }
  return artworkBytes.byteLength;
}

deliverArtwork()
  .then((bytes) => {
    const outFolder = process.env.MAKEFUN_OUTPUT_DIR ?? FALLBACK_FOLDER;
    console.log(`Delivered ${outFolder}/${ARTWORK_FILE} (${bytes} bytes).`);
  })
  .catch((error: unknown) => {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(`cannot deliver artwork: ${detail}`);
    process.exit(1);
  });
