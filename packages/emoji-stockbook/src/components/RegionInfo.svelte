<script lang="ts">
  import { usePreviewFeature, useTranslation } from "@/lib";
  import EmojiPreview from "./EmojiPreview.svelte";
  import { IconExternalLink } from "./icon";

  const previewFeature = usePreviewFeature();
  const { t } = useTranslation();
</script>

<div class="info">
  {#if previewFeature.preview}
    <EmojiPreview emoji={previewFeature.preview} />
  {:else}
    <footer class="about">
      <small>
        <a target="_blank" href="https://github.com/penpenpng/emoji-stockbook">
          {t("element.about")}
          <IconExternalLink
            alt={t("a11y.open-in-new-tab")}
            --icon-size="0.8rem"
          />
        </a>
      </small>
    </footer>
  {/if}
</div>

<style>
  .info {
    height: 100%;
    background-color: var(--background-color-info);
  }

  .about {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
  }

  .about small {
    margin: 4px;
  }
</style>
