import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import "../App.css";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // credenciais de demonstração
    if (user === "admin" && pass === "admin123") {
      localStorage.setItem("auth", "true");
      navigate("/");
    } else {
      setError("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <ClipboardList size={40} color="#2563eb" />
          <h1>Instituto Lorena Visentainer</h1>
          <p>Sistema de Gestão Clínica</p>
        </div>

        <form onSubmit={handleLogin}>
          <label>Usuário</label>
          <input
            type="text"
            placeholder="Digite seu usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-primary full">
            Entrar
          </button>
        </form>

        <div className="login-footer">
          <p>Credenciais de demonstração:</p>
          <code>
            Usuário: <strong>admin</strong> | Senha: <strong>admin123</strong>
          </code>
        </div>
      </div>
    </div>
  );
}
