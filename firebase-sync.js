// Firebase Sync Module
// Handles real-time sync between devices via Firebase Realtime Database

let db = null;
let firebaseReady = false;

function showSyncStatus(msg, color) {
    const el = document.getElementById('syncStatus');
    if (!el) return;
    el.textContent = msg;
    el.style.background = color;
    el.style.display = 'block';
    clearTimeout(el._hideTimer);
    el._hideTimer = setTimeout(() => { el.style.display = 'none'; }, 3000);
}

function initFirebase() {
    if (typeof FIREBASE_CONFIG === 'undefined' || !FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') {
        console.log('[Firebase] No config found, using localStorage only');
        return false;
    }

    try {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
        script.onload = () => {
            const dbScript = document.createElement('script');
            dbScript.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js';
            dbScript.onload = () => {
                firebase.initializeApp(FIREBASE_CONFIG);
                db = firebase.database();
                firebaseReady = true;
                console.log('[Firebase] Connected');
                showSyncStatus('☁️ Sync activo', '#10935C');
                startSync();
            };
            document.head.appendChild(dbScript);
        };
        document.head.appendChild(script);
        return true;
    } catch (e) {
        console.error('[Firebase] Init error:', e);
        return false;
    }
}

function startSync() {
    if (!firebaseReady) return;

    const paths = ['clientes', 'pagos', 'productos', 'ventas', 'cotizaciones', 'config'];
    paths.forEach(path => {
        db.ref(path).on('value', (snap) => {
            const data = snap.val();
            if (data) {
                const arr = Array.isArray(data) ? data : Object.values(data);
                state[path] = arr;
                localStorage.setItem('cp_' + path, JSON.stringify(arr));
                console.log('[Firebase] Synced:', path, arr.length, 'items');
                refreshView(path);
            }
        });
    });

    db.ref('tasas/bcv').on('value', (snap) => {
        const val = snap.val();
        if (val) {
            state.tasaBCV = val.valor;
            state.fechaTasaBCV = val.fecha;
            localStorage.setItem('cp_tasaBCV', val.valor);
            localStorage.setItem('cp_fechaTasaBCV', val.fecha);
            updateTasaDisplay();
        }
    });

    db.ref('tasas/paralelo').on('value', (snap) => {
        const val = snap.val();
        if (val) {
            state.tasaParalelo = val.valor;
            localStorage.setItem('cp_tasaParalelo', val.valor);
        }
    });
}

function refreshView(path) {
    switch (path) {
        case 'clientes': renderClientes(); renderPagos(); cargarSelectClientesVenta(); cargarSelectClientesCotizacion(); renderDashboard(); break;
        case 'pagos': renderPagos(); renderDashboard(); break;
        case 'productos': renderProductos(); renderProductosVenta(); renderDashboard(); break;
        case 'ventas': renderVentas(); renderDashboard(); cargarEstadisticas(); break;
        case 'cotizaciones': renderCotizaciones(); break;
        case 'config': loadConfig(); loadConfigVisual(); break;
    }
}

function firebaseSave(path, data) {
    if (!firebaseReady) {
        localStorage.setItem('cp_' + path, JSON.stringify(data));
        return Promise.resolve();
    }
    return db.ref(path).set(data).catch(e => {
        console.error('[Firebase] Save error:', path, e);
        localStorage.setItem('cp_' + path, JSON.stringify(data));
    });
}

function firebaseSaveTasa(type, valor) {
    if (!firebaseReady) return Promise.resolve();
    return db.ref('tasas/' + type).set({
        valor: valor,
        fecha: new Date().toISOString(),
        updatedBy: 'user_' + (navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop')
    });
}

function syncAll() {
    if (!firebaseReady) return;
    firebaseSave('clientes', state.clientes);
    firebaseSave('pagos', state.pagos);
    firebaseSave('productos', state.productos);
    firebaseSave('ventas', state.ventas);
    firebaseSave('cotizaciones', state.cotizaciones);
    firebaseSave('config', state.config);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initFirebase();
});
