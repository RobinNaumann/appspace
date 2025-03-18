import { useSignal } from "@preact/signals";
import { ChooseButton, Icons, Text } from "elbe-ui";
import { l10n } from "../service/l10n/l10n";
import { appConfig } from "../service/s_config";
import { AppListView } from "./v_apps_list";

export function HomeView({}) {
  const sortSignal = useSignal(false);

  return (
    <div class="base-limited column cross-stretch gap-double padded">
      {appConfig().message ? (
        <p dangerouslySetInnerHTML={{ __html: appConfig().message }}></p>
      ) : null}
      <Text.h3 v={l10n.myapps} />
      <div class="row-resp resp-reversed gap-double">
        <div class="column cross-stretch main-start flex-3">
          <AppListView sorted={sortSignal.value} />
        </div>
        <div class="column flex-1 cross-stretch">
          <ChooseButton
            items={[
              { value: false, label: l10n.recent, icon: Icons.Clock },
              { value: true, label: l10n.sorted, icon: Icons.ArrowDownAZ },
            ]}
            value={sortSignal.value}
            onChange={(v) => (sortSignal.value = v)}
            column={true}
          />
        </div>
      </div>
    </div>
  );
}
