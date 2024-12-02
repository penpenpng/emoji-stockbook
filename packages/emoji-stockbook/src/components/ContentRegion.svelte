<script lang="ts">
  import { useContentRegion } from "../lib/use-content-region.svelte";
  import { useSearchFeature } from "../lib/use-search-feature.svelte";
  import EmojiGrid from "./EmojiGrid.svelte";
  import FoldableSection from "./FoldableSection.svelte";

  const contentRegion = useContentRegion();
  const searchFeature = useSearchFeature();
</script>

{#each contentRegion.groups as group (group.id)}
  <FoldableSection
    title={group.name}
    disabled={searchFeature.isSearchMode}
    expanded
  >
    {#snippet content()}
      <EmojiGrid emojis={group.emojis} />
    {/snippet}
  </FoldableSection>
{/each}
