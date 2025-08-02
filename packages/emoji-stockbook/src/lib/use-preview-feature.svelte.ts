import type { Emoji } from "@/types";
import { scoped, ScopedValue } from "./custom-element-scoped-value.js";

export class PreviewFeature extends ScopedValue {
  private focused = $state<Emoji | null>(null);
  private hovered = $state<Emoji | null>(null);
  readonly preview = $derived.by(() => this.hovered ?? this.focused ?? null);

  notifyFocus(emoji: Emoji | null): void {
    this.focused = emoji;
  }

  notifyHover(emoji: Emoji | null): void {
    this.hovered = emoji;
  }
}

export const usePreviewFeature = scoped(PreviewFeature);
