import khmer from "~/locales/km.json";

export type Locale = "en" | "km";
const messages: Record<string, string> = khmer;

/** The URL is authoritative, so both languages can be shared and prerendered. */
export function useLocale() {
  const route = useRoute();
  const locale = computed<Locale>(() =>
    /^\/km(?:\/|$)/.test(route.path) ? "km" : "en",
  );
  function t(message: string, values: Record<string, string | number> = {}) {
    const text = locale.value === "km" ? messages[message] ?? message : message;
    return text.replace(/\{(\w+)\}/g, (match, key: string) =>
      values[key] === undefined ? match : String(values[key]),
    );
  }
  function localePath(path: string, target: Locale = locale.value) {
    const [, pathname = "/", suffix = ""] = path.match(/^([^?#]*)(.*)$/)!;
    const unprefixed = pathname.replace(/^\/km(?=\/|$)/, "") || "/";
    const normalized = unprefixed.startsWith("/") ? unprefixed : `/${unprefixed}`;
    return (target === "en" ? normalized : `/km${normalized === "/" ? "" : normalized}`) + suffix;
  }
  function rememberLocale(target: Locale) {
    try {
      localStorage.setItem("romlerk-language", target);
    } catch {
      // Navigation still works when browser storage is unavailable.
    }
  }
  return { locale, t, localePath, rememberLocale };
}
