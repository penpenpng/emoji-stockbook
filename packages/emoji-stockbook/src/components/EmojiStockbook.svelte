<script lang="ts">
  import ContentRegion from "./ContentRegion.svelte";
  import SearchInput from "./SearchInput.svelte";
  import FoldableController from "./FoldableController.svelte";

  import { useTranslation } from "../lib/use-translation";
</script>

<div class="host">
  <FoldableController />
  <SearchInput />
  <ContentRegion />
</div>

<style>
  .host {
    /* For debugging */
    background-color: #e6fcca;

    /* Base styles */
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;

    /* Customizable */
    height: var(--emoji-stockbook-height, 450px);
    --cell-size: 32px;
    --cell-gap: 4px;
  }
</style>
