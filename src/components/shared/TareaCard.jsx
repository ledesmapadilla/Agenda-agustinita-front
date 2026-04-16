export default function TareaCard({ tarea, onClick }) {
  return (
    <li className="tarea-chip" onClick={() => onClick(tarea)}>
      <span className={`tarea-chip__texto ${tarea.urgencia === "alta" ? "tarea-chip__texto--alta" : ""}`}>
        {tarea.descripcion}
      </span>
    </li>
  );
}
