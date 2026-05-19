import React, { useState } from 'react';
import { exportToExcel, importFromExcel } from '../utils/excel';
import { useNavigate, useLocation } from 'react-router-dom';

const ExportImport = ({ data, onImport, onExportAll }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDragging, setIsDragging] = useState(false);
  const [importStatus, setImportStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Hanya file Excel (.xlsx, .xls) yang diperbolehkan');
      return;
    }

    try {
      setError(null);
      setImportStatus('Mengimpor data...');
      const importedData = await importFromExcel(file);
      onImport(importedData);
      setImportStatus(`Berhasil mengimpor ${importedData.length} data!`);
      setTimeout(() => setImportStatus(null), 3000);
    } catch (err) {
      setError('Gagal mengimpor file. Pastikan format file benar.');
      console.error('Import error:', err);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
    e.target.value = ''; // Reset input
  };

  return (
    <div className="export-import-page">
      {/* Navigation */}
      <nav className="top-nav">
        <div className="nav-brand" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
          🏫 SPMB Online
        </div>
        <div className="nav-links">
          <button onClick={() => navigate('/')} className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Formulir</button>
          <button onClick={() => navigate('/dashboard')} className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</button>
          <button onClick={() => navigate('/data')} className={`nav-link ${location.pathname === '/data' ? 'active' : ''}`}>Data Murid</button>
          <button onClick={() => navigate('/export-import')} className={`nav-link ${location.pathname === '/export-import' ? 'active' : ''}`}>Excel</button>
          <button onClick={() => navigate('/print')} className={`nav-link ${location.pathname === '/print' ? 'active' : ''}`}>Cetak</button>
        </div>
      </nav>
      
      <h2>📤 Excel Import / Export</h2>

      <div className="card-grid">
        {/* Export Section */}
        <div className="card">
          <div className="card-icon">📤</div>
          <h3>Export Data</h3>
          <p>Download semua data murid dalam format Excel</p>
          <div className="card-stats">
            <span className="stat">{data.length} data tersedia</span>
          </div>
          <button
            className="btn btn-export"
            onClick={() => onExportAll(data)}
            disabled={data.length === 0}
          >
            Export ke Excel
          </button>
        </div>

        {/* Import Section */}
        <div className="card">
          <div className="card-icon">📥</div>
          <h3>Import Data</h3>
          <p>Upload file Excel untuk mengimpor data murid</p>
          <div
            className={`drop-zone ${isDragging ? 'dragging' : ''} ${importStatus ? 'success' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {importStatus ? (
              <div className="status-message success">{importStatus}</div>
            ) : (
              <>
                <div className="drop-icon">📁</div>
                <p>Drag & drop file Excel di sini</p>
                <span className="drop-hint">atau klik untuk memilih file</span>
              </>
            )}
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileInputChange}
              className="file-input"
              id="file-input"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h4>📋 Petunjuk Import:</h4>
        <ol>
          <li>Download template Excel dari tombol Export jika diperlukan</li>
          <li>Isi data sesuai format yang tersedia</li>
          <li>Upload file Excel (.xlsx atau .xls)</li>
          <li>Data yang sama (berdasarkan Nama Lengkap & TTL) akan diupdate</li>
          <li>Data baru akan ditambahkan ke daftar</li>
        </ol>
      </div>

      <style>{`
        .export-import-page {
          padding: 20px 0;
        }

        .export-import-page h2 {
          margin-bottom: 30px;
          color: #333;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 30px;
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .card-icon {
          font-size: 48px;
        }

        .card h3 {
          margin: 0;
          color: #333;
          font-size: 20px;
        }

        .card p {
          color: #666;
          margin: 0;
          font-size: 14px;
        }

        .card-stats {
          margin: 10px 0;
        }

        .stat {
          background: #e3f2fd;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          color: #1976d2;
        }

        .btn-export {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: auto;
        }

        .btn-export:hover:not(:disabled) {
          background: #5568d3;
          transform: translateY(-2px);
        }

        .btn-export:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .drop-zone {
          border: 2px dashed #ccc;
          border-radius: 12px;
          padding: 40px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          background: #fafafa;
        }

        .drop-zone:hover {
          border-color: #667eea;
          background: #f0f4ff;
        }

        .drop-zone.dragging {
          border-color: #667eea;
          background: #e3f2fd;
          transform: scale(1.02);
        }

        .drop-zone.success {
          border-color: #2ecc71;
          background: #e8f5e9;
        }

        .drop-zone .file-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .drop-icon {
          font-size: 48px;
          margin-bottom: 10px;
        }

        .drop-hint {
          color: #888;
          font-size: 12px;
          margin-top: 5px;
        }

        .status-message {
          font-weight: 600;
          color: #2ecc71;
        }

        .error-message {
          color: #e74c3c;
          font-size: 14px;
          margin-top: 10px;
          padding: 10px;
          background: #ffebee;
          border-radius: 6px;
        }

        .instructions {
          background: #fff9e6;
          border-left: 4px solid #f39c12;
          padding: 20px;
          border-radius: 8px;
        }

        .instructions h4 {
          margin-top: 0;
          color: #f39c12;
        }

        .instructions ol {
          margin: 0;
          padding-left: 20px;
          color: #555;
        }

        .instructions li {
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
};

export default ExportImport;
