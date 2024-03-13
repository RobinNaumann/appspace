import { PreactContext, createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { Spinner } from "..";
import { Signal, useSignal } from "@preact/signals";
import logger from "pino";
import { log } from "../util";

interface BitData<C, T> {
  ctrl: C;
  state: Signal<BitState<T>>;
}

export interface BitState<T> {
  loading?: boolean;
  error?: any;
  data?: T;
}

export type BitContext<T, C> = PreactContext<BitData<T, C>>;

export interface TriMap<T, D> {
  onLoading?: () => D;
  onError?: (e: string) => D;
  onData?: (value: T) => D;
}

export interface TWParams<T> {
  emit: (t: T) => void;
  emitLoading: () => void;
  emitError: (e: any) => void;
  map: <D>(m: TriMap<T, D>) => D;
}

export function makeBit<C, T>(name: string): BitContext<C, T> {
  const c = createContext<BitData<C, T>>(null);
  c.displayName = name;
  return c;
}

export function ProvideBit<I, C, T>(
  context: BitContext<C, T>,
  parameters: I,
  worker: (p: I, d: TWParams<T>, ctrl: C) => void,
  ctrl: (p: I, d: TWParams<T>) => C,
  children: any
) {
  const s = useSignal<BitState<T>>({ loading: true });

  const _set = (n: BitState<T>) => {
    if (JSON.stringify(n) === JSON.stringify(s.peek())) return;
    s.value = n;
  };

  const emit = (data: T) => _set({ data });
  const emitLoading = () => _set({ loading: true });
  const emitError = (error: any) => {
    log.warn(error, `BIT: ${context.displayName} emitted ERROR`);
    return _set({ error });
  };

  function map<D>(m: TriMap<T, D>) {
    const st = s.value;
    if (st.loading) return m.onLoading();
    if (st.error) return m.onError(st.error);
    return m.onData(st.data);
  }

  const c = ctrl(parameters, { emit, emitLoading, emitError, map });
  worker(parameters, { emit, emitLoading, emitError, map }, c);

  return (
    <context.Provider value={{ ctrl: c, state: s }}>
      {children}
    </context.Provider>
  );
}

export function useBit<C, T>(context: PreactContext<BitData<C, T>>) {
  try {
    const { ctrl, state } = useContext(context);
    const v = state.value;

    function map<D>(m: TriMap<T, D>) {
      if (v.loading) return (m.onLoading || (() => null))() || <Spinner />;
      if (v.error)
        return (
          (m.onError || ((_) => null))(v.error) || (
            <div class="centered" style="text-align:center">
              could not
              <br />
              load
              <br />
            </div>
          )
        );
      return m.onData(v.data);
    }
    return { signal: state, ctrl, map };
  } catch (e) {
    const err = `BIT ERROR: NO ${context.displayName} PROVIDED`;
    log.error(e);
    return { map: (_: any) => err, ctrl: null, signal: null };
  }
}
