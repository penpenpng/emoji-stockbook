<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    onclick,
  }: { children?: Snippet; onclick?: (event: Event) => void } = $props();
</script>

<button type="button" {onclick}>
  {@render children?.()}
</button>

<style>
  /* reset */
  button {
    padding: 0;
    appearance: none;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
  }

  button:focus {
    position: relative; /* To prevent outlines from being hidden */
    z-index: 1; /* To prevent outlines from being hidden */
    outline: 2px solid var(--color-control-active);

    --font-color-icon: var(--color-control-active);
  }
</style>
