import emojibase from "emojibase-data/en/data.json";
import versions from "emojibase-data/versions/emoji.json";
import type { Emoji as EmojibaseEmoji } from "emojibase";
import { UArray, UFunc } from "./utils";

export const getEmojibase = (version: number): EmojibaseEmoji[] =>
  UArray.mapfilter(emojibase, (emoji, skip) => {
    if (emoji.version > version) {
      return skip;
    }

    return {
      ...emoji,
      skins: UFunc.ifexist(emoji.skins, (skins) =>
        skins.filter((skin) => skin.version <= version),
      ),
    };
  });

export const getVersions = (): number[] =>
  Object.keys(versions).map((ver) => Number(ver));
