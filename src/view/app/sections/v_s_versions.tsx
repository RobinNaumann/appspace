import { useSignal } from "@preact/signals";
import {
  Button,
  Card,
  Column,
  ElbeDialog,
  Row,
  showToast,
  Text,
} from "elbe-ui";
import { Download, Globe } from "lucide-react";
import { l10n } from "../../../service/l10n/l10n";
import { AppDownload, AppModel, AppRelease } from "../../../service/s_content";
import { AppSection } from "../v_app";
import { PlatformImage } from "./v_s_platforms";

export function ReleasesSection({ app }: { app: AppModel }) {
  return (
    <AppSection title={l10n.app.versions}>
      {app.releases.reverse().map((release) => _ReleaseView({ release }))}
    </AppSection>
  );
}

function _ReleaseView({ release }: { release: AppRelease }) {
  return (
    <Card class="row bordered">
      <Column flex={1}>
        <Row>
          <Text.l bold v={release.version} />
          {release.date && <div class="flex-1 text-s">({release.date})</div>}
        </Row>

        <span class="text-justify">{release.notes ?? "-"}</span>
      </Column>
      <DownloadView release={release} iconOnly={true} buttonType="flat" />
    </Card>
  );
}

export function DownloadView({
  release,
  iconOnly = false,
  buttonType = "major",
}: {
  iconOnly?: boolean;
  release: AppRelease;
  buttonType?: "major" | "minor" | "flat";
}) {
  function download(dl: AppDownload) {
    openS.value = false;
    showToast(l10n.app.downloading_for(dl.platform));
    open(dl.url, "_self");
  }

  const openS = useSignal(false);
  return (
    <Column>
      <Button
        manner={buttonType}
        icon={Download}
        label={iconOnly ? "" : l10n.app.download}
        onTap={() => {
          if (release.downloads.length == 0) {
            showToast(l10n.app.download_not_available);
            return;
          }
          if (release.downloads.length == 1) {
            download(release.downloads[0]);
            return;
          }
          openS.value = true;
        }}
      />
      <_openWebButton release={iconOnly ? null : release} />
      <ElbeDialog
        open={openS.value}
        //icon={<Download style="margin-right: -0.5rem;margin-left: 1rem" />}
        title={l10n.app.download_for}
        onClose={() => (openS.value = false)}
      >
        <div class="column cross-stretch" style="min-width: 300px">
          {release.downloads.map((dl) => (
            <Button.plain
              icon={<PlatformImage platform={dl.platform} />}
              label={dl.platform}
              onTap={() => download(dl)}
            />
          ))}
        </div>
      </ElbeDialog>
    </Column>
  );
}

function _openWebButton({ release }: { release: AppRelease }) {
  const web = release?.downloads.find(
    (dl) => dl.platform.toLowerCase() == "web"
  );

  if (!web) return null;

  return (
    <Button.minor
      icon={Globe}
      label={l10n.app.open}
      onTap={() => {
        open(web.url, "_self");
      }}
    />
  );
}
