import React, { useState, useEffect } from 'react';
import { Calendar, Users, FileText, BarChart3, Upload, Search, Eye, Download, Share2, Settings, LogOut, User, ChevronLeft, ChevronRight, X, Plus, Edit, Trash2, Menu, ChevronDown, Filter, Clock, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import './App.css';
import PatientManagement from './ui/PatientManagement';
import ExamManagement from './ui/ExamManagement';
import ReportGeneration from './ui/ReportGeneration';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [patients, setPatients] = useState([
    {
      id: 1,
      nome: 'Maria Silva Santos',
      prontuario: 'P001',
      cpf: '123.456.789-00',
      telefone: '(11) 99999-9999',
      dataCirurgia: '2024-12-14',
      cirurgiao: 'Dra. Lorena',
      status: 'Parcial',
      canetaEmagrecedora: 'Não',
      exames: [
        { tipo: 'Vitamina D', valor: 35, referencia: '> 40', status: 'Baixo' },
        { tipo: 'Vitamina B12', valor: 650, referencia: '> 700', status: 'Baixo' },
        { tipo: 'Ferritina', valor: 85, referencia: '> 70', status: 'Normal' }
      ]
    },
    {
      id: 2,
      nome: 'João Carlos Oliveira',
      prontuario: 'P002',
      cpf: '987.654.321-00',
      telefone: '(11) 88888-8888',
      dataCirurgia: '2024-12-19',
      cirurgiao: 'Dra. Jaqueline',
      status: 'Atenção',
      canetaEmagrecedora: 'Sim - Ozempic 1mg',
      exames: [
        { tipo: 'Testosterona Total', valor: 850, referencia: '< 800', status: 'Alto' },
        { tipo: 'HIV', valor: 'Reagente', referencia: 'Não Reagente', status: 'Alterado' }
      ]
    }
  ]);
  const [exams, setExams] = useState([
    { id: 1, paciente: 'Maria Silva Santos', tipo: 'Hemograma Completo', data: '2024-10-15', status: 'Concluído' },
    { id: 2, paciente: 'João Carlos Oliveira', tipo: 'Exame Pré-operatório', data: '2024-10-16', status: 'Pendente' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSurgeon, setSelectedSurgeon] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [preRegisterData, setPreRegisterData] = useState(null);
  const [formData, setFormData] = useState({});

  // Dados simulados para análise de exames
  const mockExamData = {
    vitaminaD: 35,
    vitaminaB12: 650,
    ferritina: 45,
    testosterona: 850,
    testosteronaLivre: 820,
    sorologias: {
      hepatiteB: 'Não Reagente',
      hepatiteC: 'Não Reagente',
      hiv: 'Não Reagente',
      vdrl: 'Não Reagente'
    }
  };

  useEffect(() => {
    // Carregar dados do localStorage
    const savedPatients = localStorage.getItem('patients');
    const savedExams = localStorage.getItem('exams');
    
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
    if (savedExams) {
      setExams(JSON.parse(savedExams));
    }
  }, []);

  useEffect(() => {
    // Salvar dados no localStorage
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('exams', JSON.stringify(exams));
  }, [patients, exams]);

  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('login');
    setShowUserMenu(false);
  };

  // Função para extrair dados do PDF (simulada)
  const extractDataFromPDF = (file) => {
    // Simulação de extração de dados de diferentes tipos de exames
    const mockPatientData = {
      nomeCompleto: 'Ana Carolina Silva',
      dataNascimento: '1985-03-15',
      prontuario: 'P003',
      telefone: '(11) 98765-4321',
      dataCirurgia: '2024-12-20',
      cpf: '456.789.123-00'
    };

    return mockPatientData;
  };

  // Função para verificar se paciente já existe
  const checkExistingPatient = (data) => {
    return patients.find(p => 
      p.nome.toLowerCase() === data.nomeCompleto.toLowerCase() ||
      p.cpf === data.cpf ||
      p.prontuario === data.prontuario
    );
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      // Extrair dados do PDF
      const extractedData = extractDataFromPDF(file);
      
      // Verificar se paciente já existe
      const existingPatient = checkExistingPatient(extractedData);
      
      if (existingPatient) {
        // Paciente já existe - apenas processar exame
        const newExam = {
          id: Date.now(),
          pacienteId: existingPatient.id,
          paciente: existingPatient.nome,
          tipo: 'Exame Laboratorial',
          data: new Date().toISOString().split('T')[0],
          status: 'Processado',
          arquivo: file.name,
          resultados: mockExamData
        };
        
        setExams(prev => [...prev, newExam]);
        setExamResults([mockExamData]);
        alert(`Exame processado para paciente existente: ${existingPatient.nome}`);
      } else {
        // Novo paciente - abrir modal de pré-cadastro
        setPreRegisterData(extractedData);
        setModalType('preRegister');
        setShowModal(true);
      }
    });
    
    setUploadedFiles(files);
  };

  const handlePreRegister = (e) => {
    e.preventDefault();
    
    const newPatient = {
      id: Date.now(),
      nome: formData.nomeCompleto || preRegisterData.nomeCompleto,
      prontuario: formData.prontuario || preRegisterData.prontuario,
      cpf: formData.cpf || preRegisterData.cpf,
      telefone: formData.telefone || preRegisterData.telefone,
      dataCirurgia: formData.dataCirurgia || preRegisterData.dataCirurgia,
      cirurgiao: formData.cirurgiao || 'Dra. Lorena',
      canetaEmagrecedora: formData.canetaEmagrecedora || 'Não',
      status: getPatientStatus(mockExamData),
      exames: processExamResults(mockExamData)
    };
    
    setPatients(prev => [...prev, newPatient]);
    
    const newExam = {
      id: Date.now(),
      pacienteId: newPatient.id,
      paciente: newPatient.nome,
      tipo: 'Exame Pré-operatório',
      data: new Date().toISOString().split('T')[0],
      status: 'Concluído',
      resultados: mockExamData
    };
    
    setExams(prev => [...prev, newExam]);
    setExamResults([mockExamData]);
    
    setShowModal(false);
    setPreRegisterData(null);
    setFormData({});
    
    alert(`Paciente ${newPatient.nome} cadastrado com sucesso!`);
  };

  const processExamResults = (data) => {
    const results = [];
    
    if (data.vitaminaD) {
      results.push({
        tipo: 'Vitamina D',
        valor: data.vitaminaD,
        referencia: '> 40',
        status: data.vitaminaD > 40 ? 'Normal' : 'Baixo'
      });
    }
    
    if (data.vitaminaB12) {
      results.push({
        tipo: 'Vitamina B12',
        valor: data.vitaminaB12,
        referencia: '> 700',
        status: data.vitaminaB12 > 700 ? 'Normal' : 'Baixo'
      });
    }
    
    if (data.ferritina) {
      results.push({
        tipo: 'Ferritina',
        valor: data.ferritina,
        referencia: '> 70',
        status: data.ferritina > 70 ? 'Normal' : 'Baixo'
      });
    }
    
    if (data.testosterona) {
      results.push({
        tipo: 'Testosterona Total',
        valor: data.testosterona,
        referencia: '< 800',
        status: data.testosterona < 800 ? 'Normal' : 'Alto'
      });
    }
    
    if (data.testosteronaLivre) {
      results.push({
        tipo: 'Testosterona Livre',
        valor: data.testosteronaLivre,
        referencia: '< 800',
        status: data.testosteronaLivre < 800 ? 'Normal' : 'Alto'
      });
    }
    
    // Sorologias
    Object.entries(data.sorologias || {}).forEach(([key, value]) => {
      const names = {
        hepatiteB: 'Hepatite B - HBsAg',
        hepatiteC: 'Hepatite C - Anti-HCV',
        hiv: 'HIV 1 e 2 - Anticorpos',
        vdrl: 'VDRL - Sorologia para Lues'
      };
      
      results.push({
        tipo: names[key] || key,
        valor: value,
        referencia: 'Não Reagente',
        status: value === 'Não Reagente' ? 'Normal' : 'Alterado'
      });
    });
    
    return results;
  };

  const getPatientStatus = (data) => {
    let hasLowVitamins = false;
    let hasSerology = false;
    let hasMedication = false;
    
    // Verificar vitaminas
    if (data.vitaminaD <= 40 || data.vitaminaB12 <= 700 || data.ferritina <= 70) {
      hasLowVitamins = true;
    }
    
    // Verificar sorologias
    if (data.sorologias) {
      Object.values(data.sorologias).forEach(value => {
        if (value !== 'Não Reagente') {
          hasSerology = true;
        }
      });
    }
    
    // Verificar testosterona (acima de 800 é ruim)
    if (data.testosterona > 800 || data.testosteronaLivre > 800) {
      hasMedication = true;
    }
    
    if (hasSerology || hasMedication) {
      return 'Atenção';
    } else if (hasLowVitamins) {
      return 'Parcial';
    } else {
      return 'OK';
    }
  };

  const generateExamReport = (results) => {
    // Gerar relatório em formato de imagem/PDF
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 600;
    
    // Fundo branco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Cabeçalho
    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Instituto Lorena Visentainer', 50, 50);
    
    ctx.fillStyle = '#000000';
    ctx.font = '16px Arial';
    ctx.fillText('Resultados de Exames', 50, 80);
    
    // Resultados
    let y = 120;
    results.forEach(result => {
      ctx.font = 'bold 14px Arial';
      ctx.fillText(result.tipo, 50, y);
      
      ctx.font = '12px Arial';
      ctx.fillText(`Resultado: ${result.valor}`, 50, y + 20);
      ctx.fillText(`Referência: ${result.referencia}`, 50, y + 35);
      
      // Status com cor
      ctx.fillStyle = result.status === 'Normal' ? '#16a34a' : '#dc2626';
      ctx.fillText(`Status: ${result.status}`, 50, y + 50);
      ctx.fillStyle = '#000000';
      
      y += 80;
    });
    
    return canvas.toDataURL('image/png');
  };

  const handleCopyToWhatsApp = () => {
    if (examResults.length > 0) {
      const imageData = generateExamReport(processExamResults(examResults[0]));
      
      // Criar link para download da imagem
      const link = document.createElement('a');
      link.download = 'resultado_exames.png';
      link.href = imageData;
      link.click();
      
      alert('Imagem dos resultados gerada! Você pode compartilhar no WhatsApp.');
    }
  };

  const handleDownloadPDF = () => {
    if (examResults.length > 0) {
      const imageData = generateExamReport(processExamResults(examResults[0]));
      
      // Criar PDF simples (simulado como imagem)
      const link = document.createElement('a');
      link.download = 'resultado_exames.pdf';
      link.href = imageData;
      link.click();
      
      alert('PDF dos resultados baixado!');
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.cpf.includes(searchTerm) ||
                         patient.prontuario.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSurgeon = !selectedSurgeon || patient.cirurgiao === selectedSurgeon;
    const matchesDate = !dateFilter || patient.dataCirurgia === dateFilter;
    
    return matchesSearch && matchesSurgeon && matchesDate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'OK': return 'text-green-600 bg-green-100';
      case 'Parcial': return 'text-yellow-600 bg-yellow-100';
      case 'Atenção': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'OK': return <CheckCircle className="w-4 h-4" />;
      case 'Parcial': return <AlertTriangle className="w-4 h-4" />;
      case 'Atenção': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    const monthNames = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
                       'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    // Dias vazios no início
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const patientsOnDate = patients.filter(p => p.dataCirurgia === dateStr);
      const hasPatients = patientsOnDate.length > 0;

      days.push(
        <div
          key={day}
          onClick={() => hasPatients && setSelectedDate({ date: dateStr, patients: patientsOnDate })}
          className={`p-2 text-center cursor-pointer rounded-lg transition-colors ${
            hasPatients 
              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
              : 'hover:bg-gray-100'
          }`}
        >
          {day}
          {hasPatients && (
            <div className="w-2 h-2 bg-blue-600 rounded-full mx-auto mt-1"></div>
          )}
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Calendário de Cirurgias</h3>
            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Filtro por cirurgião */}
          <div className="mb-4">
            <select 
              value={selectedSurgeon} 
              onChange={(e) => setSelectedSurgeon(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Todos os Cirurgiões</option>
              <option value="Dra. Lorena">Dra. Lorena</option>
              <option value="Dra. Jaqueline">Dra. Jaqueline</option>
              <option value="Dr. Mateus">Dr. Mateus</option>
            </select>
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(new Date(year, month - 1))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h4 className="font-medium">{monthNames[month]} de {year}</h4>
            <button
              onClick={() => setCurrentMonth(new Date(year, month + 1))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days}
          </div>

          {selectedDate && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h5 className="font-medium mb-2">Cirurgias em {selectedDate.date}</h5>
              {selectedDate.patients.map(patient => (
                <div key={patient.id} className="mb-2 p-2 bg-white rounded border">
                  <div className="font-medium">{patient.nome}</div>
                  <div className="text-sm text-gray-600">Cirurgião: {patient.cirurgiao}</div>
                  <div className="text-sm text-gray-600">Caneta: {patient.canetaEmagrecedora}</div>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(patient.status)}`}>
                    {getStatusIcon(patient.status)}
                    {patient.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Instituto Lorena Visentainer</h1>
            <p className="text-gray-600 mt-2">Sistema de Gestão Clínica</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuário</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite seu usuário"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite sua senha"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Entrar
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Credenciais de demonstração:</p>
            <p><strong>Usuário:</strong> admin</p>
            <p><strong>Senha:</strong> admin123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-blue-600 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-blue-500">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold">Instituto Lorena Visentainer</h1>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-blue-700 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {[
              { id: 'dashboard', icon: BarChart3, label: 'Painel' },
              { id: 'patients', icon: Users, label: 'Pacientes' },
              { id: 'exams', icon: FileText, label: 'Exames' },
              { id: 'reports', icon: BarChart3, label: 'Relatórios' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  currentView === item.id ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <item.icon className="w-5 h-5" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              {currentView === 'dashboard' && 'Dashboard'}
              {currentView === 'patients' && 'Pacientes'}
              {currentView === 'exams' && 'Exames'}
              {currentView === 'reports' && 'Relatórios'}
            </h2>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Olá, Administrador do Sistema</span>
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <User className="w-6 h-6 text-gray-600" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                        Trocar Senha
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-600"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {currentView === 'dashboard' && (
            <div className="space-y-6">
              {/* Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Exames Processados</p>
                      <p className="text-3xl font-bold text-blue-600">{exams.length}</p>
                      <p className="text-sm text-green-600">Este mês +12%</p>
                    </div>
                    <FileText className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Tempo Médio</p>
                      <p className="text-3xl font-bold text-blue-600">3,2</p>
                      <p className="text-sm text-red-600">minutos Por análise -8%</p>
                    </div>
                    <Clock className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pacientes</p>
                      <p className="text-3xl font-bold text-blue-600">{patients.length}</p>
                      <p className="text-sm text-green-600">Ativos +5%</p>
                    </div>
                    <Users className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Eficiência</p>
                      <p className="text-3xl font-bold text-blue-600">97,8%</p>
                      <p className="text-sm text-green-600">Precisão +2%</p>
                    </div>
                    <BarChart3 className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload de Exames */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 text-blue-600">Upload de Exames</h3>
                  <p className="text-gray-600 mb-4">Faça upload dos exames do paciente (PDF, JPG, PNG, XLSX)</p>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Arraste os arquivos aqui ou clique para selecionar</p>
                    <p className="text-sm text-gray-500 mb-4">Suporta PDF, JPG, PNG e Excel (máx. 10MB cada)</p>
                    
                    <label className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                      Selecionar Arquivos
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4">
                      <p className="font-medium mb-2">Arquivos selecionados:</p>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Aguardando Exames */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 text-blue-600">Aguardando Exames</h3>
                  <p className="text-gray-600 mb-4">Faça upload dos exames para iniciar a análise automaticamente</p>
                  
                  <div className="text-center py-8">
                    <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Os resultados aparecerão aqui após o upload</p>
                  </div>
                  
                  {examResults.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Resultados dos Exames:</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Exame</th>
                              <th className="text-left p-2">Valor</th>
                              <th className="text-left p-2">Referência</th>
                              <th className="text-left p-2">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {processExamResults(examResults[0]).map((result, index) => (
                              <tr key={index} className="border-b">
                                <td className="p-2 font-medium">{result.tipo}</td>
                                <td className="p-2">{result.valor}</td>
                                <td className="p-2 text-gray-600">{result.referencia}</td>
                                <td className="p-2">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    result.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {result.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="flex gap-2 pt-4">
                        <button
                          onClick={handleCopyToWhatsApp}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <Share2 className="w-4 h-4" />
                          Copiar para WhatsApp
                        </button>
                        <button
                          onClick={handleDownloadPDF}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <Download className="w-4 h-4" />
                          Gerar PDF
                        </button>
                        <button
                          onClick={() => setExamResults([])}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                          Limpar Dados
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentView === 'patients' && (
            <PatientManagement 
              patients={patients}
              setPatients={setPatients}
              exams={exams}
              setExams={setExams}
              setCurrentView={setCurrentView}
              setShowModal={setShowModal}
              setModalType={setModalType}
            />
          )}

          {currentView === 'exams' && (
            <ExamManagement 
              patients={patients}
              exams={exams}
              setExams={setExams}
              setShowModal={setShowModal}
              setModalType={setModalType}
            />
          )}

          {currentView === 'reports' && (
            <ReportGeneration 
              patients={patients}
              exams={exams}
              surgeries={patients
                .filter(p => p.dataCirurgia)
                .map(p => ({
                  patientName: p.nome,
                  procedure: 'Cirurgia Bariátrica',
                  date: p.dataCirurgia,
                  time: '09:00',
                  surgeon: p.cirurgiao
                }))}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      {showModal && modalType === 'calendar' && renderCalendar()}
      
      {showModal && modalType === 'preRegister' && preRegisterData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pré-cadastro do Paciente</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handlePreRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome Completo *</label>
                <input
                  type="text"
                  value={formData.nomeCompleto || preRegisterData.nomeCompleto}
                  onChange={(e) => setFormData({...formData, nomeCompleto: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
                <input
                  type="date"
                  value={formData.dataNascimento || preRegisterData.dataNascimento}
                  onChange={(e) => setFormData({...formData, dataNascimento: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Número do Prontuário</label>
                <input
                  type="text"
                  value={formData.prontuario || preRegisterData.prontuario}
                  onChange={(e) => setFormData({...formData, prontuario: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Telefone (WhatsApp) *</label>
                <input
                  type="text"
                  value={formData.telefone || preRegisterData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Data da Cirurgia</label>
                <input
                  type="date"
                  value={formData.dataCirurgia || preRegisterData.dataCirurgia}
                  onChange={(e) => setFormData({...formData, dataCirurgia: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Utiliza caneta emagrecedora?</label>
                <input
                  type="text"
                  placeholder="Sim - especifique ou Não"
                  value={formData.canetaEmagrecedora || ''}
                  onChange={(e) => setFormData({...formData, canetaEmagrecedora: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Qual cirurgião? *</label>
                <select
                  value={formData.cirurgiao || 'Dra. Lorena'}
                  onChange={(e) => setFormData({...formData, cirurgiao: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="Dra. Lorena">Dra. Lorena</option>
                  <option value="Dra. Jaqueline">Dra. Jaqueline</option>
                  <option value="Dr. Mateus">Dr. Mateus</option>
                </select>
              </div>
              
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Cadastrar Paciente
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {showModal && modalType === 'generateReport' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Configurar Relatório</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de Relatório</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Relatório de Pacientes</option>
                  <option>Relatório de Exames</option>
                  <option>Relatório de Cirurgias</option>
                  <option>Relatório Geral</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Data Início</label>
                <input type="date" className="w-full p-2 border rounded-lg" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Data Fim</label>
                <input type="date" className="w-full p-2 border rounded-lg" />
              </div>
              
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    alert('Relatório gerado com sucesso!');
                    setShowModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Gerar e Imprimir
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
