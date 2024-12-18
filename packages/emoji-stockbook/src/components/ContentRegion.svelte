<script lang="ts">
  import { useContentRegion } from "../lib/use-content-region";
  import { useCustomElementProperty } from "../lib/use-custom-element-property";
  import { useSearchFeature } from "../lib/use-search-feature";
  import { useShortcutFeature } from "../lib/use-shortcut-feature";
  import EmojiGrid from "./EmojiGrid.svelte";
  import FoldableSection from "./FoldableSection.svelte";

  const contentRegion = useContentRegion();
  const searchFeature = useSearchFeature();
  const shortcutFeature = useShortcutFeature();
  const rootProps = useCustomElementProperty();

  const region = $derived(
    Promise.all([shortcutFeature.emojis, contentRegion.categories])
  );
</script>

{#await region}
  <!-- TODO -->
  loading...
{:then [shortcuts, categories]}
  {#if !searchFeature.searching && rootProps.shortcut && shortcuts.length > 0}
    <FoldableSection title={shortcutFeature.title} expanded>
      {#snippet children()}
        <EmojiGrid emojis={shortcuts} />
      {/snippet}
    </FoldableSection>
  {/if}

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
  <!-- TODO -->
  Error: {err}
{/await}
