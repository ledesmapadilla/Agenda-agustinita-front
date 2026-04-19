import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Toast({ mensaje, onOcultar }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (!mensaje) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onOcultar();
    }, 2200);
    return () => clearTimeout(timerRef.current);
  }, [mensaje]);

  if (!mensaje) return null;

  return createPortal(
    <div className="toast toast--visible">{mensaje}</div>,
    document.body
  );
}
