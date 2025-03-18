import * as moewe_pkg from "moewe";
import { appConfig } from "./s_config";

export let moewe: moewe_pkg.Moewe | null = null;

export async function moeweInit() {
  const c = appConfig();
  if (!c.moewe_url || !c.moewe_project || !c.moewe_app) return;

  await new moewe_pkg.Moewe({
    host: c.moewe_url,
    project: c.moewe_project,
    app: c.moewe_app,
  }).init();

  moewe = moewe_pkg.moewe();

  moewe.events.appOpen({
    referrer: document.referrer,
  });
}
