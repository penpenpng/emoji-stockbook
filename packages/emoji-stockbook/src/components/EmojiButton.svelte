<script lang="ts">
  import { useCustomElementEventDispatcher } from "../lib/use-custom-element-event-dispatcher";
  import { useShortcutFeature } from "../lib/use-shortcut-feature";
  import { makeEmojiOutput } from "../lib/make-emoji-output";
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

  const dispatch = useCustomElementEventDispatcher();
  const shortcutFeature = useShortcutFeature();

  const onclick = () => {
    const output = makeEmojiOutput(emoji);
    dispatch("pick", output);
    shortcutFeature.updateHistory(output);
  };

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
</script>

<button {onclick} {onkeydown}>
  {#if emoji.kind === "native"}
    <!-- native emoji -->
    {emoji.char}
  {:else}
    <!-- custom emoji -->
    <img alt={emoji.alt ?? emoji.shortcode} src={emoji.src} />
  {/if}
</button>

<style>
  /* Reset CSS */
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    /* outline: none; */ /* For a11y reason */
    padding: 0;
    appearance: none;
  }

  /* Styles */
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
  }
  button:hover {
    background-color: rgb(223, 223, 223);
  }
  button:active {
    background-color: rgb(204, 204, 204);
  }
</style>
