import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-blue-700 text-white flex flex-col justify-between shadow-lg">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-xl font-bold px-6 py-4 border-b border-blue-600">
          Instituto Lorena Visentainer
        </h1>

        {/* Menu de navegação */}
        <nav className="mt-6 flex flex-col gap-1">
          <Link
            to="/"
            className={`px-6 py-3 flex items-center gap-3 rounded-md hover:bg-blue-600 transition-all duration-200 ${
              location.pathname === "/" ? "bg-blue-600" : ""
            }`}
          >
            <i className="fa-solid fa-chart-line"></i>
            <span>Painel</span>
          </Link>

          <Link
            to="/patients"
            className={`px-6 py-3 flex items-center gap-3 rounded-md hover:bg-blue-600 transition-all duration-200 ${
              location.pathname === "/patients" ? "bg-blue-600" : ""
            }`}
          >
            <i className="fa-solid fa-user-injured"></i>
            <span>Pacientes</span>
          </Link>

          <Link
            to="/exams"
            className={`px-6 py-3 flex items-center gap-3 rounded-md hover:bg-blue-600 transition-all duration-200 ${
              location.pathname === "/exams" ? "bg-blue-600" : ""
            }`}
          >
            <i className="fa-solid fa-vial"></i>
            <span>Exames</span>
          </Link>

          <Link
            to="/reports"
            className={`px-6 py-3 flex items-center gap-3 rounded-md hover:bg-blue-600 transition-all duration-200 ${
              location.pathname === "/reports" ? "bg-blue-600" : ""
            }`}
          >
            <i className="fa-solid fa-file-lines"></i>
            <span>Relatórios</span>
          </Link>
        </nav>
      </div>

      {/* Botão Sair */}
      <div className="px-6 py-4 border-t border-blue-600">
        <button
          onClick={() => {
            localStorage.removeItem("auth");
            window.location.href = "/login";
          }}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg shadow-sm transition-all duration-200"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
