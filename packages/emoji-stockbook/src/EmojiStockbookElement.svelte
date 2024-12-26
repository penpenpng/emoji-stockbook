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
  import { useContentRegion } from "@/lib/use-content-region";
  import {
    type ComponentEventDispatcher,
    useCustomElementEventDispatcher,
  } from "@/lib/use-custom-element-event-dispatcher";
  import { useCustomElementProperty } from "@/lib/use-custom-element-property";
  import { useEmojiRepository } from "@/lib/use-emoji-repository";
  import { useFoldables } from "@/lib/use-foldables";
  import { usePreviewFeature } from "@/lib/use-preview-feature";
  import { useSearchFeature } from "@/lib/use-search-feature";
  import { useShortcutFeature } from "@/lib/use-shortcut-feature";
  import { useLangResolver } from "@/lib/use-translation";
  import EmojiStockbook from "./components/EmojiStockbook.svelte";

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
    --font-color: var(--esb-font-color, black);
    --small-font-color: var(--esb-small-font-color, gray);
    --icon-color: var(--esb-icon-color, gray);
    --font-family: var(
      --esb-font-family,
      "Helvetica Neue",
      Arial,
      "Hiragino Kaku Gothic ProN",
      "Hiragino Sans",
      Meiryo,
      sans-serif
    );
    --emoji-font-family: var(
      --esb-emoji-font-family,
      "Twemoji Mozilla",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji",
      "EmojiOne Color",
      "Android Emoji",
      sans-serif
    );
  }
</style>
