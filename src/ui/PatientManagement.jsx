import React, { useState } from 'react';
import { Users, Search, Eye, Edit, Trash2, Plus, Filter } from 'lucide-react';

function PatientManagement({ patients, setPatients, exams, setExams, surgeries, setSurgeries, setCurrentView, setShowModal, setModalType, setSelectedPatient }) {
  // Lógica e JSX para a tela de Gerenciamento de Pacientes
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSurgeon, setFilterSurgeon] = useState('');
  const [searchPatient, setSearchPatient] = useState('');

  const filteredPatients = patients.filter(p => {
    const matchesStatus = filterStatus ? p.status === filterStatus : true;
    const matchesSurgeon = filterSurgeon ? p.cirurgiao === filterSurgeon : true;
    const matchesSearch = searchPatient ? p.nome.toLowerCase().includes(searchPatient.toLowerCase()) || p.prontuario.toLowerCase().includes(searchPatient.toLowerCase()) : true;
    return matchesStatus && matchesSurgeon && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completo': return 'bg-green-100 text-green-800';
      case 'Parcial': return 'bg-yellow-100 text-yellow-800';
      case 'Atenção': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciamento de Pacientes ({patients.length})</h2>
        <button onClick={() => { setModalType('newPatient'); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center px-4 py-2 rounded-lg">
          <Plus className="w-5 h-5 mr-2" />
          Novo Paciente
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome ou prontuário..."
          value={searchPatient}
          onChange={(e) => setSearchPatient(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Filtrar por Status</option>
          <option value="Completo">Completo</option>
          <option value="Parcial">Parcial</option>
          <option value="Atenção">Atenção</option>
        </select>
        <select
          value={filterSurgeon}
          onChange={(e) => setFilterSurgeon(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Filtrar por Cirurgião</option>
          <option value="Dra. Lorena">Dra. Lorena</option>
          <option value="Dra. Jaqueline">Dra. Jaqueline</option>
          <option value="Dr. Mateus">Dr. Mateus</option>
        </select>
      </div>

      {/* Tabela de Pacientes */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prontuário</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cirurgião</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Cirurgia</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.prontuario}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.cirurgiao}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.dataCirurgia}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => setSelectedPatient(patient)} className="text-blue-600 hover:text-blue-900 mr-3">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button onClick={() => { setModalType('newPatient'); setShowModal(true); }} className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button onClick={() => { /* handleDeletePatient(patient.id) */ }} className="text-red-600 hover:text-red-900">
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

export default PatientManagement;
