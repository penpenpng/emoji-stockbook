<script lang="ts">
  import { makeEmojiOutput } from "@/lib/make-emoji-output";
  import { useCustomElementEventDispatcher } from "@/lib/use-custom-element-event-dispatcher";
  import { usePreviewFeature } from "@/lib/use-preview-feature";
  import { useShortcutFeature } from "@/lib/use-shortcut-feature";
  import type { Emoji } from "@/types";
  import AtomEmoji from "./AtomEmoji.svelte";

  const {
    emoji,
    ...callbacks
  }: {
    emoji: Emoji;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowRight?: () => void;
    onArrowLeft?: () => void;
  } = $props();

  const shortcutFeature = useShortcutFeature();
  const previewFeature = usePreviewFeature();
  const dispatch = useCustomElementEventDispatcher();

  const onkeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        callbacks.onArrowUp?.();
        break;
      case "ArrowDown":
        callbacks.onArrowDown?.();
        break;
      case "ArrowRight":
        callbacks.onArrowRight?.();
        break;
      case "ArrowLeft":
        callbacks.onArrowLeft?.();
        break;
      default:
        return;
    }

    event.preventDefault();
  };

  const onclick = () => {
    const output = makeEmojiOutput(emoji);
    dispatch("pick", output);
    shortcutFeature.updateHistory(output);
  };
</script>

<button
  {onclick}
  {onkeydown}
  onfocus={() => previewFeature.notifyFocus(emoji)}
  onblur={() => previewFeature.notifyFocus(null)}
  onmouseenter={() => previewFeature.notifyHover(emoji)}
>
  <AtomEmoji {emoji} />
</button>

<style>
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 20px;

    --emoji-size: var(--cell-emoji-size);
  }

  button:hover {
    background-color: rgb(223 223 223);
  }

  button:active {
    background-color: rgb(204 204 204);
  }
</style>
