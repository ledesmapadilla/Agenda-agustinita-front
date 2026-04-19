import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createEvento } from "../../helpers/eventosApi";

const hoy = () => new Date().toISOString().split("T")[0];

export default function Mes() {
  const { mes, año } = useParams();
  const navigate = useNavigate();
  const nombre = mes.charAt(0).toUpperCase() + mes.slice(1);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { fecha: hoy(), urgencia: "baja", descripcion: "" } });

  const onSubmit = async (data) => {
    setGuardando(true);
    setError(null);
    try {
      await createEvento(`${mes}-${año}`, data);
      reset({ fecha: hoy(), urgencia: "baja", descripcion: "" });
      navigate("/");
    } catch {
      setError("No se pudo guardar. Intentá de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

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

        <form className="floating-card__body mes-form" onSubmit={handleSubmit(onSubmit)} noValidate>

          <div className="field-group" style={{ maxWidth: "50%" }}>
            <label className="field-label" htmlFor="fecha">Fecha</label>
            <input
              id="fecha"
              type="date"
              className="field-input"
              {...register("fecha")}
            />
          </div>

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
            <Link to="/" className="btn-cancel">Cancelar</Link>
            <button type="submit" className="btn-submit btn-submit--lepa" disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar tarea"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
