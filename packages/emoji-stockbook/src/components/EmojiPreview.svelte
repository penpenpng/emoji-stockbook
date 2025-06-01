<script lang="ts">
  import { useTranslation } from "@/lib/use-translation";
  import type { Emoji } from "@/types";
  import { AtomEmoji } from "./atom";

  const { emoji }: { emoji: Emoji } = $props();

  const { t } = useTranslation();

  const emojiVersion = $derived.by(() => {
    if (!emoji) {
      return "";
    }

    if (emoji.kind === "native") {
      return `Emoji ${emoji.version}`;
    } else {
      return t("emojiset.custom-emoji");
    }
  });
  const hasVariant = $derived(emoji?.kind === "native" && !!emoji.variants);
</script>

<div class="preview" role="status" aria-live="polite">
  <div class="emoji">
    <AtomEmoji --emoji-size="2.75rem" {emoji} />
  </div>

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
</div>

<style>
  .preview {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
  }

  .emoji {
    padding-inline: 4px;
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
    height: 80%;
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
