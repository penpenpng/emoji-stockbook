import type { Emoji } from "../../types";

export interface IPreviewFeature {
  readonly preview: Emoji | null;
  notifyFocus(emoji: Emoji | null): void;
  notifyHover(emoji: Emoji | null): void;
}

export class PreviewFeature implements IPreviewFeature {
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
