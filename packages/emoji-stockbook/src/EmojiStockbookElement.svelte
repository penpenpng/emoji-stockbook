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

  const rootProps = useCustomElementProperty();
</script>

<div style:--col={rootProps.col}>
  <EmojiStockbook />
</div>

<style>
  :host {
    display: block;
    width: min-content;

    /* TODO: color */
    --background-color: var(--esb-background-color, #e6fcca);
    --cell-size: var(--esb-cell-size, 40px);
    --cell-emoji-size: var(--esb-cell-emoji-size, 40px);
    --height: var(--esb-height, 460px);
    --width: var(--esb-width);
    --font-color: var(--esb-font-color, black);
    --font-color-small: var(--esb-font-color-small, gray);
    --font-color-icon: var(--esb-font-color-icon, gray);
    --font-family: var(
      --esb-font-family,
      "Helvetica Neue",
      Arial,
      "Hiragino Kaku Gothic ProN",
      "Hiragino Sans",
      Meiryo,
      sans-serif
    );
    --font-family-emoji: var(
      --esb-font-family-emoji,
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
