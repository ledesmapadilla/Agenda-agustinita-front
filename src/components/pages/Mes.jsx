import { Link, useParams } from "react-router-dom";

const MESES_MAP = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};

const DIAS_SEMANA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function Mes() {
  const { mes, anio } = useParams();
  const nombre = mes.charAt(0).toUpperCase() + mes.slice(1);
  const mesIdx = MESES_MAP[mes] ?? 0;
  const totalDias = new Date(Number(anio), mesIdx + 1, 0).getDate();

  const dias = Array.from({ length: totalDias }, (_, i) => {
    const num = i + 1;
    const dow = new Date(Number(anio), mesIdx, num).getDay();
    return { num, dow };
  });

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

        <div className="floating-card__body">
          <div className="dias-grid">
            {dias.map(({ num, dow }) => (
              <Link
                key={num}
                to={`/mes/${mes}/${anio}/${num}`}
                className="dia-card"
              >
                <span className="dia-card__num">{num}</span>
                <span className="dia-card__dow">{DIAS_SEMANA[dow]}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
