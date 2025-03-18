import { ContentService } from "./s_content";

export interface Config {
  logo: string;
  logo_dark?: string;
  logo_height: number;
  home_link: string | null;
  message: string | null;
  show_source_button: boolean;
  show_dark_button: boolean;
  dark: boolean | "auto";
}

const _defaults: Config = {
  logo: "./icon_long.png",
  logo_height: 1.1,
  home_link: "/",
  message: null,
  show_source_button: true,
  show_dark_button: true,
  dark: "auto",
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
