import { supabase } from "./supabase";

const BUCKET_NAME = "uploads"; // nome do bucket no Supabase

// 🔹 Upload de arquivo
export async function uploadFile(file) {
  const filePath = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type || "application/octet-stream",
    });

  if (error) throw error;
  return filePath;
}

// 🔹 Listar arquivos
export async function listFiles() {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });

  if (error) throw error;
  return data.map((item) => ({
    id: item.id || item.name,
    name: item.name,
    ext: item.name.split(".").pop(),
    size: item.metadata?.size || 0,
  }));
}

// 🔹 Gerar link público temporário
export async function getSignedUrl(fileName) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(fileName, 60 * 60); // 1 hora

  if (error) throw error;
  return data.signedUrl;
}

// 🔹 Excluir arquivo
export async function deleteFile(fileName) {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([fileName]);

  if (error) throw error;
}
