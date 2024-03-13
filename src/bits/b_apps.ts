import { act } from "preact/test-utils";
import { CtrlBit, WorkerControl } from "../bit/ctrl_bit";
import { AppModel, ContentService } from "../service/s_content";

type Inputs = { sorted: boolean };
type Data = AppModel[];

class Ctrl extends WorkerControl<Inputs, Data> {
  async worker() {
    const apps = await ContentService.i.getAppList();
    if (this.p.sorted) {
      apps.sort((a, b) => {
        return a.releases[0].date > b.releases[0].date ? -1 : 1;
      });
    }
    return apps;
  }
}

export const AppListBit = CtrlBit<Inputs, Data, Ctrl>(
  (p, b) => new Ctrl(p, b),
  "AppList"
);
