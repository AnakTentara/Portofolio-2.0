# Changelog

Semua perubahan penting pada proyek ini akan didokumentasikan dalam file ini.

Format ini didasarkan pada [Keep a Changelog](https://keepachangelog.com/id/1.0.0/).

## [Belum dirilis]

### Ditambahkan
- **Peningkatan UI & Navigasi**:
  - Tombol melayang *Scroll to Top* (`ScrollToTop.jsx`) dengan ikon Mouse dan ArrowUp yang muncul otomatis setelah scroll melewati 300px.
  - Kategori baru **Video** pada filter proyek di halaman utama (`Projects.jsx`) dengan dukungan pemutar iframe inline.
  - Sub-bagian galeri video minimalis dan YouTube Shorts (5 video baru) pada halaman arsip proyek (`MoreProjects.jsx`).
  - Tiga tombol aksi media sosial (YouTube, Instagram, dan TikTok `@shakaaru25`) bergaya *Liquid Glass* dengan border halus dan efek hover *neon glow*.
- **Peningkatan Startup Script & Deployment (`run.sh`)**:
  - Sistem deteksi pembaruan Git berbasis commit cache (`.cached_git_commit`) yang secara otomatis menghapus folder `dist/` dan mengompilasi ulang frontend (`npm run build`) ketika ada commit baru.
- **Peningkatan Besar Skill `/ui-ux-pro-max`**:
  - **Synonym Expansion Engine**: Menambahkan pemetaan 40+ sinonim istilah UI/UX pada `core.py` untuk meningkatkan akurasi pencarian BM25 (contoh: "fintech" -> banking, crypto, wallet).
  - **Fuzzy Matching Fallback**: Implementasi algoritma Levenshtein edit-distance untuk mentoleransi typo pada query pencarian (contoh: "fintek dashbord" -> Fintech/Crypto & Analytics Dashboard).
  - **Interactive HTML Preview Generator (`preview.html`)**: Generator preview visual mandiri dan responsif dengan toggle light/dark theme, click-to-copy color swatches, dynamic component preview (button hover, card lift, input focus ring, modal overlay dengan backdrop blur), dan visualisasi spacing scale.
  - **Export Tailwind Theme (`tailwind-theme.json`)**: Konfigurasi tema Tailwind CSS yang siap disalin ke `tailwind.config.js`.
  - **Export CSS Custom Properties (`variables.css`)**: Berkas stylesheet variabel CSS berisi seluruh token warna, tipografi, bayangan, dan spacing.
  - **Interactive REPL Console**: Mode interaktif pada `search.py` ketika dipanggil tanpa argumen.
  - **Backup Snapshot**: Cadangan versi sebelumnya disimpan di `.agents/skills/ui-ux-pro-max-backup/`.

### Diubah
- **Navbar Progress Bar**: Indikator progress scroll dipindahkan ke dalam wadah rounded navbar card dengan margin inset horizontal (`left-6 right-6`) dan bentuk pil melingkar penuh (`rounded-full`) agar rapi dan tidak meluap keluar dari sudut melengkung navbar.
- **Perbaikan Keterbacaan Quotes Dark Mode**: Mengubah styling kutipan pada halaman `About.jsx` menggunakan kartu *liquid glass* (`bg-slate-950/40 backdrop-blur-sm border-white/10`) dengan teks `dark:text-slate-200` agar sangat kontras dan jelas di dark mode.
- **Optimalisasi Touch Mobile (`CustomCursor.jsx`)**: Menonaktifkan overlay custom touch cursor pada layar sentuh/mobile untuk menghilangkan delay sentuhan dan lag scroll.
- **Perbaikan Routing Vite (`vite.config.js`)**: Mengubah konfigurasi `base` dari path relatif `./` menjadi path absolut `/` untuk mencegah error 404 dan kesalahan tipe MIME saat memuat ulang halaman sub-rute.
- **Penyesuaian Alias / Nama Panggilan**: Mengganti sebutan `acell` menjadi `aten` pada seluruh metadata SEO (`index.html`), Open Graph, Twitter Card, JSON-LD Structured Data, serta narasi bio di `About.jsx`.
