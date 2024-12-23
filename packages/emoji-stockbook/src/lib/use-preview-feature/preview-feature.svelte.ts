import type { Emoji } from "../../types";

export interface IPreviewFeature {
  readonly preview: Emoji | null;
  showPreview(emoji: Emoji): void;
  hidePreview(): void;
}

class State {
  preview = $state<Emoji | null>(null);
}

export class PreviewFeature implements IPreviewFeature {
  state = new State();

  readonly preview = $derived.by(() => this.state.preview);

  showPreview(emoji: Emoji): void {
    this.state.preview = emoji;
  }

  hidePreview(): void {
    this.state.preview = null;
  }
}
