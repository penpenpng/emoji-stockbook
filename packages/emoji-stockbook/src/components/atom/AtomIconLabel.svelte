<script lang="ts">
  import type { Snippet } from "svelte";

  let { children, icon }: { children?: Snippet; icon?: Snippet } = $props();
</script>

<label>
  {#if icon}
    <span class="icon">{@render icon()}</span>
  {/if}

  {@render children?.()}
</label>

<style>
  label {
    display: flex;
    border-bottom: 2px solid var(--color-control-inactive);
  }

  .icon {
    display: flex;
    justify-items: bottom;
    padding: 0.3rem;
  }

  /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
  label:has(:global(:focus)) {
    border-color: var(--color-control-active);

    --font-color-icon: var(--color-control-active);
  }
</style>
