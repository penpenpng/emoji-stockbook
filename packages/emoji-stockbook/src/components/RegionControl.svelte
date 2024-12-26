<script lang="ts">
  import { useFoldables } from "@/lib/use-foldables";
  import { useSearchFeature } from "@/lib/use-search-feature";
  import { useTranslation } from "@/lib/use-translation";

  const searchFeature = useSearchFeature();
  const foldables = useFoldables();
  const { t } = useTranslation();

  let query = $state("");
</script>

<div class="search">
  <!-- TODO: 虫眼鏡アイコン -->
  <input
    type="search"
    bind:value={query}
    aria-label={t("search.a11y.label")}
    placeholder={t("search.placeholder")}
    oninput={() => {
      searchFeature.searchEmojis(query);
    }}
  />

  <!-- TODO: filter 機能, 漏斗アイコン -->
  <select>
    <option value="">{t("filter.select.all-emojis")}</option>
    <option value="">{t("filter.select.native-emojis")}</option>
    <option value="">{t("filter.select.custom-emojis")}</option>
  </select>

  <button onclick={() => foldables.openAll()}>open all</button>
  <button onclick={() => foldables.closeAll()}>close all</button>
</div>

<style>
  .search {
    /* TODO: 色をいい感じにする */
    background-color: aliceblue;
  }

  input[type="search"] {
    width: 100%;
  }
</style>
