import { createClient } from "@supabase/supabase-js";

// 🔹 Cria o cliente Supabase com persistência automática da sessão
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Mantém login ativo ao recarregar o navegador
    autoRefreshToken: true, // Atualiza o token automaticamente
    detectSessionInUrl: true, // Detecta sessão no retorno do login (caso OAuth)
  },
});

// -----------------------------------------------------------
// 🔹 LOGIN / LOGOUT
// -----------------------------------------------------------

export async function signInWithPassword(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  localStorage.setItem("auth", "true");
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
  localStorage.removeItem("auth");
}

// -----------------------------------------------------------
// 🔹 SESSÃO / USUÁRIO
// -----------------------------------------------------------

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

// -----------------------------------------------------------
// 🔹 GESTÃO DE CONTA
// -----------------------------------------------------------

export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
  return data;
}

export async function updateUserProfile(updates) {
  const { data, error } = await supabase.auth.updateUser(updates);
  if (error) throw error;
  return data;
}

// -----------------------------------------------------------
// 🔹 TOKENS E CABEÇALHOS DE AUTENTICAÇÃO
// -----------------------------------------------------------

export async function getAccessToken() {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}

export async function getAuthHeaders() {
  const token = await getAccessToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
