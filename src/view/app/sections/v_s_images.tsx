import { Signal, useSignal } from "@preact/signals";
import { useRef, useState } from "preact/hooks";
import { AppModel } from "../../../service/s_content";

export function ImagesSection({ app }: { app: AppModel }) {
  const lBoxSig = useSignal<string>(null);
  return (
    <>
      <_Draggable>
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
      </_Draggable>
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
      draggable={false}
      class="raised dialog modal primary no-drag-img"
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

function _Draggable({ children }) {
  const ourRef = useRef(null);
  const [mousePos, setMousePos] = useState<{
    scroll: number;
    mouse: number;
  } | null>(null);

  const handleDragStart = (e) => {
    if (!ourRef.current) return;
    setMousePos({ scroll: ourRef.current.scrollLeft, mouse: e.pageX });
    document.body.style.cursor = "grabbing";
  };
  const handleDragEnd = (e) => {
    if (!ourRef.current) return;
    const movement = Math.abs(e.pageX - (mousePos?.mouse ?? e.pageX));
    setMousePos(null);
    document.body.style.cursor = "default";
    if (movement > 1) e.stopImmediatePropagation();
  };
  const handleDrag = (e) => {
    if (!mousePos || !ourRef.current || e.pointerType === "touch") return;
    ourRef.current.scrollLeft = mousePos.scroll + (mousePos.mouse - e.pageX);
  };

  return (
    <div
      ref={ourRef}
      onClickCapture={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      class="scrollbars-none"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "1rem",
        overflowX: "scroll",
      }}
    >
      {children}
    </div>
  );
}
