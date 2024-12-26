import { customElementScopedValue } from "@/lib/custom-element-scoped-value";
import { type IFoldables, Foldables } from "./foldables";

export type { IFoldables };

export const useFoldables = customElementScopedValue(
  (): IFoldables => new Foldables()
);
