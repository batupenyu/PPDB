import express from 'express';
import cors from 'cors';
import { neon, neonConfig } from '@neondatabase/serverless';

neonConfig.fetchConnectionCache = true;

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const sql = () => neon(process.env.POSTGRES_URL);

async function initDb() {
  const db = sql();
  await db`
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      nama_lengkap TEXT NOT NULL,
      nama_panggilan TEXT,
      jenis_kelamin TEXT NOT NULL,
      tempat_lahir TEXT NOT NULL,
      tanggal_lahir TEXT NOT NULL,
      agama TEXT NOT NULL,
      kewarganegaraan TEXT NOT NULL,
      anak_ke TEXT NOT NULL,
      saudara_kandung TEXT DEFAULT '0',
      saudara_tiri TEXT DEFAULT '0',
      saudara_angkat TEXT DEFAULT '0',
      bahasa_sehari TEXT NOT NULL,
      alamat TEXT NOT NULL,
      nomor_telepon TEXT NOT NULL,
      tinggal_dengan TEXT NOT NULL,
      jarak_ke_sekolah TEXT NOT NULL,
      alat_transportasi TEXT NOT NULL,
      berat_badan TEXT NOT NULL,
      tinggi_badan TEXT NOT NULL,
      golongan_darah TEXT NOT NULL,
      penyakit TEXT NOT NULL,
      asal_sd TEXT NOT NULL,
      nomor_sttb_sd TEXT NOT NULL,
      tanggal_sttb_sd TEXT NOT NULL,
      lama_sd TEXT NOT NULL,
      asal_smp TEXT NOT NULL,
      nomor_sttb_smp TEXT NOT NULL,
      tanggal_sttb_smp TEXT NOT NULL,
      lama_smp TEXT NOT NULL,
      nama_ayah TEXT NOT NULL,
      tempat_lahir_ayah TEXT DEFAULT '',
      tanggal_lahir_ayah TEXT DEFAULT '',
      alamat_ayah TEXT NOT NULL,
      telepon_ayah TEXT NOT NULL,
      pekerjaan_ayah TEXT NOT NULL,
      penghasilan_ayah TEXT NOT NULL,
      pendidikan_ayah TEXT NOT NULL,
      kewarganegaraan_ayah TEXT NOT NULL,
      nama_ibu TEXT NOT NULL,
      tempat_lahir_ibu TEXT DEFAULT '',
      tanggal_lahir_ibu TEXT DEFAULT '',
      alamat_ibu TEXT NOT NULL,
      telepon_ibu TEXT NOT NULL,
      pekerjaan_ibu TEXT NOT NULL,
      penghasilan_ibu TEXT NOT NULL,
      pendidikan_ibu TEXT NOT NULL,
      kewarganegaraan_ibu TEXT NOT NULL,
      nama_wali TEXT DEFAULT '',
      alamat_wali TEXT DEFAULT '',
      telepon_wali TEXT DEFAULT '',
      jurusan TEXT NOT NULL,
      kegemaran_olahraga TEXT NOT NULL,
      kegemaran_kemasyarakatan TEXT NOT NULL,
      kegemaran_hasta_karya TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT
    )
  `;
}

