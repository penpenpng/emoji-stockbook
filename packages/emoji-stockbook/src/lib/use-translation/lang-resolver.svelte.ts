import { customElementScopedValue } from "../custom-element-scoped-value";
import { useCustomElementProperty } from "../use-custom-element-property";

export interface ILangResolver {
  readonly lang: string;
  cleanup(): void;
}

export class LangResolver implements ILangResolver {
  private props = useCustomElementProperty();
  private defaultLang = $state<string | null>(null);

  lang = $derived.by(() => this.props.lang ?? this.defaultLang ?? "en");

  constructor() {
    window.addEventListener("languagechange", this.updateLang);
  }

  cleanup() {
    window.removeEventListener("languagechange", this.updateLang);
  }

  private updateLang = (() => {
    this.defaultLang = this.detectLang();
  }).bind(this);

  private detectLang(): string {
    return document.documentElement.lang ?? navigator.language;
  }
}

export const useLangResolver = customElementScopedValue(
  (): ILangResolver => new LangResolver(),
  (resolver: ILangResolver) => resolver.cleanup()
);
