import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

const FormPage = ({ students, onSubmit, getStudent }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const printId = searchParams.get('id');

  const [formData, setFormData] = useState({
    // A. DATA PRIBADI SISWA
    NAMA_LENGKAP: '',
    NAMA_PANGGILAN: '',
    JENIS_KELAMIN: '',
    TEMPAT_LAHIR: '',
    TANGGAL_LAHIR: '',
    AGAMA: '',
    KEWARGANEGARAAN: '',
    ANAK_KE: '',
    SAUDARA_KANDUNG: '',
    SAUDARA_TIRI: '',
    SAUDARA_ANGKAT: '',
    BAHASA_SEHARI: '',
    ALAMAT: '',
    NOMOR_TELEPON: '',
    TINGGAL_DENGAN: '',
    JARAK_KE_SEKOLAH: '',
    ALAT_TRANSPORTASI: '',
    BERAT_BADAN: '',
    TINGGI_BADAN: '',
    GOLONGAN_DARAH: '',
    PENYAKIT: '',

    // B. RIWAYAT PENDIDIKAN
    ASAL_SD: '',
    NOMOR_STTB_SD: '',
    TANGGAL_STTB_SD: '',
    LAMA_SD: '',
    ASAL_SMP: '',
    NOMOR_STTB_SMP: '',
    TANGGAL_STTB_SMP: '',
    LAMA_SMP: '',

    // C. DATA ORANG TUA - Ayah
    NAMA_AYAH: '',
    TEMPAT_LAHIR_AYAH: '',
    TANGGAL_LAHIR_AYAH: '',
    ALAMAT_AYAH: '',
    TELEPON_AYAH: '',
    PEKERJAAN_AYAH: '',
    PENGHASILAN_AYAH: '',
    PENDIDIKAN_AYAH: '',
    KEWARGANEGARAAN_AYAH: '',

    // C. DATA ORANG TUA - Ibu
    NAMA_IBU: '',
    TEMPAT_LAHIR_IBU: '',
    TANGGAL_LAHIR_IBU: '',
    ALAMAT_IBU: '',
    TELEPON_IBU: '',
    PEKERJAAN_IBU: '',
    PENGHASILAN_IBU: '',
    PENDIDIKAN_IBU: '',
    KEWARGANEGARAAN_IBU: '',

    // D. DATA WALI
    NAMA_WALI: '',
    ALAMAT_WALI: '',
    TELEPON_WALI: '',

    // E. JURUSAN & MINAT
    JURUSAN: '',
    KEGEMARAN_OLAHRAGA: '',
    KEGEMARAN_KEMASYARAKATAN: '',
    KEGEMARAN_HASTA_KARYA: '',
  });

  const [isEdit, setIsEdit] = useState(false);

  // Load student data if editing
  useEffect(() => {
    if (printId && getStudent) {
      const student = getStudent(printId);
      if (student) {
        setFormData({
          ...student,
          // Ensure all fields exist
          NAMA_LENGKAP: student.NAMA_LENGKAP || '',
          NAMA_PANGGILAN: student.NAMA_PANGGILAN || '',
          JENIS_KELAMIN: student.JENIS_KELAMIN || '',
          TEMPAT_LAHIR: student.TEMPAT_LAHIR || '',
          TANGGAL_LAHIR: student.TANGGAL_LAHIR || '',
          AGAMA: student.AGAMA || '',
          KEWARGANEGARAAN: student.KEWARGANEGARAAN || '',
          ANAK_KE: student.ANAK_KE || '',
          SAUDARA_KANDUNG: student.SAUDARA_KANDUNG || '',
          SAUDARA_TIRI: student.SAUDARA_TIRI || '',
          SAUDARA_ANGKAT: student.SAUDARA_ANGKAT || '',
          BAHASA_SEHARI: student.BAHASA_SEHARI || '',
          ALAMAT: student.ALAMAT || '',
          NOMOR_TELEPON: student.NOMOR_TELEPON || '',
          TINGGAL_DENGAN: student.TINGGAL_DENGAN || '',
          JARAK_KE_SEKOLAH: student.JARAK_KE_SEKOLAH || '',
          ALAT_TRANSPORTASI: student.ALAT_TRANSPORTASI || '',
          BERAT_BADAN: student.BERAT_BADAN || '',
          TINGGI_BADAN: student.TINGGI_BADAN || '',
          GOLONGAN_DARAH: student.GOLONGAN_DARAH || '',
          PENYAKIT: student.PENYAKIT || '',
          ASAL_SD: student.ASAL_SD || '',
          NOMOR_STTB_SD: student.NOMOR_STTB_SD || '',
          TANGGAL_STTB_SD: student.TANGGAL_STTB_SD || '',
          LAMA_SD: student.LAMA_SD || '',
          ASAL_SMP: student.ASAL_SMP || '',
          NOMOR_STTB_SMP: student.NOMOR_STTB_SMP || '',
          TANGGAL_STTB_SMP: student.TANGGAL_STTB_SMP || '',
          LAMA_SMP: student.LAMA_SMP || '',
          NAMA_AYAH: student.NAMA_AYAH || '',
          TEMPAT_LAHIR_AYAH: student.TEMPAT_LAHIR_AYAH || '',
          TANGGAL_LAHIR_AYAH: student.TANGGAL_LAHIR_AYAH || '',
          ALAMAT_AYAH: student.ALAMAT_AYAH || '',
          TELEPON_AYAH: student.TELEPON_AYAH || '',
          PEKERJAAN_AYAH: student.PEKERJAAN_AYAH || '',
          PENGHASILAN_AYAH: student.PENGHASILAN_AYAH || '',
          PENDIDIKAN_AYAH: student.PENDIDIKAN_AYAH || '',
          KEWARGANEGARAAN_AYAH: student.KEWARGANEGARAAN_AYAH || '',
          NAMA_IBU: student.NAMA_IBU || '',
          TEMPAT_LAHIR_IBU: student.TEMPAT_LAHIR_IBU || '',
          TANGGAL_LAHIR_IBU: student.TANGGAL_LAHIR_IBU || '',
          ALAMAT_IBU: student.ALAMAT_IBU || '',
          TELEPON_IBU: student.TELEPON_IBU || '',
          PEKERJAAN_IBU: student.PEKERJAAN_IBU || '',
          PENGHASILAN_IBU: student.PENGHASILAN_IBU || '',
          PENDIDIKAN_IBU: student.PENDIDIKAN_IBU || '',
          KEWARGANEGARAAN_IBU: student.KEWARGANEGARAAN_IBU || '',
          NAMA_WALI: student.NAMA_WALI || '',
          ALAMAT_WALI: student.ALAMAT_WALI || '',
          TELEPON_WALI: student.TELEPON_WALI || '',
          JURUSAN: student.JURUSAN || '',
          KEGEMARAN_OLAHRAGA: student.KEGEMARAN_OLAHRAGA || '',
          KEGEMARAN_KEMASYARAKATAN: student.KEGEMARAN_KEMASYARAKATAN || '',
          KEGEMARAN_HASTA_KARYA: student.KEGEMARAN_HASTA_KARYA || '',
        });
        setIsEdit(true);
      }
    }
  }, [printId, getStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit(formData);
    if (result === true) {
      alert('Data berhasil disimpan!');
      setFormData({
        NAMA_LENGKAP: '', NAMA_PANGGILAN: '', JENIS_KELAMIN: '', TEMPAT_LAHIR: '',
        TANGGAL_LAHIR: '', AGAMA: '', KEWARGANEGARAAN: '', ANAK_KE: '',
        SAUDARA_KANDUNG: '', SAUDARA_TIRI: '', SAUDARA_ANGKAT: '', BAHASA_SEHARI: '',
        ALAMAT: '', NOMOR_TELEPON: '', TINGGAL_DENGAN: '', JARAK_KE_SEKOLAH: '',
        ALAT_TRANSPORTASI: '', BERAT_BADAN: '', TINGGI_BADAN: '', GOLONGAN_DARAH: '',
        PENYAKIT: '', ASAL_SD: '', NOMOR_STTB_SD: '', TANGGAL_STTB_SD: '', LAMA_SD: '',
        ASAL_SMP: '', NOMOR_STTB_SMP: '', TANGGAL_STTB_SMP: '', LAMA_SMP: '',
        NAMA_AYAH: '', TEMPAT_LAHIR_AYAH: '', TANGGAL_LAHIR_AYAH: '', ALAMAT_AYAH: '', TELEPON_AYAH: '',
        PEKERJAAN_AYAH: '', PENGHASILAN_AYAH: '', PENDIDIKAN_AYAH: '', KEWARGANEGARAAN_AYAH: '',
        NAMA_IBU: '', TEMPAT_LAHIR_IBU: '', TANGGAL_LAHIR_IBU: '', ALAMAT_IBU: '', TELEPON_IBU: '',
        PEKERJAAN_IBU: '', PENGHASILAN_IBU: '', PENDIDIKAN_IBU: '', KEWARGANEGARAAN_IBU: '',
        NAMA_WALI: '', ALAMAT_WALI: '', TELEPON_WALI: '',
        JURUSAN: '', KEGEMARAN_OLAHRAGA: '', KEGEMARAN_KEMASYARAKATAN: '', KEGEMARAN_HASTA_KARYA: ''
      });
      setIsEdit(false);
      navigate('/data');
    } else {
      alert(`Gagal menyimpan data. ${typeof result === 'string' ? result : 'Silakan coba lagi.'}`);
    }
  };

  const handleReset = () => {
    if (confirm('Reset semua data?')) {
      setFormData({
        NAMA_LENGKAP: '', NAMA_PANGGILAN: '', JENIS_KELAMIN: '', TEMPAT_LAHIR: '',
        TANGGAL_LAHIR: '', AGAMA: '', KEWARGANEGARAAN: '', ANAK_KE: '',
        SAUDARA_KANDUNG: '', SAUDARA_TIRI: '', SAUDARA_ANGKAT: '', BAHASA_SEHARI: '',
        ALAMAT: '', NOMOR_TELEPON: '', TINGGAL_DENGAN: '', JARAK_KE_SEKOLAH: '',
        ALAT_TRANSPORTASI: '', BERAT_BADAN: '', TINGGI_BADAN: '', GOLONGAN_DARAH: '',
        PENYAKIT: '', ASAL_SD: '', NOMOR_STTB_SD: '', TANGGAL_STTB_SD: '', LAMA_SD: '',
        ASAL_SMP: '', NOMOR_STTB_SMP: '', TANGGAL_STTB_SMP: '', LAMA_SMP: '',
        NAMA_AYAH: '', TEMPAT_LAHIR_AYAH: '', TANGGAL_LAHIR_AYAH: '', ALAMAT_AYAH: '', TELEPON_AYAH: '',
        PEKERJAAN_AYAH: '', PENGHASILAN_AYAH: '', PENDIDIKAN_AYAH: '', KEWARGANEGARAAN_AYAH: '',
        NAMA_IBU: '', TEMPAT_LAHIR_IBU: '', TANGGAL_LAHIR_IBU: '', ALAMAT_IBU: '', TELEPON_IBU: '',
        PEKERJAAN_IBU: '', PENGHASILAN_IBU: '', PENDIDIKAN_IBU: '', KEWARGANEGARAAN_IBU: '',
        NAMA_WALI: '', ALAMAT_WALI: '', TELEPON_WALI: '',
        JURUSAN: '', KEGEMARAN_OLAHRAGA: '', KEGEMARAN_KEMASYARAKATAN: '', KEGEMARAN_HASTA_KARYA: ''
      });
      setIsEdit(false);
    }
  };

  return (
    <div className="container">
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

      <h1 style={{marginTop: '20px'}}>
        {isEdit ? '✏️ Edit Data Murid' : '📝 Formulir Penerimaan Murid Baru'}
      </h1>
      {isEdit && (
        <div style={{background: '#fff3cd', padding: '10px', borderRadius: '8px', marginBottom: '20px', color: '#856404'}}>
          Mode edit: Data akan diupdate saat disimpan
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* A. DATA PRIBADI SISWA */}
        <div className="form-section">
          <h2>A. DATA PRIBADI SISWA</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>1. Nama Lengkap <span>*</span></label>
              <input type="text" name="NAMA_LENGKAP" value={formData.NAMA_LENGKAP} onChange={handleChange} placeholder="Masukkan nama lengkap" required />
            </div>
            <div className="form-group">
              <label>2. Nama Panggilan</label>
              <input type="text" name="NAMA_PANGGILAN" value={formData.NAMA_PANGGILAN} onChange={handleChange} placeholder="Masukkan nama panggilan" />
            </div>
            <div className="form-group">
              <label>3. Jenis Kelamin <span>*</span></label>
              <select name="JENIS_KELAMIN" value={formData.JENIS_KELAMIN} onChange={handleChange} required>
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div className="form-group">
              <label>4. Tempat, Tgl Lahir <span>*</span></label>
              <div style={{display: 'flex', gap: '10px'}}>
                <input type="text" name="TEMPAT_LAHIR" value={formData.TEMPAT_LAHIR} onChange={handleChange} placeholder="Tempat lahir" style={{flex: 1}} required />
                <input type="date" name="TANGGAL_LAHIR" value={formData.TANGGAL_LAHIR} onChange={handleChange} style={{flex: 1}} required />
              </div>
            </div>
            <div className="form-group">
              <label>5. Agama <span>*</span></label>
              <select name="AGAMA" value={formData.AGAMA} onChange={handleChange} required>
                <option value="">Pilih Agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
            </div>
            <div className="form-group">
              <label>6. Kewarganegaraan <span>*</span></label>
              <select name="KEWARGANEGARAAN" value={formData.KEWARGANEGARAAN} onChange={handleChange} required>
                <option value="">Pilih Kewarganegaraan</option>
                <option value="WNI">WNI</option>
                <option value="WNA">WNA</option>
              </select>
            </div>
            <div className="form-group">
              <label>7. Anak Ke <span>*</span></label>
              <input type="number" name="ANAK_KE" value={formData.ANAK_KE} onChange={handleChange} placeholder="Contoh: 1" min="1" required />
            </div>
            <div className="form-group">
              <label>8. Jumlah Saudara</label>
              <div className="sibling-info">
                <span>Kandung:</span>
                <input type="number" name="SAUDARA_KANDUNG" value={formData.SAUDARA_KANDUNG} onChange={handleChange} placeholder="0" min="0" style={{width: '60px', marginRight: '15px'}} />
                <span>Tiri:</span>
                <input type="number" name="SAUDARA_TIRI" value={formData.SAUDARA_TIRI} onChange={handleChange} placeholder="0" min="0" style={{width: '60px', marginRight: '15px'}} />
                <span>Angkat:</span>
                <input type="number" name="SAUDARA_ANGKAT" value={formData.SAUDARA_ANGKAT} onChange={handleChange} placeholder="0" min="0" style={{width: '60px'}} />
              </div>
            </div>
            <div className="form-group">
              <label>9. Bahasa Sehari-hari <span>*</span></label>
              <input type="text" name="BAHASA_SEHARI" value={formData.BAHASA_SEHARI} onChange={handleChange} placeholder="Contoh: Indonesia" required />
            </div>
            <div className="form-group full-width">
              <label>10. Alamat <span>*</span></label>
              <textarea name="ALAMAT" value={formData.ALAMAT} onChange={handleChange} placeholder="Masukkan alamat lengkap" rows="3" required />
            </div>
            <div className="form-group">
              <label>11. No. Telepon <span>*</span></label>
              <input type="tel" name="NOMOR_TELEPON" value={formData.NOMOR_TELEPON} onChange={handleChange} placeholder="Contoh: 08123456789" required />
            </div>
            <div className="form-group">
              <label>12. Tinggal Dengan <span>*</span></label>
              <select name="TINGGAL_DENGAN" value={formData.TINGGAL_DENGAN} onChange={handleChange} required>
                <option value="">Pilih</option>
                <option value="Orang Tua">Orang Tua</option>
                <option value="Wali">Wali</option>
                <option value="Sendiri">Sendiri</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div className="form-group">
              <label>13. Jarak ke Sekolah (km) <span>*</span></label>
              <input type="number" name="JARAK_KE_SEKOLAH" value={formData.JARAK_KE_SEKOLAH} onChange={handleChange} placeholder="0" step="0.1" min="0" required />
            </div>
            <div className="form-group">
              <label>14. Transportasi <span>*</span></label>
              <select name="ALAT_TRANSPORTASI" value={formData.ALAT_TRANSPORTASI} onChange={handleChange} required>
                <option value="">Pilih Transportasi</option>
                <option value="Jalan Kaki">Jalan Kaki</option>
                <option value="Sepeda">Sepeda</option>
                <option value="Motor">Motor</option>
                <option value="Mobil">Mobil</option>
                <option value="Angkot">Angkot</option>
                <option value="Bus">Bus</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div className="form-group">
              <label>15. BB/TB <span>*</span></label>
              <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                <input type="number" name="BERAT_BADAN" value={formData.BERAT_BADAN} onChange={handleChange} placeholder="BB (kg)" min="0" style={{flex: 1}} required />
                <span>/</span>
                <input type="number" name="TINGGI_BADAN" value={formData.TINGGI_BADAN} onChange={handleChange} placeholder="TB (cm)" min="0" style={{flex: 1}} required />
              </div>
            </div>
            <div className="form-group">
              <label>16. Golongan Darah <span>*</span></label>
              <select name="GOLONGAN_DARAH" value={formData.GOLONGAN_DARAH} onChange={handleChange} required>
                <option value="">Pilih Gol Dar</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
            </div>
            <div className="form-group">
              <label>17. Riwayat Penyakit <span>*</span></label>
              <input type="text" name="PENYAKIT" value={formData.PENYAKIT} onChange={handleChange} placeholder="Contoh: Asma, Diabetes (tulis '-' jika tidak ada)" required />
            </div>
          </div>
        </div>

        {/* B. RIWAYAT PENDIDIKAN */}
        <div className="form-section">
          <h2>B. RIWAYAT PENDIDIKAN</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>1. Asal SD <span>*</span></label>
              <input type="text" name="ASAL_SD" value={formData.ASAL_SD} onChange={handleChange} placeholder="Nama SD asal" required />
            </div>
            <div className="form-group">
              <label>2. No. STTB SD <span>*</span></label>
              <input type="text" name="NOMOR_STTB_SD" value={formData.NOMOR_STTB_SD} onChange={handleChange} placeholder="Nomor STTB" required />
            </div>
            <div className="form-group">
              <label>3. Tanggal STTB SD <span>*</span></label>
              <input type="date" name="TANGGAL_STTB_SD" value={formData.TANGGAL_STTB_SD} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>4. Lama SD (tahun) <span>*</span></label>
              <input type="number" name="LAMA_SD" value={formData.LAMA_SD} onChange={handleChange} placeholder="6" min="1" required />
            </div>
          </div>
          <h3 style={{marginTop: '25px', marginBottom: '15px', color: '#764ba2'}}>SMP</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>5. Asal SMP <span>*</span></label>
              <input type="text" name="ASAL_SMP" value={formData.ASAL_SMP} onChange={handleChange} placeholder="Nama SMP asal" required />
            </div>
            <div className="form-group">
              <label>6. No. STTB SMP <span>*</span></label>
              <input type="text" name="NOMOR_STTB_SMP" value={formData.NOMOR_STTB_SMP} onChange={handleChange} placeholder="Nomor STTB" required />
            </div>
            <div className="form-group">
              <label>7. Tanggal STTB SMP <span>*</span></label>
              <input type="date" name="TANGGAL_STTB_SMP" value={formData.TANGGAL_STTB_SMP} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>8. Lama SMP (tahun) <span>*</span></label>
              <input type="number" name="LAMA_SMP" value={formData.LAMA_SMP} onChange={handleChange} placeholder="3" min="1" required />
            </div>
          </div>
        </div>

        {/* C. DATA ORANG TUA */}
        <div className="form-section">
          <h2>C. DATA ORANG TUA</h2>
          <div className="subsection">
            <h3>Ayah</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Nama <span>*</span></label>
                <input type="text" name="NAMA_AYAH" value={formData.NAMA_AYAH} onChange={handleChange} placeholder="Nama lengkap ayah" required />
              </div>
              <div className="form-group">
                <label>Tempat/Tgl Lahir <span>*</span></label>
                <div style={{display:'flex', gap:'8px'}}>
                  <input type="text" name="TEMPAT_LAHIR_AYAH" value={formData.TEMPAT_LAHIR_AYAH} onChange={handleChange} placeholder="Tempat lahir" required style={{flex:1}} />
                  <input type="date" name="TANGGAL_LAHIR_AYAH" value={formData.TANGGAL_LAHIR_AYAH} onChange={handleChange} required style={{flex:1}} />
                </div>
              </div>
              <div className="form-group full-width">
                <label>Alamat <span>*</span></label>
                <textarea name="ALAMAT_AYAH" value={formData.ALAMAT_AYAH} onChange={handleChange} placeholder="Alamat lengkap" rows="2" required />
              </div>
              <div className="form-group">
                <label>Telepon <span>*</span></label>
                <input type="tel" name="TELEPON_AYAH" value={formData.TELEPON_AYAH} onChange={handleChange} placeholder="Nomor telepon" required />
              </div>
              <div className="form-group">
                <label>Pekerjaan <span>*</span></label>
                <input type="text" name="PEKERJAAN_AYAH" value={formData.PEKERJAAN_AYAH} onChange={handleChange} placeholder="Pekerjaan" required />
              </div>
              <div className="form-group">
                <label>Penghasilan <span>*</span></label>
                <select name="PENGHASILAN_AYAH" value={formData.PENGHASILAN_AYAH} onChange={handleChange} required>
                  <option value="">Pilih Penghasilan</option>
                  <option value="Kurang dari 1 juta">Kurang dari 1 juta</option>
                  <option value="1-3 juta">1-3 juta</option>
                  <option value="3-5 juta">3-5 juta</option>
                  <option value="5-10 juta">5-10 juta</option>
                  <option value="Lebih dari 10 juta">Lebih dari 10 juta</option>
                </select>
              </div>
              <div className="form-group">
                <label>Pendidikan <span>*</span></label>
                <select name="PENDIDIKAN_AYAH" value={formData.PENDIDIKAN_AYAH} onChange={handleChange} required>
                  <option value="">Pilih Pendidikan</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="Diploma">Diploma</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>
              </div>
              <div className="form-group">
                <label>Kewarganegaraan <span>*</span></label>
                <select name="KEWARGANEGARAAN_AYAH" value={formData.KEWARGANEGARAAN_AYAH} onChange={handleChange} required>
                  <option value="">Pilih</option>
                  <option value="WNI">WNI</option>
                  <option value="WNA">WNA</option>
                </select>
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>Ibu</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Nama <span>*</span></label>
                <input type="text" name="NAMA_IBU" value={formData.NAMA_IBU} onChange={handleChange} placeholder="Nama lengkap ibu" required />
              </div>
              <div className="form-group">
                <label>Tempat/Tgl Lahir <span>*</span></label>
                <div style={{display:'flex', gap:'8px'}}>
                  <input type="text" name="TEMPAT_LAHIR_IBU" value={formData.TEMPAT_LAHIR_IBU} onChange={handleChange} placeholder="Tempat lahir" required style={{flex:1}} />
                  <input type="date" name="TANGGAL_LAHIR_IBU" value={formData.TANGGAL_LAHIR_IBU} onChange={handleChange} required style={{flex:1}} />
                </div>
              </div>
              <div className="form-group full-width">
                <label>Alamat <span>*</span></label>
                <textarea name="ALAMAT_IBU" value={formData.ALAMAT_IBU} onChange={handleChange} placeholder="Alamat lengkap" rows="2" required />
              </div>
              <div className="form-group">
                <label>Telepon <span>*</span></label>
                <input type="tel" name="TELEPON_IBU" value={formData.TELEPON_IBU} onChange={handleChange} placeholder="Nomor telepon" required />
              </div>
              <div className="form-group">
                <label>Pekerjaan <span>*</span></label>
                <input type="text" name="PEKERJAAN_IBU" value={formData.PEKERJAAN_IBU} onChange={handleChange} placeholder="Pekerjaan" required />
              </div>
              <div className="form-group">
                <label>Penghasilan <span>*</span></label>
                <select name="PENGHASILAN_IBU" value={formData.PENGHASILAN_IBU} onChange={handleChange} required>
                  <option value="">Pilih Penghasilan</option>
                  <option value="Kurang dari 1 juta">Kurang dari 1 juta</option>
                  <option value="1-3 juta">1-3 juta</option>
                  <option value="3-5 juta">3-5 juta</option>
                  <option value="5-10 juta">5-10 juta</option>
                  <option value="Lebih dari 10 juta">Lebih dari 10 juta</option>
                </select>
              </div>
              <div className="form-group">
                <label>Pendidikan <span>*</span></label>
                <select name="PENDIDIKAN_IBU" value={formData.PENDIDIKAN_IBU} onChange={handleChange} required>
                  <option value="">Pilih Pendidikan</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="Diploma">Diploma</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>
              </div>
              <div className="form-group">
                <label>Kewarganegaraan <span>*</span></label>
                <select name="KEWARGANEGARAAN_IBU" value={formData.KEWARGANEGARAAN_IBU} onChange={handleChange} required>
                  <option value="">Pilih</option>
                  <option value="WNI">WNI</option>
                  <option value="WNA">WNA</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* D. DATA WALI */}
        <div className="form-section">
          <h2>D. DATA WALI (Jika Ada)</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Nama Wali</label>
              <input type="text" name="NAMA_WALI" value={formData.NAMA_WALI} onChange={handleChange} placeholder="Nama lengkap wali" />
            </div>
            <div className="form-group full-width">
              <label>Alamat Wali</label>
              <textarea name="ALAMAT_WALI" value={formData.ALAMAT_WALI} onChange={handleChange} placeholder="Alamat lengkap wali" rows="2" />
            </div>
            <div className="form-group">
              <label>Telepon Wali</label>
              <input type="tel" name="TELEPON_WALI" value={formData.TELEPON_WALI} onChange={handleChange} placeholder="Nomor telepon wali" />
            </div>
          </div>
        </div>

        {/* E. JURUSAN & MINAT */}
        <div className="form-section">
          <h2>E. JURUSAN & MINAT</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Jurusan Dipilih <span>*</span></label>
              <select name="JURUSAN" value={formData.JURUSAN} onChange={handleChange} required>
                 <option value="">Pilih Jurusan</option>
                 <option value="TEKNIK INSTALASI TENAGA LISTRIK">TEKNIK INSTALASI TENAGA LISTRIK</option>
                 <option value="TEKNIK KENDARAAN RINGAN">TEKNIK KENDARAAN RINGAN</option>
                 <option value="TEKNIK KOMPUTER DAN JARINGAN">TEKNIK KOMPUTER DAN JARINGAN</option>
                 <option value="TEKNIK PENGELASAN">TEKNIK PENGELASAN</option>
                 <option value="TEKNIK SEPEDA MOTOR">TEKNIK SEPEDA MOTOR</option>
               </select>
            </div>
            <div className="form-group">
              <label>Olah Raga <span>*</span></label>
              <input type="text" name="KEGEMARAN_OLAHRAGA" value={formData.KEGEMARAN_OLAHRAGA} onChange={handleChange} placeholder="Kegemaran olahraga" required />
            </div>
            <div className="form-group">
              <label>Kemasyarakatan <span>*</span></label>
              <input type="text" name="KEGEMARAN_KEMASYARAKATAN" value={formData.KEGEMARAN_KEMASYARAKATAN} onChange={handleChange} placeholder="Kegemaran kemasyarakatan" required />
            </div>
            <div className="form-group">
              <label>Hasta Karya <span>*</span></label>
              <input type="text" name="KEGEMARAN_HASTA_KARYA" value={formData.KEGEMARAN_HASTA_KARYA} onChange={handleChange} placeholder="Kegemaran hasta karya" required />
            </div>
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Update Data' : 'Simpan Data'}
          </button>
          <button type="button" className="btn btn-reset" onClick={handleReset}>
            Reset
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/data')}>
            Lihat Data
          </button>
        </div>
      </form>

      <style>{`
        .top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 15px 30px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          margin-bottom: 30px;
        }

        .nav-brand {
          font-size: 24px;
          font-weight: bold;
          color: #667eea;
        }

        .nav-links {
          display: flex;
          gap: 10px;
        }

        .nav-link {
          background: none;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #555;
          transition: all 0.2s;
        }

        .nav-link:hover {
          background: #f0f0f0;
          color: #667eea;
        }

        .nav-link.active {
          background: #667eea;
          color: white;
        }

        @media (max-width: 768px) {
          .top-nav {
            flex-direction: column;
            gap: 15px;
          }

          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default FormPage;

