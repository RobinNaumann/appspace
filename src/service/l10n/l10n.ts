import { _de_DE } from "./de_DE";
import { _en_US } from "./en_US";

export let l10n: L10nData = null;

type s = string;
type n = number;

export interface L10nData {
  myapps: s;
  recent: s;
  sorted: s;
  search: s;
  developed_in: s;
  imprint: s;
  app: {
    about: s;
    platforms: s;
    authors: s;
    versions: s;
    website: s;

    download: s;
    download_for: s;
    download_not_available: s;
    downloading_for: (p: s) => s;
    open: s;
    source: s;
    donate: s;
  };
}

export function l10nInit() {
  // supported locales:
  const _data: { [l: s]: L10nData } = {
    en_US: _en_US,
    de_DE: _de_DE,
  };

  const lang = navigator.language;
  const langParts = lang.split("-");
  const bl = langParts[0];

  let l = Object.keys(_data).find((l) => l.startsWith(bl));
  let d = _data[l] ?? {};

  l10n = { ..._data.en_US, ...d };
}
