<svelte:options
  customElement={{
    tag: "emoji-stockbook",
    props: {
      emojisets: { reflect: true, type: "String", attribute: "emojisets" },
      col: { reflect: true, type: "Number", attribute: "col" },
      i18n: { reflect: false, type: "Object", attribute: "i18n" },
      lang: { reflect: true, type: "String", attribute: "lang" },
      shortcut: { reflect: false, type: "Object", attribute: "shortcut" },
    },
  }}
/>

<script lang="ts">
  import EmojiStockbook from "./components/EmojiStockbook.svelte";
  import { useEmojiRepository } from "./lib/use-emoji-repository";
  import {
    useCustomElementEventDispatcher,
    type ComponentEventDispatcher,
  } from "./lib/use-custom-element-event-dispatcher";
  import { useSearchFeature } from "./lib/use-search-feature";
  import { useContentRegion } from "./lib/use-content-region";
  import { useFoldables } from "./lib/use-foldables";
  import { useShortcutFeature } from "./lib/use-shortcut-feature";
  import { useCustomElementProperty } from "./lib/use-custom-element-property";
  import { useLangResolver } from "./lib/use-translation";
  import { usePreviewFeature } from "./lib/use-preview-feature";

  const props = $props();
  useCustomElementProperty.setup(props);

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

  useCustomElementEventDispatcher.setup(dispatchComponentEvent);

  useEmojiRepository.setup();
  useSearchFeature.setup();
  useContentRegion.setup();
  useFoldables.setup();
  useLangResolver.setup();
  useShortcutFeature.setup();
  usePreviewFeature.setup();
</script>

<EmojiStockbook />

<style>
  :host {
    /* TODO: color */
    --background-color: var(--esb-background-color, #e6fcca);
    --height: var(--esb-height, 450px);
    --cell-size: var(--esb-cell-size, 32px);
    --cell-gap: var(--esb-cell-gap, 4px);
  }
</style>
