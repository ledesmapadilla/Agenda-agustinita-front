const BASE = import.meta.env.VITE_API_URL || "https://agenda-agustinita-back.vercel.app/api";

export const getEventos = (seccion) =>
  fetch(`${BASE}/eventos/${seccion}`).then((r) => r.json());

export const createEvento = async (seccion, data) => {
  const r = await fetch(`${BASE}/eventos/${seccion}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await r.json();
  if (!r.ok) throw new Error(json?.message || `Error ${r.status}`);
  return json;
};

export const updateEvento = (id, data) =>
  fetch(`${BASE}/eventos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deleteEvento = (id) =>
  fetch(`${BASE}/eventos/${id}`, { method: "DELETE" }).then((r) => r.json());
