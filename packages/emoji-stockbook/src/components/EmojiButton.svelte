<script lang="ts">
  import { useCustomElementEventDispatcher } from "../lib/use-custom-element-event-dispatcher";
  import { useCustomElementProperty } from "../lib/use-custom-element-property";
  import { useSkintoneFeature } from "../lib/use-skintone-feature";
  import type { Emoji } from "../types";

  const {
    emoji: nakedEmoji,
    ...callbacks
  }: {
    emoji: Emoji;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowRight?: () => void;
    onArrowLeft?: () => void;
  } = $props();

  const skintoneFeature = useSkintoneFeature();
  const rootProps = useCustomElementProperty();
  const dispatch = useCustomElementEventDispatcher();

  const emoji = $derived(skintoneFeature.applySkintone(nakedEmoji));

  const onclick = () => {
    dispatch("pick", emoji);
    rootProps.shortcut?.history.updateHistory(emoji.id);
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
  {#if "char" in emoji}
    <!-- native emoji -->
    {emoji.char}
  {:else}
    <!-- custom emoji -->
    <img alt={emoji.name ?? emoji.shortcode} src={emoji.src} />
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
