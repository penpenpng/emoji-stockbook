<script lang="ts">
  import { useSearchFeature } from "../lib/use-search-feature";

  const searchFeature = useSearchFeature();

  let query = $state("");
</script>

<input
  type="text"
  bind:value={query}
  oninput={() => {
    searchFeature.searchEmojis(query);
  }}
/>
<button
  onclick={() => {
    query = "";
    searchFeature.leaveSearchMode();
  }}>Clear</button
>
