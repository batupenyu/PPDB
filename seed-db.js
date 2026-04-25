import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, 'ppdb.db');

async function main() {
  const SQL = await initSqlJs();

  // Load existing database or create new
  let db;
  try {
    const fileBuffer = await (await fetch(`file://${DB_PATH}`)).arrayBuffer();
    db = new SQL.Database(fileBuffer);
    console.log('Existing database loaded');
  } catch {
    db = new SQL.Database();
    console.log('New database created');
  }

  // Create table
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      _id TEXT PRIMARY KEY,
      NAMA_LENGKAP TEXT NOT NULL,
      NAMA_PANGGILAN TEXT,
      JENIS_KELAMIN TEXT NOT NULL,
      TEMPAT_LAHIR TEXT NOT NULL,
      TANGGAL_LAHIR TEXT NOT NULL,
      AGAMA TEXT NOT NULL,
      KEWARGANEGARAAN TEXT NOT NULL,
      ANAK_KE TEXT NOT NULL,
      SAUDARA_KANDUNG TEXT DEFAULT '0',
      SAUDARA_TIRI TEXT DEFAULT '0',
      SAUDARA_ANGKAT TEXT DEFAULT '0',
      BAHASA_SEHARI TEXT NOT NULL,
      ALAMAT TEXT NOT NULL,
      NOMOR_TELEPON TEXT NOT NULL,
      TINGGAL_DENGAN TEXT NOT NULL,
      JARAK_KE_SEKOLAH TEXT NOT NULL,
      ALAT_TRANSPORTASI TEXT NOT NULL,
      BERAT_BADAN TEXT NOT NULL,
      TINGGI_BADAN TEXT NOT NULL,
      GOLONGAN_DARAH TEXT NOT NULL,
      PENYAKIT TEXT NOT NULL,
      ASAL_SD TEXT NOT NULL,
      NOMOR_STTB_SD TEXT NOT NULL,
      TANGGAL_STTB_SD TEXT NOT NULL,
      LAMA_SD TEXT NOT NULL,
      ASAL_SMP TEXT NOT NULL,
      NOMOR_STTB_SMP TEXT NOT NULL,
      TANGGAL_STTB_SMP TEXT NOT NULL,
      LAMA_SMP TEXT NOT NULL,
      NAMA_AYAH TEXT NOT NULL,
      TTL_AYAH TEXT NOT NULL,
      ALAMAT_AYAH TEXT NOT NULL,
      TELEPON_AYAH TEXT NOT NULL,
      PEKERJAAN_AYAH TEXT NOT NULL,
      PENGHASILAN_AYAH TEXT NOT NULL,
      PENDIDIKAN_AYAH TEXT NOT NULL,
      KEWARGANEGARAAN_AYAH TEXT NOT NULL,
      NAMA_IBU TEXT NOT NULL,
      TTL_IBU TEXT NOT NULL,
      ALAMAT_IBU TEXT NOT NULL,
      TELEPON_IBU TEXT NOT NULL,
      PEKERJAAN_IBU TEXT NOT NULL,
      PENGHASILAN_IBU TEXT NOT NULL,
      PENDIDIKAN_IBU TEXT NOT NULL,
      KEWARGANEGARAAN_IBU TEXT NOT NULL,
      NAMA_WALI TEXT,
      ALAMAT_WALI TEXT,
      TELEPON_WALI TEXT,
      JURUSAN TEXT NOT NULL,
      KEGEMARAN_OLAHRAGA TEXT NOT NULL,
      KEGEMARAN_KEMASYARAKATAN TEXT NOT NULL,
      KEGEMARAN_HASTA_KARYA TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT
    )
  `);
  console.log('Table created/verified');

  // Clear existing data
  db.run('DELETE FROM students');
  console.log('Existing data cleared');

  // Dummy student data
  const dummyStudent = {
    _id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    NAMA_LENGKAP: 'Budi Santoso',
    NAMA_PANGGILAN: 'Budi',
    JENIS_KELAMIN: 'Laki-laki',
    TEMPAT_LAHIR: 'Jakarta',
    TANGGAL_LAHIR: '2008-05-15',
    AGAMA: 'Islam',
    KEWARGANEGARAAN: 'WNI',
    ANAK_KE: '2',
    SAUDARA_KANDUNG: '1',
    SAUDARA_TIRI: '0',
    SAUDARA_ANGKAT: '0',
    BAHASA_SEHARI: 'Indonesia',
    ALAMAT: 'Jl. Merdeka No. 123, Jakarta Barat',
    NOMOR_TELEPON: '081234567890',
    TINGGAL_DENGAN: 'Orang Tua',
    JARAK_KE_SEKOLAH: '2.5',
    ALAT_TRANSPORTASI: 'Motor',
    BERAT_BADAN: '55',
    TINGGI_BADAN: '165',
    GOLONGAN_DARAH: 'O',
    PENYAKIT: '-',
    ASAL_SD: 'SD Negeri 01 Jakarta',
    NOMOR_STTB_SD: 'SD/001/2018',
    TANGGAL_STTB_SD: '2018-06-15',
    LAMA_SD: '6',
    ASAL_SMP: 'SMP Negeri 15 Jakarta',
    NOMOR_STTB_SMP: 'SMP/123/2021',
    TANGGAL_STTB_SMP: '2021-06-30',
    LAMA_SMP: '3',
    NAMA_AYAH: 'Ahmad Santoso',
    TTL_AYAH: 'Surabaya, 1975-03-20',
    ALAMAT_AYAH: 'Jl. Merdeka No. 123, Jakarta Barat',
    TELEPON_AYAH: '081234567891',
    PEKERJAAN_AYAH: 'Pegawai Negeri',
    PENGHASILAN_AYAH: '3-5 juta',
    PENDIDIKAN_AYAH: 'S1',
    KEWARGANEGARAAN_AYAH: 'WNI',
    NAMA_IBU: 'Siti Rahayu',
    TTL_IBU: 'Bandung, 1978-07-12',
    ALAMAT_IBU: 'Jl. Merdeka No. 123, Jakarta Barat',
    TELEPON_IBU: '081234567892',
    PEKERJAAN_IBU: 'Guru',
    PENGHASILAN_IBU: '3-5 juta',
    PENDIDIKAN_IBU: 'S1',
    KEWARGANEGARAAN_IBU: 'WNI',
    NAMA_WALI: '',
    ALAMAT_WALI: '',
    TELEPON_WALI: '',
    JURUSAN: 'Rekayasa Perangkat Lunak',
    KEGEMARAN_OLAHRAGA: 'Sepak Bola',
    KEGEMARAN_KEMASYARAKATAN: 'Pramuka',
    KEGEMARAN_HASTA_KARYA: 'Menggambar',
    createdAt: new Date().toISOString()
  };

  // Insert dummy data (54 columns, 54 values)
  const placeholders = Array(54).fill('?').join(',');
  db.run(`
    INSERT INTO students (
      _id, NAMA_LENGKAP, NAMA_PANGGILAN, JENIS_KELAMIN, TEMPAT_LAHIR, TANGGAL_LAHIR,
      AGAMA, KEWARGANEGARAAN, ANAK_KE, SAUDARA_KANDUNG, SAUDARA_TIRI, SAUDARA_ANGKAT,
      BAHASA_SEHARI, ALAMAT, NOMOR_TELEPON, TINGGAL_DENGAN, JARAK_KE_SEKOLAH,
      ALAT_TRANSPORTASI, BERAT_BADAN, TINGGI_BADAN, GOLONGAN_DARAH, PENYAKIT,
      ASAL_SD, NOMOR_STTB_SD, TANGGAL_STTB_SD, LAMA_SD, ASAL_SMP, NOMOR_STTB_SMP,
      TANGGAL_STTB_SMP, LAMA_SMP, NAMA_AYAH, TTL_AYAH, ALAMAT_AYAH, TELEPON_AYAH,
      PEKERJAAN_AYAH, PENGHASILAN_AYAH, PENDIDIKAN_AYAH, KEWARGANEGARAAN_AYAH,
      NAMA_IBU, TTL_IBU, ALAMAT_IBU, TELEPON_IBU, PEKERJAAN_IBU, PENGHASILAN_IBU,
      PENDIDIKAN_IBU, KEWARGANEGARAAN_IBU, NAMA_WALI, ALAMAT_WALI, TELEPON_WALI,
      JURUSAN, KEGEMARAN_OLAHRAGA, KEGEMARAN_KEMASYARAKATAN, KEGEMARAN_HASTA_KARYA,
      createdAt
    ) VALUES (${placeholders})
  `, [
    dummyStudent._id,
    dummyStudent.NAMA_LENGKAP,
    dummyStudent.NAMA_PANGGILAN,
    dummyStudent.JENIS_KELAMIN,
    dummyStudent.TEMPAT_LAHIR,
    dummyStudent.TANGGAL_LAHIR,
    dummyStudent.AGAMA,
    dummyStudent.KEWARGANEGARAAN,
    dummyStudent.ANAK_KE,
    dummyStudent.SAUDARA_KANDUNG,
    dummyStudent.SAUDARA_TIRI,
    dummyStudent.SAUDARA_ANGKAT,
    dummyStudent.BAHASA_SEHARI,
    dummyStudent.ALAMAT,
    dummyStudent.NOMOR_TELEPON,
    dummyStudent.TINGGAL_DENGAN,
    dummyStudent.JARAK_KE_SEKOLAH,
    dummyStudent.ALAT_TRANSPORTASI,
    dummyStudent.BERAT_BADAN,
    dummyStudent.TINGGI_BADAN,
    dummyStudent.GOLONGAN_DARAH,
    dummyStudent.PENYAKIT,
    dummyStudent.ASAL_SD,
    dummyStudent.NOMOR_STTB_SD,
    dummyStudent.TANGGAL_STTB_SD,
    dummyStudent.LAMA_SD,
    dummyStudent.ASAL_SMP,
    dummyStudent.NOMOR_STTB_SMP,
    dummyStudent.TANGGAL_STTB_SMP,
    dummyStudent.LAMA_SMP,
    dummyStudent.NAMA_AYAH,
    dummyStudent.TTL_AYAH,
    dummyStudent.ALAMAT_AYAH,
    dummyStudent.TELEPON_AYAH,
    dummyStudent.PEKERJAAN_AYAH,
    dummyStudent.PENGHASILAN_AYAH,
    dummyStudent.PENDIDIKAN_AYAH,
    dummyStudent.KEWARGANEGARAAN_AYAH,
    dummyStudent.NAMA_IBU,
    dummyStudent.TTL_IBU,
    dummyStudent.ALAMAT_IBU,
    dummyStudent.TELEPON_IBU,
    dummyStudent.PEKERJAAN_IBU,
    dummyStudent.PENGHASILAN_IBU,
    dummyStudent.PENDIDIKAN_IBU,
    dummyStudent.KEWARGANEGARAAN_IBU,
    dummyStudent.NAMA_WALI,
    dummyStudent.ALAMAT_WALI,
    dummyStudent.TELEPON_WALI,
    dummyStudent.JURUSAN,
    dummyStudent.KEGEMARAN_OLAHRAGA,
    dummyStudent.KEGEMARAN_KEMASYARAKATAN,
    dummyStudent.KEGEMARAN_HASTA_KARYA,
    dummyStudent.createdAt
  ]);

  console.log('Dummy student data seeded successfully!');
  console.log('Student:', dummyStudent.NAMA_LENGKAP);

  // Save database to file
  const data = db.export();
  const buffer = Buffer.from(data);
  const fs = await import('fs');
  fs.writeFileSync(DB_PATH, buffer);
  console.log('Database saved to:', DB_PATH);

  db.close();
  console.log('Database connection closed');
  // Delay exit to ensure async operations complete
  setTimeout(() => process.exit(0), 100);
}

main().catch(err => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
