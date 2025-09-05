import { useEffect } from "preact/hooks";
import { appConfig } from "../../service/s_config";
import { AppModel } from "../../service/s_content";
import { moewe } from "../../service/s_moewe";

function _setPageMeta(app: AppModel) {
  document.title = `${app.name} - ${appConfig().title}`;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", app.about);
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", app.name);
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", app.about);
  document
    .querySelector('meta[property="og:image"]')
    ?.setAttribute("content", app.screenshots[0]);
  document
    .querySelector('meta[property="og:url"]')
    ?.setAttribute("content", window.location.href);
}

export function PageMetaSetter({ app }: { app: AppModel }) {
  useEffect(() => {
    console.log("setting page meta");
    _setPageMeta(app);
    moewe.event("open_app", { app_name: app.name });
  }, [app]);

  return <div style="display: none" />;
}
