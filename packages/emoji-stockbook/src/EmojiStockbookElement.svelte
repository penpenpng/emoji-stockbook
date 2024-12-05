<svelte:options
  customElement={{
    tag: "emoji-stockbook",
    props: {
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
  import { useCustomElementVisibility } from "./lib/use-custom-element-visibility";
  import type { EmojiRepositoryDataset } from "@emoji-stockbook/types";
  import { useContentRegion } from "./lib/use-content-region";
  import { useSkintoneFeature } from "./lib/use-skintone-feature";
  import { useFoldables } from "./lib/use-foldables";
  import { useShortcutFeature } from "./lib/use-shortcut-feature";
  import {
    useCustomElementProperty,
    type IEmojiStockbookProperty,
  } from "./lib/use-custom-element-property";
  import { useLangResolver } from "./lib/use-translation";
  import type { I18nResource, ShortcutSectionConfig } from "./types";

  const {
    col = 8,
    i18n = {},
    lang,
    shortcut = true,
  }: {
    col: number;
    i18n: I18nResource;
    lang?: string;
    shortcut: ShortcutSectionConfig | boolean;
  } = $props();

  class EmojiStockbookProperty implements IEmojiStockbookProperty {
    col = $derived(col);
    i18n = $derived(i18n);
    lang = $derived(lang);
    shortcut = $derived(shortcut);
  }

  useCustomElementProperty.setup(new EmojiStockbookProperty());

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
  useCustomElementVisibility.setup();
  useContentRegion.setup();
  useSkintoneFeature.setup();
  useFoldables.setup();
  useLangResolver.setup();
  useShortcutFeature.setup();

  const visibility = useCustomElementVisibility();
  const repo = useEmojiRepository();
  const dispatch = useCustomElementEventDispatcher();
  const searchFeature = useSearchFeature();
  const contentRegion = useContentRegion();
  const skintoneFeature = useSkintoneFeature();
  const shortcutFeature = useShortcutFeature();

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

  $host().addEventListener("hide", () => {
    resetComponentState();
  });

  // TODO: mounted まで使えないのをどうにかできないか
  // https://svelte.dev/docs/svelte/custom-elements#Component-options の extend が役に立つかもしれない
  export const isInitialized = () => initialized;
  export const isVisible = () => visibility.visible;
  export const show = () => visibility.show();
  export const hide = () => visibility.hide();
  export const setEmojiDataset = (dataset: EmojiRepositoryDataset) => {
    repo.setEmojiDataset(dataset);
    resetComponentState();
  };
</script>

{#if visibility.visible}
  <EmojiStockbook />
{/if}
