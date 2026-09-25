import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Snapshots the demo sources into JSON so the docs pages can show the exact
 * code that renders above them without reading the filesystem at request
 * time — the standalone server never ships the demo folder.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const demosDir = join(root, "apps/dashboard/app/demos");

const sources: Record<string, string> = {};

for (const file of readdirSync(demosDir).sort()) {
  if (!file.endsWith(".tsx")) continue;
  sources[file.replace(/\.tsx$/, "")] = readFileSync(
    join(demosDir, file),
    "utf8",
  ).trimEnd();
}

const output = join(root, "apps/dashboard/app/demos.generated.json");
writeFileSync(output, `${JSON.stringify(sources, null, 2)}\n`);
console.log(`demos: ${Object.keys(sources).length} sources -> ${output}`);
