import { CtrlBit, WorkerControl } from "elbe-ui";
import { appConfig } from "../service/s_config";

type Inputs = {};
type Data = {
  dark: boolean;
};

function _setBodyBg(dark: boolean) {
  for (let e of [
    document.documentElement,
    document.body,
    document.getElementById("app"),
  ]) {
    e.style.backgroundColor = dark ? "#000" : "#fff";
  }
}

class Ctrl extends WorkerControl<Inputs, Data> {
  async worker() {
    const c = appConfig();

    const dark =
      c.dark === "auto"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : c.dark;

    _setBodyBg(dark);
    return { dark: dark };
  }

  toggleDark() {
    this.act(async (d) => {
      _setBodyBg(!d.dark);
      this.bit.emit({
        ...d,
        dark: !d.dark,
      });
    });
  }
}

export const ThemeBit = CtrlBit<Inputs, Data, Ctrl>(
  (p, b) => new Ctrl(p, b),
  "Theme"
);
