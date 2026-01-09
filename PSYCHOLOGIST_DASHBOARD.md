# Dashboard Psikolog - MindSpace

Dashboard komprehensif untuk psikolog di platform MindSpace, memungkinkan manajemen klien, jadwal konsultasi, catatan sesi, dan analitik performa.

## 📋 Fitur Utama

### 1. **Dashboard Beranda** (`/psychologist`)
- **Welcome Section**: Sambutan personal dan ringkas informasi jadwal minggu ini
- **Statistik Cards**: 
  - Total Klien
  - Jadwal Konsultasi
  - Jam Kerja Minggu Ini
  - Tingkat Penyelesaian
- **Jadwal & Kalender Interaktif**: 
  - Kalender bulan dengan navigasi
  - Daftar jadwal untuk hari yang dipilih
  - Status appointment (confirmed, pending, completed)
- **Daftar Klien**: Preview klien aktif dengan pencarian dan filter
- **Aktivitas Terbaru**: Session records dan performance insights

### 2. **Manajemen Klien** (`/psychologist/clients`)
- Tampilan grid klien dengan card profesional
- Detail klien mencakup:
  - Nama, email, dan nomor kontak
  - Tipe masalah/issue
  - Progress bar untuk tracking kemajuan
  - Jumlah sesi yang telah dilakukan
  - Status (Active, Paused, Completed)
- Fitur pencarian dan filter berdasarkan status
- Action buttons: View, Message, Schedule

### 3. **Jadwal Konsultasi** (`/psychologist/schedule`)
- Kalender interaktif dengan bulan navigation
- Daftar appointment per hari dengan detail:
  - Nama klien
  - Waktu dan durasi sesi
  - Tipe (Online/Offline)
  - Status dan catatan sesi
  - Tombol Join Video Call untuk session online
- Statistik jadwal (Today, This Week, Completion Rate)

### 4. **Catatan Sesi** (`/psychologist/sessions`)
- Daftar semua session records dengan pencarian
- Detail sesi yang komprehensif:
  - Tanggal dan waktu
  - Tipe session (online/offline)
  - Session notes
  - Goals yang dicapai
  - Focus untuk next session
- Kemampuan edit dan delete notes

### 5. **Laporan & Analitik** (`/psychologist/reports`)
- Key metrics dashboard:
  - Total Sessions
  - Active Clients
  - Average Client Satisfaction
  - Completion Rate
- Weekly Sessions Chart
- Performance Metrics:
  - Average Session Duration
  - Booking Adherence
  - Client Retention
- Client Progress Table dengan trend indicators

### 6. **Profil Psikolog** (`/psychologist/profile`)
- Informasi profesional lengkap
- Edit profile dengan mode edit/view
- Spesialisasi/expertise
- Kredensial dan pendidikan
- Availability dan session fee
- Security settings (Change password, 2FA)

## 🎨 Design & UX

### Color Scheme
- **Primary**: #1a2e4a (Dark Blue)
- **Accent**: #e17b9e (Pink)
- **Secondary**: #2d4a6f (Blue)
- **Background**: Gradient dari blue-50 ke pink-50

### Responsive Design
- **Mobile First**: Fully responsive untuk semua ukuran layar
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Navigation mobile-friendly dengan hamburger menu
- Grid layouts yang adaptif

### Components
- **PsychologistNavbar**: Navigation dengan profile dropdown
- **StatisticsSection**: Card statistik dengan gradient
- **ScheduleSection**: Calendar dan schedule list
- **ClientsSection**: Table klien dengan filter
- **RecentActivitySection**: Activity log dan insights

## 📱 Navigation Structure

```
/psychologist/
├── layout.tsx          # Layout wrapper
├── page.tsx            # Dashboard home
├── /clients/
│   └── page.tsx        # Client list & management
├── /schedule/
│   └── page.tsx        # Schedule calendar & appointments
├── /sessions/
│   └── page.tsx        # Session records & notes
├── /reports/
│   └── page.tsx        # Analytics & reports
└── /profile/
    └── page.tsx        # Psychologist profile
```

## 🔌 Integrasi dengan User Dashboard

### Saling Berhubungan
- **User (Mahasiswa) → Psikolog**: 
  - User dapat booking jadwal konsultasi dengan psikolog
  - User melihat profil psikolog sebelum booking
  - User mendapat notifikasi appointment

- **Psikolog → User**:
  - Psikolog melihat daftar klien yang telah booking
  - Psikolog dapat mengirim notifikasi/reminder ke user
  - Psikolog tracking progress user melalui session notes

### Data Connection
```
Psikolog Dashboard
├── Clients (dari database user yang book)
├── Schedule (appointment dibuat user)
├── Sessions (catatan dari setiap konsultasi)
└── Reports (tracking progress klien)
```

## 💻 Tech Stack

- **Framework**: Next.js 14 (React 18+)
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **State Management**: React Hooks (useState)
- **Database**: Akan terhubung ke Firebase (ada di `lib/firebase.ts`)

## 📦 File Structure

```
components/psychologist/
├── navbar.tsx                    # Navigation bar
├── statistics-section.tsx         # Stats cards
├── schedule-section.tsx           # Calendar & schedule
├── clients-section.tsx            # Clients list preview
└── recent-activity-section.tsx    # Activity & insights

app/psychologist/
├── layout.tsx                     # Layout
├── page.tsx                       # Home dashboard
├── clients/page.tsx               # Full clients page
├── schedule/page.tsx              # Full schedule page
├── sessions/page.tsx              # Sessions records
├── reports/page.tsx               # Analytics
└── profile/page.tsx               # Profile settings
```

## 🚀 Fitur Yang Dapat Ditambahkan

### Short Term
- Integration dengan Firebase untuk real-time data
- Modal untuk edit client dan schedule
- Export report ke PDF
- Email notifications untuk appointment reminders

### Medium Term
- Video call integration (Agora/Twilio)
- Appointment request approval system
- Client feedback/rating system
- Payment tracking untuk session

### Long Term
- AI-powered progress insights
- Automated treatment plan generation
- Integration dengan health records
- Advanced analytics dashboard

## 📊 Data Models

### Client
```typescript
{
  id: string
  name: string
  email: string
  phone: string
  issueType: string
  startDate: string
  totalSessions: number
  progress: number (0-100)
  status: 'active' | 'paused' | 'completed'
  nextSession?: string
}
```

### Appointment
```typescript
{
  id: string
  clientName: string
  clientId: string
  date: string (YYYY-MM-DD)
  time: string (HH:MM)
  duration: number (minutes)
  type: 'online' | 'offline'
  status: 'confirmed' | 'pending' | 'completed'
  notes: string
}
```

### Session
```typescript
{
  id: string
  clientId: string
  appointmentId: string
  date: string
  notes: string
  goals: string[]
  nextFocus: string
  status: 'completed' | 'cancelled'
}
```

## 🎯 User Journey

### Typical Psychologist Flow
1. Login ke dashboard
2. Lihat overview di home page (stats, jadwal, klien)
3. Cek schedule untuk hari ini
4. Join video call untuk session online
5. Catat session notes setelah sesi
6. Monitor client progress melalui reports
7. Update profile dan availability

## ✅ Testing Checklist

- [ ] Responsive di mobile, tablet, desktop
- [ ] Calendar navigation works smoothly
- [ ] Search dan filter functions
- [ ] Profile editing
- [ ] All links navigate correctly
- [ ] Hover states dan transitions smooth
- [ ] No console errors

---

**Last Updated**: January 9, 2026
