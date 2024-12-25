<script lang="ts">
  import { usePreviewFeature } from "../lib/use-preview-feature";
  import { useTranslation } from "../lib/use-translation";
  import EmojiAtom from "./EmojiAtom.svelte";

  const previewFeature = usePreviewFeature();
  const { t } = useTranslation();

  const emoji = $derived(previewFeature.preview);
  const emojiVersion = $derived.by(() => {
    if (emoji.kind === "native") {
      return `Emoji ${emoji.version}`;
    } else {
      return t("emojiset.custom-emoji");
    }
  });
  const hasVariant = $derived(emoji.kind === "native" && !!emoji.variants);
</script>

<div class="preview" role="status" aria-live="polite">
  {#if emoji}
    <EmojiAtom {emoji} />

    <div class="emoji-info">
      <div class="emoji-shortcode">{emoji.shortcode}</div>
      <div class="emoji-meta">
        <small class="emoji-meta-version">{emojiVersion}</small>
        {#if hasVariant}
          <small class="emoji-meta-variant"
            ><b>{t("variant.tip.has-variant")}</b></small
          >
        {/if}
      </div>
    </div>
  {:else}
    <!-- TODO: ここになんか気の利いたヒントを書く -->
    <small>Hint: Arrow keys are allowed.</small>
  {/if}
</div>

<style>
  .preview {
    --emoji-size: 45px;

    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;

    /* TODO: 色をいい感じにする */
    background-color: aliceblue;
  }

  .emoji-shortcode {
    display: grid;
    flex-grow: 1;
    place-content: center start;
  }

  .emoji-info {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    height: 75%;
  }

  .emoji-meta {
    display: flex;
    flex: 0 0 min-content;
    flex-direction: row;
  }

  .emoji-meta-version {
    flex-grow: 1;
  }

  .emoji-meta-variant {
    flex: 0 0 max-content;
  }
</style>
