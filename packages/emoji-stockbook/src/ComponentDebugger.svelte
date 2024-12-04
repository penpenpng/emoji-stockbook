<script lang="ts">
  import "./EmojiStockbookElement.svelte";
  import { stockbookData } from "@emoji-stockbook/data";
  import EmojiStockbook from "./EmojiStockbookElement.svelte";
  import { onMount } from "svelte";
  import en from "./lib/locales/en.json";
  import ja from "./lib/locales/ja.json";

  console.log({ stockbookData });

  let visible = $state(false);
  let col = $state(8);
  let lang = $state("en");

  let stockbook = $state<EmojiStockbook & HTMLElement>();

  onMount(() => {
    stockbook.addEventListener("pick", (ev: CustomEvent) => {
      console.log("picked:", ev.detail);
    });
    stockbook.addEventListener("show", () => {
      console.log("custom element shown");
    });
    stockbook.addEventListener("hide", () => {
      console.log("custom element hidden");
    });
    stockbook.addEventListener("initialized", () => {
      visible = true;
      stockbook.setEmojiDataset(stockbookData);
      stockbook.show();
    });
    stockbook.i18n = { en, ja };
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
  <button onclick={() => (lang = "ja")}>ja</button>
  <button onclick={() => (lang = "en")}>en</button>

  <emoji-stockbook bind:this={stockbook} {col} {lang}></emoji-stockbook>
</main>
