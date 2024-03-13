import { X, Edit2 } from "lucide-react";
import pino from "pino";
import { RecordModel } from "pocketbase";
import { render } from "preact";
import { route } from "preact-router";
import { useState } from "preact/hooks";

const language = navigator.language.substring(0, 2);

export const beeMovie =
  "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.";

export const log = pino({ level: "trace" });

export function clone(o: object) {
  return JSON.parse(JSON.stringify(o));
}

export function showDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("de-DE");
}

export function showDateShort(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("de-DE", {
    month: "2-digit",
    day: "numeric",
  });
}

export function imsg(languages: L10nMessage): string {
  if (language in languages) {
    return languages[language];
  }
  return languages["en"];
}

type L10nMessage = {
  [key: string]: string;
};

export function listId(): string | null {
  const p = window.location.pathname.replace("/", "");
  if (p.length > 0) {
    return p;
  }
  return null;
}

export function createNewList(): void {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const items = Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)]
  );

  const id = items.slice(0, 4).join("") + "-" + items.slice(4).join("");

  // go the the new list
  window.location.href = "/" + id;
}

export function asString(value: any): string {
  var seen = [];

  return JSON.stringify(value, function (key, val) {
    if (val != null && typeof val == "object") {
      if (seen.indexOf(val) >= 0) {
        return;
      }
      seen.push(val);
    }
    return val;
  });
}

export function go(path: string, replace: boolean = false): () => void {
  return () => route(path, replace);
}

export function Field({
  value = "",
  label,
  placeholder,
  multiline = false,
  classs = "",
  onSubmit,
}: {
  value: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  classs?: string;
  onSubmit: (value: string) => void;
}) {
  const [editing, setEditing] = useState(false);

  function onBlur(e) {
    onSubmit((e.target as HTMLTextAreaElement).value);
    setEditing(false);
  }

  function onEnter(e) {
    if (e.keyCode != 13) return;
    onSubmit((e.target as HTMLTextAreaElement).value);
    setEditing(false);
  }

  return (
    <div class="row cross-center">
      <button class="integrated text-m" onClick={() => setEditing(!editing)}>
        {editing ? <X /> : <Edit2 />}
      </button>
      <div class="flex-1 flex">
        <div class="column cross-stretch gap-none">
          <div
            class={"text-s"}
            style={editing ? "margin-left: 1rem" : "margin-bottom: 0.125rem"}
          >
            {label}
          </div>
          {!editing ? (
            <div onClick={() => setEditing(true)} class={classs}>
              {value || <i style="opacity: 0.4">{placeholder || label}</i>}
            </div>
          ) : multiline ? (
            <textarea
              autofocus={true}
              style="margin-top: 0.5rem"
              onKeyPress={onEnter}
              onBlur={onBlur}
              placeholder={placeholder || label}
              type="text"
              class={classs}
            >
              {value}
            </textarea>
          ) : (
            <input
              autofocus={true}
              onKeyPress={onEnter}
              style="margin-top: 0.5rem"
              onBlur={onBlur}
              placeholder={placeholder || label}
              type="text"
              class={classs}
              value={value}
            ></input>
          )}
        </div>
      </div>
    </div>
  );
}

export function difference<T>(a: T[], ...rest: T[][]): T[] {
  return a.filter((x) => !rest.reduce((v, c) => v || c.includes(x), false));
}

export function crop<T>(obj: T, keys: string[], forbiddenKeys: string[]): T {
  const ret: Partial<T> = {};
  for (const k in obj) {
    if (keys.includes(k) && !forbiddenKeys.includes(k)) ret[k] = obj[k];
  }
  return ret as T;
}

export function chooseImageFile(): Promise<File> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files[0];
      resolve(file);
    };
    input.click();
  });
}

export function showToast(message: string) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

export function showConfirmDialog({
  title,
  message,
  okay = false,
}: {
  message: string;
  title: string;
  okay?: boolean;
}): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const dialog = document.createElement("div");
    dialog.classList.add("dialog");
    dialog.innerHTML = `<dialog open>
      <div
        class=" card plain-opaque"
        style="max-width: 30rem; min-width: 10rem"
      >
        <div class="row cross-start">
          <div class="flex-1 b" style="margin-top: 0.47rem; font-size: 1.2rem">
          ${title}
          </div>
          <button class="integrated" style="width: 3rem" onclick="resolve(false)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x "><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
       <div style="margin-top: 1rem; margin-bottom: 1rem">
        ${message}
        </div>
        <div class="row main-end gap">

      ${
        okay
          ? '<button class="loud" style="padding-left:1rem; padding-right:1rem" onclick="resolve(true)">okay</button>'
          : '<button class="loud minor" style="padding-left:1rem; padding-right:1rem" onclick="resolve(false)">no</button>' +
            '<button class="loud" style="padding-left:1rem; padding-right:1rem" onclick="resolve(true)">yes</button>'
      }
    </div>

      </div>
    </dialog>
  `;
    document.body.appendChild(dialog);
    window["resolve"] = (v) => {
      document.body.removeChild(dialog);
      resolve(v);
    };
  });
}
