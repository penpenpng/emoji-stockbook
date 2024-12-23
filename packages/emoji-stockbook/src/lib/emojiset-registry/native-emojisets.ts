import type { NativeEmojisetInput } from "../../types";

import emoji16 from "@emoji-stockbook/data/16.json";
import emoji1 from "@emoji-stockbook/data/1.json";

// これを使って native emoji のデータを読み込む
// この実装だと初回表示時に遅いのが難点だが addEmojiset(key, emojisetPromise) を渡してユーザが上書きすればいい
//    I/F が直感的ではないのでラッパー作る preloadNativeEmoji(key: string): void;
// const createNativeEmojisetGetter =
//   (key: string): ValueOrGetter<Emojiset> =>
//   async () => {
//     const cache = await getEmojisetFromIndexedDB(key);
//     if (cache) {
//       return cache;
//     }

//     const res = await fetch(emojisetUrl(key));
//     const emojiset = await res.json();

//     cacheEmojisetToIndexedDB(key, emojiset);

//     return emojiset;
//   };

// TODO: json の形式が確定したら publish して、ここを CDN を参照する形に直す。キャッシュも実装する (参考実装: 上)
export const nativeEmojiset = async (
  version: "1" | "16",
): Promise<NativeEmojisetInput> => {
  const categories = version === "1" ? emoji1 : emoji16;

  return {
    kind: "native",
    categories,
  };
};
