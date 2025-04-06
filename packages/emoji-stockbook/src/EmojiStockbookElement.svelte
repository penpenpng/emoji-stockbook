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
    --cell-size: var(--esb-cell-size, 40px);
    --cell-emoji-size: var(--esb-cell-emoji-size, 40px);
    --height: var(--esb-height, 460px);
    --width: var(--esb-width);
    --background-color-control: var(
      --esb-background-color-control,
      transparent
    );
    --background-color-content: var(
      --esb-background-color-content,
      transparent
    );
    --background-color-info: var(--esb-background-color-info, transparent);
    --color-control-text: var(--esb-color-control-text, rgb(100 116 139));
    --color-control-inactive: var(
      --esb-color-control-inactive,
      oklch(92.8% 0.006% 264.531deg)
    );
    --color-control-active: var(--esb-color-control-active, rgb(59 130 246));
    --font-color: var(--esb-font-color, inherit);
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
