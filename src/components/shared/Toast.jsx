import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const style = {
  position: "fixed",
  bottom: "40px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#1b3a2d",
  color: "#fff",
  padding: "14px 28px",
  borderRadius: "24px",
  fontSize: "1rem",
  fontWeight: "700",
  whiteSpace: "nowrap",
  zIndex: 99999,
  boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
};

export default function Toast({ mensaje, onOcultar }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (!mensaje) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onOcultar, 2200);
    return () => clearTimeout(timerRef.current);
  }, [mensaje]);

  if (!mensaje) return null;

  return createPortal(
    <div style={style}>{mensaje}</div>,
    document.body
  );
}
