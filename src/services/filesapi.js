import { createClient } from '@supabase/supabase-js';

// ⚙️ Configurações do Supabase
const supabaseUrl = 'https://kxhrpbjjfpuomlzvrir.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4aHJwYmpqZnVwb3VtbHpydmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3OTcxNDMsImV4cCI6MjA3NjM3MzE0M30.wZk2sWLIkTsOJMcGdQcvFpegcILtrgq1j_7rRvberpo';

// 🧩 Inicializa o cliente Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 🗂️ Nome do bucket no Supabase
const BUCKET_NAME = 'uploads';

/* 📤 UPLOAD DE ARQUIVO - Faz upload do arquivo para o bucket "uploads" - Gera um nome único baseado na data/hora*/
export async function uploadFile(file) {
  const filePath = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true, // permite sobrescrever arquivos
      contentType: file.type || 'application/octet-stream',
    });

  if (error) throw error;
  return filePath;
}

/* 📋 LISTAGEM DE ARQUIVOS - Retorna até 100 arquivos ordenados por data de criação*/
export async function listFiles() {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

  if (error) throw error;

  return data.map((item) => ({
    id: item.id || item.name,
    name: item.name,
    ext: item.name.split('.').pop(),
    size: item.metadata?.size || 0,
  }));
}

/* 🔗 GERA LINK TEMPORÁRIO - Cria URL pública para visualização do arquivo (1h de validade) */
export async function getSignedUrl(fileName) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(fileName, 60 * 60); // 1 hora

  if (error) throw error;
  return data.signedUrl;
}

/* ❌ EXCLUSÃO DE ARQUIVO - Remove um arquivo do bucket "uploads"*/
export async function deleteFile(fileName) {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([fileName]);

  if (error) throw error;
}

/* 📦 Exporta o cliente Supabase caso precise usar em outro lugar */
export { supabase };
