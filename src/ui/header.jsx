import React, { useEffect, useState } from "react";
import { supabase, signOut, getUser } from "../services/supabase";
import { UserCircle, LogOut } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openChange, setOpenChange] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [user, setUser] = useState(null);

  // 🔹 Busca usuário logado ao carregar
  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getUser();
      setUser(currentUser);
    }
    fetchUser();

    // 🔹 Atualiza automaticamente ao logar/deslogar
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(session.user);
      else setUser(null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🔹 Logout
  async function handleLogout() {
  // Desloga no Supabase também
  supabase.auth.signOut();

  // Limpa dados locais
  localStorage.removeItem("auth");
  localStorage.removeItem("admin");

  // Redireciona pro login
  window.location.href = "/login";
}

  // 🔹 Trocar senha
  async function handleChangePassword(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newPass = form.get("password");
    try {
      const { error } = await supabase.auth.updateUser({ password: newPass });
      if (error) throw error;
      alert("Senha atualizada com sucesso.");
      setOpenChange(false);
    } catch (err) {
      alert("Erro ao atualizar senha: " + err.message);
    }
  }

  // 🔹 Criar usuário
  async function handleCreateUser(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const pass = form.get("password");
    try {
      const { error } = await supabase.auth.signUp({ email, password: pass });
      if (error) throw error;
      alert("Usuário criado com sucesso!");
      setOpenCreate(false);
    } catch (err) {
      alert("Erro ao criar usuário: " + err.message);
    }
  }

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-lg font-semibold text-slate-700">
        Painel Administrativo
      </h1>

      {/* Botão de conta */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <UserCircle className="w-5 h-5" />
          <span className="hidden sm:inline">
            {user?.user_metadata?.name || user?.email || "Conta"}
          </span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg p-2">
            <button
              onClick={() => {
                setMenuOpen(false);
                setOpenChange(true);
              }}
              className="w-full text-left px-3 py-2 rounded hover:bg-slate-100"
            >
              Trocar senha
            </button>

            {localStorage.getItem("admin") === "true" && (
              <button
                onClick={() => {
                 setMenuOpen(false);
                 setOpenCreate(true);
                }}
               className="w-full text-left px-4 py-2 hover:bg-slate-100"
              >
                Criar Usuário
             </button>
            )}

            <div className="my-1 h-px bg-slate-200" />
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-50"
            >
              <LogOut className="inline-block w-4 h-4 mr-1" />
              Sair
            </button>
          </div>
        )}
      </div>

      {/* Modal: Trocar senha */}
      {openChange && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-30">
          <form
            onSubmit={handleChangePassword}
            className="w-full max-w-md bg-white rounded-xl p-6 space-y-4"
          >
            <h3 className="text-lg font-medium">Trocar senha</h3>
            <input
              name="password"
              type="password"
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Nova senha"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpenChange(false)}
                className="px-3 py-2 rounded border"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-2 rounded bg-blue-600 text-white"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Criar usuário */}
      {openCreate && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-30">
          <form
            onSubmit={handleCreateUser}
            className="w-full max-w-md bg-white rounded-xl p-6 space-y-4"
          >
            <h3 className="text-lg font-medium">Criar usuário</h3>
            <input
              name="email"
              type="email"
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Email"
            />
            <input
              name="password"
              type="password"
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Senha"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpenCreate(false)}
                className="px-3 py-2 rounded border"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-2 rounded bg-blue-600 text-white"
              >
                Criar
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
}
