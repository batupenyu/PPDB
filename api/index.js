import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

function sql() {
  return neon(process.env.DATABASE_URL);
}

async function initDb() {
  const db = sql();
  await db`
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
      TTL_AYAH TEXT,
      TEMPAT_LAHIR_AYAH TEXT DEFAULT '',
      TANGGAL_LAHIR_AYAH TEXT DEFAULT '',
      ALAMAT_AYAH TEXT NOT NULL,
      TELEPON_AYAH TEXT NOT NULL,
      PEKERJAAN_AYAH TEXT NOT NULL,
      PENGHASILAN_AYAH TEXT NOT NULL,
      PENDIDIKAN_AYAH TEXT NOT NULL,
      KEWARGANEGARAAN_AYAH TEXT NOT NULL,
      NAMA_IBU TEXT NOT NULL,
      TTL_IBU TEXT,
      TEMPAT_LAHIR_IBU TEXT DEFAULT '',
      TANGGAL_LAHIR_IBU TEXT DEFAULT '',
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
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT
    )
  `;
}

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// GET all students
app.get('/api/students', async (req, res) => {
  try {
    const db = sql();
    const rows = await db`SELECT * FROM students ORDER BY "createdAt" DESC`;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single student
app.get('/api/students/:id', async (req, res) => {
  try {
    const db = sql();
    const rows = await db`SELECT * FROM students WHERE _id = ${req.params.id}`;
    if (!rows.length) return res.status(404).json({ error: 'Student not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create/update student
app.post('/api/students', async (req, res) => {
  const d = req.body;
  const now = new Date().toISOString();
  const db = sql();

  try {
    // Check existing by _id or by name+birth
    let existing = null;
    if (d._id) {
      const r = await db`SELECT _id FROM students WHERE _id = ${d._id}`;
      existing = r[0] || null;
    }
    if (!existing) {
      const r = await db`SELECT _id FROM students WHERE "NAMA_LENGKAP" = ${d.NAMA_LENGKAP} AND "TEMPAT_LAHIR" || "TANGGAL_LAHIR" = ${d.TEMPAT_LAHIR + d.TANGGAL_LAHIR}`;
      existing = r[0] || null;
    }

    if (existing) {
      await db`UPDATE students SET
        "NAMA_PANGGILAN"=${d.NAMA_PANGGILAN}, "JENIS_KELAMIN"=${d.JENIS_KELAMIN},
        "TEMPAT_LAHIR"=${d.TEMPAT_LAHIR}, "TANGGAL_LAHIR"=${d.TANGGAL_LAHIR},
        "AGAMA"=${d.AGAMA}, "KEWARGANEGARAAN"=${d.KEWARGANEGARAAN}, "ANAK_KE"=${d.ANAK_KE},
        "SAUDARA_KANDUNG"=${d.SAUDARA_KANDUNG||'0'}, "SAUDARA_TIRI"=${d.SAUDARA_TIRI||'0'},
        "SAUDARA_ANGKAT"=${d.SAUDARA_ANGKAT||'0'}, "BAHASA_SEHARI"=${d.BAHASA_SEHARI},
        "ALAMAT"=${d.ALAMAT}, "NOMOR_TELEPON"=${d.NOMOR_TELEPON}, "TINGGAL_DENGAN"=${d.TINGGAL_DENGAN},
        "JARAK_KE_SEKOLAH"=${d.JARAK_KE_SEKOLAH}, "ALAT_TRANSPORTASI"=${d.ALAT_TRANSPORTASI},
        "BERAT_BADAN"=${d.BERAT_BADAN}, "TINGGI_BADAN"=${d.TINGGI_BADAN},
        "GOLONGAN_DARAH"=${d.GOLONGAN_DARAH}, "PENYAKIT"=${d.PENYAKIT},
        "ASAL_SD"=${d.ASAL_SD}, "NOMOR_STTB_SD"=${d.NOMOR_STTB_SD},
        "TANGGAL_STTB_SD"=${d.TANGGAL_STTB_SD}, "LAMA_SD"=${d.LAMA_SD},
        "ASAL_SMP"=${d.ASAL_SMP}, "NOMOR_STTB_SMP"=${d.NOMOR_STTB_SMP},
        "TANGGAL_STTB_SMP"=${d.TANGGAL_STTB_SMP}, "LAMA_SMP"=${d.LAMA_SMP},
        "NAMA_AYAH"=${d.NAMA_AYAH}, "TEMPAT_LAHIR_AYAH"=${d.TEMPAT_LAHIR_AYAH||''},
        "TANGGAL_LAHIR_AYAH"=${d.TANGGAL_LAHIR_AYAH||''}, "ALAMAT_AYAH"=${d.ALAMAT_AYAH},
        "TELEPON_AYAH"=${d.TELEPON_AYAH}, "PEKERJAAN_AYAH"=${d.PEKERJAAN_AYAH},
        "PENGHASILAN_AYAH"=${d.PENGHASILAN_AYAH}, "PENDIDIKAN_AYAH"=${d.PENDIDIKAN_AYAH},
        "KEWARGANEGARAAN_AYAH"=${d.KEWARGANEGARAAN_AYAH},
        "NAMA_IBU"=${d.NAMA_IBU}, "TEMPAT_LAHIR_IBU"=${d.TEMPAT_LAHIR_IBU||''},
        "TANGGAL_LAHIR_IBU"=${d.TANGGAL_LAHIR_IBU||''}, "ALAMAT_IBU"=${d.ALAMAT_IBU},
        "TELEPON_IBU"=${d.TELEPON_IBU}, "PEKERJAAN_IBU"=${d.PEKERJAAN_IBU},
        "PENGHASILAN_IBU"=${d.PENGHASILAN_IBU}, "PENDIDIKAN_IBU"=${d.PENDIDIKAN_IBU},
        "KEWARGANEGARAAN_IBU"=${d.KEWARGANEGARAAN_IBU},
        "NAMA_WALI"=${d.NAMA_WALI||''}, "ALAMAT_WALI"=${d.ALAMAT_WALI||''},
        "TELEPON_WALI"=${d.TELEPON_WALI||''}, "JURUSAN"=${d.JURUSAN},
        "KEGEMARAN_OLAHRAGA"=${d.KEGEMARAN_OLAHRAGA},
        "KEGEMARAN_KEMASYARAKATAN"=${d.KEGEMARAN_KEMASYARAKATAN},
        "KEGEMARAN_HASTA_KARYA"=${d.KEGEMARAN_HASTA_KARYA},
        "updatedAt"=${now}
        WHERE _id = ${existing._id}`;
      res.json({ _id: existing._id, message: 'Student updated' });
    } else {
      const id = d._id || generateId();
      await db`INSERT INTO students (
        _id, "NAMA_LENGKAP", "NAMA_PANGGILAN", "JENIS_KELAMIN", "TEMPAT_LAHIR", "TANGGAL_LAHIR",
        "AGAMA", "KEWARGANEGARAAN", "ANAK_KE", "SAUDARA_KANDUNG", "SAUDARA_TIRI", "SAUDARA_ANGKAT",
        "BAHASA_SEHARI", "ALAMAT", "NOMOR_TELEPON", "TINGGAL_DENGAN", "JARAK_KE_SEKOLAH",
        "ALAT_TRANSPORTASI", "BERAT_BADAN", "TINGGI_BADAN", "GOLONGAN_DARAH", "PENYAKIT",
        "ASAL_SD", "NOMOR_STTB_SD", "TANGGAL_STTB_SD", "LAMA_SD",
        "ASAL_SMP", "NOMOR_STTB_SMP", "TANGGAL_STTB_SMP", "LAMA_SMP",
        "NAMA_AYAH", "TEMPAT_LAHIR_AYAH", "TANGGAL_LAHIR_AYAH", "ALAMAT_AYAH",
        "TELEPON_AYAH", "PEKERJAAN_AYAH", "PENGHASILAN_AYAH", "PENDIDIKAN_AYAH", "KEWARGANEGARAAN_AYAH",
        "NAMA_IBU", "TEMPAT_LAHIR_IBU", "TANGGAL_LAHIR_IBU", "ALAMAT_IBU",
        "TELEPON_IBU", "PEKERJAAN_IBU", "PENGHASILAN_IBU", "PENDIDIKAN_IBU", "KEWARGANEGARAAN_IBU",
        "NAMA_WALI", "ALAMAT_WALI", "TELEPON_WALI",
        "JURUSAN", "KEGEMARAN_OLAHRAGA", "KEGEMARAN_KEMASYARAKATAN", "KEGEMARAN_HASTA_KARYA",
        "createdAt"
      ) VALUES (
        ${id}, ${d.NAMA_LENGKAP}, ${d.NAMA_PANGGILAN}, ${d.JENIS_KELAMIN},
        ${d.TEMPAT_LAHIR}, ${d.TANGGAL_LAHIR}, ${d.AGAMA}, ${d.KEWARGANEGARAAN},
        ${d.ANAK_KE}, ${d.SAUDARA_KANDUNG||'0'}, ${d.SAUDARA_TIRI||'0'}, ${d.SAUDARA_ANGKAT||'0'},
        ${d.BAHASA_SEHARI}, ${d.ALAMAT}, ${d.NOMOR_TELEPON}, ${d.TINGGAL_DENGAN},
        ${d.JARAK_KE_SEKOLAH}, ${d.ALAT_TRANSPORTASI}, ${d.BERAT_BADAN}, ${d.TINGGI_BADAN},
        ${d.GOLONGAN_DARAH}, ${d.PENYAKIT}, ${d.ASAL_SD}, ${d.NOMOR_STTB_SD},
        ${d.TANGGAL_STTB_SD}, ${d.LAMA_SD}, ${d.ASAL_SMP}, ${d.NOMOR_STTB_SMP},
        ${d.TANGGAL_STTB_SMP}, ${d.LAMA_SMP},
        ${d.NAMA_AYAH}, ${d.TEMPAT_LAHIR_AYAH||''}, ${d.TANGGAL_LAHIR_AYAH||''},
        ${d.ALAMAT_AYAH}, ${d.TELEPON_AYAH}, ${d.PEKERJAAN_AYAH}, ${d.PENGHASILAN_AYAH},
        ${d.PENDIDIKAN_AYAH}, ${d.KEWARGANEGARAAN_AYAH},
        ${d.NAMA_IBU}, ${d.TEMPAT_LAHIR_IBU||''}, ${d.TANGGAL_LAHIR_IBU||''},
        ${d.ALAMAT_IBU}, ${d.TELEPON_IBU}, ${d.PEKERJAAN_IBU}, ${d.PENGHASILAN_IBU},
        ${d.PENDIDIKAN_IBU}, ${d.KEWARGANEGARAAN_IBU},
        ${d.NAMA_WALI||''}, ${d.ALAMAT_WALI||''}, ${d.TELEPON_WALI||''},
        ${d.JURUSAN}, ${d.KEGEMARAN_OLAHRAGA}, ${d.KEGEMARAN_KEMASYARAKATAN},
        ${d.KEGEMARAN_HASTA_KARYA}, ${now}
      )`;
      res.json({ _id: id, message: 'Student created' });
    }
  } catch (err) {
    console.error('POST /api/students error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const db = sql();
    const result = await db`DELETE FROM students WHERE _id = ${req.params.id} RETURNING _id`;
    if (!result.length) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET stats
app.get('/api/stats', async (req, res) => {
  try {
    const db = sql();
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const rows = await db`
      SELECT
        COUNT(*) as total,
        COUNT(CASE WHEN "createdAt"::date = ${today}::date THEN 1 END) as today,
        COUNT(CASE WHEN "createdAt"::date >= ${weekAgo}::date THEN 1 END) as recent
      FROM students
    `;
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET stats by jurusan
app.get('/api/stats/jurusan', async (req, res) => {
  try {
    const db = sql();
    const rows = await db`SELECT "JURUSAN", COUNT(*) as count FROM students GROUP BY "JURUSAN" ORDER BY count DESC, "JURUSAN" ASC`;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Init DB on cold start (idempotent)
initDb().catch(console.error);

export default app;
