console.log("Carregando página: Exames");
import React from "react";
import UploadPanel from "../ui/UploadPanel";
import "../ui/panel.css"; 
import { supabase } from "../services/supabase";
export default function Exams() {
  return (
    <div className="exams-page">
      <h2 className="page-title">Exames</h2>

      <div className="exams-content">
        {/* Painel de upload real com Supabase */}
        <UploadPanel />

        {/* Espaço para outros cards (aguardando exames, estatísticas, etc.) */}
        <div className="side-panel">
          <div className="card waiting-exams">
            <h3>Aguardando Exames</h3>
            <p>Nenhum exame pendente no momento.</p>
          </div>

          <div className="card users">
            <h3>Usuários recentes</h3>
            <ul>
              <li>Maria Silva</li>
              <li>João Pereira</li>
              <li>Carla Souza</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
