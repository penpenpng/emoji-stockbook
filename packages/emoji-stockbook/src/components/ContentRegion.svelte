<script lang="ts">
  import { useContentRegion } from "../lib/use-content-region";
  import { useCustomElementProperty } from "../lib/use-custom-element-property";
  import { useSearchFeature } from "../lib/use-search-feature";
  import { useShortcutFeature } from "../lib/use-shortcut-feature";
  import EmojiGrid from "./EmojiGrid.svelte";
  import FoldableSection from "./FoldableSection.svelte";
  import ShortcutSection from "./ShortcutSection.svelte";

  const contentRegion = useContentRegion();
  const searchFeature = useSearchFeature();
  const shortcutFeature = useShortcutFeature();
  const rootProps = useCustomElementProperty();
</script>

{#if !searchFeature.searching && rootProps.shortcut && shortcutFeature.emojis.length > 0}
  <ShortcutSection />
{/if}

{#await contentRegion.categories}
  <!-- TODO -->
  loading...
{:then categories}
  {#each categories as cat (cat.id)}
    <FoldableSection
      title={cat.name}
      disabled={searchFeature.searching}
      expanded
    >
      {#snippet children()}
        <EmojiGrid emojis={cat.emojis} />
      {/snippet}
    </FoldableSection>
  {/each}
{:catch err}
  Error: {err}
{/await}