const genId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Map frontend keys (UPPERCASE) to db columns (lowercase)
const toRow = (d, id, now, isInsert = false) => ({
  id: id,
  nama_lengkap: d.NAMA_LENGKAP,
  nama_panggilan: d.NAMA_PANGGILAN || '',
  jenis_kelamin: d.JENIS_KELAMIN,
  tempat_lahir: d.TEMPAT_LAHIR,
  tanggal_lahir: d.TANGGAL_LAHIR,
  agama: d.AGAMA,
  kewarganegaraan: d.KEWARGANEGARAAN,
  anak_ke: d.ANAK_KE,
  saudara_kandung: d.SAUDARA_KANDUNG || '0',
  saudara_tiri: d.SAUDARA_TIRI || '0',
  saudara_angkat: d.SAUDARA_ANGKAT || '0',
  bahasa_sehari: d.BAHASA_SEHARI,
  alamat: d.ALAMAT,
  nomor_telepon: d.NOMOR_TELEPON,
  tinggal_dengan: d.TINGGAL_DENGAN,
  jarak_ke_sekolah: d.JARAK_KE_SEKOLAH,
  alat_transportasi: d.ALAT_TRANSPORTASI,
  berat_badan: d.BERAT_BADAN,
  tinggi_badan: d.TINGGI_BADAN,
  golongan_darah: d.GOLONGAN_DARAH,
  penyakit: d.PENYAKIT,
  asal_sd: d.ASAL_SD,
  nomor_sttb_sd: d.NOMOR_STTB_SD,
  tanggal_sttb_sd: d.TANGGAL_STTB_SD,
  lama_sd: d.LAMA_SD,
  asal_smp: d.ASAL_SMP,
  nomor_sttb_smp: d.NOMOR_STTB_SMP,
  tanggal_sttb_smp: d.TANGGAL_STTB_SMP,
  lama_smp: d.LAMA_SMP,
  nama_ayah: d.NAMA_AYAH,
  tempat_lahir_ayah: d.TEMPAT_LAHIR_AYAH || '',
  tanggal_lahir_ayah: d.TANGGAL_LAHIR_AYAH || '',
  alamat_ayah: d.ALAMAT_AYAH,
  telepon_ayah: d.TELEPON_AYAH,
  pekerjaan_ayah: d.PEKERJAAN_AYAH,
  penghasilan_ayah: d.PENGHASILAN_AYAH,
  pendidikan_ayah: d.PENDIDIKAN_AYAH,
  kewarganegaraan_ayah: d.KEWARGANEGARAAN_AYAH,
  nama_ibu: d.NAMA_IBU,
  tempat_lahir_ibu: d.TEMPAT_LAHIR_IBU || '',
  tanggal_lahir_ibu: d.TANGGAL_LAHIR_IBU || '',
  alamat_ibu: d.ALAMAT_IBU,
  telepon_ibu: d.TELEPON_IBU,
  pekerjaan_ibu: d.PEKERJAAN_IBU,
  penghasilan_ibu: d.PENGHASILAN_IBU,
  pendidikan_ibu: d.PENDIDIKAN_IBU,
  kewarganegaraan_ibu: d.KEWARGANEGARAAN_IBU,
  nama_wali: d.NAMA_WALI || '',
  alamat_wali: d.ALAMAT_WALI || '',
  telepon_wali: d.TELEPON_WALI || '',
  jurusan: d.JURUSAN,
  kegemaran_olahraga: d.KEGEMARAN_OLAHRAGA,
  kegemaran_kemasyarakatan: d.KEGEMARAN_KEMASYARAKATAN,
  kegemaran_hasta_karya: d.KEGEMARAN_HASTA_KARYA,
  ...(isInsert ? { created_at: now } : { updated_at: now }),
});

