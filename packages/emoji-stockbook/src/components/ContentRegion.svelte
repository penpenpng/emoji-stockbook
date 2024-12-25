<script lang="ts">
  import { useContentRegion } from "../lib/use-content-region";
  import { useCustomElementProperty } from "../lib/use-custom-element-property";
  import { useSearchFeature } from "../lib/use-search-feature";
  import { useShortcutFeature } from "../lib/use-shortcut-feature";
  import { useTranslation } from "../lib/use-translation";
  import EmojiGrid from "./EmojiGrid.svelte";
  import FoldableSection from "./FoldableSection.svelte";

  const contentRegion = useContentRegion();
  const searchFeature = useSearchFeature();
  const shortcutFeature = useShortcutFeature();
  const { t } = useTranslation();
  const rootProps = useCustomElementProperty();

  const region = $derived(
    Promise.all([shortcutFeature.emojis, contentRegion.sections])
  );
</script>

{#await region}
  <!-- TODO: loading 中の表示 -->
  loading...
{:then [shortcuts, sections]}
  {#if !searchFeature.searching && rootProps.shortcut && shortcuts.length > 0}
    <FoldableSection title={t(shortcutFeature.title)} expanded>
      {#snippet children()}
        <EmojiGrid emojis={shortcuts} />
        <button onclick={() => shortcutFeature.clearHistory()}>forget</button>
      {/snippet}
    </FoldableSection>
  {/if}

  {#each sections as section (section.id)}
    <FoldableSection
      title={t(section.name)}
      disabled={searchFeature.searching}
      expanded
    >
      {#snippet children()}
        <EmojiGrid emojis={section.emojis} />
      {/snippet}
    </FoldableSection>
  {/each}
{:catch err}
  <!-- TODO:エラー時の表示 -->
  Error: {err}
{/await}
