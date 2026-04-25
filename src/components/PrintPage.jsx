import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { FORM_FIELDS } from '../utils/excel';

const PrintPage = ({ data, onBack }) => {
  const navigate = useNavigate();
  const [selectedName, setSelectedName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const printRef = useRef(null);

  // Create options list from data
  const options = data.map(item => ({
    value: item._id || item.NAMA_LENGKAP,
    label: `${item.NAMA_LENGKAP} (${item.JURUSAN})`,
    data: item
  }));

  // Filter options based on search
  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedData = options.find(opt => opt.value === selectedName)?.data;

  // Handle print (HTML)
  const handlePrint = () => {
    if (!selectedData) return;
    window.print();
  };

   // Handle PDF export
   const handleExportPDF = () => {
     if (!selectedData) return;

     const doc = new jsPDF('p', 'mm', 'a4');
     const pageWidth = doc.internal.pageSize.getWidth();
     const pageHeight = doc.internal.pageSize.getHeight();
     const leftMargin = 25;
     const labelStartX = leftMargin;
     const colonX = leftMargin + 70; // Fixed position for colon (70mm from left)
     const valueX = colonX + 8; // Value starts 8mm after colon
     let y = 20;

     // Document header
     doc.setFontSize(18);
     doc.setFont(undefined, 'bold');
     doc.text('FORMULIR PENERIMAAN SISWA BARU', pageWidth / 2, y, { align: 'center' });
     y += 15;

     doc.setFontSize(12);
     doc.setFont(undefined, 'normal');
     doc.text(`Nama Lengkap: ${selectedData.NAMA_LENGKAP || '-'}`, leftMargin, y);
     y += 10;

     // Helper to draw a field with aligned colon
     const drawField = (label, value, yPos) => {
       if (yPos > pageHeight - 30) {
         doc.addPage();
         y = 20;
       }

       doc.setFontSize(10);
       doc.setFont(undefined, 'normal');

       // Draw label (left-aligned at labelStartX)
       doc.text(label, labelStartX, yPos);

       // Draw colon at fixed vertical position
       doc.text(':', colonX, yPos);

       // Draw value after colon
       doc.text(String(value || '-'), valueX, yPos);

       return yPos + 7;
     };

     // Group fields by section
     const sections = {
       'A. DATA PRIBADI SISWA': [
         { key: 'NAMA_LENGKAP', label: 'Nama Lengkap' },
         { key: 'NAMA_PANGGILAN', label: 'Nama Panggilan' },
         { key: 'JENIS_KELAMIN', label: 'Jenis Kelamin' },
         { key: 'TEMPAT_LAHIR', label: 'Tempat/Tgl Lahir', combined: 'TANGGAL_LAHIR' },
         { key: 'AGAMA', label: 'Agama' },
         { key: 'KEWARGANEGARAAN', label: 'Kewarganegaraan' },
         { key: 'ANAK_KE', label: 'Anak Ke' },
         { key: 'SAUDARA_KANDUNG', label: 'Saudara', combined: ['SAUDARA_TIRI', 'SAUDARA_ANGKAT'] },
         { key: 'BAHASA_SEHARI', label: 'Bahasa Sehari' },
         { key: 'ALAMAT', label: 'Alamat', fullWidth: true },
         { key: 'NOMOR_TELEPON', label: 'No. Telepon' },
         { key: 'TINGGAL_DENGAN', label: 'Tinggal Dengan' },
         { key: 'JARAK_KE_SEKOLAH', label: 'Jarak ke Sekolah', suffix: ' km' },
         { key: 'ALAT_TRANSPORTASI', label: 'Transportasi' },
         { key: 'BERAT_BADAN', label: 'BB/TB', combined: 'TINGGI_BADAN', suffix: ' kg / ' },
         { key: 'GOLONGAN_DARAH', label: 'Golongan Darah' },
         { key: 'PENYAKIT', label: 'Riwayat Penyakit' }
       ],
       'B. RIWAYAT PENDIDIKAN': [
         { key: 'ASAL_SD', label: 'Asal SD' },
         { key: 'NOMOR_STTB_SD', label: 'No. STTB SD' },
         { key: 'TANGGAL_STTB_SD', label: 'Tanggal STTB SD' },
         { key: 'LAMA_SD', label: 'Lama SD', suffix: ' tahun' },
         { key: 'ASAL_SMP', label: 'Asal SMP' },
         { key: 'NOMOR_STTB_SMP', label: 'No. STTB SMP' },
         { key: 'TANGGAL_STTB_SMP', label: 'Tanggal STTB SMP' },
         { key: 'LAMA_SMP', label: 'Lama SMP', suffix: ' tahun' }
       ],
       'C. DATA ORANG TUA - Ayah': [
         { key: 'NAMA_AYAH', label: 'Nama' },
         { key: 'TTL_AYAH', label: 'TTL' },
         { key: 'ALAMAT_AYAH', label: 'Alamat', fullWidth: true },
         { key: 'TELEPON_AYAH', label: 'Telepon' },
         { key: 'PEKERJAAN_AYAH', label: 'Pekerjaan' },
         { key: 'PENGHASILAN_AYAH', label: 'Penghasilan' },
         { key: 'PENDIDIKAN_AYAH', label: 'Pendidikan' },
         { key: 'KEWARGANEGARAAN_AYAH', label: 'Kewarganegaraan' }
       ],
       'C. DATA ORANG TUA - Ibu': [
         { key: 'NAMA_IBU', label: 'Nama' },
         { key: 'TTL_IBU', label: 'TTL' },
         { key: 'ALAMAT_IBU', label: 'Alamat', fullWidth: true },
         { key: 'TELEPON_IBU', label: 'Telepon' },
         { key: 'PEKERJAAN_IBU', label: 'Pekerjaan' },
         { key: 'PENGHASILAN_IBU', label: 'Penghasilan' },
         { key: 'PENDIDIKAN_IBU', label: 'Pendidikan' },
         { key: 'KEWARGANEGARAAN_IBU', label: 'Kewarganegaraan' }
       ],
       'D. DATA WALI': [
         { key: 'NAMA_WALI', label: 'Nama Wali', condition: selectedData.NAMA_WALI },
         { key: 'ALAMAT_WALI', label: 'Alamat Wali', fullWidth: true, condition: selectedData.ALAMAT_WALI },
         { key: 'TELEPON_WALI', label: 'Telepon Wali', condition: selectedData.TELEPON_WALI }
       ],
       'E. JURUSAN & MINAT': [
         { key: 'JURUSAN', label: 'Jurusan Dipilih' },
         { key: 'KEGEMARAN_OLAHRAGA', label: 'Olah Raga' },
         { key: 'KEGEMARAN_KEMASYARAKATAN', label: 'Kemasyarakatan' },
         { key: 'KEGEMARAN_HASTA_KARYA', label: 'Hasta Karya' }
       ]
     };

     Object.entries(sections).forEach(([sectionTitle, fields]) => {
       // Check if page needs new page
       if (y > pageHeight - 60) {
         doc.addPage();
         y = 20;
       }

       doc.setFontSize(14);
       doc.setFont(undefined, 'bold');
       doc.text(sectionTitle, leftMargin, y);
       y += 12;

       doc.setFontSize(10);
       doc.setFont(undefined, 'normal');

       fields.forEach(field => {
         // Skip if condition not met
         if (field.condition && !field.condition) return;

         const value = selectedData[field.key];

         // Handle combined fields
         if (field.combined) {
           if (Array.isArray(field.combined)) {
             // Multiple fields combined (saudara)
             const combinedValue = `${value || 0}, ${selectedData[field.combined[0]] || 0}, ${selectedData[field.combined[1]] || 0}`;
             y = drawField(field.label, combinedValue, y);
           } else {
             // Two fields combined (tempat/tgl, bb/tb)
             const combinedValue = `${value}, ${selectedData[field.combined]}`;
             if (field.suffix) combinedValue += field.suffix;
             y = drawField(field.label, combinedValue, y);
           }
         } else if (field.key === 'BERAT_BADAN' && !field.combined) {
           // Special: BB/TB combines both values
           const combined = `${selectedData.BERAT_BADAN} kg / ${selectedData.TINGGI_BADAN} cm`;
           y = drawField(field.label, combined, y);
         } else {
           let displayValue = value;
           if (field.suffix) displayValue += field.suffix;
           y = drawField(field.label, displayValue, y);
         }
       });
       y += 5;
     });

     // Footer
     y += 10;
     if (y > pageHeight - 50) {
       doc.addPage();
       y = 20;
     }

     doc.setFontSize(10);
     doc.setFont(undefined, 'italic');
     doc.text(`Dicetak pada: ${new Date().toLocaleDateString('id-ID')}`, leftMargin, y);

      doc.save(`PPDB_${selectedData.NAMA_LENGKAP.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
    };

   return (
    <div className="print-page">
      <div className="print-controls">
        <button className="btn btn-secondary" onClick={() => navigate('/data')}>
          ← Kembali ke Data
        </button>
        <h2 style={{margin: '0 20px', flex: 1}}>🖨️ Cetak / Print Data</h2>

        <div className="select-wrapper">
          <select
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            className="name-select"
          >
            <option value="">Pilih nama siswa...</option>
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
        <button
          className="btn btn-secondary"
          onClick={handleExportPDF}
          disabled={!selectedData}
          style={{background: '#e74c3c'}}
        >
          📄 Export PDF
        </button>
      </div>

      {selectedData && (
        <div className="print-preview-wrapper">
          <div ref={printRef} className="printable-document">
            <div className="print-header">
              <h1>FORMULIR PENERIMAAN SISWA BARU</h1>
              <div className="print-date">Tanggal Cetak: {new Date().toLocaleDateString('id-ID')}</div>
            </div>

            <div className="print-content">
              {/* Section A */}
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
                    <span className="print-field-value">{selectedData.TEMPAT_LAHIR}, {selectedData.TANGGAL_LAHIR}</span>
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

                {/* Section B */}
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
                        <span className="print-field-value">{selectedData.TANGGAL_STTB_SD}</span>
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
                        <span className="print-field-value">{selectedData.TANGGAL_STTB_SMP}</span>
                      </div>
                      <div className="print-field">
                        <span className="print-field-label">Lama SMP</span>
                        <span className="print-field-colon">:</span>
                        <span className="print-field-value">{selectedData.LAMA_SMP} tahun</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section C - Parents */}
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
                        <span className="print-field-label">TTL</span>
                        <span className="print-field-colon">:</span>
                        <span className="print-field-value">{selectedData.TTL_AYAH}</span>
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
                        <span className="print-field-label">TTL</span>
                        <span className="print-field-colon">:</span>
                        <span className="print-field-value">{selectedData.TTL_IBU}</span>
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

                {/* Section D - Wali */}
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

                {/* Section E */}
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
            </div>
          </div>
        </div>
      )}

      <style>{`
        .print-page {
          padding: 20px 0;
        }

        .print-controls {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          flex-wrap: wrap;
        }

        .select-wrapper {
          display: flex;
          gap: 10px;
          flex: 1;
          min-width: 300px;
        }

        .name-select {
          flex: 1;
          padding: 10px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
        }

        .search-mini {
          width: 150px;
          padding: 10px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
        }

        .print-preview-wrapper {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          padding: 0;
          overflow: hidden;
        }

        .printable-document {
          padding: 40px;
          max-width: 210mm;
          margin: 0 auto;
        }

        .print-header {
          text-align: center;
          border-bottom: 3px double #667eea;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }

        .print-header h1 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 24px;
        }

        .print-date {
          color: #666;
          font-size: 12px;
        }

        .print-section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }

        .print-section h2 {
          color: #667eea;
          border-bottom: 2px solid #667eea;
          padding-bottom: 8px;
          margin-bottom: 15px;
          font-size: 18px;
        }

        .print-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 12px;
        }

        .print-field {
          display: grid;
          grid-template-columns: 200px 10px 1fr;
          align-items: baseline;
          font-size: 13px;
          line-height: 1.6;
          color: #333;
        }

        .print-field-label {
          font-weight: 600;
          color: #555;
          text-align: left;
          grid-column: 1;
        }

        .print-field-colon {
          grid-column: 2;
          text-align: left;
        }

        .print-field-value {
          font-weight: normal;
          color: #333;
          grid-column: 3;
          word-break: break-word;
        }

        .print-field.full-width {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: 200px 10px 1fr;
        }

        .print-subsection {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
        }

        .print-subsection h3 {
          margin: 0 0 10px 0;
          color: #764ba2;
          font-size: 14px;
        }

        .parents-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .parent-box {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.7;
        }

        .parent-box h3 {
          margin: 0 0 10px 0;
          color: #667eea;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
        }

        .print-field-label {
          font-weight: 600;
          color: #555;
          display: inline-block;
          min-width: 200px;
        }

        .print-footer {
          margin-top: 50px;
          page-break-inside: avoid;
        }

        .signature-section {
          display: flex;
          justify-content: space-around;
          margin-top: 80px;
        }

        .signature-box {
          text-align: center;
        }

        .signature-box p {
          margin-bottom: 40px;
          font-weight: 600;
        }

        .signature-line {
          border-bottom: 2px solid #333;
          width: 200px;
        }

        @media print {
          .print-controls {
            display: none !important;
          }

          .print-preview-wrapper {
            box-shadow: none;
          }

          .printable-document {
            padding: 0;
          }

          .print-field-label {
            display: inline-block;
            min-width: 200px;
          }
        }

        @media (max-width: 768px) {
          .print-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .select-wrapper {
            flex-direction: column;
            min-width: 100%;
          }

          .search-mini {
            width: 100%;
          }

          .parents-grid {
            grid-template-columns: 1fr;
          }

          .print-field-label {
            min-width: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintPage;
