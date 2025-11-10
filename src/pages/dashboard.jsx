import React, { useState } from "react";

export default function Dashboard() {
  const [form, setForm] = useState({
    nome: "",
    nascimento: "",
    caneta: "não",
    especificacao: "",
    prontuario: "",
    cirurgiao: "lorena",
    telefone: "",
    dataCirurgia: "",
    arquivo: null,
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const analisarExame = () => {
    // Simulação de leitura de arquivo (pode integrar com IA ou backend depois)
    // Exemplo simples para simular resultados
    const resumo = {
      sorologias: {
        hepatiteB: "Não reagente",
        hepatiteC: "Não reagente",
        hiv: "Não reagente",
        vdrl: "Não reagente",
      },
      testosteronaTotal: 720,
      testosteronaLivre: 450,
      status: "verde",
      comentario: "Exames dentro da normalidade",
    };

    // Simulação de resultado crítico
    if (resumo.testosteronaTotal > 800 || resumo.testosteronaLivre > 800) {
      resumo.status = "vermelho";
      resumo.comentario = "Testosterona acima do limite.";
    }

    // Simulação parcial (exemplo)
    if (form.caneta === "sim" || resumo.testosteronaTotal < 300) {
      resumo.status = "amarelo";
      resumo.comentario = "Exames parciais — verificar vitaminas.";
    }

    setResultado(resumo);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("nome", form.nome);
  formData.append("nascimento", form.nascimento);
  formData.append("caneta", form.caneta);
  formData.append("especificacao", form.especificacao);
  formData.append("prontuario", form.prontuario);
  formData.append("cirurgiao", form.cirurgiao);
  formData.append("telefone", form.telefone);
  formData.append("dataCirurgia", form.dataCirurgia);
  if (form.arquivo) {
    formData.append("arquivo", form.arquivo);
  }

  try {
    const response = await fetch("/api/exams", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Erro no envio");
    // sucesso
    alert("Exame enviado com sucesso!");
    // opcional: setResultado(data.resultado) para exibir análise retornada
  } catch (err) {
    console.error(err);
    alert("Falha ao enviar exame: " + err.message);
  }
};

  return (
    <div className="p-6 space-y-8">
      {/* Título */}
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Dashboard</h1>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 shadow rounded-lg border-l-4 border-blue-500">
          <h3 className="text-gray-600 font-medium">Exames Processados</h3>
          <p className="text-2xl font-bold mt-2">7</p>
          <p className="text-green-500 text-sm mt-1">+12% este mês</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg border-l-4 border-red-500">
          <h3 className="text-gray-600 font-medium">Tempo Médio</h3>
          <p className="text-2xl font-bold mt-2">3,2 min</p>
          <p className="text-red-500 text-sm mt-1">-8% por análise</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg border-l-4 border-green-500">
          <h3 className="text-gray-600 font-medium">Pacientes Ativos</h3>
          <p className="text-2xl font-bold mt-2">7</p>
          <p className="text-green-500 text-sm mt-1">+5%</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg border-l-4 border-blue-400">
          <h3 className="text-gray-600 font-medium">Eficiência</h3>
          <p className="text-2xl font-bold mt-2">97,8%</p>
          <p className="text-green-500 text-sm mt-1">+2%</p>
        </div>
      </div>

      {/* Upload de Exames */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Upload de Exames
        </h2>
        <p className="text-gray-600 mb-6">
          Faça o upload dos exames do paciente e preencha os dados abaixo.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nome do paciente
            </label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Data de nascimento
            </label>
            <input
              type="date"
              name="nascimento"
              value={form.nascimento}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Utiliza caneta emagrecedora?
            </label>
            <select
              name="caneta"
              value={form.caneta}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="não">Não</option>
              <option value="sim">Sim</option>
            </select>
          </div>

          {form.caneta === "sim" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Especifique
              </label>
              <input
                type="text"
                name="especificacao"
                value={form.especificacao}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Número de prontuário
            </label>
            <input
              type="text"
              name="prontuario"
              value={form.prontuario}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Cirurgião
            </label>
            <select
              name="cirurgiao"
              value={form.cirurgiao}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="lorena">Dra. Lorena</option>
              <option value="jaqueline">Dra. Jaqueline</option>
              <option value="mateus">Dr. Mateus</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Telefone (WhatsApp)
            </label>
            <input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Data da cirurgia
            </label>
            <input
              type="date"
              name="dataCirurgia"
              value={form.dataCirurgia}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">
              Anexo do exame
            </label>
            <input
              type="file"
              name="arquivo"
              accept=".pdf,.jpg,.png,.xlsx"
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-sm transition-all"
            >
              Enviar Exame
            </button>
          </div>
        </form>

        {resultado && (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Resultado da Análise
            </h3>

            <div
              className={`p-4 rounded-lg ${
                resultado.status === "verde"
                  ? "bg-green-100 border-l-4 border-green-500"
                  : resultado.status === "amarelo"
                  ? "bg-yellow-100 border-l-4 border-yellow-500"
                  : "bg-red-100 border-l-4 border-red-500"
              }`}
            >
              <p className="font-medium mb-1">
                Status:{" "}
                <span className="capitalize">{resultado.status}</span>
              </p>
              <p className="text-gray-700">{resultado.comentario}</p>
              <div className="mt-3 text-sm text-gray-600">
                <p>
                  <b>Hepatite B:</b> {resultado.sorologias.hepatiteB}
                </p>
                <p>
                  <b>Hepatite C:</b> {resultado.sorologias.hepatiteC}
                </p>
                <p>
                  <b>HIV:</b> {resultado.sorologias.hiv}
                </p>
                <p>
                  <b>VDRL:</b> {resultado.sorologias.vdrl}
                </p>
                <p>
                  <b>Testosterona Total:</b> {resultado.testosteronaTotal}
                </p>
                <p>
                  <b>Testosterona Livre:</b> {resultado.testosteronaLivre}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
