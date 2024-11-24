<script lang="ts">
  import type { NormalizedEmoji } from "../types";
  import { getEmojiStockbookContext } from "../lib/emoji-stockbook.svelte";

  let { emoji }: { emoji: NormalizedEmoji } = $props();

  const stockbook = getEmojiStockbookContext();
</script>

<button onclick={() => stockbook.onClickEmojiButton(emoji)}>
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
