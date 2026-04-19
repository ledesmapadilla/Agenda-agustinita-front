import { Link, useParams } from "react-router-dom";

const CATEGORIAS = [
  { id: "facultad", label: "Facultad", emoji: "🎓" },
  { id: "personal", label: "Personal", emoji: "⭐" },
];

export default function Categorias() {
  const { mes, anio } = useParams();
  const nombre = mes.charAt(0).toUpperCase() + mes.slice(1);

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
          {CATEGORIAS.map((c) => (
            <Link
              key={c.id}
              to={`/mes/${mes}/${anio}/${c.id}`}
              className="cat-card"
            >
              <span className="cat-card__emoji">{c.emoji}</span>
              <span className="cat-card__label">{c.label}</span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
