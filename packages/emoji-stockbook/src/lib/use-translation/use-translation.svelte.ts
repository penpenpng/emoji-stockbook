import { useCustomElementProperty } from "../use-custom-element-property";
import { useLangResolver } from "./lang-resolver.svelte";
import resourceEn from "../locales/en.json";

export type I18nResource = Record<
  string /* language code */,
  Record<string /* key */, string /* value */>
>;

export const useTranslation = () => {
  const props = useCustomElementProperty();
  const langResolver = useLangResolver();

  const i18n = $derived(props.i18n);
  const lang = $derived(langResolver.lang);

  const t = (key: string): string => {
    const value = $derived(getTranslation(i18n, lang)[key] ?? key);
    return value;
  };

  return { t };
};

function getTranslation(
  resource: I18nResource,
  lang: string,
): Record<string, string> {
  if (resource[lang]) {
    return resource[lang];
  }

  for (const rkey of Object.keys(resource)) {
    if (rkey.toLowerCase().slice(0, 2) === lang.toLowerCase().slice(0, 2)) {
      return resource[rkey];
    }
  }

  return resourceEn;
}
