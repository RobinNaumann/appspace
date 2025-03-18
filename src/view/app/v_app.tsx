import { Column, Row, Text } from "elbe-ui";
import { AppBit } from "../../bits/b_app";
import { AboutSection } from "./sections/v_s_about";
import { ActionsSection } from "./sections/v_s_actions";
import { AuthorsSection } from "./sections/v_s_authors";
import { ImagesSection } from "./sections/v_s_images";
import { AppNameSection } from "./sections/v_s_name";
import { PlatformsSection } from "./sections/v_s_platforms";
import { ReleasesSection } from "./sections/v_s_versions";
import { PageMetaSetter } from "./v_metasetter";

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
      <Column gap={3}>
        <PageMetaSetter app={app} />
        <Column gap={3} class="padded base-limited">
          <AppNameSection app={app} />
          <Row class="row-resp" cross="start" gap={3}>
            <Column flex={2} gap={3}>
              <AboutSection app={app} />
              <PlatformsSection app={app} />
            </Column>
            <Column flex={1}>
              <ActionsSection app={app} />
            </Column>
          </Row>
        </Column>
        <ImagesSection app={app} />
        <Row class="base-limited padded row-resp" cross="start" gap={3}>
          <Column flex={2} gap={3}>
            <AuthorsSection authors={app.authors} />
            <ReleasesSection app={app} />
          </Column>
          <div style="flex: 1" />
        </Row>
      </Column>
    ),
  });
}

export function AppSection({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  return (
    <Column>
      <Text.h4 v={title} />
      {children}
    </Column>
  );
}
