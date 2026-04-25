import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = ({ stats, jurusanStats = [] }) => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: 'Formulir Pendaftaran',
      icon: '📝',
      description: 'Isi data siswa baru',
      color: '#667eea'
    },
    {
      path: '/data',
      label: 'Data Siswa',
      icon: '📊',
      description: `Lihat ${stats.total} data yang telah disimpan`,
      color: '#2ecc71'
    },
    {
      path: '/export-import',
      label: 'Excel (Import/Export)',
      icon: '📤',
      description: 'Export & import data Excel',
      color: '#f39c12'
    },
    {
      path: '/print',
      label: 'Cetak/Print',
      icon: '🖨️',
      description: 'Cetak dokumen PDF/HTML',
      color: '#e74c3c'
    }
  ];

  // Calculate total from jurusanStats if stats.total is 0
  const totalFromJurusan = jurusanStats.reduce((sum, item) => sum + item.count, 0);
  const displayTotal = stats.total || totalFromJurusan;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>PPDB - Dashboard</h1>
        <p className="subtitle">Sistem Penerimaan Siswa Baru</p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Pendaftar</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.today}</div>
          <div className="stat-label">Pendaftar Hari Ini</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.recent}</div>
          <div className="stat-label">7 Hari Terakhir</div>
        </div>
      </div>

      {/* Jurusan Breakdown */}
      {jurusanStats.length > 0 && (
        <div className="jurusan-breakdown">
          <h2>📈 Distribusi Jurusan</h2>
          <div className="jurusan-cards">
            {jurusanStats.map((item, index) => (
              <div
                key={index}
                className="jurusan-card"
                style={{
                  '--card-color': [
                    '#667eea', '#2ecc71', '#f39c12', '#e74c3c',
                    '#9b59b6', '#3498db', '#1abc9c', '#e67e22'
                  ][index % 8]
                }}
              >
                <div className="jurusan-name">{item.JURUSAN}</div>
                <div className="jurusan-count">{item.count} siswa</div>
                <div className="jurusan-bar">
                  <div
                    className="jurusan-bar-fill"
                    style={{ width: `${(item.count / displayTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="nav-grid">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-card ${location.pathname === item.path ? 'active' : ''}`}
            style={{ '--card-color': item.color }}
          >
            <div className="nav-icon">{item.icon}</div>
            <div className="nav-label">{item.label}</div>
            <div className="nav-description">{item.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
