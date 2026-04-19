import { useParams, Link } from "react-router-dom";

export default function Mes() {
  const { mes, año } = useParams();
  const nombre = mes.charAt(0).toUpperCase() + mes.slice(1);

  return (
    <div className="inner-page inner-page--lepa">
      <div className="floating-card">
        <header className="floating-card__header floating-card__header--lepa">
          <Link to="/" className="floating-card__back">
            <i className="bi bi-arrow-left" />
          </Link>
          <h1 className="floating-card__title">{nombre} {año}</h1>
          <div style={{ width: 44 }} />
        </header>
        <div className="floating-card__body">
          <p className="text-muted text-center mt-4">Próximamente...</p>
        </div>
      </div>
    </div>
  );
}
