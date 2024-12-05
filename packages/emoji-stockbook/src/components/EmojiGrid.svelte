<script lang="ts">
  import EmojiButton from "./EmojiButton.svelte";
  import type { NormalizedEmoji } from "../types";
  import { useCustomElementProperty } from "../lib/use-custom-element-property";
  import { chunk } from "../lib/array";

  const { emojis }: { emojis: NormalizedEmoji[] } = $props();

  const rootProps = useCustomElementProperty();

  const rowGroupCount = 20;
  const colCount = $derived(rootProps.col);
  const rows = $derived(chunk(emojis, colCount));
  const rowGroups = $derived(chunk(rows, rowGroupCount));

  let gridElement = $state<HTMLElement>();

  type FocusMotion =
    | [rowIndex: number, colIndex: number]
    | "next-component"
    | "prev-component";

  const focus = (motion: FocusMotion): boolean => {
    if (motion === "next-component") {
      // TODO
      return false;
    } else if (motion === "prev-component") {
      // TODO
      return false;
    } else {
      const [rowIndex, colIndex] = motion;
      const nextTarget = gridElement.querySelector<HTMLButtonElement>(
        `[aria-rowindex="${rowIndex}"] > [aria-colindex="${colIndex}"] button`
      );

      nextTarget?.focus();

      return !!nextTarget;
    }
  };
</script>

<div bind:this={gridElement} role="grid" aria-colcount={colCount} class="grid">
  {#each rowGroups as rowGroupProps, idx (rowGroupProps[0][0].id)}
    {@render rowGroup(rowGroupProps, idx + 1)}
  {/each}
</div>

{#snippet rowGroup(props: NormalizedEmoji[][], rowGroupIndex: number)}
  <!-- `role="rowgroup"` is not needed. -->
  <div class="row-group">
    {#each props as rowProps, idx (rowProps[0].id)}
      {@const rowIndex = rowGroupIndex * rowGroupCount + idx + 1}
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
      onArrowUp={() =>
        focus([rowIndex - 1, colIndex]) || focus("prev-component")}
      onArrowDown={() =>
        focus([rowIndex + 1, colIndex]) ||
        focus([rowIndex + 1, emojis.length % colCount]) ||
        focus("next-component")}
      onArrowRight={() =>
        focus([rowIndex, colIndex + 1]) ||
        focus([rowIndex + 1, 1]) ||
        focus("next-component")}
      onArrowLeft={() =>
        focus([rowIndex, colIndex - 1]) ||
        focus([rowIndex - 1, colCount - 1]) ||
        focus("prev-component")}
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
