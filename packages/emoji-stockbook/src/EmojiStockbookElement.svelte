<svelte:options
  customElement={{
    tag: "emoji-stockbook",
    props: {},
  }}
/>

<script lang="ts">
  import EmojiStockbook from "./components/EmojiStockbook.svelte";
  import type { NormalizedEmoji } from "./types";
  import { onMount, tick } from "svelte";
  import { setupRepository, useRepository } from "./lib/use-repository";
  import { setupEventEmitter, useEventEmitter } from "./lib/use-event-emitter";
  import {
    setupSearchFeature,
    useSearchFeature,
  } from "./lib/use-search-feature.svelte";
  import { setupVisibility, useVisibility } from "./lib/use-visibility.svelte";
  import type { Emoji, EmojiGroup } from "@emoji-stockbook/types";
  import {
    setupContentRegion,
    useContentRegion,
  } from "./lib/use-content-region.svelte";

  setupRepository();
  setupSearchFeature();
  setupVisibility();
  setupEventEmitter();
  setupContentRegion();

  const visibility = useVisibility();
  const repo = useRepository();
  const emitter = useEventEmitter();
  const searchFeature = useSearchFeature();
  const contentRegion = useContentRegion();

  const resetComponentState = () => {
    contentRegion.reset();
    searchFeature.leaveSearchMode();
  };

  const dispatchComponentEvent = (type: string, detail?: unknown) => {
    $host().dispatchEvent(
      new CustomEvent(type, {
        detail,
      })
    );
  };

  emitter.on("input", (emoji: NormalizedEmoji) => {
    dispatchComponentEvent("input", { emoji });
  });

  emitter.on("show", async () => {
    await tick();
    dispatchComponentEvent("show");
  });

  emitter.on("hide", async () => {
    await tick();
    dispatchComponentEvent("hide");
    resetComponentState();
  });

  let initialized = false;

  onMount(() => {
    initialized = true;
    dispatchComponentEvent("initialized");
  });

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
