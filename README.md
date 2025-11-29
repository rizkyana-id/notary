# Laporan Ujian Tengah Semester (UTS)

### 👤 Identitas Mahasiswa
| Atribut | Detail |
| :--- | :--- |
| **Nama Lengkap** | RIZKYANA NURFADILLAH |
| **NIM** | 1002240015 |
| **Program Studi** | Teknologi Informasi |
| **Mata Kuliah** | Pemrograman Front-End |
| **Dosen** | Muhamad Yusuf, S.Kom., M.Kom. |
| **Kampus** | Institut Teknologi Tangerang Selatan |

## 🔗 Tautan Penting (Resources)

Berikut adalah lampiran desain antarmuka dan diagram alur sistem yang digunakan dalam pengembangan proyek ini:

- **🎨 Desain UI/UX (Figma):** [Klik disini](https://www.figma.com/design/5m71IIAKo6stgsIiBt0WDC/BlockNotary?node-id=0-1&t=nAHlKj6U6VMLWQx2-1)

- **🧩 Diagram Alur & Logika (FigJam):** [Klik disini](https://www.figma.com/board/u7HMJWENW1eoAfcuUHkqs6/BlockNotary?node-id=0-1&t=qckBOUGlDVq4WhuT-1)

- **📜 Source Code:** Tersedia lengkap dalam repository ini.

- **⛓️ Smart Contract (Sepolia Etherscan):** [Lihat Kontrak di Etherscan](https://sepolia.etherscan.io/address/0x458279E67098F21a2E5255A9fCd247d35799E6c3) 

## 📝 Deskripsi Proyek: BlockNotary

**BlockNotary** adalah aplikasi terdesentralisasi (dApp) untuk validasi dan autentikasi dokumen digital menggunakan teknologi Blockchain Ethereum (Jaringan Sepolia Testnet).

Aplikasi ini memungkinkan institusi (Admin) untuk menerbitkan "sertifikat digital" yang tidak dapat dipalsukan, dan memungkinkan publik untuk memverifikasi keaslian dokumen tersebut secara transparan tanpa perantara.

### Fitur Utama

#### 🔐 Panel Admin (Hanya Owner)
1.  **Registrasi Dokumen:** Mendaftarkan hash dokumen PDF ke blockchain beserta metadata (Nama Pemilik, NIM, Status Awal, Catatan).
2.  **Update Status:** Mengubah status dokumen yang sudah terdaftar secara *real-time* (Misal: Mengubah dari `Aktif` menjadi `Diblokir` jika ditemukan pelanggaran).
3.  **Koneksi Wallet:** Integrasi aman menggunakan MetaMask.

#### 🌍 Panel Publik (Siapa Saja)
1.  **Verifikasi Dokumen:** Upload file PDF untuk mengecek apakah file tersebut terdaftar di blockchain.
2.  **Cek Metadata:** Menampilkan detail pemilik, NIM, dan status terkini.
3.  **Timeline History:** Menampilkan jejak rekam (audit trail) lengkap dari dokumen, mulai dari pendaftaran hingga perubahan status terakhir.


## 🛠️ Teknologi yang Digunakan

- **Blockchain:** Ethereum (Sepolia Testnet)
- **Smart Contract:** Solidity (v0.8.20)
- **Frontend:** HTML5, Modular JavaScript (ES6 Modules)
- **Styling:** Tailwind CSS (via CDN)
- **Library Web3:** Ethers.js v6
- **RPC Provider:** Alchemy / Infura


## 🚀 Cara Menjalankan Project (Instalasi)

Karena proyek ini menggunakan **ES Modules** (`type="module"`), Anda tidak bisa membukanya langsung dengan double-click file HTML. Anda memerlukan local server.

### Prasyarat
- Browser dengan ekstensi **MetaMask**.
- Koneksi Internet (untuk CDN Tailwind & Ethers.js).

### Langkah-langkah
1.  **Clone Repository**
    ```bash
    git clone [https://github.com/username-anda/repo-anda.git](https://github.com/username-anda/repo-anda.git)
    cd repo-anda
    ```

2.  **Jalankan Local Server**
    * **Opsi 1 (VS Code):** Install ekstensi "Live Server", buka `index.html`, klik kanan dan pilih **"Open with Live Server"**.
    * **Opsi 2 (Python):**
        ```bash
        python3 -m http.server 8000
        ```
    * **Opsi 3 (Node.js/NPM):**
        ```bash
        npx serve .
        ```

3.  **Akses Aplikasi**
    Buka browser dan kunjungi `http://127.0.0.1:5500` (atau port yang sesuai).

## 📂 Struktur Folder

```text
/
├── index.html          # Halaman Utama (SPA)
├── README.md           # Dokumentasi ini
└── js/                 # Logika JavaScript Modular
    ├── main.js         # Entry point & Event Listeners
    ├── blockchain.js   # Interaksi Ethers.js (Read/Write)
    ├── config.js       # ABI & Contract Address
    ├── ui.js           # Manipulasi DOM & Tampilan
    └── utils.js        # Fungsi Helper (Hash, Format Date)