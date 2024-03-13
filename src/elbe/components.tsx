import { X } from "lucide-react";

export function Box({ children }) {
  return <div class="padded">{children}</div>;
}

export function Card({ children, style = null }) {
  return (
    <div style={style} class="card">
      {children}
    </div>
  );
}

export function Spaced({ amount = 1 }) {
  return <div style={{ width: amount + "rem", height: amount + "rem" }}></div>;
}

export function ElbeDialog({
  title,
  icon,
  open,
  onClose,
  children,
}: {
  title: string;
  icon?: any;
  open: boolean;
  onClose: () => void;
  children: any;
}) {
  return (
    <dialog open={open}>
      <div
        class=" card plain-opaque"
        style="max-width: 40rem; min-width: 10rem"
      >
        <div class="row cross-center">
          {icon}
          <div class="flex-1 b" style="font-size: 1.2rem">
            {title}
          </div>
          <button class="integrated" style="width: 3rem" onClick={onClose}>
            <X />
          </button>
        </div>
        <Spaced amount={0.5} />
        {children}
      </div>
    </dialog>
  );
}

export function Separator({}) {
  return (
    <div
      class="plain"
      style="border-width: inherit; border-bottom-width: 0; border-left-width: 0; border-right_width: 0; border-style: solid"
    ></div>
  );
}
