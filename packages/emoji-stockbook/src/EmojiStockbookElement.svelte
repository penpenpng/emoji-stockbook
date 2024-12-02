<svelte:options
  customElement={{
    tag: "emoji-stockbook",
    props: {},
  }}
/>

<script lang="ts">
  import EmojiStockbook from "./components/EmojiStockbook.svelte";
  import type { NormalizedEmoji } from "./types";
  import { tick } from "svelte";
  import { setupRepository, useRepository } from "./lib/use-repository";
  import { setupEventEmitter, useEventEmitter } from "./lib/use-event-emitter";
  import { setupSearchFeature } from "./lib/use-search-feature.svelte";
  import { setupVisibility, useVisibility } from "./lib/use-visibility.svelte";
  import { useInitializer } from "./lib/use-initializer";
  import type { Emoji, EmojiGroup } from "@emoji-stockbook/types";
  import { setupContentRegion } from "./lib/use-content-region.svelte";

  setupRepository();
  setupSearchFeature();
  setupVisibility();
  setupEventEmitter();
  setupContentRegion();

  const { initialize } = useInitializer();
  const visibility = useVisibility();
  const repo = useRepository();
  const emitter = useEventEmitter();

  const dispatch = (type: string, detail?: unknown) => {
    $host().dispatchEvent(
      new CustomEvent(type, {
        detail,
      })
    );
  };

  emitter.on("input", (emoji: NormalizedEmoji) => {
    dispatch("input", { emoji });
  });

  emitter.on("show", async () => {
    await tick();
    dispatch("show");
  });

  emitter.on("hide", async () => {
    await tick();
    dispatch("hide");
    initialize();
  });

  export const show = visibility.show.bind(visibility);
  export const hide = visibility.hide.bind(visibility);
  export const setEmojiDataset = (dataset: Emoji[] | EmojiGroup[]) => {
    repo.setEmojiDataset(dataset);
    initialize();
  };
</script>

{#if visibility.visible}
  <EmojiStockbook />
{/if}
