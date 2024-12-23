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
</style>
