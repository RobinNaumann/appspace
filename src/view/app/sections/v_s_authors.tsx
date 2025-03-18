import { Card, IconButton, Row, Spaced, Text } from "elbe-ui";
import { Globe } from "lucide-react";
import { l10n } from "../../../service/l10n/l10n";
import { AppAuthor } from "../../../service/s_content";
import { AppSection } from "../v_app";

export function AuthorsSection({ authors }: { authors: AppAuthor[] }) {
  return (
    <AppSection title={l10n.app.authors}>
      <Row wrap>
        {authors.map((author) => (
          <Card
            class="row"
            style={{
              paddingLeft: "1rem",
              paddingRight: ".5rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}
            scheme="secondary"
          >
            <Text bold v={author.name} />
            {author.url ? (
              <IconButton.flat onTap={() => open(author.url)} icon={Globe} />
            ) : (
              <Spaced amount={3} />
            )}
          </Card>
        ))}
      </Row>
    </AppSection>
  );
}
