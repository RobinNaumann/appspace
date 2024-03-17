import { ChevronDown, ChevronUp, SortDesc, Timer } from "lucide-react";
import { signal, useSignal } from "@preact/signals";
import { AppListView } from "./app/v_apps_list";
import { Config, ContentService } from "../service/s_content";
import { useEffect } from "preact/hooks";

export function HomeView({}) {
  const cfgS = useSignal<Config | null>(null);
  useEffect(() => {
    ContentService.i.getConfig().then((cfg) => (cfgS.value = cfg));
  }, []);
  const sortSignal = useSignal(true);

  return (
    <div class="base-limited column cross-stretch gap-double">
      {cfgS.value?.heromsg ? (
        <p>
          <b>hey there :)</b>
          <br /> these are some projects I worked on in my free time.
          <br />
          yours, <a href="https://robbb.in">Robin</a>
        </p>
      ) : null}
      <h3>my apps</h3>

      <div class="row-resp resp-reverse gap-double">
        <div class="column cross-stretch main-start flex-3">
          <AppListView sorted={sortSignal.value} />
        </div>
        <div class="column flex-1 cross-stretch">
          <div
            class="card column cross-stretch gap-none"
            style="padding: 0; overflow: clip"
          >
            <button
              class={
                "margin-none sharp text-left " +
                (sortSignal.value ? "loud minor" : "integrated")
              }
              onClick={() => {
                sortSignal.value = true;
              }}
            >
              <Timer /> <div>recent</div>
            </button>
            <button
              class={
                "margin-none sharp text-left " +
                (!sortSignal.value ? "loud minor" : "integrated")
              }
              onClick={() => (sortSignal.value = false)}
            >
              <SortDesc /> <div>sorted</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
