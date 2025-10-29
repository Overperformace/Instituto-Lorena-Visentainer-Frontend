import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;
export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const load = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/users`);
      setUsers(data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  const add = async () => {
    if (!name) return;
    await axios.post(`${API}/users`, { name });
    setName('');
    await load();
  };
  useEffect(() => { load(); }, []);
  return (
    <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Instituto Lorena Visentainer</h1>
      <p>API: <code>{API}</code></p>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome do usuário" />
        <button onClick={add}>Adicionar</button>
      </div>
      <h2>Usuários</h2>
      {loading ? <p>Carregando...</p> : (
        <ul>{users.map(u => <li key={u.id}>{u.name || u.username || JSON.stringify(u)}</li>)}</ul>
      )}
    </div>
  );
}
