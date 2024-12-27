<script lang="ts">
  import { useFoldables } from "@/lib/use-foldables";
  import { useSearchFeature } from "@/lib/use-search-feature";
  import { useTranslation } from "@/lib/use-translation";
  import IconChevron from "./icon/IconChevronDown.svelte";
  import IconFilter from "./icon/IconFilter.svelte";
  import IconFolderClose from "./icon/IconFolderClose.svelte";
  import IconFolderOpen from "./icon/IconFolderOpen.svelte";
  import IconSearch from "./icon/IconSearch.svelte";

  const searchFeature = useSearchFeature();
  const foldables = useFoldables();
  const { t } = useTranslation();

  let query = $state("");
  let selectElement = $state<HTMLSelectElement>();
</script>

<div class="control">
  <label class="search-input">
    <IconSearch alt={t("search.a11y.label")} />
    <input
      type="search"
      bind:value={query}
      placeholder={t("search.placeholder")}
      oninput={() => {
        searchFeature.searchEmojis(query);
      }}
    />
  </label>

  <div class="row">
    <label class="filter-input">
      <IconFilter alt="filter" />
      <select>
        <option value="">{t("filter.select.all-emojis")}</option>
        <option value="">{t("filter.select.native-emojis")}</option>
        <option value="">{t("filter.select.custom-emojis")}</option>
      </select>
    </label>

    <div class="foldable-control">
      <button onclick={() => foldables.openAll()}>
        <IconFolderOpen alt={t("foldable.a11y.open-all")} />
      </button>
      <button onclick={() => foldables.closeAll()}>
        <IconFolderClose alt={t("foldable.a11y.close-all")} />
      </button>
    </div>
  </div>
</div>

<style>
  .control {
    padding: 0.5rem;
    /* TODO: 色をいい感じにする */
    background-color: aliceblue;
  }

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .search-input {
    padding-left: 0.375em;
    cursor: text;
    border: 0.5px solid gray;
    border-radius: 5px;
    outline: none;
  }

  .search-input:has(:focus) {
    outline: var(--focus-outline-width) solid black;
  }

  .search-input input {
    display: block;
    flex-grow: 1;
    padding: 0.375em;
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
