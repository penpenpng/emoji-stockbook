import { useCustomElementProperty } from "./use-custom-element-property";
import resourceEn from "./locales/en.json";

export const useTranslation = () => {
  const props = useCustomElementProperty();

  const t = (key: string) => {
    let value = $derived(
      props.i18n[props.lang ?? "en"]?.[key] ?? resourceEn[key],
    );
    return value;
  };

  return { t };
};
