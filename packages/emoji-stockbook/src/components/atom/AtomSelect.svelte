<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children?: Snippet } = $props();
</script>

<select>
  {@render children?.()}
</select>

<style>
  /* reset */
  select {
    appearance: none;
    background-color: transparent;
    border: 0;
    border-radius: 0;
    outline: 0;
    box-shadow: none;
  }

  /* stylelint-disable-next-line no-duplicate-selectors */
  select {
    display: block;
    padding-block-start: 4px;
    width: 100%;
    padding-inline-start: 8px;
    padding-inline-end: 2.5rem;
    color: var(--color-control-text);
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.2rem center;
    background-size: 1.5em 1.5em;
  }
</style>
