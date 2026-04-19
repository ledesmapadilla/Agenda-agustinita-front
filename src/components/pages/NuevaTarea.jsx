import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createEvento } from "../../helpers/eventosApi";

const MESES_MAP = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};

export default function NuevaTarea() {
  const { mes, anio, dia } = useParams();
  const navigate = useNavigate();
  const nombre = mes.charAt(0).toUpperCase() + mes.slice(1);

  const mesIdx = MESES_MAP[mes] ?? 0;
  const fechaISO = `${anio}-${String(mesIdx + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { fecha: fechaISO, urgencia: "baja", descripcion: "" } });

  const onSubmit = async (data) => {
    setGuardando(true);
    setError(null);
    try {
      await createEvento(`${mes}-${anio}`, { ...data, fecha: fechaISO });
      navigate(`/mes/${mes}/${anio}`);
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="inner-page inner-page--lepa">
      <div className="floating-card">

        <header className="floating-card__header floating-card__header--lepa">
          <Link to={`/mes/${mes}/${anio}`} className="floating-card__back">
            <i className="bi bi-arrow-left" />
          </Link>
          <h1 className="floating-card__title">{dia} de {nombre}</h1>
          <div style={{ width: 44 }} />
        </header>

        <form className="floating-card__body mes-form" onSubmit={handleSubmit(onSubmit)} noValidate>

          <div className="field-group">
            <label className="field-label" htmlFor="descripcion">Tarea</label>
            <textarea
              id="descripcion"
              rows={4}
              className={`field-input field-input--textarea${errors.descripcion ? " field-input--error" : ""}`}
              placeholder="Describí la tarea..."
              {...register("descripcion", { required: "Requerido" })}
            />
            {errors.descripcion && <span className="field-error">{errors.descripcion.message}</span>}
          </div>

          <div className="field-inline">
            <label className="field-label field-label--inline" htmlFor="urgencia">Urgencia</label>
            <select id="urgencia" className="field-input field-input--select field-input--inline" {...register("urgencia")}>
              <option value="alta">Alta</option>
              <option value="baja">Baja</option>
            </select>
          </div>

          {error && <p className="mes-form__error">{error}</p>}

          <div className="mes-form__actions">
            <Link to={`/mes/${mes}/${anio}`} className="btn-cancel">Cancelar</Link>
            <button type="submit" className="btn-submit btn-submit--lepa" disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar tarea"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
