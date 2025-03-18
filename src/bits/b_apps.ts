import { CtrlBit, WorkerControl } from "elbe-ui";
import { AppModel, ContentService } from "../service/s_content";

type Inputs = { sorted: boolean };
type Data = AppModel[];

class Ctrl extends WorkerControl<Inputs, Data> {
  async worker() {
    const apps = await ContentService.i.getAppList();
    if (this.p.sorted) {
      apps.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else {
      apps.sort((a, b) => {
        // sort by latest release date:
        const aDate = a.releases?.[a.releases.length - 1]?.date;
        const bDate = b.releases?.[b.releases.length - 1]?.date;
        if (aDate && bDate) return bDate.localeCompare(aDate);
      });
    }
    return apps;
  }
}

export const AppListBit = CtrlBit<Inputs, Data, Ctrl>(
  (p, b) => new Ctrl(p, b),
  "AppList"
);
