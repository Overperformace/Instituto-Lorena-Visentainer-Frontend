import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, signInWithPassword } from "../services/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signInWithPassword(email, password);
      if (error) throw error;

      // Salva login local
      localStorage.setItem("auth", "true");

      // Marca admin
      if (email === "admin@ilv.com") {
        localStorage.setItem("admin", "true");
      } else {
        localStorage.removeItem("admin");
      }

      // Redireciona
      navigate("/dashboard", { replace: true });
    } catch (err) {
      alert("Erro ao fazer login: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f49d6]">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-center text-white text-2xl font-bold mb-8">
          Instituto Lorena Visentainer
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-white/20 bg-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-white/20 bg-white/10 text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#1f49d6] font-semibold py-3 rounded-lg"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
