<script lang="ts">
  import { useSearchFeature } from "../lib/use-search-feature";

  const searchFeature = useSearchFeature();

  let query = $state("");
</script>

<input
  type="search"
  bind:value={query}
  list="shortcode-datalist"
  aria-label="emoji"
  oninput={() => {
    searchFeature.searchEmojis(query);
  }}
/>

<button
  onclick={() => {
    query = "";
  }}>Clear</button
>
