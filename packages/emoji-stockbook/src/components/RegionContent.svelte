<script lang="ts">
  import { Logger } from "@/lib/logger";
  import { useContentRegion } from "@/lib/use-content-region";
  import { useCustomElementProperty } from "@/lib/use-custom-element-property";
  import { useSearchFeature } from "@/lib/use-search-feature";
  import { useShortcutFeature } from "@/lib/use-shortcut-feature";
  import { useTranslation } from "@/lib/use-translation";
  import ContentPlaceholder from "./ContentPlaceholder.svelte";
  import EmojiGrid from "./EmojiGrid.svelte";
  import FoldableSection from "./FoldableSection.svelte";
  import Loader from "./Loader.svelte";

  const contentRegion = useContentRegion();
  const searchFeature = useSearchFeature();
  const shortcutFeature = useShortcutFeature();
  const { t } = useTranslation();
  const rootProps = useCustomElementProperty();

  const region = $derived(
    Promise.all([
      shortcutFeature.emojis.catch((err) => {
        Logger.warn("Failed to load history data", err);
        return [];
      }),
      contentRegion.sections,
    ]).catch((err) => {
      Logger.error("Failed to load emojis", err);
      throw err;
    })
  );
</script>

<div class="content">
  {#await region}
    <div class="loader-container">
      <Loader />
    </div>
  {:then [shortcuts, sections]}
    {#if !searchFeature.searching && rootProps.shortcut && shortcuts.length > 0}
      <FoldableSection title={t(shortcutFeature.title)} expanded>
        {#snippet children()}
          <EmojiGrid emojis={shortcuts} />

          <div class="shortcut-actions">
            <button
              class="clear-history"
              onclick={() => shortcutFeature.clearHistory()}
              >{t("shortcut.button.clear-history")}</button
            >
          </div>
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
  {:catch}
    {t("error.failed-loading-emojis")}
  {/await}

  <ContentPlaceholder />
</div>

<style>
  .content {
    padding: 0.75em;
  }

  .loader-container {
    display: grid;
    place-items: center center;
  }

  .shortcut-actions {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }

  .clear-history {
    padding: 2px;
  }
</style>
