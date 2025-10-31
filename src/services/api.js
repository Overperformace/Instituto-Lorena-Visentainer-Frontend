import { createClient } from "@supabase/supabase-js";

// 🌍 URLs da API backend
const LOCAL_API = "http://localhost:3000";
const PROD_API = "https://instituto-lorena-visentainer-backend-h6x1.onrender.com";

// Detecta se está em localhost ou produção
export const API_URL =
  window.location.hostname === "localhost" ? LOCAL_API : PROD_API;

/* 🧬 PACIENTES (usando backend Express ou Node)*/
export async function getPatients() {
  const response = await fetch(`${API_URL}/patients`);
  if (!response.ok) throw new Error("Erro ao carregar pacientes");
  return await response.json();
}

export async function createPatient(patientData) {
  const response = await fetch(`${API_URL}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patientData),
  });
  if (!response.ok) throw new Error("Erro ao criar paciente");
  return await response.json();
}

/*🧪 EXAMES*/
export async function getExams() {
  const response = await fetch(`${API_URL}/exams`);
  if (!response.ok) throw new Error("Erro ao carregar exames");
  return await response.json();
}

export async function createExam(examData) {
  const response = await fetch(`${API_URL}/exams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(examData),
  });
  if (!response.ok) throw new Error("Erro ao criar exame");
  return await response.json();
}

/* 👤 USUÁRIOS (opcional)*/
export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error("Erro ao carregar usuários");
  return await response.json();
}

/* 💾 UPLOAD LOCAL (caso backend trate upload de arquivos)*/
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
  if (!response.ok) throw new Error("Erro ao listar arquivos");
  return await response.json();
}

export async function deleteFile(path) {
  const response = await fetch(`${API_URL}/upload/${encodeURIComponent(path)}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Erro ao excluir arquivo");
}

/* ☁️ SUPABASE (opcional — usado no filesapi.js) */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
