<script lang="ts">
  import { useShortcutFeature, useTranslation } from "@/lib";
  import type { Emoji } from "@/types";
  import EmojiGrid from "./EmojiGrid.svelte";
  import FoldableSection from "./FoldableSection.svelte";

  let { shortcuts }: { shortcuts: Emoji[] } = $props();

  const shortcutFeature = useShortcutFeature();
  const { t } = useTranslation();
</script>

<FoldableSection title={t(shortcutFeature.title)} expanded>
  {#snippet children()}
    <EmojiGrid emojis={shortcuts} />

    <div class="shortcut-actions">
      <button onclick={() => false && shortcutFeature.clearHistory()}
        >{t("shortcut.button.clear-history")}</button
      >
    </div>
  {/snippet}
</FoldableSection>

<style>
  /* reset */
  button {
    padding: 0;
    appearance: none;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  button {
    border: 1px solid oklch(92.8% 0.006 264.531);
    padding-block: 0.25rem;
    padding-inline: 0.75rem;
    font-size: 0.85rem;
  }

  .shortcut-actions {
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-block-end: 0.25rem;
  }

  button:hover {
    background-color: rgb(223 223 223);
  }

  button:active {
    background-color: rgb(204 204 204);
  }

  button:focus {
    outline: var(--focus-outline-width) solid var(--color-control-active);

    --font-color-icon: var(--color-control-active);
  }
</style>
