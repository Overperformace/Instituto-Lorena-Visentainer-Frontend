import React from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { listFiles, uploadFile, getSignedUrl, deleteFile } from '../services/filesapi';
import { iconFor, isImage } from '../services/mimeIcon';
import { getFiles, deleteFile } from '../services/api';
import { Upload, FileText, Image, X, FileSpreadsheet } from 'lucide-react';


export default function Header(...args) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login");
    };

    return (
        <header className="header">
            <div></div>
            <div className="user-info">
                <span>Olá, Administrador do Sistema</span>
                <User size={20} />
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Sair</span>
                </button>
            </div>
        </header>
    );
}
