import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pl", "en", "ua", "ru", "de", "cz", "sk", "it", "sl"],
  defaultLocale: "pl",
});
