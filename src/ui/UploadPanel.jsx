import { useRef, useState, useEffect } from 'react';
import { listFiles, uploadFile, getSignedUrl, deleteFile } from '../services/filesapi';
import { iconFor, isImage } from '../services/mimeIcon';
import { uploadFile, getFiles, deleteFile } from "../services/api";
import { Upload, FileText, Image, X, FileSpreadsheet } from "lucide-react";

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
    } finally { setBusy(false); }
  }

  useEffect(() => { refresh(); }, []);

  async function onPick(e) {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;
    setBusy(true);
    try {
      for (const f of picked) {
        await uploadFile(f); // pode passar patientId aqui
      }
      await refresh();
    } finally {
      inputRef.current.value = '';
      setBusy(false);
    }
  }

  async function openFile(id, ext) {
    const url = await getSignedUrl(id);
    // imagem: abre na mesma aba; restante new tab
    if (isImage(ext)) {
      window.open(url, '_blank', 'noopener');
    } else {
      window.open(url, '_blank');
    }
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
            accept=".png,.jpg,.jpeg,.webp,.gif,.bmp,.svg,.pdf,.xlsx,.xls,.csv,.doc,.docx,.ppt,.pptx"
          />
          <button onClick={() => inputRef.current?.click()} className="btn primary">
            Arquivos
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

      {busy ? <p>Carregando…</p> : null}

      <div className="grid">
        {filtered.map((f) => (
          <FileCard key={f.id} file={f} onOpen={openFile} onRemove={remove} />
        ))}
        {!busy && filtered.length === 0 && (
          <p>Nenhum arquivo encontrado.</p>
        )}
      </div>
    </div>
  );
}

function FileCard({ file, onOpen, onRemove }) {
  const ext = file.ext?.toLowerCase();
  const ico = iconFor(ext);

  return (
    <div className="card">
      <div className="thumb">
        <span className="icon">{ico}</span>
      </div>
      <div className="meta">
        <div className="name" title={file.name}>{file.name}</div>
        <div className="sub">
          <span>{ext?.toUpperCase() || 'ARQ'}</span>
          {file.size ? <span>• {(file.size/1024).toFixed(1)} KB</span> : null}
        </div>
      </div>
      <div className="card-actions">
        <button className="btn" onClick={() => onOpen(file.id, ext)}>Abrir</button>
        <button className="btn danger" onClick={() => onRemove(file.id)}>Excluir</button>
      </div>
    </div>
  );
}

export default function UploadPanel() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const data = await getFiles();
    setFiles(data || []);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadFile(file);
      await fetchFiles();
    } catch (err) {
      alert("Erro ao enviar arquivo");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (path) => {
    await deleteFile(path);
    fetchFiles();
  };

  const renderIcon = (name) => {
    if (name.endsWith(".pdf")) return <FileText className="text-red-500" />;
    if (name.endsWith(".xlsx")) return <FileSpreadsheet className="text-green-500" />;
    if (/\.(png|jpg|jpeg)$/i.test(name)) return <Image className="text-blue-500" />;
    return <FileText />;
  };

  return (
    <div className="upload-panel">
      <div className="upload-header">
        <h2>📤 Upload de Arquivos</h2>
        <label className="upload-btn">
          <Upload size={20} />
          {uploading ? "Enviando..." : "Selecionar arquivo"}
          <input
            type="file"
            hidden
            onChange={handleUpload}
            accept=".pdf,.png,.jpg,.jpeg,.xlsx,.xls"
          />
        </label>
      </div>

      <div className="file-list">
        {files.length === 0 && <p>Nenhum arquivo enviado.</p>}
        {files.map((f) => (
          <div key={f.name} className="file-card">
            {renderIcon(f.name)}
            <a
              href={`${API_URL}/upload/${encodeURIComponent(f.name)}`}
              target="_blank"
              rel="noreferrer"
            >
              {f.name}
            </a>
            <button onClick={() => handleDelete(f.name)}>
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}