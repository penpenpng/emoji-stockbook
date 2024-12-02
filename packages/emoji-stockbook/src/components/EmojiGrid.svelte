<script lang="ts">
  import EmojiButton from "./EmojiButton.svelte";
  import type { NormalizedEmoji } from "../types";
  import { useCustomElementProperty } from "../lib/use-custom-element-property";
  import { chunk } from "../lib/array";

  let { emojis }: { emojis: NormalizedEmoji[] } = $props();

  const rootProps = useCustomElementProperty();

  let rows = $derived(chunk(emojis, rootProps.col));
  let rowGroups = $derived(chunk(rows, 2));
</script>

<div role="grid" aria-colcount={rootProps.col} class="grid">
  {#each rowGroups as rowGroupProps (rowGroupProps[0][0].id)}
    {@render rowGroup(rowGroupProps)}
  {/each}
</div>

{#snippet rowGroup(props: NormalizedEmoji[][])}
  <!-- `role="rowgroup"` is not needed. -->
  <div class="row-group">
    {#each props as rowProps (rowProps[0].id)}
      {@render row(rowProps)}
    {/each}
  </div>
{/snippet}

{#snippet row(props: NormalizedEmoji[])}
  <div role="row" class="row">
    {#each props as emoji (emoji.id)}
      <div role="gridcell" class="cell">
        <EmojiButton {emoji} />
      </div>
    {/each}
  </div>
{/snippet}

<style>
  .grid {
    content-visibility: auto;

    display: flex;
    flex-direction: column;
    gap: var(--cell-gap);
  }

  .row-group {
    content-visibility: auto;

    display: flex;
    flex-direction: column;
    gap: var(--cell-gap);
  }

  .row {
    display: flex;
    flex-direction: row;
    gap: var(--cell-gap);
    flex-wrap: nowrap;
  }

  .cell {
    display: block;
    width: var(--cell-size);
    height: var(--cell-size);
  }
</style>
