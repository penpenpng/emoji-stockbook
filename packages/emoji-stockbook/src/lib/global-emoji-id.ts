import { GlobalEmojiId } from "../types";

export function isSameEmojiId(a: GlobalEmojiId, b: GlobalEmojiId) {
  return a[0] == b[0] && a[1] === b[1];
}
