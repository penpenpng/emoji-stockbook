<svelte:options
  customElement={{
    tag: "emoji-stockbook",
    props: {},
  }}
/>

<script lang="ts">
  import { createEmojiStockbookContext } from "./lib/emoji-stockbook.svelte";
  import EmojiStockbook from "./components/EmojiStockbook.svelte";
  import type { NormalizedEmoji } from "./types";
  import { tick } from "svelte";

  const stockbook = createEmojiStockbookContext();

  export const show = stockbook.show.bind(stockbook);
  export const hide = stockbook.hide.bind(stockbook);
  export const setEmojiDataset = stockbook.setEmojiDataset.bind(stockbook);

  const dispatch = (type: string, detail?: unknown) => {
    $host().dispatchEvent(
      new CustomEvent(type, {
        detail,
      })
    );
  };

  stockbook.event.emitter.on("input", (emoji: NormalizedEmoji) => {
    dispatch("input", { emoji });
  });

  stockbook.event.emitter.on("show", async () => {
    await tick();
    dispatch("show");
  });

  stockbook.event.emitter.on("hide", async () => {
    await tick();
    dispatch("hide");
  });
</script>

{#if stockbook.visible}
  <EmojiStockbook />
{/if}
