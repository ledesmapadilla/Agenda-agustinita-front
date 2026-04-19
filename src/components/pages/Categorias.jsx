import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventos } from "../../helpers/eventosApi";

const IconoFacultad = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="28,8 52,20 28,32 4,20" />
    <polyline points="14,26 14,40" />
    <path d="M14 40 C14 46 42 46 42 40" />
    <polyline points="42,26 42,40" />
    <line x1="52" y1="20" x2="52" y2="34" />
    <circle cx="52" cy="36" r="2" fill="currentColor" stroke="none" />
  </svg>
);

const IconoPersonal = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="28" cy="18" r="10" />
    <path d="M6 50 C6 36 50 36 50 50" />
  </svg>
);

const CATEGORIAS = [
  { id: "facultad", label: "Facultad", Icono: IconoFacultad },
  { id: "personal", label: "Personal", Icono: IconoPersonal },
];

export default function Categorias() {
  const { mes, anio } = useParams();
  const nombre = mes.charAt(0).toUpperCase() + mes.slice(1);
  const [urgencias, setUrgencias] = useState({});

  useEffect(() => {
    CATEGORIAS.forEach(({ id }) => {
      getEventos(`${mes}-${anio}-${id}`).then((tareas) => {
        const tieneAlta = tareas.some((t) => t.urgencia === "alta");
        const tieneBaja = tareas.some((t) => t.urgencia === "baja");
        setUrgencias((prev) => ({ ...prev, [id]: { alta: tieneAlta, baja: tieneBaja } }));
      });
    });
  }, [mes, anio]);

  return (
    <div className="inner-page inner-page--lepa">
      <div className="floating-card">

        <header className="floating-card__header floating-card__header--lepa">
          <Link to="/" className="floating-card__back">
            <i className="bi bi-arrow-left" />
          </Link>
          <h1 className="floating-card__title">{nombre} {anio}</h1>
          <div style={{ width: 44 }} />
        </header>

        <div className="floating-card__body cat-body">
          {CATEGORIAS.map(({ id, label, Icono }) => (
            <Link key={id} to={`/mes/${mes}/${anio}/${id}`} className="cat-card">
              <Icono />
              <span className="cat-card__label">{label}</span>
              {urgencias[id] && (
                <div className="dia-card__puntos">
                  {urgencias[id].baja  && <span className="dia-card__punto dia-card__punto--baja" />}
                  {urgencias[id].alta  && <span className="dia-card__punto dia-card__punto--alta" />}
                </div>
              )}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
