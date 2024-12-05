<script lang="ts">
  import { useContentRegion } from "../lib/use-content-region";
  import { useCustomElementProperty } from "../lib/use-custom-element-property";
  import { useSearchFeature } from "../lib/use-search-feature";
  import EmojiGrid from "./EmojiGrid.svelte";
  import FoldableSection from "./FoldableSection.svelte";
  import ShortcutSection from "./ShortcutSection.svelte";

  const contentRegion = useContentRegion();
  const searchFeature = useSearchFeature();
  const rootProps = useCustomElementProperty();
</script>

{#if !searchFeature.searching && rootProps.shortcut}
  <ShortcutSection />
{/if}

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
