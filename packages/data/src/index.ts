import fs from "node:fs";
import path from "node:path";
import { getEmojibase, getVersions } from "./get-emojibase";
import { build } from "./build";

const dist = path.resolve(__dirname, "..", "dist");

fs.rmSync(dist, {
  recursive: true,
  force: true,
});
fs.mkdirSync(dist);

const getJsonPath = (version: number): string =>
  path.resolve(dist, `${version}.json`);

for (const version of getVersions()) {
  const emojibase = getEmojibase(version);
  const data = build(emojibase);

  fs.writeFileSync(getJsonPath(version), JSON.stringify(data));
}
