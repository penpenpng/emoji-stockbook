<script lang="ts">
  import { makeEmojiOutput } from "../lib/make-emoji-output";
  import { useCustomElementEventDispatcher } from "../lib/use-custom-element-event-dispatcher";
  import { usePreviewFeature } from "../lib/use-preview-feature";
  import { useShortcutFeature } from "../lib/use-shortcut-feature";
  import type { Emoji } from "../types";

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

  const showPreview = () => {
    previewFeature.showPreview(emoji);
  };

  const onclick = () => {
    const output = makeEmojiOutput(emoji);
    dispatch("pick", output);
    shortcutFeature.updateHistory(output);
  };
</script>

<button {onclick} {onkeydown} onfocus={showPreview} onmouseenter={showPreview}>
  {#if emoji.kind === "native"}
    <!-- native emoji -->
    {emoji.char}
  {:else}
    <!-- custom emoji -->
    <img alt={emoji.alt ?? emoji.shortcode} src={emoji.src} />
  {/if}
</button>

<style>
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
  }

  button:hover {
    background-color: rgb(223 223 223);
  }

  button:active {
    background-color: rgb(204 204 204);
  }
</style>
