<script lang="ts">
  import "./EmojiStockbookElement.svelte";
  import { stockbookData } from "@emoji-stockbook/data";
  import EmojiStockbook from "./EmojiStockbookElement.svelte";
  import { onMount } from "svelte";

  let visible = $state(false);
  let stockbook = $state<EmojiStockbook>();

  onMount(() => {
    stockbook.addEventListener("input", console.log);
    stockbook.addEventListener("show", console.log);
    stockbook.addEventListener("hide", console.log);
  });
</script>

<main>
  <button onclick={() => stockbook.show()}>show</button>
  <button onclick={() => stockbook.hide()}>hide</button>
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
