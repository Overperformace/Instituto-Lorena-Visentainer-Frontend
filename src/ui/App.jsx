// src/ui/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./sidebar";
import Header from "./header";
import Dashboard from "../pages/dashboard";
import Patients from "../pages/patients";
import Exams from "../pages/exams";
import Reports from "../pages/reports";
import Login from "../pages/login";
import { getSession } from "../services/supabase";

function ProtectedRoute({ children }) {
  const [checked, setChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const session = await getSession();
      const auth = localStorage.getItem("auth") === "true";
      setIsAuthenticated(session || auth);
      setChecked(true);
    };
    verifyAuth();
  }, []);

  if (!checked) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota padrão: redireciona para login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-[230px] min-h-screen bg-slate-50">
                  <Header />
                  <main className="p-6">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/patients" element={<Patients />} />
                      <Route path="/exams" element={<Exams />} />
                      <Route path="/reports" element={<Reports />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}