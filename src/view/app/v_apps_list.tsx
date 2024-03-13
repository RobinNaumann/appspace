import { AppBit } from "../../bits/b_app";
import { AppListBit } from "../../bits/b_apps";
import { AppModel } from "../../service/s_content";
import { go } from "../../util";

export function AppListView({ sorted }: { sorted: boolean }) {
  return (
    <AppListBit.Provide sorted={sorted}>
      <_AppListView />
    </AppListBit.Provide>
  );
}

function _AppListView() {
  const { map } = AppListBit.use();

  return map({
    onData: (apps) => (
      <div class="column cross-stretch">
        {apps.map((app) => _AppSnippet({ app }))}
      </div>
    ),
  });
}

function _AppSnippet({ app }: { app: AppModel }) {
  return (
    <div class="card primary row" onClick={go("/" + app.key)}>
      <img src={app.icon} class="icon" style="width: 3rem" />
      <div class="column cross-stretch gap-quarter flex-1">
        <div class="row cross-stretch">
          <div class="text-l b flex-1">{app.name}</div>
          <AppPlatforms platforms={app.platforms} />
        </div>
        <div>{app.tagline}</div>
      </div>
    </div>
  );
}

export function AppPlatforms({ platforms }: { platforms: string[] }) {
  return (
    <div class="row gap-half">
      {platforms.map((platform) => (
        <span class="text-s i">{platform}</span>
      ))}
    </div>
  );
}
