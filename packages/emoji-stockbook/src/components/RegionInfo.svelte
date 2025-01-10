<script lang="ts">
  import { usePreviewFeature } from "@/lib/use-preview-feature";
  import { useTranslation } from "@/lib/use-translation";
  import EmojiPreview from "./EmojiPreview.svelte";
  import IconExternalLink from "./icon/IconExternalLink.svelte";

  const previewFeature = usePreviewFeature();
  const { t } = useTranslation();
</script>

<div class="info">
  {#if previewFeature.preview}
    <EmojiPreview emoji={previewFeature.preview} />
  {:else}
    <footer>
      <small>
        <a target="_blank" href="https://github.com/penpenpng/emoji-stockbook">
          {t("element.about")}
          <IconExternalLink
            alt={t("a11y.open-in-new-tab")}
            --icon-size="1.2em"
          />
        </a>
      </small>
    </footer>
  {/if}
</div>

<style>
  .info {
    height: 100%;
    /* TODO: 色をいい感じにする */
    background-color: aliceblue;
  }
</style>
