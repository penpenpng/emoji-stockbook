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
  import { setupRepository, useRepository } from "./lib/use-repository";
  import {
    setupCustomElementEventDispatcher,
    useCustomElementEventDispatcher,
    type ComponentEventDispatcher,
  } from "./lib/use-custom-element-event-dispatcher";
  import {
    setupSearchFeature,
    useSearchFeature,
  } from "./lib/use-search-feature.svelte";
  import {
    setupVisibility,
    useVisibility,
  } from "./lib/use-custom-element-visibility.svelte";
  import type { Emoji, EmojiGroup } from "@emoji-stockbook/types";
  import {
    setupContentRegion,
    useContentRegion,
  } from "./lib/use-content-region.svelte";
  import {
    setupCustomElementProperty,
    type IEmojiStockbookProperty,
  } from "./lib/use-custom-element-property";

  let { col = 6 }: { col: number } = $props();

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

  setupCustomElementProperty(new EmojiStockbookProperty());
  setupCustomElementEventDispatcher(dispatchComponentEvent);
  setupRepository();
  setupSearchFeature();
  setupVisibility();
  setupContentRegion();

  const visibility = useVisibility();
  const repo = useRepository();
  const dispatch = useCustomElementEventDispatcher();
  const searchFeature = useSearchFeature();
  const contentRegion = useContentRegion();

  const resetComponentState = () => {
    contentRegion.reset();
    searchFeature.leaveSearchMode();
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
  export const setEmojiDataset = (dataset: Emoji[] | EmojiGroup[]) => {
    repo.setEmojiDataset(dataset);
    resetComponentState();
  };
</script>

{#if visibility.visible}
  <EmojiStockbook />
{/if}
