import { customElementScopedValue } from "@/lib/custom-element-scoped-value";
import {
  type IShortcutFeature,
  ShortcutFeature,
} from "./shortcut-feature.svelte";

export type { IShortcutFeature };

export const useShortcutFeature = customElementScopedValue(
  (): IShortcutFeature => new ShortcutFeature()
);
