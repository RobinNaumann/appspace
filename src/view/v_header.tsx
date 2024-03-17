import { User } from "lucide-react";
import { route } from "preact-router";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { Config, ContentService } from "../service/s_content";
import { Rob3in } from "../elbe/rob3in";

export function HeaderView() {
  const cfgS = useSignal<Config | null>(null);

  useEffect(() => {
    ContentService.i.getConfig().then((cfg) => (cfgS.value = cfg));
  }, []);

  return (
    <div>
      <div style="height: 5rem"></div>
      <div class="header">
        <div class="header-title flex-1 cross-start" onClick={goHome}>
          {cfgS.value?.logo ? (
            <b>{cfgS.value?.logo}</b>
          ) : (
            <div class="row gap-none svg-filled" style="font-weight: normal">
              <b class="" style="font-family: 'Space Mono';">
                apps
              </b>
              <span class="action b">•</span>
              <Rob3in height="0.87rem" />
            </div>
          )}
        </div>
        <div class="text-s  b" style="opacity: 0.5">
          {cfgS.value?.message ?? ""}
        </div>
      </div>
    </div>
  );
}

function goAccount() {
  route("/account");
}

function goHome() {
  route("/");
}

function ProfileButton() {
  return (
    <button class="integrated" onClick={goAccount}>
      <div class="if-wide">heyy</div>
      <User />
    </button>
  );
}
