import { Link } from "react-router-dom";

export default function Casa() {
  return (
    <div>
      <header className="page-header page-header--casa px-3 px-md-4 py-4">
        <Link to="/" className="back-btn mb-2">
          <i className="bi bi-arrow-left" /> Inicio
        </Link>
        <h1 className="m-0">CASA</h1>
      </header>
      <div className="container-fluid p-3 p-md-4">
        <p className="text-muted">Sección Casa — próximamente.</p>
      </div>
    </div>
  );
}
