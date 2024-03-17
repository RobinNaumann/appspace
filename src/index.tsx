import { Component, render } from "preact";
import "../style/elbe/elbe.scss";
import "../style/google.scss";
import "../style/base.scss";
import { Loader2 } from "lucide-react";
import { Route, Router, route } from "preact-router";
import { useEffect } from "preact/hooks";
import { HomeView } from "./view/v_home";
import { HeaderView } from "./view/v_header";
import { FooterView } from "./view/v_footer";
import { AppView } from "./view/app/v_app";

export const appInfo = {
  name: "degu appSpace",
  version: "0.2.9",
  repo: "https://gitlab.com/constorux/appspace",
};

function _Router({}) {
  return (
    <Router>
      <Route path="/" component={HomeView} />
      <Route path="/:app_id?" component={AppView} />
    </Router>
  );
}

class App extends Component {
  // some method that returns a promise

  render() {
    return (
      <div>
        <HeaderView />

        <_Router />

        <FooterView />
        <div style="height:0px width: 0px; border: solid 1px transparent"></div>
      </div>
    );
  }
}

function Root() {
  return (
    <div class="content-base elbe-base primary">
      <App />
    </div>
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

render(<Root />, document.getElementById("app"));
