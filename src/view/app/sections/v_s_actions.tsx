import { Button, Column } from "elbe-ui";
import { Globe, Heart, Star } from "lucide-react";
import { l10n } from "../../../service/l10n/l10n";
import { AppModel } from "../../../service/s_content";
import { DownloadView } from "./v_s_versions";

export function ActionsSection({ app }: { app: AppModel }) {
  return (
    <Column>
      <DownloadView release={app.releases[0]} />
      {app.url ? (
        <Button.flat
          icon={Globe}
          label={l10n.app.website}
          onTap={() => open(app.url)}
        />
      ) : null}
      {app.source ? (
        <Button.flat
          icon={Star}
          label={l10n.app.source}
          onTap={() => open(app.source)}
        />
      ) : null}
      {app.donate ? (
        <Button.flat
          icon={Heart}
          label={l10n.app.donate}
          onTap={() => open(app.donate)}
        />
      ) : null}
    </Column>
  );
}
