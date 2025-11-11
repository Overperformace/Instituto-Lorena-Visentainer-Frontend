console.log("Carregando página: reports'");
import React, { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { supabase } from "../services/supabase";

export default function Reports() {
    return (<div className="card"><h3>Relatórios</h3><p>Em breve: visão consolidada por cirurgião e status.</p></div>)
    const [reports, setReports] = useState([]);

  useEffect(() => {
    // Exemplo: mock de dados
    setReports([
      { mes: "Agosto", exames: 25, pacientes: 18, eficiencia: "96%" },
      { mes: "Setembro", exames: 31, pacientes: 22, eficiencia: "98%" },
      { mes: "Outubro", exames: 27, pacientes: 19, eficiencia: "97%" },
    ]);
  }, []);

  return (
    <div>
      <h1>Relatórios</h1>
      <div className="report-header">
        <BarChart3 color="#2563eb" size={30} />
        <p>Resumo mensal de desempenho e produtividade</p>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Mês</th>
            <th>Exames Processados</th>
            <th>Pacientes Ativos</th>
            <th>Eficiência</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <tr key={i}>
              <td>{r.mes}</td>
              <td>{r.exames}</td>
              <td>{r.pacientes}</td>
              <td>{r.eficiencia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
