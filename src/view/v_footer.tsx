import {
  CheckCircle,
  Circle,
  Plus,
  Trash,
  Trash2,
  Trash2Icon,
  X,
} from "lucide-react";
import { imsg } from "../util";
import { appVersion } from "..";

export function FooterView() {
  return (
    <div class="footer">
      {imsg({
        en: "degu Appspace written by",
        de: "degu Appspace geschrieben von",
      })}
      &nbsp;
      <a href="https://robbb.in">Robin</a>.<br />v{appVersion}{" "}
      <a href="https://gitlab.com/constorux/appspace">source code</a>
      &nbsp;<a href="https://robbb.in/impressum.html">imprint/impressum</a>
      <div class="i" style="margin-top: 10px">
        developed in{" "}
        <img
          style="height: 1rem; vertical-align: middle; margin-right: 0.5rem"
          src="https://raw.githubusercontent.com/nicolindemann/hamburg-icon/master/hamburg-icon.png"
        />
        Hamburg, Germany
      </div>
    </div>
  );
}
