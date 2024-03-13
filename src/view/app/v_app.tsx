import { Download, GitBranch, Globe, Heart, Star } from "lucide-react";
import { AppBit } from "../../bits/b_app";
import {
  AppAuthor,
  AppDownload,
  AppModel,
  AppRelease,
} from "../../service/s_content";
import { showConfirmDialog, showToast } from "../../util";
import { ElbeDialog } from "../../elbe/components";
import { useSignal } from "@preact/signals";

export function AppView({ app_id }: { app_id: string | null }) {
  return (
    <AppBit.Provide _id={app_id}>
      <_AppContentView />
    </AppBit.Provide>
  );
}

function _AppContentView() {
  const { map } = AppBit.use();

  return map({
    onData: (app) => (
      <div class="column cross-stretch-fill gap-3">
        <div
          class="base-limited column cross-stretch-fill gap-3"
          style="margin-top: 2rem"
        >
          <_NameSection app={app} />
          <div class="row-resp gap-3 cross-start">
            <div class="flex-2 column cross-stretch-fill gap-3">
              <_AboutSection app={app} />
              <_PlatformsSection app={app} />
            </div>
            <div class="flex-1 column cross-stretch-fill">
              <_ActionsSection app={app} />
            </div>
          </div>
        </div>
        <_ImagesSection app={app} />

        <div class="base-limited row-resp gap-double cross-start">
          <div class="flex-2 column cross-stretch-fill gap-3">
            <_AuthorsSection authors={app.authors} />
            <_ReleasesSection app={app} />
          </div>
          <div class="flex-1 column cross-stretch" />
        </div>
      </div>
    ),
  });
}

function _ActionsSection({ app }: { app: AppModel }) {
  return (
    <div class="column cross-stretch">
      <DownloadView release={app.releases[0]} />
      {app.url ? (
        <button class="action" onClick={() => open(app.url)}>
          <Globe />
          website
        </button>
      ) : null}
      {app.source ? (
        <button class="action" onClick={() => open(app.source)}>
          <Star />
          source
        </button>
      ) : null}
      {app.donate ? (
        <button class="action" onClick={() => open(app.donate)}>
          <Heart />
          donate
        </button>
      ) : null}
    </div>
  );
}

function _NameSection({ app }: { app: AppModel }) {
  return (
    <div class="row cross-center gap-double">
      <img
        src={app.icon}
        alt={app.name + "app"}
        class="icon raised"
        style="width: 5rem"
      />
      <div class="column cross-stretch flex-1">
        <h1 style="margin: 0">{app.name}</h1>
        <div>{app.tagline}</div>
      </div>
    </div>
  );
}

function _AboutSection({ app }: { app: AppModel }) {
  return (
    <div class="column cross-stretch">
      <h3 style="margin: 0">about</h3>
      <span style="text-align: justify">{app.about}</span>
    </div>
  );
}

function _ImagesSection({ app }: { app: AppModel }) {
  return (
    <div class="row main-start scrollbars-none" style="overflow: scroll">
      <div style="min-width: max(1rem, calc((100vw - 700px)/2))" />
      {app.screenshots.map((img) => (
        <img
          onClick={() => open(img, "_blank")}
          src={img}
          alt={app.name + " screenshot"}
          style="height: 18rem; border-radius: 0.5rem; cursor: pointer;"
        />
      ))}
      <div style="min-width: 1rem " />
    </div>
  );
}

function _ReleasesSection({ app }: { app: AppModel }) {
  return (
    <div class="column cross-stretch" style="width: 100%;">
      <h3 style="margin: 0">versions</h3>
      {app.releases.reverse().map((release) => _ReleaseView({ release }))}
    </div>
  );
}

function _AuthorsSection({ authors }: { authors: AppAuthor[] }) {
  return (
    <div class="column cross-stretch">
      <h3 style="margin: 0">authors</h3>
      {authors.map((author) => (
        <div class="card row main-space-between">
          <span class="b">{author.name}</span>

          {author.url ? (
            <button class="action" onClick={() => open(author.url)}>
              <Globe />
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function _PlatformsSection({ app }: { app: AppModel }) {
  const lastRelease =
    app.releases?.length > 0 ? app.releases[app.releases.length - 1] : null;
  return (
    <div class="column cross-stretch">
      <h3 style="margin: 0">platforms</h3>
      <div class="row" style="flex-wrap: wrap; ">
        {lastRelease?.downloads.map((download) => (
          <div class="card row gap-half flex-wrap" style="min-width: 9rem;">
            <img
              src={_platformImagePath(download.platform)}
              class="icon-mat "
            ></img>
            {download.platform}
          </div>
        ))}
      </div>
    </div>
  );
}

function _platformImagePath(platform: string): string {
  const p = platform.toLowerCase().trim();
  return `/_assets/img/icon_device_${
    ["android", "ios", "web"].includes(p) ? p : "other"
  }.svg`;
}

function _ReleaseView({ release }: { release: AppRelease }) {
  return (
    <div class="card column cross-stretch">
      <div class="row">
        <span class="b text-l">{release.version}</span>
        <div class="flex-1 text-s i">{release.date ?? ""}</div>
        <DownloadView release={release} iconOnly={true} buttonType="action" />
      </div>
      <span class="text-justify">{release.notes ?? "-"}</span>
    </div>
  );
}

export function DownloadView({
  release,
  iconOnly = false,
  buttonType = "loud",
}: {
  iconOnly?: boolean;
  release: AppRelease;
  buttonType?: string;
}) {
  function download(dl: AppDownload) {
    openS.value = false;
    showToast("downloading for " + release.downloads[0].platform);
    open(release.downloads[0].url, "_self");
  }

  const openS = useSignal(false);
  return (
    <div class="column cross-stretch">
      <button
        class={buttonType}
        onClick={() => {
          if (release.downloads.length == 0) {
            showToast("no download available");
            return;
          }
          if (release.downloads.length == 1) {
            download(release.downloads[0]);
            return;
          }
          openS.value = true;
        }}
      >
        <Download />
        {iconOnly ? null : "download"}
      </button>
      <ElbeDialog
        open={openS.value}
        icon={<Download style="margin-right: -0.5rem;margin-left: 1rem" />}
        title="download for"
        onClose={() => (openS.value = false)}
      >
        <div class="column cross-stretch" style="min-width: 300px">
          {release.downloads.map((dl) => (
            <button
              class="action"
              onClick={() => {
                download(dl);
              }}
            >
              <img
                src={_platformImagePath(dl.platform)}
                class="icon-mat action-mat"
              ></img>
              {dl.platform}
            </button>
          ))}
        </div>
      </ElbeDialog>
    </div>
  );
}
