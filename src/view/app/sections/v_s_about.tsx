import { l10n } from "../../../service/l10n/l10n";
import { AppModel } from "../../../service/s_content";
import { AppSection } from "../v_app";

export function AboutSection({ app }: { app: AppModel }) {
  return (
    <AppSection title={l10n.app.about}>
      <span style="text-align: justify">{app.about}</span>
    </AppSection>
  );
}
