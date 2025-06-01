import { scoped, ScopedValue } from "@/lib/custom-element-scoped-value";
import { useCustomElementProperty } from "@/lib/use-custom-element-property.svelte";

export interface ILangResolver {
  readonly lang: string;
  cleanup(): void;
}

export class LangResolver extends ScopedValue {
  private props = useCustomElementProperty();
  private defaultLang = $state<string | null>(null);

  lang = $derived.by(() => this.props.lang ?? this.defaultLang ?? "en");

  constructor() {
    super();
    window.addEventListener("languagechange", this.updateLang);
  }

  [Symbol.dispose]() {
    window.removeEventListener("languagechange", this.updateLang);
  }

  private updateLang = (() => {
    this.defaultLang = this.detectLang();
  }).bind(this);

  private detectLang(): string {
    return document.documentElement.lang ?? navigator.language;
  }
}

export const useLangResolver = scoped(LangResolver);
