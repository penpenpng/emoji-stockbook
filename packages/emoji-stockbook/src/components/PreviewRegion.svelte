<script lang="ts">
  import { usePreviewFeature } from "../lib/use-preview-feature";
  import type { Emoji } from "../types";
  import EmojiAtom from "./EmojiAtom.svelte";

  const previewFeature = usePreviewFeature();

  const emoji = $derived(previewFeature.preview);
  const comeFrom = (emoji: Emoji): string => {
    if (emoji.kind === "native") {
      return `v${emoji.version}`;
    } else {
      // TODO: emojiset に対して human readable な名前を許す
      return "Custom Emoji";
    }
  };
</script>

<div class="preview" role="status" aria-live="polite">
  {#if emoji}
    <EmojiAtom {emoji} />
    <div>{emoji.shortcode}</div>
    <small>({comeFrom(emoji)})</small>
  {:else}
    <!-- TODO: ここになんか気の利いたヒントを書くか、foldable のボタンを置く -->
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
