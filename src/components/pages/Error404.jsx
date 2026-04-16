import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
      <h1 className="display-1 fw-bold text-secondary">404</h1>
      <p className="fs-5 text-muted mb-4">Página no encontrada</p>
      <Link to="/" className="btn btn-dark px-4">
        Volver al inicio
      </Link>
    </div>
  );
}
