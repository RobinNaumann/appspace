import { Card, Row } from "elbe-ui";
import { ThemeBit } from "../../../bits/b_theme";
import { l10n } from "../../../service/l10n/l10n";
import { AppModel } from "../../../service/s_content";
import { AppSection } from "../v_app";

function _platformImagePath(platform: string): string {
  const p = platform.toLowerCase().trim();
  return `./assets/img/icon_device_${
    ["android", "ios", "web"].includes(p) ? p : "other"
  }.svg`;
}

export function PlatformImage({ platform }: { platform: string }) {
  const themeBit = ThemeBit.use();
  return themeBit.onData((d) => (
    <img
      src={_platformImagePath(platform)}
      class="svg-inherit"
      style={{
        width: "1.7rem",
        height: "1.7rem",
        objectFit: "contain",
        filter: d.dark ? "invert(1)" : "invert(0)",
      }}
    ></img>
  ));
}

export function PlatformsSection({ app }: { app: AppModel }) {
  const lastRelease =
    app.releases?.length > 0 ? app.releases[app.releases.length - 1] : null;
  return (
    <AppSection title={l10n.app.platforms}>
      <Row wrap>
        {lastRelease?.downloads.map((download) => (
          <_PlatformCard platform={download.platform} />
        ))}
      </Row>
    </AppSection>
  );
}

function _PlatformCard({ platform }: { platform: string }) {
  const themeBit = ThemeBit.use();
  return (
    <Card
      scheme="secondary"
      class=" row gap-half"
      style={{ padding: ".8rem .9rem" }}
    >
      <PlatformImage platform={platform} />
      {platform}
    </Card>
  );
}
