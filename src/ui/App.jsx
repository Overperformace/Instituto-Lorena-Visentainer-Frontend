import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Dashboard from "../pages/dashboard";
import Patients from "../pages/patients";
import Exams from "../pages/exams";
import Reports from "../pages/reports";
import Login from "../pages/login";


function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex">
                {/* Sidebar fixa */}
                <Sidebar />

                {/* Conteúdo principal */}
                <div className="flex-1 ml-64 min-h-screen bg-gray-50 text-gray-800">
                  <Header />
                  <main className="p-6">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
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
    </Router>
  );
}

export default App;
