<script lang="ts">
  import { useCustomElementProperty } from "@/lib/use-custom-element-property";
  import { usePreviewFeature } from "@/lib/use-preview-feature";
  import { UArray } from "@/lib/utils";
  import type { Emoji } from "@/types";
  import EmojiButton from "./EmojiButton.svelte";

  const { emojis }: { emojis: Emoji[] } = $props();

  const rootProps = useCustomElementProperty();
  const previewFeature = usePreviewFeature();

  const rowGroupCount = 50;
  const colCount = $derived(rootProps.col);
  const rows = $derived(UArray.chunk(emojis, colCount));
  const rowGroups = $derived(UArray.chunk(rows, rowGroupCount));

  let gridElement = $state<HTMLElement>();

  type FocusMotion =
    | [rowIndex: number, colIndex: number]
    | "next-component"
    | "prev-component";

  const focus = (motion: FocusMotion): boolean => {
    if (motion === "next-component") {
      // TODO: 隣のグリッドにフォーカスを移す
      return false;
    } else if (motion === "prev-component") {
      // TODO: 前のグリッドにフォーカスを移す
      return false;
    } else {
      const [rowIndex, colIndex] = motion;
      const nextTarget = gridElement?.querySelector<HTMLButtonElement>(
        `[aria-rowindex="${rowIndex}"] > [aria-colindex="${colIndex}"] button`
      );

      nextTarget?.focus();

      return !!nextTarget;
    }
  };
</script>

<!-- svelte-ignore a11y_interactive_supports_focus
  -- `gridElement` itself is not interactive.
     Semantically, this callback should be registered against the EmojiButtons,
     but it is registered here as a hack to prevent flickering. -->
<div
  bind:this={gridElement}
  role="grid"
  aria-colcount={colCount}
  onmouseleave={() => previewFeature.notifyHover(null)}
>
  {#each rowGroups as rowGroupProps, idx (rowGroupProps[0][0].id)}
    {@render rowGroup(rowGroupProps, idx + 1)}
  {/each}
</div>

{#snippet rowGroup(props: Emoji[][], rowGroupIndex: number)}
  <!-- `role="rowgroup"` is not needed. -->
  <div class="row-group">
    {#each props as rowProps, idx (rowProps[0].id)}
      {@const rowIndex = rowGroupIndex * rowGroupCount + idx + 1}
      {@render row(rowProps, rowIndex)}
    {/each}
  </div>
{/snippet}

{#snippet row(props: Emoji[], rowIndex: number)}
  <div role="row" aria-rowindex={rowIndex}>
    {#each props as emoji, idx (emoji.id)}
      {@const colIndex = idx + 1}
      {@render cell(emoji, rowIndex, colIndex)}
    {/each}
  </div>
{/snippet}

{#snippet cell(emoji: Emoji, rowIndex: number, colIndex: number)}
  <div role="gridcell" aria-colindex={colIndex}>
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
  [role="grid"] {
    display: flex;
    flex-direction: column;
    gap: var(--cell-gap);
    content-visibility: auto;
  }

  .row-group {
    content-visibility: auto;
    display: flex;
    flex-direction: column;
    gap: var(--cell-gap);
  }

  [role="row"] {
    display: flex;
    flex-flow: row nowrap;
    gap: var(--cell-gap);
  }

  [role="gridcell"] {
    display: block;
    width: var(--cell-size);
    height: var(--cell-size);
  }
</style>
