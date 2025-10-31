import React from "react";
import { LayoutDashboard, Users, FlaskConical, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Painel", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Pacientes", path: "/patients", icon: <Users size={18} /> },
    { name: "Exames", path: "/exams", icon: <FlaskConical size={18} /> },
    { name: "Relatórios", path: "/reports", icon: <FileText size={18} /> },
  ];

  return (
    <aside className="sidebar">
      <h2>Instituto Lorena Visentainer</h2>
      <nav>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${
              location.pathname === link.path ? "active" : ""
            }`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
