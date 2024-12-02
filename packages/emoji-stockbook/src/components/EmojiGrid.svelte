<script lang="ts">
  import EmojiButton from "./EmojiButton.svelte";
  import type { NormalizedEmoji } from "../types";
  import { useCustomElementProperty } from "../lib/use-custom-element-property";
  import { chunk } from "../lib/array";

  let { emojis }: { emojis: NormalizedEmoji[] } = $props();

  const rootProps = useCustomElementProperty();

  let rows = $derived(chunk(emojis, rootProps.col));
  const rowGroupSize = 2;
  let rowGroups = $derived(chunk(rows, rowGroupSize));
  let gridElement = $state<HTMLElement>();

  const moveFocus = (rowIndex: number, colIndex: number) => {
    console.log("move to", rowIndex, colIndex);
    gridElement
      .querySelector<HTMLButtonElement>(
        `[aria-rowindex="${rowIndex}"] > [aria-colindex="${colIndex}"] button`
      )
      ?.focus();
  };
</script>

<div
  bind:this={gridElement}
  role="grid"
  aria-colcount={rootProps.col}
  class="grid"
>
  {#each rowGroups as rowGroupProps, idx (rowGroupProps[0][0].id)}
    {@render rowGroup(rowGroupProps, idx + 1)}
  {/each}
</div>

{#snippet rowGroup(props: NormalizedEmoji[][], rowGroupIndex: number)}
  <!-- `role="rowgroup"` is not needed. -->
  <div class="row-group">
    {#each props as rowProps, idx (rowProps[0].id)}
      {@const rowIndex = rowGroupIndex * rowGroupSize + idx + 1}
      {@render row(rowProps, rowIndex)}
    {/each}
  </div>
{/snippet}

{#snippet row(props: NormalizedEmoji[], rowIndex: number)}
  <div role="row" aria-rowindex={rowIndex} class="row">
    {#each props as emoji, idx (emoji.id)}
      {@const colIndex = idx + 1}
      {@render cell(emoji, rowIndex, colIndex)}
    {/each}
  </div>
{/snippet}

{#snippet cell(emoji: NormalizedEmoji, rowIndex: number, colIndex: number)}
  <div role="gridcell" aria-colindex={colIndex} class="cell">
    <EmojiButton
      {emoji}
      onarrowdown={() => moveFocus(rowIndex + 1, colIndex)}
    />
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
