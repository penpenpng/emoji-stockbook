<script lang="ts">
  import { useContentRegion } from "../lib/use-content-region";
  import { useSearchFeature } from "../lib/use-search-feature";
  import EmojiGrid from "./EmojiGrid.svelte";
  import FoldableSection from "./FoldableSection.svelte";

  const contentRegion = useContentRegion();
  const searchFeature = useSearchFeature();
</script>

{#each contentRegion.groups as group (group.id)}
  <FoldableSection
    title={group.name}
    disabled={searchFeature.searching}
    expanded
  >
    {#snippet children()}
      <EmojiGrid emojis={group.emojis} />
    {/snippet}
  </FoldableSection>
{/each}
