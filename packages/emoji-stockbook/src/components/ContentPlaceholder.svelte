<script lang="ts">
  import { useCustomElementProperty } from "@/lib";

  const rootProps = useCustomElementProperty();

  /*
    It keeps an area for one row of the grid to prevent style collapse
    when all Foldables are closed.
  */
  const cells = $derived(Array.from({ length: rootProps.col }));
</script>

<div class="pseudo-grid">
  <div class="pseudo-row-group">
    <div class="pseudo-row">
      {#each cells as _}
        <div class="pseudo-cell"></div>
      {/each}
    </div>
  </div>
</div>

<style>
  .pseudo-grid {
    visibility: hidden;
  }

  .pseudo-row-group {
    padding-inline: var(--focus-outline-width);
  }

  .pseudo-row {
    display: flex;
    flex-flow: row nowrap;
  }

  .pseudo-cell {
    display: block;
    width: var(--cell-size);
  }
</style>
