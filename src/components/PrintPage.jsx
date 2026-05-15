import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const formatDate = (val) => {
  if (!val) return '';
  const d = new Date(val);
  if (isNaN(d)) return val;
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
};

const PrintPage = ({ data, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedName, setSelectedName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const printRef = useRef(null);

  const options = data.map(item => ({
    value: item._id || item.NAMA_LENGKAP,
    label: `${item.NAMA_LENGKAP} (${item.JURUSAN})`,
    data: item
  }));

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedData = options.find(opt => opt.value === selectedName)?.data;

  const handlePrint = () => {
    if (!selectedData) return;
    window.print();
  };


    return (
      <div className="print-page">
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
        
        <div className="print-controls">
        <button className="btn btn-secondary" onClick={() => navigate('/data')}>
          ← Kembali ke Data
        </button>
        <h2 style={{margin: '0 20px', flex: 1, borderBottom: 'none', paddingBottom: 0}}>🖨️ Cetak Formulir</h2>

        <div className="select-wrapper">
          <select
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            className="name-select"
          >
            <option value="">Pilih nama murid...</option>
            {filteredOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-mini"
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={handlePrint}
          disabled={!selectedData}
        >
          🖨️ Print HTML
        </button>
      </div>


      {selectedData && (
        <div className="print-preview-wrapper">
          <div ref={printRef} className="printable-document">
            <div className="print-header">
              <h1>FORMULIR PENERIMAAN MURID BARU</h1>
              <div className="print-date">Tanggal Cetak: {new Date().toLocaleDateString('id-ID')}</div>
            </div>

            <div className="print-content">
              <section className="print-section">
                <h2>A. DATA PRIBADI SISWA</h2>
                <div className="print-grid">
                  <div className="print-field">
                    <span className="print-field-label">Nama Lengkap</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.NAMA_LENGKAP}</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">Nama Panggilan</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.NAMA_PANGGILAN}</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">Jenis Kelamin</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.JENIS_KELAMIN}</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">Tempat/Tgl Lahir</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.TEMPAT_LAHIR}, {formatDate(selectedData.TANGGAL_LAHIR)}</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">Agama</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.AGAMA}</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">Kewarganegaraan</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.KEWARGANEGARAAN}</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">Anak Ke</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.ANAK_KE}</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">Saudara</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">Kandung {selectedData.SAUDARA_KANDUNG || 0}, Tiri {selectedData.SAUDARA_TIRI || 0}, Angkat {selectedData.SAUDARA_ANGKAT || 0}</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">Bahasa Sehari</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.BAHASA_SEHARI}</span>
                  </div>
                  <div className="print-field full-width">
                    <span className="print-field-label">Alamat</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.ALAMAT}</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">No. Telepon</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.NOMOR_TELEPON}</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">Tinggal Dengan</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.TINGGAL_DENGAN}</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">Jarak ke Sekolah</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.JARAK_KE_SEKOLAH} km</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">Transportasi</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.ALAT_TRANSPORTASI}</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">BB/TB</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.BERAT_BADAN} kg / {selectedData.TINGGI_BADAN} cm</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">Golongan Darah</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.GOLONGAN_DARAH}</span>
                  </div>
                  <div className="print-field">
                    <span className="print-field-label">Riwayat Penyakit</span>
                    <span className="print-field-colon">:</span>
                    <span className="print-field-value">{selectedData.PENYAKIT}</span>
                  </div>
                </div>
              </section>

              <section className="print-section">
                <h2>B. RIWAYAT PENDIDIKAN</h2>
                <div className="print-grid">
                  <div className="print-subsection">
                    <h3>SD</h3>
                    <div className="print-field">
                      <span className="print-field-label">Asal SD</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.ASAL_SD}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">No. STTB SD</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.NOMOR_STTB_SD}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Tanggal STTB SD</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{formatDate(selectedData.TANGGAL_STTB_SD)}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Lama SD</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.LAMA_SD} tahun</span>
                    </div>
                  </div>
                  <div className="print-subsection">
                    <h3>SMP</h3>
                    <div className="print-field">
                      <span className="print-field-label">Asal SMP</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.ASAL_SMP}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">No. STTB SMP</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.NOMOR_STTB_SMP}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Tanggal STTB SMP</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{formatDate(selectedData.TANGGAL_STTB_SMP)}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Lama SMP</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.LAMA_SMP} tahun</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="print-section">
                <h2>C. DATA ORANG TUA</h2>
                <div className="parents-grid">
                  <div className="parent-box">
                    <h3>Ayah</h3>
                    <div className="print-field">
                      <span className="print-field-label">Nama</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.NAMA_AYAH}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Tempat/Tgl Lahir</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.TEMPAT_LAHIR_AYAH}, {formatDate(selectedData.TANGGAL_LAHIR_AYAH)}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Alamat</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.ALAMAT_AYAH}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Telepon</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.TELEPON_AYAH}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Pekerjaan</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.PEKERJAAN_AYAH}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Penghasilan</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.PENGHASILAN_AYAH}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Pendidikan</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.PENDIDIKAN_AYAH}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Kewarganegaraan</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.KEWARGANEGARAAN_AYAH}</span>
                    </div>
                  </div>
                  <div className="parent-box">
                    <h3>Ibu</h3>
                    <div className="print-field">
                      <span className="print-field-label">Nama</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.NAMA_IBU}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Tempat/Tgl Lahir</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.TEMPAT_LAHIR_IBU}, {formatDate(selectedData.TANGGAL_LAHIR_IBU)}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Alamat</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.ALAMAT_IBU}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Telepon</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.TELEPON_IBU}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Pekerjaan</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.PEKERJAAN_IBU}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Penghasilan</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.PENGHASILAN_IBU}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Pendidikan</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.PENDIDIKAN_IBU}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Kewarganegaraan</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.KEWARGANEGARAAN_IBU}</span>
                    </div>
                  </div>
                </div>
              </section>

              {(selectedData.NAMA_WALI || selectedData.ALAMAT_WALI) && (
                <section className="print-section">
                  <h2>D. DATA WALI</h2>
                  <div className="print-grid">
                    <div className="print-field">
                      <span className="print-field-label">Nama Wali</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.NAMA_WALI}</span>
                    </div>
                    <div className="print-field full-width">
                      <span className="print-field-label">Alamat Wali</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.ALAMAT_WALI}</span>
                    </div>
                    <div className="print-field">
                      <span className="print-field-label">Telepon Wali</span>
                      <span className="print-field-colon">:</span>
                      <span className="print-field-value">{selectedData.TELEPON_WALI}</span>
                    </div>
                  </div>
                </section>
              )}

               <section className="print-section">
                 <h2>E. JURUSAN & MINAT</h2>
                 <div className="print-grid">
                   <div className="print-field">
                     <span className="print-field-label">Jurusan Dipilih</span>
                     <span className="print-field-colon">:</span>
                     <span className="print-field-value">{selectedData.JURUSAN}</span>
                   </div>
                   <div className="print-field">
                     <span className="print-field-label">Kegemaran Olahraga</span>
                     <span className="print-field-colon">:</span>
                     <span className="print-field-value">{selectedData.KEGEMARAN_OLAHRAGA}</span>
                   </div>
                   <div className="print-field">
                     <span className="print-field-label">Kegemaran Kemasyarakatan</span>
                     <span className="print-field-colon">:</span>
                     <span className="print-field-value">{selectedData.KEGEMARAN_KEMASYARAKATAN}</span>
                   </div>
                   <div className="print-field">
                     <span className="print-field-label">Kegemaran Hasta Karya</span>
                     <span className="print-field-colon">:</span>
                     <span className="print-field-value">{selectedData.KEGEMARAN_HASTA_KARYA}</span>
                   </div>
                 </div>
               </section>

              <div className="print-footer">
                <div className="signature-section">
                  <div className="signature-box">
                    <p>Orang Tua/Wali</p>
                    <div className="signature-line"></div>
                  </div>
                  <div className="signature-box">
                    <p>Pendaftar</p>
                    <div className="signature-line"></div>
                  </div>
                </div>
              </div>

               <section className="print-section surat-pernyataan">
                 <h2 style={{textAlign: 'center', borderBottom: 'none'}}>SURAT PERNYATAAN</h2>
                 
                 <div className="statement-info">
                   <p className="statement-intro">Saya yang bertanda tangan di bawah ini:</p>
                   <div className="statement-grid">
                     <div className="print-field">
                       <span className="print-field-label">Nama Calon Murid</span>
                       <span className="print-field-colon">:</span>
                       <span className="print-field-value">{selectedData.NAMA_LENGKAP}</span>
                     </div>
                     <div className="print-field">
                       <span className="print-field-label">Tempat dan Tanggal Lahir</span>
                       <span className="print-field-colon">:</span>
                       <span className="print-field-value">{selectedData.TEMPAT_LAHIR}, {formatDate(selectedData.TANGGAL_LAHIR)}</span>
                     </div>
                     <div className="print-field">
                       <span className="print-field-label">Jenis Kelamin</span>
                       <span className="print-field-colon">:</span>
                       <span className="print-field-value">{selectedData.JENIS_KELAMIN}</span>
                     </div>
                     <div className="print-field">
                       <span className="print-field-label">Agama</span>
                       <span className="print-field-colon">:</span>
                       <span className="print-field-value">{selectedData.AGAMA}</span>
                     </div>
                     <div className="print-field">
                       <span className="print-field-label">Asal Sekolah</span>
                       <span className="print-field-colon">:</span>
                       <span className="print-field-value">{selectedData.ASAL_SMP}</span>
                     </div>
                     <div className="print-field">
                       <span className="print-field-label">Nama Orang Tua / Wali</span>
                       <span className="print-field-colon">:</span>
                       <span className="print-field-value">{selectedData.NAMA_AYAH} {selectedData.NAMA_WALI || ''}</span>
                     </div>
                     <div className="print-field full-width">
                       <span className="print-field-label">Alamat Rumah</span>
                       <span className="print-field-colon">:</span>
                       <span className="print-field-value">{selectedData.ALAMAT}</span>
                     </div>
                     <div className="print-field">
                       <span className="print-field-label">Nomor Telp / HP</span>
                       <span className="print-field-colon">:</span>
                       <span className="print-field-value">{selectedData.NOMOR_TELEPON || selectedData.TELEPON_AYAH || ''}</span>
                     </div>
                   </div>

                   <div className="statement-content">
                     <p>Dengan ini menyatakan bahwa:</p>
                     <ol className="statement-list">
                       <li>Saya dengan sadar dan tanpa paksaan dari pihak manapun bersungguh-sungguh untuk mendaftar sebagai Peserta Didik SMK Negeri 1 Koba Tahun Pelajaran 2026/2027 serta mengikuti dan mentaati dengan sungguh-sungguh setiap prosedur pendaftaran di SMK Negeri 1 Koba sesuai Sistem Penerimaan Murid Baru (SPMB).</li>
                       <li>Setelah saya dinyatakan diterima sebagai Peserta Didik SMK Negeri 1 Koba maka saya akan mentaati dan melaksanakan Tata Tertib SMK Negeri 1 Koba yang berlaku dan bersedia menerima sanksi dan dikembalikan kepada Orang Tua /dikeluarkan apabila saya melanggar Tata Tertib SMK Negeri 1 Koba.</li>
                       <li>Orang Tua / Wali saya bersedia datang ke sekolah apabila diundang oleh pihak sekolah.</li>
                     </ol>
                     <p className="statement-closing">Demikian Surat Pernyataan ini saya buat dengan sebenarnya secara sadar tanpa paksaan dari pihak manapun dan dengan penuh rasa tanggung jawab.</p>
                   </div>

                   <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'flex-start', marginTop:'40px'}}>
                     <div style={{textAlign:'center', width:'200px'}}>
                       <p style={{marginBottom:'60px', fontWeight:'600', fontSize:'14px'}}>Orang Tua / Wali</p>
                       <div style={{borderBottom:'2px solid #333', width:'200px', marginBottom:'8px'}}></div>
                       <p style={{fontSize:'12px', color:'#666', fontStyle:'italic'}}>{selectedData.NAMA_AYAH}</p>
                     </div>
                     <div style={{textAlign:'center', width:'200px'}}>
                       <p style={{marginBottom:'60px', fontWeight:'600', fontSize:'14px'}}>Calon Peserta Didik</p>
                       <div style={{borderBottom:'2px solid #333', width:'200px', marginBottom:'8px'}}></div>
                       <p style={{fontSize:'12px', color:'#666', fontStyle:'italic'}}>{selectedData.NAMA_LENGKAP}</p>
                     </div>
                   </div>
                 </div>
               </section>
            </div>
          </div>
        </div>
      )}

       <style>{`
         .print-page { padding: 20px 0; }
         .print-controls {
           display: flex; align-items: center; gap: 15px; margin-bottom: 30px;
           padding: 20px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); flex-wrap: wrap;
         }
         .select-wrapper { display: flex; gap: 10px; flex: 1; min-width: 300px; }
         .name-select { flex: 1; padding: 10px 15px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; }
         .search-mini { width: 150px; padding: 10px 15px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; }
         .print-preview-wrapper { background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.12); padding: 0; overflow: hidden; }
         .printable-document { padding: 40px; max-width: 210mm; margin: 0 auto; }
         .print-header { text-align: center; border-bottom: 3px double #667eea; padding-bottom: 20px; margin-bottom: 30px; }
         .print-header h1 { margin: 0 0 10px 0; color: #333; font-size: 24px; text-align: center; }
         .print-date { color: #666; font-size: 12px; }
         .print-section { margin-bottom: 30px; page-break-inside: avoid; }
         .print-section h2 { color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 15px; font-size: 18px; }
         .print-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; }
         .print-field { display: grid; grid-template-columns: 200px 10px 1fr; align-items: baseline; font-size: 13px; line-height: 1.6; color: #333; }
         .print-field-label { font-weight: 600; color: #555; text-align: left; grid-column: 1; }
         .print-field-colon { grid-column: 2; text-align: left; }
         .print-field-value { font-weight: normal; color: #333; grid-column: 3; word-break: break-word; }
         .print-field.full-width { grid-column: 1 / -1; display: grid; grid-template-columns: 200px 10px 1fr; }
         .print-subsection { background: #f8f9fa; padding: 15px; border-radius: 8px; }
         .print-subsection h3 { margin: 0 0 10px 0; color: #764ba2; font-size: 14px; }
         .parents-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
         .parent-box { background: #f8f9fa; padding: 15px; border-radius: 8px; font-size: 13px; line-height: 1.7; }
         .parent-box h3 { margin: 0 0 10px 0; color: #667eea; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
         .print-footer { margin-top: 50px; page-break-inside: avoid; }
         .signature-section { display: flex; justify-content: space-around; margin-top: 80px; }
         .signature-box { text-align: center; }
         .signature-box p { margin-bottom: 40px; font-weight: 600; }
         .signature-line { border-bottom: 2px solid #333; width: 200px; }
         /* Surat Pernyataan Styles */
         .surat-pernyataan { 
           page-break-before: always; 
           page-break-after: always; 
         }
         .statement-info { background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px; }
         .statement-intro { font-weight: 600; margin-bottom: 15px; font-size: 14px; }
         .statement-grid { display: flex; flex-direction: column; gap: 8px; margin-bottom: 25px; }
         .statement-grid .print-field { grid-template-columns: 200px 10px 1fr; }
         .statement-grid .print-field-label { font-weight: 600; color: #333; }
         .statement-content { margin: 25px 0; }
         .statement-list { 
           margin: 15px 0; 
           padding-left: 20px; 
           line-height: 1.8; 
           font-size: 13px; 
           color: #333;
         }
         .statement-list li { margin-bottom: 12px; text-align: justify; }
         .statement-closing { 
           margin-top: 20px; 
           font-style: normal; 
           font-size: 13px; 
           color: #555; 
           line-height: 1.6;
         }
         .statement-signature { 
           display: flex; 
           flex-direction: row;
           justify-content: space-around;
           align-items: flex-start;
           margin-top: 40px; 
         }
         .signature-group { text-align: center; width: 200px; flex-shrink: 0; }
         .signature-group p { margin-bottom: 40px; font-weight: 600; font-size: 14px; }
         .signature-group .signature-line { border-bottom: 2px solid #333; width: 200px; margin: 0 auto 10px; }
         .signature-group .signature-name { font-size: 12px; color: #666; font-style: italic; margin-bottom: 0; }
         .statement-location { 
           font-size: 13px; 
           color: #333;
           font-weight: normal !important;
           margin-bottom: 8px !important;
         }
         @media print {
           .top-nav { display: none !important; }
           .print-controls { display: none !important; }
           .print-preview-wrapper { box-shadow: none; }
           .printable-document { padding: 0; }
           .surat-pernyataan { page-break-after: always; }
         }
         @media (max-width: 768px) {
           .top-nav { flex-direction: column; gap: 15px; }
           .nav-links { flex-wrap: wrap; justify-content: center; }
           .print-controls { flex-direction: column; align-items: stretch; }
           .select-wrapper { flex-direction: column; min-width: 100%; }
           .search-mini { width: 100%; }
           .parents-grid { grid-template-columns: 1fr; }
           .button-group { flex-direction: column; }
           .btn { width: 100%; }
           .statement-signature { flex-direction: column; gap: 40px; align-items: center; padding: 0; }
           .signature-group { width: 100%; }
         }
       `}</style>
    </div>
  );
};

export default PrintPage;
