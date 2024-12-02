<script lang="ts">
  import EmojiButton from "./EmojiButton.svelte";
  import type { NormalizedEmoji } from "../types";
  import { useCustomElementProperty } from "../lib/use-custom-element-property";

  let { emojis }: { emojis: NormalizedEmoji[] } = $props();
</script>

<div class="grid">
  {#each emojis as emoji, idx (emoji.id ?? idx)}
    <EmojiButton {emoji} />
  {/each}
</div>

<style>
  .grid {
    content-visibility: auto;
    display: grid;
    grid-template-columns: repeat(var(--col), var(--cell-size));
    gap: var(--cell-gap);
  }

  .grid * {
    display: block;
    width: var(--cell-size);
    height: var(--cell-size);
  }
</style>
