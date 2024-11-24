<script lang="ts">
  import EmojiGrid from "./EmojiGrid.svelte";
  import FoldableSection from "./FoldableSection.svelte";
  import { getEmojiStockbookContext } from "../lib/emoji-stockbook.svelte";

  const stockbook = getEmojiStockbookContext();
</script>

{#each stockbook.groups as group (group.id)}
  <FoldableSection
    title={group.name}
    disabled={stockbook.search.isSearchMode}
    expanded
  >
    {#snippet content()}
      <EmojiGrid emojis={group.emojis} />
    {/snippet}
  </FoldableSection>
{/each}
