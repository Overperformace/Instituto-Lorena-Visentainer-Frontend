import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase, signOut, getUser } from "../services/supabase";

export default function ProtectedRoute({ children }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    async function verifySession() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setAuthenticated(!!data.session);
      setReady(true);
    }

    verifySession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setAuthenticated(!!session);
      setReady(true);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // Mostra mensagem de carregamento enquanto verifica login
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Verificando autenticação...
        </p>
      </div>
    );
  }

  // Se não autenticado, redireciona para login
  if (!authenticated) {
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?to=${redirectTo}`} replace />;
  }

  // Se autenticado, renderiza o conteúdo protegido
  return children;
}
