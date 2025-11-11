import React, { useState } from 'react';
import { FileText, Search, Eye, Edit, Trash2, Plus, Filter } from 'lucide-react';

function ExamManagement({ patients, exams, setExams, setSelectedExam, setShowModal, setModalType }) {
  // Lógica e JSX para a tela de Gerenciamento de Exames
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPatient, setFilterPatient] = useState('');
  const [searchExam, setSearchExam] = useState('');

  const filteredExams = exams.filter(e => {
    const matchesStatus = filterStatus ? e.status === filterStatus : true;
    const matchesPatient = filterPatient ? e.pacienteId === parseInt(filterPatient) : true;
    const matchesSearch = searchExam ? e.tipo.toLowerCase().includes(searchExam.toLowerCase()) || e.paciente.toLowerCase().includes(searchExam.toLowerCase()) : true;
    return matchesStatus && matchesPatient && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluído': return 'bg-green-100 text-green-800';
      case 'Processado': return 'bg-blue-100 text-blue-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciamento de Exames ({exams.length})</h2>
        <button onClick={() => { setModalType('newExam'); setShowModal(true); }} className="bg-green-600 hover:bg-green-700 text-white flex items-center px-4 py-2 rounded-lg">
          <Plus className="w-5 h-5 mr-2" />
          Novo Exame
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por tipo de exame ou paciente..."
          value={searchExam}
          onChange={(e) => setSearchExam(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Filtrar por Status</option>
          <option value="Pendente">Pendente</option>
          <option value="Concluído">Concluído</option>
          <option value="Processado">Processado</option>
        </select>
        <select
          value={filterPatient}
          onChange={(e) => setFilterPatient(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Filtrar por Paciente</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
      </div>

      {/* Tabela de Exames */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Exame</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExams.map(exam => (
              <tr key={exam.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.paciente}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.tipo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.data}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(exam.status)}`}>
                    {exam.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => setSelectedExam(exam)} className="text-blue-600 hover:text-blue-900 mr-3">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button onClick={() => { setModalType('newExam'); setShowModal(true); }} className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button onClick={() => { /* handleDeleteExam(exam.id) */ }} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExamManagement;
