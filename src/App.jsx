import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useStudentData } from './hooks/useStudentData';
import Dashboard from './components/Dashboard';
import DataList from './components/DataList';
import ExportImport from './components/ExportImport';
import PrintPage from './components/PrintPage';
import FormPage from './components/FormPage';
import { exportToExcel } from './utils/excel';
import './index.css';

function App() {
  const { students, loading, error, addStudent, deleteStudent, getStats, getStudent, getJurusanStats, clearAll, refresh } = useStudentData();
  const [stats, setStats] = useState({ total: 0, today: 0, recent: 0 });
  const [jurusanStats, setJurusanStats] = useState([]);

  // Fetch stats when students change
  useEffect(() => {
    const fetchStats = async () => {
      const data = await getStats();
      setStats(data);
    };
    fetchStats();
  }, [students, getStats]);

  // Fetch jurusan counts
  useEffect(() => {
    const fetchJurusanStats = async () => {
      const data = await getJurusanStats();
      setJurusanStats(data);
    };
    fetchJurusanStats();
  }, [getJurusanStats]);

  // Show loading state
  if (loading) {
    return (
      <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '48px', marginBottom: '20px'}}>⏳</div>
          <h3>Loading data...</h3>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '48px', marginBottom: '20px'}}>❌</div>
          <h3>Error: {error}</h3>
          <button onClick={refresh} className="btn btn-primary" style={{marginTop: '20px'}}>
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage students={students} onSubmit={addStudent} getStudent={getStudent} />} />
        <Route path="/dashboard" element={<Dashboard stats={stats} jurusanStats={jurusanStats} />} />
        <Route
          path="/data"
          element={
            <DataList
              data={students}
              onDelete={deleteStudent}
              onEdit={getStudent}
              onPrint={(student) => window.location.href = `/print?id=${student._id}`}
            />
          }
        />
        <Route
          path="/export-import"
          element={
            <ExportImport
              data={students}
              onImport={addStudent}
              onExportAll={(data) => exportToExcel(data)}
            />
          }
        />
        <Route
          path="/print"
          element={
            <PrintPage
              data={students}
              onBack={() => window.history.back()}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
