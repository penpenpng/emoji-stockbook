<script lang="ts">
  import { getEmojiStockbookContext } from "../lib/emoji-stockbook.svelte";

  const stockbook = getEmojiStockbookContext();

  let query = $state("");
</script>

<input
  type="text"
  bind:value={query}
  oninput={() => {
    stockbook.search.searchEmojis(query);
  }}
/>
<button
  onclick={() => {
    query = "";
    stockbook.search.leaveSearchMode();
  }}>Clear</button
>
