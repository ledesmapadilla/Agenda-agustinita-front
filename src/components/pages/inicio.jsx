import { Link } from "react-router-dom";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const hoy        = new Date();
const mesActual  = hoy.getMonth();     // 0-indexed
const añoActual  = hoy.getFullYear();

export default function Inicio() {
  return (
    <div className="mes-page">
      <h1 className="mes-año">{añoActual}</h1>
      <div className="mes-grid">
        {MESES.map((nombre, i) => (
          <Link
            key={nombre}
            to={`/mes/${nombre.toLowerCase()}`}
            className={`mes-card${i === mesActual ? " mes-card--actual" : ""}`}
          >
            <span className="mes-card__nombre">{nombre}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
