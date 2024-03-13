import { Signal } from "@preact/signals";
import {
  BitContext,
  BitState,
  ProvideBit,
  TWParams,
  TriMap,
  makeBit as mb,
  useBit,
} from "./bit";
import { JSX } from "preact/jsx-runtime";

abstract class BitControl<I, DT> {
  p: I;
  bit: TWParams<DT>;

  constructor(p: I, bit: TWParams<DT>) {
    this.bit = bit;
    this.p = p;
  }
}

export abstract class WorkerControl<I, DT> extends BitControl<I, DT> {
  reload: () => Promise<void> = null;

  abstract worker(): Promise<DT>;
}

export abstract class StreamControl<I, DT> extends BitControl<I, DT> {
  abstract listen(): Promise<void>;
}

function make<I, DT, C extends BitControl<I, DT>>(
  name: string
): BitContext<C, DT> {
  return mb<C, DT>(name);
}

function use<I, DT, C extends BitControl<I, DT>>(b: BitContext<C, DT>) {
  return useBit<C, DT>(b);
}

export function CtrlBit<I, DT, C extends BitControl<I, DT>>(
  ctrl: (p: I, d: TWParams<DT>) => C,
  name?: string
): {
  Provide: (props: I & { children: React.ReactNode }) => JSX.Element;
  use: () => {
    signal: Signal<BitState<DT>>;
    ctrl: C;
    map: <D>(m: TriMap<DT, D>) => any;
  };
} {
  const context = make<I, DT, C>((name || "Unknown") + "Bit");

  function Provide({ children, ...p }: { children: React.ReactNode } & I) {
    return ProvideBit(
      context,
      p,
      async (p, b, c) => {
        b.emitLoading();

        try {
          if (c instanceof WorkerControl) {
            await c.reload();
          }
          if (c instanceof StreamControl) {
            await c.listen();
          }
        } catch (e) {
          b.emitError(e);
        }
      },

      (p, b) => {
        const c = ctrl(p as I, b);
        if (c instanceof WorkerControl) {
          c.reload = async () => {
            b.emitLoading();
            try {
              b.emit(await c.worker());
            } catch (e) {
              b.emitError(e);
            }
          };
        }
        return c;
      },
      children
    );
  }
  return { Provide: Provide, use: () => use<I, DT, C>(context) };
}
