// Script to seed localStorage with dummy student data
// Run this in browser console or via Node.js with jsdom

const sampleData = [{
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
  JURUSAN: 'TEKNIK KOMPUTER DAN JARINGAN',
  KEGEMARAN_OLAHRAGA: 'Sepak Bola',
  KEGEMARAN_KEMASYARAKATAN: 'Pramuka',
  KEGEMARAN_HASTA_KARYA: 'Menggambar',
  createdAt: new Date().toISOString()
}];

// For browser console:
if (typeof window !== 'undefined') {
  localStorage.setItem('ppdb_students', JSON.stringify(sampleData));
  console.log('Dummy data seeded to localStorage:', sampleData);
}

// For Node.js (requires jsdom or similar)
if (typeof module !== 'undefined' && module.exports) {
  console.log('Sample data JSON:', JSON.stringify(sampleData, null, 2));
}
