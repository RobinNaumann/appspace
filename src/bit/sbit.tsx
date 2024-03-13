import { ReadonlySignal, Signal, computed, useSignal } from "@preact/signals";
import { BitState, TriMap } from "./bit";
import { useEffect } from "preact/hooks";

interface Ctrl {
  reload(): Promise<void>;
}

type _SBitMap<D, R> = ReadonlySignal<
  (m: {
    onLoading?: () => R;
    onError?: (e: any) => R;
    onData: (d: D) => R;
  }) => any
>;

export function SBit<D>(worker: () => Promise<D>): {
  s: Signal<BitState<D>>;
  ctrl: Ctrl;
  map: _SBitMap<D, preact.JSX.Element>;
} {
  const s = useSignal<BitState<D>>({ loading: true });

  const reload = async () => {
    //s.value = { loading: true };
    try {
      const v = await worker();
      s.value = { data: v, loading: false };
    } catch (e) {
      console.error(e);
      s.value = { error: e, loading: false };
    }
  };

  const map = computed(() => {
    function map<T>(m: {
      onLoading: () => T;
      onError: (e: any) => T;
      onData: (d: D) => T;
    }) {
      return computed(() => {
        const v = s.value;
        if (v.loading)
          return m.onLoading?.() ?? <div class="i">loading...</div>;
        if (v.error) return m.onError?.(v.error) ?? <div class="i">error</div>;
        return m.onData(v.data);
      });
    }
    return map;
  });

  reload();

  return { s, ctrl: { reload }, map: map };
}
