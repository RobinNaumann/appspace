import { Card, Column, Field, Text } from "elbe-ui";
import { useState } from "preact/hooks";
import { AppListBit } from "../bits/b_apps";
import { l10n } from "../service/l10n/l10n";
import { AppModel } from "../service/s_content";

export function AppListView({ sorted }: { sorted: boolean }) {
  return (
    <AppListBit.Provide sorted={sorted}>
      <_AppListView />
    </AppListBit.Provide>
  );
}

function _AppListView() {
  const { map } = AppListBit.use();
  const [search, setSearch] = useState("");

  return map({
    onData: (apps) => (
      <Column>
        <Field.text hint={l10n.search} value={search} onInput={setSearch} />
        {apps
          .filter((a) =>
            [a.name, a.about, a.tagline].join(";").includes(search)
          )
          .map((app) => _AppSnippet({ app }))}
      </Column>
    ),
  });
}

function _AppSnippet({ app }: { app: AppModel }) {
  return (
    <a href={"/" + app.key} style="text-decoration: none">
      <Card
        scheme="primary"
        class="row pointer app-card"
        //onTap={go("/" + app.key)}
        //style="cursor: pointer "
      >
        <img
          src={app.icon}
          class="icon"
          style={{
            width: "3rem",
            height: "3rem",
            objectFit: "contain",
          }}
        />
        <div class="column cross-stretch gap-quarter flex-1">
          <div class="row cross-stretch">
            <Text.l bold v={app.name} class="flex-1" />
            <AppPlatforms app={app} />
          </div>
          <div>{app.tagline}</div>
        </div>
      </Card>
    </a>
  );
}

export function AppPlatforms({ app }: { app: AppModel }) {
  if (app.releases.length === 0) return null;
  const dls = app.releases[app.releases.length - 1].downloads;
  const platforms = dls.map((dl) => dl.platform);
  return (
    <div class="row gap-half">
      {platforms.map((platform) => (
        <Text.s italic v={platform} />
      ))}
    </div>
  );
}
