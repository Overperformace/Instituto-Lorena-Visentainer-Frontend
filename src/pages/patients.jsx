import React, { useEffect, useState } from "react";
import { getPatients, createPatient } from "../services/api";
import jsPDF from "jspdf";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cirurgiaoFilter, setCirurgiaoFilter] = useState("Todos");

  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    usaCaneta: "Não",
    especificarCaneta: "",
    prontuario: "",
    cirurgiao: "",
    telefone: "",
    dataCirurgia: "",
    exames: "",
  });

  // 🔹 Carregar pacientes
  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data || []);
      setFiltered(data || []);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  // 🔹 Filtro por cirurgião
  useEffect(() => {
    if (cirurgiaoFilter === "Todos") {
      setFiltered(patients);
    } else {
      setFiltered(patients.filter((p) => p.cirurgiao === cirurgiaoFilter));
    }
  }, [cirurgiaoFilter, patients]);

  // 🔹 Cadastro de paciente
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPatient(formData);
      alert("Paciente cadastrado com sucesso!");
      setShowModal(false);
      setFormData({
        nome: "",
        dataNascimento: "",
        usaCaneta: "Não",
        especificarCaneta: "",
        prontuario: "",
        cirurgiao: "",
        telefone: "",
        dataCirurgia: "",
        exames: "",
      });
      loadPatients();
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar paciente.");
    }
  };

  // 🔹 Copiar dados para WhatsApp
  const copiarParaWhatsApp = (p) => {
    const texto = `Paciente: ${p.nome}
Cirurgião: ${p.cirurgiao}
Telefone: ${p.telefone}
Data Cirurgia: ${p.dataCirurgia}
Status: ${analisarExames(p)}`;
    navigator.clipboard.writeText(texto);
    alert("Copiado para área de transferência!");
  };

  // 🔹 Baixar PDF
  const baixarPDF = (p) => {
    const doc = new jsPDF();
    doc.text(`Paciente: ${p.nome}`, 10, 10);
    doc.text(`Prontuário: ${p.prontuario}`, 10, 20);
    doc.text(`Cirurgião: ${p.cirurgiao}`, 10, 30);
    doc.text(`Data Cirurgia: ${p.dataCirurgia}`, 10, 40);
    doc.text(`Telefone: ${p.telefone}`, 10, 50);
    doc.text(`Status: ${analisarExames(p)}`, 10, 60);
    doc.save(`${p.nome}-exames.pdf`);
  };

  // 🔹 Lógica de análise automática
  const analisarExames = (p) => {
    if (!p.exames) return "Sem exames enviados";

    const texto = p.exames.toLowerCase();

    if (
      texto.includes("reagente") ||
      texto.includes("monjauro") ||
      texto.includes("hbsa") ||
      texto.includes("hiv") ||
      texto.includes("hepatite")
    ) {
      return "❌ Vermelho - Sorologia alterada";
    }

    if (texto.includes("vitamina baixa") || texto.includes("incompleto")) {
      return "⚠️ Amarelo - Parcial";
    }

    if (
      texto.includes("testosterona total acima de 800") ||
      texto.includes("livre acima de 800")
    ) {
      return "❌ Vermelho - Testosterona alta";
    }

    return "✅ Verde - Exames normais";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pacientes</h1>
        <div className="flex gap-2">
          <select
            className="border rounded-md px-2 py-1"
            value={cirurgiaoFilter}
            onChange={(e) => setCirurgiaoFilter(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Lorena">Lorena</option>
            <option value="Jaqueline">Jaqueline</option>
            <option value="Mateus">Mateus</option>
          </select>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Novo Paciente
          </button>
        </div>
      </div>

      {loading ? (
        <p>Carregando pacientes...</p>
      ) : filtered.length === 0 ? (
        <p>Nenhum paciente encontrado.</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="p-4 bg-gray-100 rounded-lg shadow">
              <h2 className="font-semibold text-lg">{p.nome}</h2>
              <p>📅 Cirurgia: {p.dataCirurgia || "—"}</p>
              <p>👨‍⚕️ Cirurgião: {p.cirurgiao}</p>
              <p>📞 {p.telefone}</p>
              <p>🧬 Status: {analisarExames(p)}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => copiarParaWhatsApp(p)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  Copiar WhatsApp
                </button>
                <button
                  onClick={() => baixarPDF(p)}
                  className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700"
                >
                  Baixar PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Cadastro */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Novo Paciente</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Nome do paciente"
                className="w-full border px-3 py-2 rounded"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
              <input
                type="date"
                className="w-full border px-3 py-2 rounded"
                value={formData.dataNascimento}
                onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
              />
              <select
                className="w-full border px-3 py-2 rounded"
                value={formData.usaCaneta}
                onChange={(e) => setFormData({ ...formData, usaCaneta: e.target.value })}
              >
                <option value="Não">Utiliza caneta emagrecedora? Não</option>
                <option value="Sim">Sim</option>
              </select>
              {formData.usaCaneta === "Sim" && (
                <input
                  type="text"
                  placeholder="Especifique qual caneta"
                  className="w-full border px-3 py-2 rounded"
                  value={formData.especificarCaneta}
                  onChange={(e) =>
                    setFormData({ ...formData, especificarCaneta: e.target.value })
                  }
                />
              )}
              <input
                type="text"
                placeholder="Número de prontuário"
                className="w-full border px-3 py-2 rounded"
                value={formData.prontuario}
                onChange={(e) => setFormData({ ...formData, prontuario: e.target.value })}
              />
              <select
                className="w-full border px-3 py-2 rounded"
                value={formData.cirurgiao}
                onChange={(e) => setFormData({ ...formData, cirurgiao: e.target.value })}
              >
                <option value="">Selecione o cirurgião</option>
                <option value="Lorena">Lorena</option>
                <option value="Jaqueline">Jaqueline</option>
                <option value="Mateus">Mateus</option>
              </select>
              <input
                type="tel"
                placeholder="Telefone (WhatsApp)"
                className="w-full border px-3 py-2 rounded"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              />
              <input
                type="date"
                className="w-full border px-3 py-2 rounded"
                value={formData.dataCirurgia}
                onChange={(e) => setFormData({ ...formData, dataCirurgia: e.target.value })}
              />
              <textarea
                placeholder="Resultados ou observações dos exames"
                className="w-full border px-3 py-2 rounded"
                value={formData.exames}
                onChange={(e) => setFormData({ ...formData, exames: e.target.value })}
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Patients;
