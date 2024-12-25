<script lang="ts">
  import { usePreviewFeature } from "../lib/use-preview-feature";
  import { useTranslation } from "../lib/use-translation";
  import type { Emoji } from "../types";
  import EmojiAtom from "./EmojiAtom.svelte";

  const previewFeature = usePreviewFeature();
  const { t } = useTranslation();

  const emoji = $derived(previewFeature.preview);
  const comeFrom = (emoji: Emoji): string => {
    if (emoji.kind === "native") {
      return `v${emoji.version}`;
    } else {
      return t("emojiset.custom-emoji");
    }
  };
</script>

<div class="preview" role="status" aria-live="polite">
  {#if emoji}
    <EmojiAtom {emoji} />
    <div>{emoji.shortcode}</div>
    <small>({comeFrom(emoji)})</small>
    <!-- TODO: レイアウトを工夫する。shortcode が長かったときに見えなくなったりしないように -->
    {#if emoji.kind === "native" && emoji.variants}
      <small>{t("variant.tip.has-variant")}</small>
    {/if}
  {:else}
    <!-- TODO: ここになんか気の利いたヒントを書く -->
    <small>Hint: Arrow keys are allowed.</small>
  {/if}
</div>

<style>
  .preview {
    --emoji-size: 35px;

    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;

    /* TODO: 色をいい感じにする */
    background-color: aliceblue;
  }
</style>
