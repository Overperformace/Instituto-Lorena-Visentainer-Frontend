import { getPatients, createPatient } from "../services/api";

// ...

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await createPatient(formData);
    alert("Paciente cadastrado com sucesso!");
    setShowModal(false);
    setFormData({
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      cirurgiao: "",
      dataNascimento: "",
    });
    loadPatients(); // atualiza lista
  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar paciente.");
  }
};
