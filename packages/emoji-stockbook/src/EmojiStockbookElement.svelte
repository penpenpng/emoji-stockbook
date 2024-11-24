<svelte:options
  customElement={{
    tag: "emoji-stockbook",
    props: {
      dataset: { reflect: false, type: "Array" },
      visible: { reflect: true, type: "Boolean", attribute: "visible" },
    },
  }}
/>

<script lang="ts">
  import type { Emoji, EmojiGroup } from "@emoji-stockbook/types";
  import { createEmojiStockbookContext } from "./lib/emoji-stockbook.svelte";
  import EmojiStockbook from "./components/EmojiStockbook.svelte";

  interface Props {
    visible: boolean;
  }
  let { visible = $bindable(false) }: Props = $props();

  const stockbook = createEmojiStockbookContext();

  export const show = () => {
    visible = true;
  };
  export const close = () => {
    visible = false;
    stockbook.resetState();
  };
  export const setEmojiDataset = (dataset: Emoji[] | EmojiGroup[]) => {
    stockbook.setEmojiDataset(dataset);
  };
</script>

{#if visible}
  <EmojiStockbook />
{/if}
