import { nothing } from "lit";

export const ifNeeded = <T>(needed: boolean, x: T): T | typeof nothing =>
  needed ? x : nothing;

export const ariaBoolean = (v: unknown): "true" | "false" =>
  v ? "true" : "false";
