import { getFileHash } from './utils.js';
import { connectWallet, registerDocumentOnChain, fetchDocument, walletState } from './blockchain.js';
import * as UI from './ui.js';

// Inisialisasi Tab
UI.initTabs();

// --- Event Listener: Connect Wallet ---
document.getElementById('connectButton').addEventListener('click', async () => {
    try {
        const address = await connectWallet();
        UI.updateWalletUI(address);
    } catch (error) {
        alert(error.message);
    }
});

// --- Event Listener: Verifikasi (Publik) ---
document.getElementById('verifyButton').addEventListener('click', async function() {
    const fileInput = document.getElementById('verifyPdfUploader');
    
    if (fileInput.files.length === 0) {
        UI.showVerifyError('Harap pilih file PDF terlebih dahulu.');
        return;
    }

    // UI Loading state sederhana
    this.disabled = true;
    this.textContent = 'Mengecek...';

    try {
        const file = fileInput.files[0];
        const hash = await getFileHash(file);
        
        const doc = await fetchDocument(hash);

        // Cek jika status == 0 (NotRegistered)
        if (doc.status === 0n) {
            UI.showVerifyError('❌ Dokumen TIDAK Ditemukan / Belum Terdaftar.');
        } else {
            UI.showVerifyResult(doc);
        }
    } catch (error) {
        console.error(error);
        UI.showVerifyError('Gagal terkoneksi ke jaringan.');
    } finally {
        this.disabled = false;
        this.textContent = 'Verifikasi Sekarang';
    }
});

// --- Event Listener: Register (Admin) ---
document.getElementById('registerButton').addEventListener('click', async () => {
    // 1. Validasi Input
    if (!walletState.isConnected) {
        UI.showRegisterError('Harap koneksikan wallet admin terlebih dahulu.');
        return;
    }

    const fileInput = document.getElementById('pdfUploader');
    const owner = document.getElementById('docOwnerInput').value;
    const nim = document.getElementById('nimInput').value;
    const status = document.getElementById('statusInput').value;
    const catatan = document.getElementById('catatanInput').value;

    if (fileInput.files.length === 0 || !owner || !nim) {
        UI.showRegisterError('Semua data wajib diisi.');
        return;
    }

    // 2. Proses
    UI.setRegisterLoading(true);

    try {
        const file = fileInput.files[0];
        const hash = await getFileHash(file);
        
        // Kirim ke Blockchain
        const receipt = await registerDocumentOnChain(hash, owner, nim, status, catatan);
        
        UI.showRegisterSuccess(hash, receipt.hash);

    } catch (error) {
        console.error(error);
        let msg = "Terjadi kesalahan transaksi.";
        if (error.reason) msg = error.reason;
        if (error.message && error.message.includes("user rejected")) msg = "Transaksi dibatalkan oleh pengguna.";
        if (error.message && error.message.includes("File hash ini sudah terdaftar")) msg = "File ini sudah terdaftar sebelumnya!";
        
        UI.showRegisterError(msg);
    } finally {
        UI.setRegisterLoading(false);
    }
});

// UX: Tampilkan nama file saat upload di halaman publik
document.getElementById('verifyPdfUploader').addEventListener('change', function() {
    const fileNameDisplay = document.getElementById('verifyFileName');
    if(this.files && this.files.length > 0){
        fileNameDisplay.textContent = "File terpilih: " + this.files[0].name;
        fileNameDisplay.classList.remove('hidden');
    }
});