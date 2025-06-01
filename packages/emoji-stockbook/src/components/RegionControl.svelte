<script lang="ts">
  import { useEmojiRepository, useSearchFeature, useTranslation } from "@/lib";
  import { AtomIconLabel, AtomInput, AtomSelect } from "./atom";
  import { IconFilter, IconSearch } from "./icon";

  const searchFeature = useSearchFeature();
  const repo = useEmojiRepository();
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

  {#await repo.hasCustomEmojis then hasCustomEmojis}
    {#if hasCustomEmojis}
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
      </div>
    {/if}
  {/await}
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
</style>
