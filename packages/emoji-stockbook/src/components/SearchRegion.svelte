<script lang="ts">
  import { useSearchFeature } from "../lib/use-search-feature";
  import { useTranslation } from "../lib/use-translation";

  const searchFeature = useSearchFeature();
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
  <label>
    <input type="checkbox" />
    Native
  </label>
  <label>
    <input type="checkbox" />
    Custom
  </label>
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
