import http from './http';

export async function listFiles() {
  const { data } = await http.get('/files');
  return data;
}

// file: File (input)
// patientId: opcional (string)
export async function uploadFile(file, patientId) {
  const form = new FormData();
  form.append('file', file);
  if (patientId) form.append('patientId', patientId);
  const { data } = await http.post('/files', form, { headers: { 'Content-Type': 'multipart/form-data' }});
  return data;
}

export async function getSignedUrl(id) {
  const enc = encodeURIComponent(id);
  const { data } = await http.get(`/files/${enc}/signed`);
  return data.url;
}

export async function deleteFile(id) {
  const enc = encodeURIComponent(id);
  const { data } = await http.delete(`/files/${enc}`);
  return data;
}
import { createClient } from '@supabase/supabase-js'

// 🔗 Configuração principal
const supabaseUrl = 'https://kxhrpbjjfpuomlzrvir.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4aHJwYmpqZnVwb3VtbHpydmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3OTcxNDMsImV4cCI6MjA3NjM3MzE0M30.wZk2sWLIkTsOJMcGdQcvFpegcILtrgq1j_7rRvberpo'

// 🗂️ Inicializa o cliente Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Nome do bucket que vai armazenar os arquivos
const BUCKET_NAME = 'uploads'

// 📤 Upload de arquivo
export async function uploadFile(file) {
  const filePath = `${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error
  return filePath
}

// 📋 Listagem de arquivos
export async function listFiles() {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } })

  if (error) throw error
  return data.map((item) => ({
    id: item.id || item.name,
    name: item.name,
    ext: item.name.split('.').pop(),
    size: item.metadata?.size || 0,
  }))
}

// 🔗 Gera link público para abrir o arquivo
export async function getSignedUrl(fileName) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(fileName, 60 * 60) // 1 hora

  if (error) throw error
  return data.signedUrl
}

// ❌ Excluir arquivo
export async function deleteFile(fileName) {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([fileName])

  if (error) throw error
}

// 📦 Exporta o cliente se precisar em outros lugares
export { supabase }
