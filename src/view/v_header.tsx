import {
  CheckCircle,
  Circle,
  FilePlus,
  Trash,
  Trash2,
  Trash2Icon,
  X,
  User,
} from "lucide-react";
import { asString, createNewList, imsg, listId } from "../util";
import { Spinner } from "..";
import { route } from "preact-router";
import { useEffect } from "preact/hooks";
import { computed, useSignal } from "@preact/signals";
import { Config, ContentService } from "../service/s_content";

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
            <div style="font-weight: normal">
              <b class="b">apps</b>
              <span class="action b">
                •rob
                <sup style="margin-left: -0.05rem;margin-right: -0.4rem; vertical-align: 0.75rem; font-size: 0.7rem; font-weight: 900">
                  3
                </sup>
                ın
              </span>
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
