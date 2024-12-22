import fs from "node:fs";
import path from "node:path";
import { getEmojibase, getVersions } from "./get-emojibase";
import { build } from "./build";
import { emojiJsonTypeDef } from "./types";

const dist = path.resolve(__dirname, "..", "dist");

fs.rmSync(dist, {
  recursive: true,
  force: true,
});
fs.mkdirSync(dist);

const file = (name: string): string => path.resolve(dist, name);

for (const version of getVersions()) {
  const emojibase = getEmojibase(version);
  const data = build(emojibase);

  fs.writeFileSync(file(`${version}.json`), JSON.stringify(data));
  fs.writeFileSync(file(`${version}.json.d.ts`), emojiJsonTypeDef);
}
