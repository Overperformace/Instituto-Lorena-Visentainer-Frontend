import React from "react";
import { NavLink } from "react-router-dom";
import { LogOut, LayoutDashboard, Users, FileText, FlaskConical } from "lucide-react";
import { signOut } from "../services/supabase";

export default function Sidebar() {
  async function handleExit() {
    await signOut();
    localStorage.removeItem("auth");
    window.location.href = "/login";
  }

  const Item = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : "text-white/90 hover:bg-white/10"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </NavLink>
  );

  return (
    <aside className="fixed left-0 top-0 h-screen w-[230px] bg-[#1f49d6] text-white flex flex-col shadow-xl">
      {/* Logo / Título */}
      <div className="h-16 flex items-center px-4 border-b border-white/10">
        <div>
          <div className="text-sm text-white/80 leading-4">Instituto Lorena</div>
          <div className="text-lg font-semibold -mt-0.5">Visentainer</div>
        </div>
      </div>

      {/* Navegação */}
      <nav className="p-3 space-y-2 flex-1 overflow-y-auto">
        <Item to="/" icon={LayoutDashboard} label="Painel" />
        <Item to="/patients" icon={Users} label="Pacientes" />
        <Item to="/exams" icon={FlaskConical} label="Exames" />
        <Item to="/reports" icon={FileText} label="Relatórios" />
      </nav>

      {/* Botão sair */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleExit}
          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg font-medium transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
