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

<!-- TODO: 使いやすい表示条件を考える -->
{#if query.length > 3}
  <datalist id="shortcode-datalist">
    {#each searchFeature.suggestions as { shortcode, content } (shortcode)}
      <option value={shortcode} label={`${shortcode} (${content})`}></option>
    {/each}
  </datalist>
{/if}

<button
  onclick={() => {
    query = "";
    searchFeature.reset();
  }}>Clear</button
>
