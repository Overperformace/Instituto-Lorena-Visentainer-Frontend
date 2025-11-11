import React, { useState } from "react";
import { supabase } from "../services/supabase";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
  e.preventDefault();
  try {
    setLoading(true);
    await signInWithPassword(email, password);

    localStorage.setItem("auth", "true");

    window.location.href = "/";
  } catch (err) {
    alert("Falha no login: " + (err?.message || "verifique suas credenciais"));
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E2A66] to-[#0B1F47] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#101827]/80 backdrop-blur rounded-2xl shadow-xl border border-white/10 p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white text-2xl">🏥</div>
          <h1 className="mt-4 text-white text-2xl font-semibold">
            Instituto Lorena Visentainer
          </h1>
          <p className="text-slate-300">Sistema de Gestão Clínica</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-slate-200 text-sm">Usuário (email)</span>
            <input
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 text-white px-3 py-2 outline-none focus:border-blue-500"
              placeholder="ex: admin@ilv.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-slate-200 text-sm">Senha</span>
            <input
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 text-white px-3 py-2 outline-none focus:border-blue-500"
              placeholder="Digite sua senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 transition"
            >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-xs text-center text-slate-400">
          Credenciais de demonstração: <b>admin@ilv.com</b> / <b>admin123</b>
        </div>
      </div>
    </div>
  );
}
