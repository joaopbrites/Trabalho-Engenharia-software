import React, { useState } from "react";
import SubNavbarRelatorios from "./SubNavbarRelatorios";
import TableListRelatorioVacinas from "./TableListRelatorioVacinas";
import TableListRelatorioConsultas from "./TableListRelatorioConsultas";

export default function RelatoriosPage() {
  const [tipo, setTipo] = useState("vacinas");

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Relatórios</h2>
      <SubNavbarRelatorios tipo={tipo} setTipo={setTipo} />
      {tipo === "vacinas" ? (
        <TableListRelatorioVacinas />
      ) : (
        <TableListRelatorioConsultas />
      )}
    </div>
  );
}
