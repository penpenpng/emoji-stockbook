<script lang="ts">
  import "./EmojiStockbookElement.svelte";
  import EmojiStockbook from "./EmojiStockbookElement.svelte";
  import { onMount } from "svelte";
  import { LocalStorageHistoryManager } from "./lib/history-manager";
  import en from "./lib/locales/en.json";
  import ja from "./lib/locales/ja.json";

  let col = $state(8);
  let lang = $state(null);

  let stockbook = $state<EmojiStockbook & HTMLElement>();

  onMount(() => {
    stockbook.addEventListener("pick", (ev: CustomEvent) => {
      console.log("picked:", ev.detail);
    });

    stockbook.addEventListener("initialized", () => {});
    stockbook.i18n = { en, ja };
    stockbook.shortcut = {
      history: new LocalStorageHistoryManager(),
    };
  });
</script>

<main>
  <button onclick={() => (col = 4)}>col 4</button>
  <button onclick={() => (col = 6)}>col 6</button>
  <button onclick={() => (col = 8)}>col 8</button>
  <button onclick={() => (lang = "ja")}>ja</button>
  <button onclick={() => (lang = "en")}>en</button>

  <emoji-stockbook bind:this={stockbook} {col} {lang}></emoji-stockbook>
</main>
