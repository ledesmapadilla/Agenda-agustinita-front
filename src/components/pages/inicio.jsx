import { useState } from "react";
import { Link } from "react-router-dom";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const hoy       = new Date();
const mesActual = hoy.getMonth();
const añoActual = hoy.getFullYear();

export default function Inicio() {
  const [año, setAño] = useState(2026);

  return (
    <div className="mes-page">
      <div className="mes-año-nav">
        <button className="mes-año-btn" onClick={() => setAño(a => a - 1)}>
          <i className="bi bi-chevron-left" />
        </button>
        <h1 className="mes-año">{año}</h1>
        <button className="mes-año-btn" onClick={() => setAño(a => a + 1)}>
          <i className="bi bi-chevron-right" />
        </button>
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
