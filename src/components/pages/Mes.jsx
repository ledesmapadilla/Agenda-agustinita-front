import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventos } from "../../helpers/eventosApi";

const MESES_MAP = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};

const DIAS_SEMANA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const hoy       = new Date();
const diaHoy    = hoy.getDate();
const mesHoy    = hoy.getMonth();
const añoHoy    = hoy.getFullYear();

export default function Mes() {
  const { mes, anio, categoria } = useParams();
  const nombre = mes.charAt(0).toUpperCase() + mes.slice(1);
  const catLabel = categoria.charAt(0).toUpperCase() + categoria.slice(1);
  const mesIdx = MESES_MAP[mes] ?? 0;
  const totalDias = new Date(Number(anio), mesIdx + 1, 0).getDate();
  const esMesActual = mesIdx === mesHoy && Number(anio) === añoHoy;
  const [tareasPorDia, setTareasPorDia] = useState({});

  useEffect(() => {
    getEventos(`${mes}-${anio}-${categoria}`).then((tareas) => {
      const mapa = {};
      tareas.forEach((t) => {
        const dia = new Date(t.fecha).getUTCDate();
        if (!mapa[dia]) mapa[dia] = [];
        mapa[dia].push(t.urgencia);
      });
      setTareasPorDia(mapa);
    });
  }, [mes, anio, categoria]);

  const dias = Array.from({ length: totalDias }, (_, i) => {
    const num = i + 1;
    const dow = new Date(Number(anio), mesIdx, num).getDay();
    return { num, dow };
  });

  return (
    <div className="inner-page inner-page--lepa">
      <div className="floating-card">

        <header className="floating-card__header floating-card__header--lepa">
          <Link to={`/mes/${mes}/${anio}`} className="floating-card__back">
            <i className="bi bi-arrow-left" />
          </Link>
          <h1 className="floating-card__title">{nombre} · {catLabel}</h1>
          <div style={{ width: 44 }} />
        </header>

        <div className="floating-card__body">
          <div className="dias-grid">
            {dias.map(({ num, dow }) => (
              <Link
                key={num}
                to={`/mes/${mes}/${anio}/${categoria}/${num}`}
                className={`dia-card${esMesActual && num === diaHoy ? " dia-card--actual" : ""}`}
              >
                <span className="dia-card__num">{num}</span>
                <span className="dia-card__dow">{DIAS_SEMANA[dow]}</span>
                {tareasPorDia[num] && (
                  <div className="dia-card__puntos">
                    {tareasPorDia[num].slice(0, 6).map((urg, i) => (
                      <span key={i} className={`dia-card__punto dia-card__punto--${urg}`} />
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
