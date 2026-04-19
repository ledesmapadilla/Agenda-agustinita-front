import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TareaCard from "../shared/TareaCard";
import ModalTarea from "../shared/ModalTarea";
import Toast from "../shared/Toast";
import { getEventos, updateEvento, deleteEvento } from "../../helpers/eventosApi";

export default function DiaTareas() {
  const { mes, anio, dia } = useParams();
  const nombre = mes.charAt(0).toUpperCase() + mes.slice(1);
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [tareaEditar, setTareaEditar] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    getEventos(`${mes}-${anio}`)
      .then((todas) => {
        const diaNum = Number(dia);
        setTareas(todas.filter((t) => new Date(t.fecha).getUTCDate() === diaNum));
      })
      .finally(() => setCargando(false));
  }, [mes, anio, dia]);

  const handleGuardar = async (data) => {
    const actualizada = await updateEvento(data._id, data);
    setTareas((prev) => prev.map((t) => (t._id === actualizada._id ? actualizada : t)));
    setToast("Tarea guardada");
  };

  const handleBorrar = async (id) => {
    await deleteEvento(id);
    setTareas((prev) => prev.filter((t) => t._id !== id));
  };

  const handleTerminada = async (id) => {
    await deleteEvento(id);
    setTareas((prev) => prev.filter((t) => t._id !== id));
    setToast("Tarea terminada");
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
                  onClick={(t) => setTareaEditar(t)}
                />
              ))}
            </ul>
          )}
        </div>

      </div>

      <ModalTarea
        show={!!tareaEditar}
        onClose={() => setTareaEditar(null)}
        onGuardar={handleGuardar}
        onBorrar={handleBorrar}
        onToggleEstado={handleTerminada}
        seccion={`${mes}-${anio}`}
        accentClass="btn-accent-lepa"
        tareaInicial={tareaEditar}
      />

      <Toast mensaje={toast} onOcultar={() => setToast(null)} />
    </div>
  );
}
