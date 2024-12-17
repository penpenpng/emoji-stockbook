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
  import { onMount } from "svelte";
  import { useEmojiRepository } from "./lib/use-emoji-repository";
  import {
    useCustomElementEventDispatcher,
    type ComponentEventDispatcher,
  } from "./lib/use-custom-element-event-dispatcher";
  import { useSearchFeature } from "./lib/use-search-feature";
  import { useContentRegion } from "./lib/use-content-region";
  import { useSkintoneFeature } from "./lib/use-skintone-feature";
  import { useFoldables } from "./lib/use-foldables";
  import { useShortcutFeature } from "./lib/use-shortcut-feature";
  import { useCustomElementProperty } from "./lib/use-custom-element-property";
  import { useLangResolver } from "./lib/use-translation";

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
  useSkintoneFeature.setup();
  useFoldables.setup();
  useLangResolver.setup();
  useShortcutFeature.setup();

  const repo = useEmojiRepository();
  const dispatch = useCustomElementEventDispatcher();
  const searchFeature = useSearchFeature();
  const contentRegion = useContentRegion();
  const skintoneFeature = useSkintoneFeature();
  const shortcutFeature = useShortcutFeature();

  // TODO: repo はもう reactive なのでいらなくなった
  const resetComponentState = () => {
    contentRegion.reset();
    searchFeature.reset();
    skintoneFeature.reset();
    shortcutFeature.reset();
  };

  let initialized = false;

  onMount(() => {
    initialized = true;
    dispatch("initialized");
  });

  // TODO: mounted まで使えないのをどうにかできないか
  // https://svelte.dev/docs/svelte/custom-elements#Component-options の extend が役に立つかもしれない
  export const isInitialized = () => initialized;
</script>

<EmojiStockbook />
