import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TareaCard from "../shared/TareaCard";
import { getEventos, deleteEvento } from "../../helpers/eventosApi";

const MESES_MAP = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};

export default function DiaTareas() {
  const { mes, anio, dia } = useParams();
  const nombre = mes.charAt(0).toUpperCase() + mes.slice(1);
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getEventos(`${mes}-${anio}`)
      .then((todas) => {
        const diaNum = Number(dia);
        const del_dia = todas.filter((t) => {
          const d = new Date(t.fecha);
          return d.getUTCDate() === diaNum;
        });
        setTareas(del_dia);
      })
      .finally(() => setCargando(false));
  }, [mes, anio, dia]);

  const handleBorrar = async (id) => {
    await deleteEvento(id);
    setTareas((prev) => prev.filter((t) => t._id !== id));
  };

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
                  onClick={() => handleBorrar(t._id)}
                />
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
