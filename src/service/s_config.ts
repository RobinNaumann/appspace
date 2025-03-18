import { ContentService } from "./s_content";

export interface Config {
  logo: string | null;
  logo_dark?: string;
  logo_height: number;

  imprint: string | null;

  title: string;
  message: string | null;
  show_source_button: boolean;
  show_dark_button: boolean;

  theme_accent: string;
  theme_dark: boolean | "auto";

  moewe_url: string | null;
  moewe_project: string | null;
  moewe_app: string | null;

  spa?: boolean;
}

const _defaults: Config = {
  logo: null,
  logo_height: 1.1,
  imprint: null,
  title: "indipendent apps",
  message: null,
  show_source_button: true,
  show_dark_button: true,
  theme_accent: "#323652",
  theme_dark: "auto",
  // moewe
  moewe_url: null,
  moewe_project: null,
  moewe_app: null,

  spa: false,
};

// ========= Service =========

let _appConfig: Config = null;

export function appConfig(): Config {
  if (!_appConfig) {
    throw new Error("Config not loaded yet. Call loadAppConfig() first.");
  }
  return _appConfig;
}

export async function loadAppConfig(): Promise<void> {
  const config = (await ContentService.i._cfg()).config ?? null;
  _appConfig = { ..._defaults, ...config };
}
