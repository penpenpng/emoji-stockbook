<script lang="ts">
  import ContentRegion from "./ContentRegion.svelte";
  import SearchInput from "./SearchInput.svelte";
  import SkintoneSelector from "./SkintoneSelector.svelte";
  import FoldableController from "./FoldableController.svelte";

  import { useTranslation } from "../lib/use-translation";

  const { t } = useTranslation();
</script>

<div class="host">
  <div>
    {t("hello")}
  </div>
  <FoldableController />
  <SkintoneSelector />
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
