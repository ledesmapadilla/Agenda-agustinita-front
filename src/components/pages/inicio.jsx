import { Link } from "react-router-dom";

const cards = [
  { label: "LEPA", to: "/lepa", cls: "home-card--lepa" },
  { label: "La Martina", to: "/la-martina", cls: "home-card--martina" },
  { label: "CASA", to: "/casa", cls: "home-card--casa" },
];

export default function Inicio() {
  return (
    <div className="home-grid">
      {cards.map(({ label, to, cls }) => (
        <Link key={to} to={to} className={`home-card ${cls}`}>
          <span className="home-card__label">{label}</span>
        </Link>
      ))}
    </div>
  );
}
