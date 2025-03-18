import "elbe-ui/dist/elbe.css";

import { ElbeTheme, LayerColor } from "elbe-ui";
import { Loader2 } from "lucide-react";
import { render } from "preact";
import { Route, Router } from "preact-router";
import { ThemeBit } from "./bits/b_theme";
import { l10nInit } from "./service/l10n/l10n";
import { appConfig, loadAppConfig } from "./service/s_config";
import { AppView } from "./view/app/v_app";
import { FooterView } from "./view/v_footer";
import { HeaderView } from "./view/v_header";
import { HomeView } from "./view/v_home";

export const appInfo = {
  name: "degu appSpace",
  version: "0.2.9",
  repo: "https://github.com/RobinNaumann/appspace",
};

function _Router({}) {
  return (
    <Router>
      <Route path="/" component={HomeView} />
      <Route path="/:app_id?" component={AppView} />
    </Router>
  );
}

function App() {
  const themeBit = ThemeBit.use();
  // some method that returns a promise

  return themeBit.onData((d) => (
    <ElbeTheme
      dark={d.dark}
      seed={{
        color: {
          accent: LayerColor.fromHex(appConfig().theme_accent),
        },
      }}
    >
      <div>
        <HeaderView />

        <_Router />

        <FooterView />
        <div style="height:0px width: 0px; border: solid 1px transparent"></div>
      </div>
    </ElbeTheme>
  ));
}

function Root() {
  return (
    <ThemeBit.Provide>
      <App />
    </ThemeBit.Provide>
  );
}

export function Spinner() {
  return (
    <div style="margin: 5rem 0" class="centered padded">
      {" "}
      <div class="rotate-box">
        <Loader2 />
      </div>
    </div>
  );
}
l10nInit();
await loadAppConfig();
document.title = appConfig().title;

render(<Root />, document.getElementById("app"));
