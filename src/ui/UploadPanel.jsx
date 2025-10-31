import { useRef, useState, useEffect } from 'react';
import { listFiles, uploadFile, getSignedUrl, deleteFile } from '../services/filesapi';
import { iconFor, isImage } from '../services/mimelcon.js';
import { Upload } from "lucide-react";

export default function UploadPanel() {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState('');

  async function refresh() {
    setBusy(true);
    try {
      const data = await listFiles();
      setFiles(data);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onPick(e) {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;
    setBusy(true);
    try {
      for (const f of picked) {
        await uploadFile(f);
      }
      await refresh();
    } finally {
      inputRef.current.value = '';
      setBusy(false);
    }
  }

  async function openFile(id, ext) {
    const url = await getSignedUrl(id);
    window.open(url, '_blank');
  }

  async function remove(id) {
    if (!confirm('Excluir este arquivo?')) return;
    await deleteFile(id);
    await refresh();
  }

  const filtered = files.filter(f =>
    f.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Upload de Exames</h2>
        <div className="actions">
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={onPick}
            accept=".png,.jpg,.jpeg,.pdf,.xlsx,.xls,.docx"
          />
          <button onClick={() => inputRef.current?.click()} className="btn primary">
            <Upload size={16} /> Enviar
          </button>
        </div>
      </div>

      <div className="toolbar">
        <input
          placeholder="Buscar arquivo…"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <button className="btn" onClick={refresh} disabled={busy}>
          Atualizar
        </button>
      </div>

      {busy && <p>Carregando…</p>}

      <div className="grid">
        {filtered.map((f) => (
          <FileCard key={f.id} file={f} onOpen={openFile} onRemove={remove} />
        ))}
        {!busy && filtered.length === 0 && <p>Nenhum arquivo encontrado.</p>}
      </div>
    </div>
  );
}

function FileCard({ file, onOpen, onRemove }) {
  const ext = file.ext?.toLowerCase();
  const ico = iconFor(ext);

  return (
    <div className="card">
      <div className="thumb"><span className="icon">{ico}</span></div>
      <div className="meta">
        <div className="name" title={file.name}>{file.name}</div>
        <div className="sub">
          <span>{ext?.toUpperCase() || 'ARQ'}</span>
          {file.size ? <span>• {(file.size / 1024).toFixed(1)} KB</span> : null}
        </div>
      </div>
      <div className="card-actions">
        <button className="btn" onClick={() => onOpen(file.id, ext)}>Abrir</button>
        <button className="btn danger" onClick={() => onRemove(file.id)}>Excluir</button>
      </div>
    </div>
  );
}
