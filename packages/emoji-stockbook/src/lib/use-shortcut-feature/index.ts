import { customElementScopedValue } from "../custom-element-scoped-value";
import {
  type IShortcutFeature,
  ShortcutFeature,
} from "./shortcut-feature.svelte";

export const useShortcutFeature = customElementScopedValue(
  (): IShortcutFeature => new ShortcutFeature(),
);
