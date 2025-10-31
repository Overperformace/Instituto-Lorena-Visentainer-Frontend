const VITE_API_URL = import.meta.env.VITE_API_URL || "https://instituto-lorena-visentainer-backend-h6x1.onrender.com";
const LOCAL_API = "http://localhost:3000";
const PROD_API = "https://instituto-lorena-visentainer-backend-h6x1.onrender.com";


// Pacientes
export async function getPatients() {
  const response = await fetch(`${API_URL}/patients`);
  return await response.json();
}

export async function createPatient(patientData) {
  const response = await fetch(`${API_URL}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patientData),
  });
  return await response.json();
}

// Exames
export async function getExams() {
  const response = await fetch(`${API_URL}/exams`);
  return await response.json();
}

export async function createExam(examData) {
  const response = await fetch(`${API_URL}/exams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(examData),
  });
  return await response.json();
}

// Usuários (opcional)
export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  return await response.json();
}
const AVITE_API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : import.meta.env.VITE_API_URL;

    export const API_URL =
  window.location.hostname === "localhost" ? LOCAL_API : PROD_API;

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Falha no upload");
  return await response.json();
}

export async function getFiles() {
  const response = await fetch(`${API_URL}/upload`);
  return await response.json();
}

export async function deleteFile(path) {
  await fetch(`${API_URL}/upload/${encodeURIComponent(path)}`, {
    method: "DELETE",
  });
}
