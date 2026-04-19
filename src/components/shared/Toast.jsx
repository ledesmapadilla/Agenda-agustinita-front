import { useEffect, useState } from "react";

export default function Toast({ mensaje, onOcultar }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mensaje) return;
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onOcultar, 300);
    }, 2000);
    return () => clearTimeout(t);
  }, [mensaje]);

  if (!mensaje) return null;

  return (
    <div className={`toast${visible ? " toast--visible" : ""}`}>
      {mensaje}
    </div>
  );
}
