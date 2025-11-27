// Menghitung Hash SHA-256 dari File
export async function getFileHash(file) {
    const fileBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', fileBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Format Timestamp Unix ke String Terbaca
export function formatTimestamp(timestamp) {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString('id-ID', {
        dateStyle: 'full',
        timeStyle: 'short'
    });
}

// Mendapatkan Info Status (Teks & Kelas Warna Tailwind)
export function getStatusInfo(statusIndex) {
    switch (statusIndex) {
        case 1n: // Aktif
            return { text: 'AKTIF', class: 'bg-emerald-100 text-emerald-700 border border-emerald-200' };
        case 2n: // Inaktif
            return { text: 'INAKTIF', class: 'bg-amber-100 text-amber-700 border border-amber-200' };
        case 3n: // Diblokir
            return { text: 'DIBLOKIR', class: 'bg-rose-100 text-rose-700 border border-rose-200' };
        default: 
            return { text: 'TIDAK DIKETAHUI', class: 'bg-slate-100 text-slate-700 border border-slate-200' };
    }
}