import { Header, IconButton } from "elbe-ui";
import { GithubIcon, Moon, Sun } from "lucide-react";
import { ThemeBit } from "../bits/b_theme";
import { appConfig } from "../service/s_config";

function _logo() {
  const themeBit = ThemeBit.use();
  const c = appConfig();

  const logo = c.logo ?? "./icon_long.png";
  const logoDark = c.logo_dark ?? c.logo ?? "./icon_long_dark.png";

  return themeBit.onData((d) => (
    <a
      href={"/"}
      class="row"
      style={{
        gap: ".5rem",
        cursor: "pointer",
        paddingLeft: ".75rem",
        textDecoration: "none",
      }}
    >
      <img
        alt="logo"
        src={d.dark ? logoDark : logo}
        style={{
          height: `${c.logo_height}rem`,
          objectFit: "contain",
        }}
      />
    </a>
  ));
}

function _gitLink() {
  return (
    <IconButton.plain
      icon={GithubIcon}
      onTap={() => window.open("https://github.com/RobinNaumann/appspace")}
    />
  );
}

export function HeaderView() {
  const themeBit = ThemeBit.use();
  return themeBit.onData((d) => (
    <Header
      back={_logo()}
      actions={
        <>
          {appConfig().show_source_button && _gitLink()}
          {appConfig().show_dark_button && (
            <IconButton.plain
              icon={d.dark ? Sun : Moon}
              onTap={() => themeBit.ctrl.toggleDark()}
            />
          )}
        </>
      }
    />
  ));
}
