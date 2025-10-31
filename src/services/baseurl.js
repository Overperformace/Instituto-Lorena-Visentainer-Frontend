export function getApiBaseUrl() {
  // prioridade para variável (Vercel -> Settings -> Environment Variables -> VITE_API_URL)
  const envUrl = import.meta.env.VITE_API_URL?.trim();
  if (envUrl) return envUrl.replace(/\/+$/, '');

  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  return isLocal
    ? 'http://localhost:3000'
    : 'https://instituto-lorena-visentainer-backend-h6x1.onrender.com'; // fallback
}
