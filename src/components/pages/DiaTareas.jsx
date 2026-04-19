import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TareaCard from "../shared/TareaCard";
import ModalVerTarea from "../shared/ModalVerTarea";
import { getEventos } from "../../helpers/eventosApi";

const MESES_MAP = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};

export default function DiaTareas() {
  const { mes, anio, dia } = useParams();
  const nombre = mes.charAt(0).toUpperCase() + mes.slice(1);
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [tareaVer, setTareaVer] = useState(null);

  useEffect(() => {
    getEventos(`${mes}-${anio}`)
      .then((todas) => {
        const diaNum = Number(dia);
        setTareas(todas.filter((t) => new Date(t.fecha).getUTCDate() === diaNum));
      })
      .finally(() => setCargando(false));
  }, [mes, anio, dia]);

  // ModalVerTarea espera fecha en formato "YYYY-MM-DD"
  const normalizar = (t) => ({
    ...t,
    fecha: t.fecha ? t.fecha.slice(0, 10) : "",
  });

  return (
    <div className="inner-page inner-page--lepa">
      <div className="floating-card">

        <header className="floating-card__header floating-card__header--lepa">
          <Link to={`/mes/${mes}/${anio}`} className="floating-card__back">
            <i className="bi bi-arrow-left" />
          </Link>
          <h1 className="floating-card__title">{dia} de {nombre}</h1>
          <Link to={`/mes/${mes}/${anio}/${dia}/nueva`} className="btn-nueva-tarea">+</Link>
        </header>

        <div className="floating-card__body">
          {cargando ? (
            <p className="text-muted text-center mt-4">Cargando...</p>
          ) : tareas.length === 0 ? (
            <p className="text-muted text-center mt-4">No hay tareas para este día.</p>
          ) : (
            <ul className="tareas-lista">
              {tareas.map((t) => (
                <TareaCard
                  key={t._id}
                  tarea={t}
                  onClick={(t) => setTareaVer(normalizar(t))}
                />
              ))}
            </ul>
          )}
        </div>

      </div>

      <ModalVerTarea
        tarea={tareaVer}
        onClose={() => setTareaVer(null)}
      />
    </div>
  );
}
