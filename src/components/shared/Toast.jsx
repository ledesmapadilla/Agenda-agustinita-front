import { useEffect, useState } from "react";

export default function Toast({ mensaje, onOcultar }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mensaje) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    const hide = setTimeout(() => {
      setVisible(false);
      setTimeout(onOcultar, 300);
    }, 2000);
    return () => { cancelAnimationFrame(raf); clearTimeout(hide); };
  }, [mensaje]);

  if (!mensaje) return null;

  return (
    <div className={`toast${visible ? " toast--visible" : ""}`}>
      {mensaje}
    </div>
  );
}
