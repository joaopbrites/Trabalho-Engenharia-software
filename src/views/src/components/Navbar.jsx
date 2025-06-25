import React from "react";
// Se estiver usando React Router, descomente a linha abaixo e troque <a> por <Link>
// import { Link } from "react-router-dom";


export default function Navbar({ onOpen }) {
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="navbar-start">
        {/* Logo */}
        {/* <Link to="/" className="btn btn-ghost text-xl">VetManager</Link> */}
        <a className="btn btn-ghost text-xl">VetManager</a>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          {/* Troque <a> por <Link to=""> caso use React Router */}
          <a className="btn btn-ghost" href="/tutores">Tutores</a>
          <a className="btn btn-ghost" href="/animais">Animais</a>
          <a className="btn btn-ghost" href="/consultas">Consultas</a>
          <a className="btn btn-ghost" href="/vacinas-aplicadas">Vacinas</a>
          <a className="btn btn-ghost" href="/relatorios">Relatórios</a>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {/* Search input */}
        <div className="form-control hidden md:block">
          <input
            type="text"
            placeholder="Buscar"
            className="input input-bordered w-48 md:w-auto"
          />
        </div>
        {/* Botão de ação */}
        {onOpen && (
          <button onClick={onOpen} className="btn btn-primary">
            Adicionar
          </button>
        )}
      </div>
    </div>
  );
}
