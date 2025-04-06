<script lang="ts">
  import { useFoldables } from "@/lib/use-foldables";
  import { useSearchFeature } from "@/lib/use-search-feature";
  import { useTranslation } from "@/lib/use-translation";
  import AtomButton from "./atom/AtomButton.svelte";
  import AtomIconLabel from "./atom/AtomIconLabel.svelte";
  import AtomInput from "./atom/AtomInput.svelte";
  import AtomSelect from "./atom/AtomSelect.svelte";
  import IconFilter from "./icon/IconFilter.svelte";
  import IconFolderClose from "./icon/IconFolderClose.svelte";
  import IconFolderOpen from "./icon/IconFolderOpen.svelte";
  import IconSearch from "./icon/IconSearch.svelte";

  const searchFeature = useSearchFeature();
  const foldables = useFoldables();
  const { t } = useTranslation();

  let query = $state("");
</script>

<div class="control">
  <AtomIconLabel>
    {#snippet icon()}
      <IconSearch alt={t("search.a11y.label")} />
    {/snippet}

    <AtomInput
      type="search"
      bind:value={query}
      placeholder={t("search.placeholder")}
      oninput={() => {
        searchFeature.searchEmojis(query);
      }}
    />
  </AtomIconLabel>

  <div class="row">
    <AtomIconLabel>
      {#snippet icon()}
        <IconFilter alt="filter" />
      {/snippet}

      <AtomSelect>
        <option value="">{t("filter.select.all-emojis")}</option>
        <option value="">{t("filter.select.native-emojis")}</option>
        <option value="">{t("filter.select.custom-emojis")}</option>
      </AtomSelect>
    </AtomIconLabel>

    <div class="foldable-control">
      <AtomButton onclick={() => foldables.closeAll()}>
        <IconFolderClose alt={t("foldable.a11y.close-all")} />
      </AtomButton>
      <AtomButton onclick={() => foldables.openAll()}>
        <IconFolderOpen alt={t("foldable.a11y.open-all")} />
      </AtomButton>
    </div>
  </div>
</div>

<style>
  .control {
    padding: 0.5rem;
    background-color: var(--background-color-control);
  }

  .row {
    display: flex;
    flex-direction: row;
    margin-top: 0.2rem;
  }

  .foldable-control {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    justify-content: end;
  }

  .foldable-control button {
    display: grid;
    place-content: center;
  }
</style>
