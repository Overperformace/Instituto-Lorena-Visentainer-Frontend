console.log("Carregando página: dashboard");
import React from "react";
import Card from "../components/card";

export default function Dashboard() {
  const stats = [
    { title: "Exames Processados", value: 7, change: "+12%", color: "#1976d2" },
    { title: "Tempo Médio", value: "3,2 min", change: "-8%", color: "#f44336" },
    { title: "Pacientes Ativos", value: 7, change: "+5%", color: "#2e7d32" },
    { title: "Eficiência", value: "97,8%", change: "+2%", color: "#1565c0" },
  ];

  return (
    <div>
      <h1>Painel</h1>
      <div className="cards-grid">
        {stats.map((stat, i) => (
          <Card key={i} {...stat} />
        ))}
      </div>
    </div>
  );
}
