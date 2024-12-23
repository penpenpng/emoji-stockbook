<script lang="ts">
  import ContentRegion from "./ContentRegion.svelte";
  import FoldableController from "./FoldableController.svelte";
  import PreviewRegion from "./PreviewRegion.svelte";
  import SearchInput from "./SearchInput.svelte";
</script>

<div class="host">
  <PreviewRegion />
  <FoldableController />
  <SearchInput />
  <ContentRegion />
</div>

<style>
  .host {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: var(--height);
    overflow: auto;
    background-color: var(--background-color);
  }

  /* stylelint-disable-next-line selector-pseudo-class-no-unknown -- :global is allowed as a svelte-specific syntax. */
  :global :host {
    button {
      padding: 0;
      appearance: none;
      cursor: pointer;
      background-color: transparent;
      border: none;
    }
  }
</style>
