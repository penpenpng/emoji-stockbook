<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputTypeAttribute } from "svelte/elements";

  let {
    value = $bindable(),
    type,
    placeholder,
    oninput,
  }: {
    value: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    oninput?: (event: Event) => void;
  } = $props();
</script>

<input {type} bind:value {placeholder} {oninput} />

<style>
  /* reset */
  input {
    padding: 0;
    margin: 0;
    appearance: none;
    background: none;
    border: none;
    border-radius: 0;
    outline: none;
  }

  /* stylelint-disable-next-line no-duplicate-selectors */
  input {
    display: block;
  }
</style>
