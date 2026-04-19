import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const hoy       = new Date();
const mesActual = hoy.getMonth();
const añoActual = hoy.getFullYear();
const AÑOS      = Array.from({ length: 10 }, (_, i) => 2026 + i); // 2026–2035

export default function Inicio() {
  const [año, setAño]         = useState(2026);
  const [abierto, setAbierto] = useState(false);
  const dropRef               = useRef(null);

  // cerrar al tocar fuera
  useEffect(() => {
    if (!abierto) return;
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setAbierto(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [abierto]);

  const elegir = (a) => { setAño(a); setAbierto(false); };

  return (
    <div className="mes-page">
      <div className="mes-año-nav" ref={dropRef}>
        <button className="mes-año" onClick={() => setAbierto(o => !o)}>
          {año} <i className={`bi bi-chevron-${abierto ? "up" : "down"} mes-año-chevron`} />
        </button>

        {abierto && (
          <ul className="mes-año-lista">
            {AÑOS.map(a => (
              <li key={a}>
                <button
                  className={`mes-año-opcion${a === año ? " mes-año-opcion--activa" : ""}`}
                  onClick={() => elegir(a)}
                >
                  {a}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mes-grid">
        {MESES.map((nombre, i) => (
          <Link
            key={nombre}
            to={`/mes/${nombre.toLowerCase()}/${año}`}
            className={`mes-card${i === mesActual && año === añoActual ? " mes-card--actual" : ""}`}
          >
            <span className="mes-card__nombre">{nombre}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
