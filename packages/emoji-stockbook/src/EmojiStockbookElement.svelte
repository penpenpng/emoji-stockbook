<svelte:options
  customElement={{
    tag: "emoji-stockbook",
    props: {
      col: { reflect: true, type: "Number", attribute: "col" },
    },
  }}
/>

<script lang="ts">
  import EmojiStockbook from "./components/EmojiStockbook.svelte";
  import { onMount } from "svelte";
  import { useEmojiRepository } from "./lib/use-emoji-repository";
  import {
    useCustomElementEventDispatcher,
    type ComponentEventDispatcher,
  } from "./lib/use-custom-element-event-dispatcher";
  import { useSearchFeature } from "./lib/use-search-feature";
  import { useCustomElementVisibility } from "./lib/use-custom-element-visibility";
  import type { EmojiRepositoryDataset } from "@emoji-stockbook/types";
  import { useContentRegion } from "./lib/use-content-region";
  import { useSkintoneFeature } from "./lib/use-skintone-feature";
  import {
    useCustomElementProperty,
    type IEmojiStockbookProperty,
  } from "./lib/use-custom-element-property";

  let { col = 8 }: { col: number } = $props();

  class EmojiStockbookProperty implements IEmojiStockbookProperty {
    col = $derived(col);
  }

  const dispatchComponentEvent: ComponentEventDispatcher = (
    type: string,
    detail?: unknown
  ) => {
    $host().dispatchEvent(
      new CustomEvent(type, {
        detail,
      })
    );
  };

  useCustomElementProperty.setup(new EmojiStockbookProperty());
  useCustomElementEventDispatcher.setup(dispatchComponentEvent);
  useEmojiRepository.setup();
  useSearchFeature.setup();
  useCustomElementVisibility.setup();
  useContentRegion.setup();
  useSkintoneFeature.setup();

  const visibility = useCustomElementVisibility();
  const repo = useEmojiRepository();
  const dispatch = useCustomElementEventDispatcher();
  const searchFeature = useSearchFeature();
  const contentRegion = useContentRegion();
  const skintoneFeatuer = useSkintoneFeature();

  const resetComponentState = () => {
    contentRegion.reset();
    searchFeature.reset();
    skintoneFeatuer.reset();
  };

  let initialized = false;

  onMount(() => {
    initialized = true;
    dispatch("initialized");
  });

  $host().addEventListener("hide", () => {
    resetComponentState();
  });

  // TODO: mounted まで使えないのをどうにかできないか
  // https://svelte.dev/docs/svelte/custom-elements#Component-options の extend が役に立つかもしれない
  export const isInitialized = () => initialized;
  export const isVisible = () => visibility.visible;
  export const show = () => visibility.show();
  export const hide = () => visibility.hide();
  export const setEmojiDataset = (dataset: EmojiRepositoryDataset) => {
    repo.setEmojiDataset(dataset);
    resetComponentState();
  };
</script>

{#if visibility.visible}
  <EmojiStockbook />
{/if}