// Map db row back to frontend UPPERCASE keys
const toFrontend = (r) => ({
  _id: r.id,
  NAMA_LENGKAP: r.nama_lengkap,
  NAMA_PANGGILAN: r.nama_panggilan,
  JENIS_KELAMIN: r.jenis_kelamin,
  TEMPAT_LAHIR: r.tempat_lahir,
  TANGGAL_LAHIR: r.tanggal_lahir,
  AGAMA: r.agama,
  KEWARGANEGARAAN: r.kewarganegaraan,
  ANAK_KE: r.anak_ke,
  SAUDARA_KANDUNG: r.saudara_kandung,
  SAUDARA_TIRI: r.saudara_tiri,
  SAUDARA_ANGKAT: r.saudara_angkat,
  BAHASA_SEHARI: r.bahasa_sehari,
  ALAMAT: r.alamat,
  NOMOR_TELEPON: r.nomor_telepon,
  TINGGAL_DENGAN: r.tinggal_dengan,
  JARAK_KE_SEKOLAH: r.jarak_ke_sekolah,
  ALAT_TRANSPORTASI: r.alat_transportasi,
  BERAT_BADAN: r.berat_badan,
  TINGGI_BADAN: r.tinggi_badan,
  GOLONGAN_DARAH: r.golongan_darah,
  PENYAKIT: r.penyakit,
  ASAL_SD: r.asal_sd,
  NOMOR_STTB_SD: r.nomor_sttb_sd,
  TANGGAL_STTB_SD: r.tanggal_sttb_sd,
  LAMA_SD: r.lama_sd,
  ASAL_SMP: r.asal_smp,
  NOMOR_STTB_SMP: r.nomor_sttb_smp,
  TANGGAL_STTB_SMP: r.tanggal_sttb_smp,
  LAMA_SMP: r.lama_smp,
  NAMA_AYAH: r.nama_ayah,
  TEMPAT_LAHIR_AYAH: r.tempat_lahir_ayah,
  TANGGAL_LAHIR_AYAH: r.tanggal_lahir_ayah,
  ALAMAT_AYAH: r.alamat_ayah,
  TELEPON_AYAH: r.telepon_ayah,
  PEKERJAAN_AYAH: r.pekerjaan_ayah,
  PENGHASILAN_AYAH: r.penghasilan_ayah,
  PENDIDIKAN_AYAH: r.pendidikan_ayah,
  KEWARGANEGARAAN_AYAH: r.kewarganegaraan_ayah,
  NAMA_IBU: r.nama_ibu,
  TEMPAT_LAHIR_IBU: r.tempat_lahir_ibu,
  TANGGAL_LAHIR_IBU: r.tanggal_lahir_ibu,
  ALAMAT_IBU: r.alamat_ibu,
  TELEPON_IBU: r.telepon_ibu,
  PEKERJAAN_IBU: r.pekerjaan_ibu,
  PENGHASILAN_IBU: r.penghasilan_ibu,
  PENDIDIKAN_IBU: r.pendidikan_ibu,
  KEWARGANEGARAAN_IBU: r.kewarganegaraan_ibu,
  NAMA_WALI: r.nama_wali,
  ALAMAT_WALI: r.alamat_wali,
  TELEPON_WALI: r.telepon_wali,
  JURUSAN: r.jurusan,
  KEGEMARAN_OLAHRAGA: r.kegemaran_olahraga,
  KEGEMARAN_KEMASYARAKATAN: r.kegemaran_kemasyarakatan,
  KEGEMARAN_HASTA_KARYA: r.kegemaran_hasta_karya,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

app.get('/api/students', async (req, res) => {
  try {
    const rows = await sql()`SELECT * FROM students ORDER BY created_at DESC`;
    res.json(rows.map(toFrontend));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/students/:id', async (req, res) => {
  try {
    const rows = await sql()`SELECT * FROM students WHERE id = ${req.params.id}`;
    if (!rows.length) return res.status(404).json({ error: 'Student not found' });
    res.json(toFrontend(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/students', async (req, res) => {
  const d = req.body;
  const now = new Date().toISOString();
  const db = sql();
  try {
    let existing = null;
    if (d._id) {
      const r = await db`SELECT id FROM students WHERE id = ${d._id}`;
      existing = r[0] || null;
    }
    if (!existing) {
      const r = await db`SELECT id FROM students WHERE nama_lengkap = ${d.NAMA_LENGKAP} AND tempat_lahir || tanggal_lahir = ${d.TEMPAT_LAHIR + d.TANGGAL_LAHIR}`;
      existing = r[0] || null;
    }

    if (existing) {
      const row = toRow(d, existing.id, now);
      await db`UPDATE students SET
        nama_lengkap=${d.NAMA_LENGKAP}, nama_panggilan=${row.nama_panggilan},
        jenis_kelamin=${row.jenis_kelamin}, tempat_lahir=${row.tempat_lahir},
        tanggal_lahir=${row.tanggal_lahir}, agama=${row.agama},
        kewarganegaraan=${row.kewarganegaraan}, anak_ke=${row.anak_ke},
        saudara_kandung=${row.saudara_kandung}, saudara_tiri=${row.saudara_tiri},
        saudara_angkat=${row.saudara_angkat}, bahasa_sehari=${row.bahasa_sehari},
        alamat=${row.alamat}, nomor_telepon=${row.nomor_telepon},
        tinggal_dengan=${row.tinggal_dengan}, jarak_ke_sekolah=${row.jarak_ke_sekolah},
        alat_transportasi=${row.alat_transportasi}, berat_badan=${row.berat_badan},
        tinggi_badan=${row.tinggi_badan}, golongan_darah=${row.golongan_darah},
        penyakit=${row.penyakit}, asal_sd=${row.asal_sd}, nomor_sttb_sd=${row.nomor_sttb_sd},
        tanggal_sttb_sd=${row.tanggal_sttb_sd}, lama_sd=${row.lama_sd},
        asal_smp=${row.asal_smp}, nomor_sttb_smp=${row.nomor_sttb_smp},
        tanggal_sttb_smp=${row.tanggal_sttb_smp}, lama_smp=${row.lama_smp},
        nama_ayah=${row.nama_ayah}, tempat_lahir_ayah=${row.tempat_lahir_ayah},
        tanggal_lahir_ayah=${row.tanggal_lahir_ayah}, alamat_ayah=${row.alamat_ayah},
        telepon_ayah=${row.telepon_ayah}, pekerjaan_ayah=${row.pekerjaan_ayah},
        penghasilan_ayah=${row.penghasilan_ayah}, pendidikan_ayah=${row.pendidikan_ayah},
        kewarganegaraan_ayah=${row.kewarganegaraan_ayah},
        nama_ibu=${row.nama_ibu}, tempat_lahir_ibu=${row.tempat_lahir_ibu},
        tanggal_lahir_ibu=${row.tanggal_lahir_ibu}, alamat_ibu=${row.alamat_ibu},
        telepon_ibu=${row.telepon_ibu}, pekerjaan_ibu=${row.pekerjaan_ibu},
        penghasilan_ibu=${row.penghasilan_ibu}, pendidikan_ibu=${row.pendidikan_ibu},
        kewarganegaraan_ibu=${row.kewarganegaraan_ibu},
        nama_wali=${row.nama_wali}, alamat_wali=${row.alamat_wali},
        telepon_wali=${row.telepon_wali}, jurusan=${row.jurusan},
        kegemaran_olahraga=${row.kegemaran_olahraga},
        kegemaran_kemasyarakatan=${row.kegemaran_kemasyarakatan},
        kegemaran_hasta_karya=${row.kegemaran_hasta_karya},
        updated_at=${now}
        WHERE id = ${existing.id}`;
      res.json({ _id: existing.id, message: 'Student updated' });
    } else {
      const id = d._id || genId();
      const row = toRow(d, id, now, true);
      await db`INSERT INTO students (
        id, nama_lengkap, nama_panggilan, jenis_kelamin, tempat_lahir, tanggal_lahir,
        agama, kewarganegaraan, anak_ke, saudara_kandung, saudara_tiri, saudara_angkat,
        bahasa_sehari, alamat, nomor_telepon, tinggal_dengan, jarak_ke_sekolah,
        alat_transportasi, berat_badan, tinggi_badan, golongan_darah, penyakit,
        asal_sd, nomor_sttb_sd, tanggal_sttb_sd, lama_sd,
        asal_smp, nomor_sttb_smp, tanggal_sttb_smp, lama_smp,
        nama_ayah, tempat_lahir_ayah, tanggal_lahir_ayah, alamat_ayah,
        telepon_ayah, pekerjaan_ayah, penghasilan_ayah, pendidikan_ayah, kewarganegaraan_ayah,
        nama_ibu, tempat_lahir_ibu, tanggal_lahir_ibu, alamat_ibu,
        telepon_ibu, pekerjaan_ibu, penghasilan_ibu, pendidikan_ibu, kewarganegaraan_ibu,
        nama_wali, alamat_wali, telepon_wali,
        jurusan, kegemaran_olahraga, kegemaran_kemasyarakatan, kegemaran_hasta_karya, created_at
      ) VALUES (
        ${row.id}, ${row.nama_lengkap}, ${row.nama_panggilan}, ${row.jenis_kelamin},
        ${row.tempat_lahir}, ${row.tanggal_lahir}, ${row.agama}, ${row.kewarganegaraan},
        ${row.anak_ke}, ${row.saudara_kandung}, ${row.saudara_tiri}, ${row.saudara_angkat},
        ${row.bahasa_sehari}, ${row.alamat}, ${row.nomor_telepon}, ${row.tinggal_dengan},
        ${row.jarak_ke_sekolah}, ${row.alat_transportasi}, ${row.berat_badan}, ${row.tinggi_badan},
        ${row.golongan_darah}, ${row.penyakit}, ${row.asal_sd}, ${row.nomor_sttb_sd},
        ${row.tanggal_sttb_sd}, ${row.lama_sd}, ${row.asal_smp}, ${row.nomor_sttb_smp},
        ${row.tanggal_sttb_smp}, ${row.lama_smp},
        ${row.nama_ayah}, ${row.tempat_lahir_ayah}, ${row.tanggal_lahir_ayah}, ${row.alamat_ayah},
        ${row.telepon_ayah}, ${row.pekerjaan_ayah}, ${row.penghasilan_ayah}, ${row.pendidikan_ayah},
        ${row.kewarganegaraan_ayah}, ${row.nama_ibu}, ${row.tempat_lahir_ibu}, ${row.tanggal_lahir_ibu},
        ${row.alamat_ibu}, ${row.telepon_ibu}, ${row.pekerjaan_ibu}, ${row.penghasilan_ibu},
        ${row.pendidikan_ibu}, ${row.kewarganegaraan_ibu},
        ${row.nama_wali}, ${row.alamat_wali}, ${row.telepon_wali},
        ${row.jurusan}, ${row.kegemaran_olahraga}, ${row.kegemaran_kemasyarakatan},
        ${row.kegemaran_hasta_karya}, ${row.created_at}
      )`;
      res.json({ _id: id, message: 'Student created' });
    }
  } catch (err) {
    console.error('POST /api/students error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    const result = await sql()`DELETE FROM students WHERE id = ${req.params.id} RETURNING id`;
    if (!result.length) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const rows = await sql()`
      SELECT
        COUNT(*) as total,
        COUNT(CASE WHEN created_at::date = ${today}::date THEN 1 END) as today,
        COUNT(CASE WHEN created_at::date >= ${weekAgo}::date THEN 1 END) as recent
      FROM students
    `;
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stats/jurusan', async (req, res) => {
  try {
    const rows = await sql()`SELECT jurusan as "JURUSAN", COUNT(*) as count FROM students GROUP BY jurusan ORDER BY count DESC, jurusan ASC`;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

initDb().catch(console.error);

export default async function handler(req, res) {
  return app(req, res);
}
