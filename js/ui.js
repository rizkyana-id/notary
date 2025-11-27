import { getStatusInfo, formatTimestamp } from './utils.js';

// Elements
const els = {
    publicSec: document.getElementById('section-public'),
    adminSec: document.getElementById('section-admin'),
    btnPublic: document.getElementById('nav-public'),
    btnAdmin: document.getElementById('nav-admin'),
    walletStatus: document.getElementById('wallet-status'),
    connectBtn: document.getElementById('connectButton'),
    verifyResultBox: document.getElementById('verify-result-box'),
    verifyStatus: document.getElementById('verify-status'),
    // ... elemen detail verifikasi
    vStat: document.getElementById('verifyStatus'),
    vOwn: document.getElementById('verifyOwner'),
    vNim: document.getElementById('verifyNim'),
    vTime: document.getElementById('verifyTimestamp'),
    vNote: document.getElementById('verifyCatatan'),
    
    // Admin Status
    adminStatus: document.getElementById('status'),
    resultArea: document.getElementById('result-area'),
    resultHash: document.getElementById('result-hash'),
    txLink: document.getElementById('tx-link'),
    regBtn: document.getElementById('registerButton')
};

// --- Tab Switching ---
export function initTabs() {
    els.btnPublic.addEventListener('click', () => switchTab('public'));
    els.btnAdmin.addEventListener('click', () => switchTab('admin'));
}

function switchTab(tabName) {
    if (tabName === 'public') {
        els.publicSec.classList.remove('hidden');
        els.adminSec.classList.add('hidden');
        els.btnPublic.className = "px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-blue-50 text-blue-700 shadow-sm border border-blue-100";
        els.btnAdmin.className = "px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors";
    } else {
        els.publicSec.classList.add('hidden');
        els.adminSec.classList.remove('hidden');
        els.btnAdmin.className = "px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-slate-900 text-white shadow-sm";
        els.btnPublic.className = "px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors";
    }
}

// --- UI Updates ---

export function updateWalletUI(address) {
    els.walletStatus.innerHTML = `Status: <span class="text-emerald-600 font-bold">Terkoneksi</span> (${address.substring(0, 6)}...)`;
    els.connectBtn.textContent = 'Wallet Terhubung';
    els.connectBtn.className = "text-xs bg-emerald-100 text-emerald-700 font-medium py-2 px-4 rounded-lg cursor-not-allowed border border-emerald-200";
    els.connectBtn.disabled = true;
}

export function showVerifyResult(doc) {
    const statusInfo = getStatusInfo(doc.status);
    
    els.verifyStatus.textContent = '✅ Dokumen ASLI & Terdaftar!';
    els.verifyStatus.className = "mt-4 text-center text-sm font-bold text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100";

    els.vStat.textContent = statusInfo.text;
    els.vStat.className = `px-3 py-1 rounded-full text-xs font-bold ${statusInfo.class}`;

    els.vOwn.textContent = doc.owner;
    els.vNim.textContent = doc.nim;
    els.vTime.textContent = formatTimestamp(doc.timestamp);
    els.vNote.textContent = doc.catatan;

    els.verifyResultBox.classList.remove('hidden');
}

export function showVerifyError(msg) {
    els.verifyStatus.textContent = msg;
    els.verifyStatus.className = "mt-4 text-center text-sm font-bold text-red-500 bg-red-50 p-3 rounded-lg border border-red-100";
    els.verifyResultBox.classList.add('hidden');
}

export function setRegisterLoading(isLoading) {
    const btn = els.regBtn;
    if (isLoading) {
        btn.disabled = true;
        btn.textContent = 'Sedang Memproses...';
        btn.className = "w-full bg-slate-400 text-white font-bold py-3.5 px-4 rounded-xl cursor-not-allowed";
        els.adminStatus.textContent = 'Memproses transaksi ke Blockchain...';
        els.adminStatus.className = "mt-5 text-center text-sm font-bold text-blue-600 animate-pulse";
    } else {
        btn.disabled = false;
        btn.textContent = 'Register ke Blockchain';
        btn.className = "w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow-lg";
    }
}

export function showRegisterSuccess(hash, txHash) {
    els.adminStatus.textContent = 'Sukses! Dokumen berhasil didaftarkan.';
    els.adminStatus.className = "mt-5 text-center text-sm font-bold text-emerald-600";
    
    els.resultHash.textContent = hash;
    els.txLink.href = `https://sepolia.etherscan.io/tx/${txHash}`;
    els.resultArea.classList.remove('hidden');
}

export function showRegisterError(msg) {
    els.adminStatus.textContent = msg;
    els.adminStatus.className = "mt-5 text-center text-sm font-bold text-red-500";
}