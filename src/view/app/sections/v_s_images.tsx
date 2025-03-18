import { Signal, useSignal } from "@preact/signals";
import { Row } from "elbe-ui";
import { AppModel } from "../../../service/s_content";

export function ImagesSection({ app }: { app: AppModel }) {
  const lBoxSig = useSignal<string>(null);
  return (
    <>
      <Row
        class="row main-start scrollbars-none"
        style={{
          overflowX: "scroll",
        }}
      >
        <div style="min-width: max(1rem, calc((100vw - 700px)/2))" />

        {(app.screenshots ?? []).map((img) => (
          <_Image src={img} onTap={() => (lBoxSig.value = img)} />
        ))}
        <div
          style={{
            minWidth: "1rem",
            height: "3rem",
            backgroundColor: "transparent",
          }}
        ></div>
      </Row>
      <_Lightbox sig={lBoxSig} />
    </>
  );
}

function _Image({ src, onTap }: { src: string; onTap: () => void }) {
  return (
    <img
      onClick={() => onTap()}
      src={src}
      alt={"app screenshot"}
      class="raised dialog modal primary"
      style="height: 18rem;margin: 1rem 0; border-radius: 0.5rem; cursor: pointer;"
    />
  );
}

function _Lightbox({ sig }: { sig: Signal<string> }) {
  return (
    <dialog open={sig.value != null} onClick={() => (sig.value = null)}>
      <img
        src={sig.value ?? ""}
        alt={"app screenshot"}
        class="raised dialog modal primary"
        style="margin: 2rem; border-radius: 0.5rem; cursor: pointer; object-fit: contain; max-width: 90%; max-height: 90%;"
      />
    </dialog>
  );
}
