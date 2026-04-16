import { useEffect } from "react";

const formatFecha = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

export default function ModalVerTarea({ tarea, onClose }) {
  useEffect(() => {
    if (tarea) document.body.style.overflow = "hidden";
    else        document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [tarea]);

  if (!tarea) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-sheet" role="dialog" aria-modal="true">

        <div className="modal-sheet__header">
          <h2 className="modal-sheet__title">Detalle de tarea</h2>
          <button className="modal-sheet__close" onClick={onClose} aria-label="Cerrar">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="modal-sheet__body">
          <div className="ver-row">
            <span className="ver-label">Fecha</span>
            <span className="ver-value">{formatFecha(tarea.fecha)}</span>
          </div>

          <div className="ver-row">
            <span className="ver-label">Urgencia</span>
            <span className={`badge-urgencia ${tarea.urgencia === "alta" ? "badge-urgencia--alta" : "badge-urgencia--baja"}`}>
              {tarea.urgencia === "alta" ? "Alta" : "Baja"}
            </span>
          </div>

          <div className="ver-row">
            <span className="ver-label">Responsable</span>
            <span className="ver-value">{tarea.responsable}</span>
          </div>

          <div className="ver-row ver-row--col">
            <span className="ver-label">Tarea</span>
            <p className="ver-texto">{tarea.descripcion}</p>
          </div>

          <div className="ver-row">
            <span className="ver-label">Estado</span>
            <span className={`badge-urgencia ${tarea.completado ? "badge-urgencia--done" : "badge-urgencia--pendiente"}`}>
              {tarea.completado ? "Completada" : "Pendiente"}
            </span>
          </div>
        </div>

      </div>
    </>
  );
}
