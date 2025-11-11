import React, { useState } from 'react';
import { BarChart3, Download, Printer } from 'lucide-react';

function ReportGeneration({ patients, exams, surgeries }) {
  // Lógica e JSX para a tela de Geração de Relatórios
  const [reportType, setReportType] = useState('patients');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const generateReport = () => {
    // Lógica de geração de relatório simulada
    let data = [];
    let title = '';

    switch (reportType) {
      case 'patients':
        title = 'Relatório de Pacientes';
        data = patients.map(p => ({
          Nome: p.nome,
          Prontuário: p.prontuario,
          Cirurgião: p.cirurgiao,
          Status: p.status,
          DataCirurgia: p.dataCirurgia
        }));
        break;
      case 'exams':
        title = 'Relatório de Exames';
        data = exams.map(e => ({
          Paciente: e.paciente,
          Tipo: e.tipo,
          Data: e.data,
          Status: e.status
        }));
        break;
      case 'surgeries':
        title = 'Relatório de Cirurgias';
        data = surgeries.map(s => ({
          Paciente: s.patientName,
          Procedimento: s.procedure,
          Data: s.date,
          Hora: s.time,
          Cirurgião: s.surgeon
        }));
        break;
      default:
        title = 'Relatório Geral';
        data = [{ Mensagem: 'Selecione um tipo de relatório.' }];
    }

    alert(`Gerando ${title} de ${data.length} registros. (Simulação)`);
    console.log(title, data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Geração de Relatórios</h2>
      
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Relatório</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="patients">Pacientes</option>
              <option value="exams">Exames</option>
              <option value="surgeries">Cirurgias</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Data Início</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Data Fim</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
        
        <button
          onClick={generateReport}
          className="bg-red-600 hover:bg-red-700 text-white flex items-center justify-center px-4 py-2 rounded-lg w-full"
        >
          <BarChart3 className="w-5 h-5 mr-2" />
          Gerar e Baixar Relatório
        </button>
      </div>

      {/* Visualização de Relatório (Simulada) */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Pré-visualização do Relatório</h3>
        <p className="text-gray-500">A pré-visualização do relatório será exibida aqui após a geração.</p>
      </div>
    </div>
  );
}

export default ReportGeneration;
