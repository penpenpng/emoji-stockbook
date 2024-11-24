<script lang="ts">
  import "./EmojiStockbookElement.svelte";
  import { stockbookData } from "@emoji-stockbook/data";
  import EmojiStockbook from "./EmojiStockbookElement.svelte";

  let visible = $state(false);
  let stockbook = $state<EmojiStockbook>();
</script>

<main>
  <button onclick={() => (visible = !visible)}
    >{visible ? "hide" : "show"}</button
  >
  <button onclick={() => stockbook.setEmojiDataset(stockbookData)}
    >set data</button
  >

  <emoji-stockbook bind:this={stockbook} {visible}></emoji-stockbook>
</main>

<style>
  :global(emoji-stockbook) {
    /* override css variables */
    --col: 6;
  }
</style>
