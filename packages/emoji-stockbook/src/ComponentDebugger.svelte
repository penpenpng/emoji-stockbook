<script lang="ts">
  import { LocalStorageHistoryManager } from "@/lib/history-manager";
  import en from "@/locales/en.json";
  import ja from "@/locales/ja.json";
  import { onMount } from "svelte";
  import "./EmojiStockbookElement.svelte";
  import EmojiStockbook from "./EmojiStockbookElement.svelte";

  let col = $state(8);
  let lang = $state(null);
  let emojisets = $state(null);

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
  <button onclick={() => (emojisets = "1")}>emoji 1</button>
  <button onclick={() => (emojisets = "16")}>emoji 16</button>
  <button onclick={() => (lang = "ja")}>ja</button>
  <button onclick={() => (lang = "en")}>en</button>

  <emoji-stockbook bind:this={stockbook} {col} {lang} {emojisets}
  ></emoji-stockbook>
</main>
