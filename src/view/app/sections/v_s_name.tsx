import { Column } from "elbe-ui";
import { AppModel } from "../../../service/s_content";

export function AppNameSection({ app }: { app: AppModel }) {
  return (
    <div class="row cross-center gap-double">
      <img
        src={app.icon}
        alt={app.name + "app"}
        class="icon raised"
        style="width: 5rem"
      />
      <Column flex={1} gap={0.5}>
        <h1 style="margin: 0">{app.name}</h1>
        <div>{app.tagline}</div>
      </Column>
    </div>
  );
}
