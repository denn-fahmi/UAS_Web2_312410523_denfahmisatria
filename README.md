# Inventory Fahmi - Sistem Manajemen Inventaris Gudang

Aplikasi **Single Page Application (SPA)** modern untuk manajemen inventaris barang gudang berbasis Neumorphism (Soft UI) premium. Aplikasi ini memisahkan data kategori dan barang, serta dilengkapi dengan dashboard statistik yang interaktif.

Proyek ini dibangun dengan memisahkan **Backend RESTful API** (CodeIgniter 4) dan **Frontend SPA** (Vue 3, Axios, TailwindCSS) secara penuh. Keamanan API dilindungi menggunakan token **JWT (JSON Web Token)**.

---

## 📁 Struktur Repositori

```text
UAS_Web2_312410523_denfahmisatria/
├── backend-api/             # Framework CodeIgniter 4 (RESTful API)
├── frontend-spa/            # HTML, CSS (Tailwind), Vue.js Components (SPA Client)
│   ├── js/
│   │   ├── components/      # Login.js, Dashboard.js, Categories.js, Items.js, Navbar.js
│   │   ├── app.js
│   │   └── router.js
│   └── index.html
├── screenshots/             # Folder dokumentasi screenshot pengumpulan
└── README.md                # Dokumentasi Proyek
```

---

## 📸 Dokumentasi & Screenshot

> [!IMPORTANT]
> Silakan ambil screenshot dari sistem lokal Anda sendiri dan simpan ke folder `screenshots/` dengan nama file yang sesuai agar dapat tampil di bawah ini.

### 1. Skema Relasi Tabel Database (phpMyAdmin Designer)
![Skema Relasi Database](screenshots/db_schema.PNG)

### 2. Uji Coba Tembak API Gagal (Error 401 Unauthorized - Postman)
![Uji Coba Postman 401](screenshots/postman_401.PNG)

### 3. Antarmuka Halaman Login (Neumorphism Design)
![Halaman Login](screenshots/login.PNG)

### 4. Antarmuka Halaman Dashboard Admin
![Halaman Dashboard](screenshots/dashboard.PNG)

### 5. Tampilan Form Modal (Tambah/Edit Data Barang)
![Tampilan Form Modal](screenshots/form_modal.PNG)

![Tampilan Form Modal](screenshots/form_modal1.PNG)

### 6. Visualisasi Data pada Tabel Barang & Kategori (TailwindCSS)
![Visualisasi Data Tabel](screenshots/table.PNG)

---

## 🚀 Petunjuk Instalasi & Cara Menjalankan Proyek

### 🛠️ Langkah 1: Pengaturan Database (MySQL)
1. Aktifkan modul **Apache** dan **MySQL** pada control panel XAMPP Anda.
2. Buka phpMyAdmin (`http://localhost/phpmyadmin`).
3. Buat database baru dengan nama `uas_web2_inventory`.

### 💻 Langkah 2: Menjalankan Backend API (CodeIgniter 4)
1. Buka terminal/cmd dan masuk ke direktori `backend-api`:
   ```bash
   cd backend-api
   ```
2. Pastikan file `.env` sudah ada di root folder `backend-api` (sudah disediakan dan dikonfigurasi).
3. Jalankan migrasi database untuk membuat tabel-tabel secara otomatis:
   ```bash
   php spark migrate
   ```
4. Jalankan seeder untuk mengisi data user admin default dan kategori dasar:
   ```bash
   php spark db:seed UserSeeder
   ```
5. Jalankan server backend lokal:
   ```bash
   php spark serve --port 8080
   ```
   *Backend API Anda sekarang berjalan di: `http://localhost:8080`*

### 🎨 Langkah 3: Menjalankan Frontend SPA (Vue 3 / Tailwind)
Karena frontend dibangun sebagai Single Page Application murni menggunakan client-side scripting (Vue 3 CDN), Anda dapat menjalankannya dengan cara:
1. Klik kanan file `frontend-spa/index.html` lalu pilih **Open with Live Server** (jika menggunakan VS Code).
2. Atau jalankan virtual host/pindahkan folder ke `htdocs` XAMPP dan akses melalui browser di `http://localhost/UAS_Web2_312410523_denfahmisatria/frontend-spa/`.
3. Login ke sistem dengan kredensial berikut:
   * **Username**: `admin`
   * **Password**: `admin123`

---

## 🔗 Link Tautan Proyek

* **Video Presentasi YouTube**: [[Link Youtube](https://youtu.be/CapQo4cXmTk)]
* **Demo Aplikasi Online** : [[Link Youtube](https://youtu.be/CapQo4cXmTk)]
* **Alternative Link** : (https://youtu.be/CapQo4cXmTk)

---
**Dibuat oleh:**
* **Nama**: Den Fahmi Satria
* **NIM**: 312410523
* **Kelas**: I241E (Web Programming II / UAS)
