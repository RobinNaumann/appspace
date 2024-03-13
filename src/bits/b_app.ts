import { CtrlBit, WorkerControl } from "../bit/ctrl_bit";
import { AppModel, AppsService } from "../service/s_apps";

type Inputs = { _id: string };
type Data = AppModel;

class Ctrl extends WorkerControl<Inputs, Data> {
  async worker() {
    return AppsService.i.getApp(this.p._id);
  }
}

export const AppBit = CtrlBit<Inputs, Data, Ctrl>(
  (p, b) => new Ctrl(p, b),
  "App"
);
