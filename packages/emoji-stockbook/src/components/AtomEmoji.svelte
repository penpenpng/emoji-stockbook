<script lang="ts">
  import type { Emoji } from "@/types";

  const {
    emoji,
  }: {
    emoji: Emoji;
  } = $props();
</script>

{#if emoji.kind === "native"}
  <span class="native-emoji" title={emoji.shortcode}>{emoji.char}</span>
{:else}
  <img
    class="custom-emoji"
    alt={emoji.alt ?? emoji.shortcode}
    title={emoji.shortcode}
    src={emoji.src}
  />
{/if}

<style>
  .native-emoji {
    display: inline-block;
    width: var(--emoji-size);
    height: var(--emoji-size);
    font-family: var(--emoji-font-family);
    /* The scale coefficient was decided heuristically. */
    font-size: calc(var(--emoji-size) * 2 / 3);
    text-align: center;
    font-variant-emoji: emoji;
  }

  .custom-emoji {
    display: inline-block;
    width: var(--emoji-size);
    height: var(--emoji-size);
  }
</style>
