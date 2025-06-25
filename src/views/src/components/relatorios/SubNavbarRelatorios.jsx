import React from "react";

export default function SubNavbarRelatorios({ tipo, setTipo }) {
  return (
    <div className="flex gap-4 p-4 bg-base-200 rounded mb-4">
      <button
        className={`btn ${tipo === "vacinas" ? "btn-primary" : "btn-ghost"}`}
        onClick={() => setTipo("vacinas")}
      >
        Vacinas
      </button>
      <button
        className={`btn ${tipo === "consultas" ? "btn-primary" : "btn-ghost"}`}
        onClick={() => setTipo("consultas")}
      >
        Consultas
      </button>
    </div>
  );
}
