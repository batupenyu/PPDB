# PPDB Student Form Application

A web-based student registration form system for PPDB (Penerimaan Peserta Didik Baru) built with React, Express, and SQLite.

## Features

- 📝 Complete student registration form
- 📊 Real-time statistics dashboard
- 📄 PDF certificate generation
- 📈 Excel export functionality  
- 🗄️ Local SQLite database
- 📱 Responsive mobile-friendly design
- 🚀 Fast development with Vite

## Quick Start

### Development (Desktop)

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Development (Android Device)

See [ANDROID_QUICKSTART.md](ANDROID_QUICKSTART.md) for running on Android devices.

### Build for Production

```bash
npm run build
npm run preview
```

## Architecture

- **Frontend**: React + Vite (port 5173)
- **Backend**: Express.js (port 3001)
- **Database**: SQLite (sql.js)
- **Proxy**: Vite dev server proxies `/api` to Express backend

## API Endpoints

### Students
- `GET    /api/students`        - List all students
- `GET    /api/students/:id`    - Get single student
- `POST   /api/students`        - Create/update student
- `DELETE /api/students/:id`    - Delete student

### Statistics
- `GET /api/stats`               - Enrollment statistics
- `GET /api/stats/jurusan`       - Students by major

## File Structure

```
.
├── src/                          # Frontend React source
├── server.js                     # Express backend
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies
├── index.html                   # HTML template
├── seed-db.js                   # Database seeder
├── seed-data.js                 # Sample data
├── ppdb.db                      # SQLite database
├── start-android.ps1           # Android starter (Windows)
├── start-android.sh            # Android starter (Linux/Mac)
├── ngrok.ps1                   # Ngrok tunnel launcher
└── README.md                   # This file
```

## Android Testing

To test on Android devices, see:
- [ANDROID_QUICKSTART.md](ANDROID_QUICKSTART.md) - Quick start guide
- [ANDROID_SETUP.md](ANDROID_SETUP.md) - Detailed setup guide

## Database

The app uses `sql.js` (SQLite compiled to WebAssembly) for local database storage. Data is persisted to `ppdb.db` file.

### Reset Database

```bash
rm ppdb.db
node seed-db.js
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev servers (frontend + backend) |
| `npm run dev:android` | Start servers for Android testing |
| `npm run server` | Start backend only |
| `npm run seed` | Seed database with sample data |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Prerequisites

- Node.js 18+
- npm 9+

## License

ISC
