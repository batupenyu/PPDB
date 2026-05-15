import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DATA_KEYS, FORM_FIELDS } from '../utils/excel';

const DataList = ({ data, onDelete, onEdit, onPrint, filterJurusan = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item =>
    item.NAMA_LENGKAP?.toLowerCase().includes(searchTerm.toLowerCase())
  );

   const handleEdit = (item) => {
     navigate(`/?id=${item._id}`);
   };

  const getNama = (item) => item.NAMA_LENGKAP || 'Tanpa Nama';

return (
  <div className="data-list-page">
    {/* Navigation */}
    <nav className="top-nav">
      <div className="nav-brand" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
        🏫 PPDB Online
      </div>
        <div className="nav-links">
          <button onClick={() => navigate('/')} className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Formulir</button>
          <button onClick={() => navigate('/dashboard')} className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</button>
          <button onClick={() => navigate('/data')} className={`nav-link ${location.pathname === '/data' ? 'active' : ''}`}>Data Murid</button>
          <button onClick={() => navigate('/export-import')} className={`nav-link ${location.pathname === '/export-import' ? 'active' : ''}`}>Excel</button>
          <button onClick={() => navigate('/print')} className={`nav-link ${location.pathname === '/print' ? 'active' : ''}`}>Cetak</button>
        </div>
    </nav>
    
    <div className="page-header">
      <h2>📊 Data Murid Terdaftar</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Cari nama murid..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {data.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>Belum ada data</h3>
          <p>Mulai menambahkan data muridFormulir Pendaftaran</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Tambah Data Baru
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Lengkap</th>
                <th>Jenis Kelamin</th>
                <th>Tempat/Tgl Lahir</th>
                <th>Telepon</th>
                <th>Jurusan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{item.NAMA_LENGKAP}</strong>
                  </td>
                  <td>{item.JENIS_KELAMIN}</td>
                  <td>{item.TEMPAT_LAHIR}, {item.TANGGAL_LAHIR}</td>
                  <td>{item.NOMOR_TELEPON}</td>
                  <td>
                    <span className="jurusan-badge">{item.JURUSAN}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                   <button
                     className="btn-icon btn-view"
                     onClick={() => navigate(`/print?id=${item._id}`)}
                     title="Cetak"
                   >
                     🖨️
                   </button>
                      <button
                        className="btn-icon btn-edit"
                        onClick={() => handleEdit(item)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon btn-delete"
                        onClick={() => onDelete(item._id || index)}
                        title="Hapus"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .data-list-page {
          padding: 20px 0;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .page-header h2 {
          margin: 0;
          color: #333;
        }

        .search-box {
          flex: 1;
          max-width: 300px;
        }

        .search-input {
          width: 100%;
          padding: 10px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: #f8f9fa;
          border-radius: 12px;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 15px;
        }

        .empty-state h3 {
          color: #333;
          margin-bottom: 8px;
        }

        .empty-state p {
          color: #666;
          margin-bottom: 20px;
        }

        .table-container {
          overflow-x: auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .data-table th,
        .data-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }

        .data-table th {
          background: #667eea;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .data-table tr:hover {
          background: #f8f9fa;
        }

        .jurusan-badge {
          display: inline-block;
          padding: 4px 10px;
          background: #e3f2fd;
          color: #1976d2;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .btn-icon {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-icon:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .btn-view {
          background: #e8f5e9;
        }

        .btn-edit {
          background: #fff3e0;
        }

        .btn-delete {
          background: #ffebee;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .search-box {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default DataList;
