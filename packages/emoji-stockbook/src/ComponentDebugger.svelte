<script lang="ts">
  import "./EmojiStockbookElement.svelte";
  import { stockbookData } from "@emoji-stockbook/data";
  import EmojiStockbook from "./EmojiStockbookElement.svelte";
  import { onMount } from "svelte";

  let visible = $state(false);
  let col = $state(8);

  let stockbook = $state<EmojiStockbook & HTMLElement>();

  onMount(() => {
    stockbook.addEventListener("input", console.log);
    stockbook.addEventListener("show", console.log);
    stockbook.addEventListener("hide", console.log);
    stockbook.addEventListener("initialized", () => {
      visible = true;
      stockbook.setEmojiDataset(stockbookData);
      stockbook.show();
    });
  });
</script>

<main>
  <button onclick={() => stockbook.show()}>show</button>
  <button onclick={() => stockbook.hide()}>hide</button>
  <button onclick={() => stockbook.setEmojiDataset(stockbookData)}
    >set data</button
  >
  <button onclick={() => stockbook.setEmojiDataset([])}>unset data</button>
  <button onclick={() => (col = 4)}>col 4</button>
  <button onclick={() => (col = 6)}>col 6</button>
  <button onclick={() => (col = 8)}>col 8</button>

  <emoji-stockbook bind:this={stockbook} {col}></emoji-stockbook>
</main>
