/**
 * One-Line Office Jokes — entry program.
 *
 * The joke is built from named parts so the setup, the misunderstanding
 * and the punchline stay visible as separate ideas. What lands in
 * /output/entry.txt is exactly one line: no trailing newline, no extra
 * whitespace, nothing but the joke itself.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const SETUP = "The printer jammed on my resignation letter";
const MISREAD = "so HR thinks I'm deeply committed to the job";
const PUNCHLINE = "and the paper tray";

const GATE_MIN_CHARS = 1;
const GATE_MAX_CHARS = 199;

function buildJoke(): string {
  // The setup states an office mishap, the misread reframes it as loyalty,
  // and the punchline pulls the rug: the loyalty is to the paper tray.
  // The em dash is the hinge between the misread and the punchline.
  const joined = `${SETUP}, ${MISREAD} — ${PUNCHLINE}`;
  return `${joined}.`;
}

function checkGate(line: string): void {
  const length = [...line].length;
  if (length < GATE_MIN_CHARS || length > GATE_MAX_CHARS) {
    throw new Error(
      `entry is ${length} chars, gate wants ${GATE_MIN_CHARS}–${GATE_MAX_CHARS}`,
    );
  }
  if (line.trim() !== line) {
    throw new Error("entry has leading or trailing whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function outputPath(): string {
  const targetDir = process.env.OUTPUT_DIR ?? "/output";
  return join(targetDir, "entry.txt");
}

function main(): void {
  const line = buildJoke();
  checkGate(line);
  const path = outputPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, line, "utf8");
  console.log(`wrote ${[...line].length} chars to ${path}`);
}

main();
