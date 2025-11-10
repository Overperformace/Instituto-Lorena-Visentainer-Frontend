import React from "react";

function Header() {
  return (
    <header className="flex justify-between items-center bg-white shadow-sm px-6 py-3 border-b border-gray-200">
      <h2 className="text-gray-700 text-lg font-medium">
        Olá, <span className="font-semibold">Administrador do Sistema</span>
      </h2>
      <button
        onClick={() => {
          localStorage.removeItem("auth");
          window.location.href = "/login";
        }}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-200"
      >
        <i className="fa-solid fa-right-from-bracket"></i>
        Sair
      </button>
    </header>
  );
}

export default Header;
