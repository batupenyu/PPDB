// Excel utility functions
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Define form fields configuration
export const FORM_FIELDS = [
  { key: 'NAMA_LENGKAP', label: 'Nama Lengkap' },
  { key: 'NAMA_PANGGILAN', label: 'Nama Panggilan' },
  { key: 'JENIS_KELAMIN', label: 'Jenis Kelamin' },
  { key: 'TEMPAT_LAHIR', label: 'Tempat Lahir' },
  { key: 'TANGGAL_LAHIR', label: 'Tanggal Lahir' },
  { key: 'AGAMA', label: 'Agama' },
  { key: 'KEWARGANEGARAAN', label: 'Kewarganegaraan' },
  { key: 'ANAK_KE', label: 'Anak Ke' },
  { key: 'SAUDARA_KANDUNG', label: 'Saudara Kandung' },
  { key: 'SAUDARA_TIRI', label: 'Saudara Tiri' },
  { key: 'SAUDARA_ANGKAT', label: 'Saudara Angkat' },
  { key: 'BAHASA_SEHARI', label: 'Bahasa Sehari' },
  { key: 'ALAMAT', label: 'Alamat' },
  { key: 'NOMOR_TELEPON', label: 'No. Telepon' },
  { key: 'TINGGAL_DENGAN', label: 'Tinggal Dengan' },
  { key: 'JARAK_KE_SEKOLAH', label: 'Jarak ke Sekolah (km)' },
  { key: 'ALAT_TRANSPORTASI', label: 'Transportasi' },
  { key: 'BERAT_BADAN', label: 'Berat Badan (kg)' },
  { key: 'TINGGI_BADAN', label: 'Tinggi Badan (cm)' },
  { key: 'GOLONGAN_DARAH', label: 'Golongan Darah' },
  { key: 'PENYAKIT', label: 'Riwayat Penyakit' },
  { key: 'ASAL_SD', label: 'Asal SD' },
  { key: 'NOMOR_STTB_SD', label: 'No. STTB SD' },
  { key: 'TANGGAL_STTB_SD', label: 'Tanggal STTB SD' },
  { key: 'LAMA_SD', label: 'Lama SD (tahun)' },
  { key: 'ASAL_SMP', label: 'Asal SMP' },
  { key: 'NOMOR_STTB_SMP', label: 'No. STTB SMP' },
  { key: 'TANGGAL_STTB_SMP', label: 'Tanggal STTB SMP' },
  { key: 'LAMA_SMP', label: 'Lama SMP (tahun)' },
  { key: 'NAMA_AYAH', label: 'Nama Ayah' },
  { key: 'TEMPAT_LAHIR_AYAH', label: 'Tempat Lahir Ayah' },
  { key: 'TANGGAL_LAHIR_AYAH', label: 'Tanggal Lahir Ayah' },
  { key: 'ALAMAT_AYAH', label: 'Alamat Ayah' },
  { key: 'TELEPON_AYAH', label: 'Telepon Ayah' },
  { key: 'PEKERJAAN_AYAH', label: 'Pekerjaan Ayah' },
  { key: 'PENGHASILAN_AYAH', label: 'Penghasilan Ayah' },
  { key: 'PENDIDIKAN_AYAH', label: 'Pendidikan Ayah' },
  { key: 'KEWARGANEGARAAN_AYAH', label: 'Kewarganegaraan Ayah' },
  { key: 'NAMA_IBU', label: 'Nama Ibu' },
  { key: 'TEMPAT_LAHIR_IBU', label: 'Tempat Lahir Ibu' },
  { key: 'TANGGAL_LAHIR_IBU', label: 'Tanggal Lahir Ibu' },
  { key: 'ALAMAT_IBU', label: 'Alamat Ibu' },
  { key: 'TELEPON_IBU', label: 'Telepon Ibu' },
  { key: 'PEKERJAAN_IBU', label: 'Pekerjaan Ibu' },
  { key: 'PENGHASILAN_IBU', label: 'Penghasilan Ibu' },
  { key: 'PENDIDIKAN_IBU', label: 'Pendidikan Ibu' },
  { key: 'KEWARGANEGARAAN_IBU', label: 'Kewarganegaraan Ibu' },
  { key: 'NAMA_WALI', label: 'Nama Wali' },
  { key: 'ALAMAT_WALI', label: 'Alamat Wali' },
  { key: 'TELEPON_WALI', label: 'Telepon Wali' },
  { key: 'JURUSAN', label: 'Jurusan' },
  { key: 'KEGEMARAN_OLAHRAGA', label: 'Kegemaran Olahraga' },
  { key: 'KEGEMARAN_KEMASYARAKATAN', label: 'Kegemaran Kemasyarakatan' },
  { key: 'KEGEMARAN_HASTA_KARYA', label: 'Kegemaran Hasta Karya' },
];

// Get all form data keys (excluding internal ones)
export const DATA_KEYS = FORM_FIELDS.map(f => f.key);

// Export data to Excel
export const exportToExcel = (data, filename = 'ppdb_data') => {
  const worksheet = XLSX.utils.json_to_sheet(
    data.map(item => {
      const row = {};
      FORM_FIELDS.forEach(field => {
        row[field.label] = item[field.key] || '';
      });
      return row;
    }),
    { skipHeader: false }
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data PPDB');

  // Generate and download
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
};

// Import data from Excel file
export const importFromExcel = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });

        // Map column labels back to field keys
        const labelToKey = FORM_FIELDS.reduce((acc, f) => {
          acc[f.label] = f.key;
          return acc;
        }, {});

        const normalizedData = jsonData.map(row => {
          const newRow = {};
          Object.entries(row).forEach(([label, value]) => {
            const key = labelToKey[label] || label;
            newRow[key] = value;
          });
          return newRow;
        });

        resolve(normalizedData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};
