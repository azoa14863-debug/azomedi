// ============================================
// Azo Medi — BNPL App
// ============================================

let appSettings = JSON.parse(localStorage.getItem('am_settings')) || null;

const TASA_BCV_DEFAULT = 36.5;

function getTasaBCV() {
    const fromSettings = appSettings?.tasa;
    const fromLocal = parseFloat(localStorage.getItem('am_bcv_live'));
    if (fromSettings && fromSettings > 1) return fromSettings;
    if (fromLocal && fromLocal > 1) return fromLocal;
    return TASA_BCV_DEFAULT;
}

async function fetchTasaBCV() {
    // Fuente 1: ve.dolarapi.com (CORS habilitado, oficial BCV)
    try {
        const res = await fetch('https://ve.dolarapi.com/v1/dolares', { cache: 'no-cache' });
        if (res.ok) {
            const data = await res.json();
            const oficial = data.find(d => d.fuente === 'oficial');
            if (oficial && oficial.promedio) {
                const tasa = oficial.promedio;
                localStorage.setItem('am_bcv_live', tasa);
                localStorage.setItem('am_bcv_date', oficial.fechaActualizacion || new Date().toISOString());
                syncTasaToAdmin(tasa);
                updateBCVDisplays(tasa);
                return tasa;
            }
        }
    } catch (e) { console.log('Fuente 1 falló:', e); }

    // Fuente 2: bcv.today con proxy CORS
    try {
        const res = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://bcv.today/api/v1/rate.json'), { cache: 'no-cache' });
        if (res.ok) {
            const data = await res.json();
            if (data.USD && data.USD > 1) {
                const tasa = data.USD;
                localStorage.setItem('am_bcv_live', tasa);
                localStorage.setItem('am_bcv_date', data.date || data.effective_date || new Date().toISOString());
                syncTasaToAdmin(tasa);
                updateBCVDisplays(tasa);
                return tasa;
            }
        }
    } catch (e) { console.log('Fuente 2 falló:', e); }

    // Si todas fallan, usar última conocida o default
    const last = parseFloat(localStorage.getItem('am_bcv_live'));
    const fallback = (last && last > 1) ? last : TASA_BCV_DEFAULT;
    updateBCVDisplays(fallback);
    return fallback;
}

function syncTasaToAdmin(tasa) {
    if (!appSettings) appSettings = {};
    appSettings.tasa = tasa;
    localStorage.setItem('am_settings', JSON.stringify(appSettings));
    try {
        const ch = new BroadcastChannel('azo_medi_sync');
        ch.postMessage({ type: 'data_update' });
        setTimeout(() => ch.close(), 100);
    } catch(e) {}
}

function updateBCVDisplays(tasa) {
    const homeEl = document.getElementById('bcvRateDisplay');
    if (homeEl) homeEl.textContent = tasa.toFixed(2);
    const adminEl = document.getElementById('adminBcvRate');
    if (adminEl) adminEl.textContent = tasa.toFixed(2);
    const adminInput = document.getElementById('settTasa');
    if (adminInput) adminInput.value = tasa.toFixed(1);

    const dateStr = localStorage.getItem('am_bcv_date');
    const homeDateEl = document.getElementById('bcvDateDisplay');
    if (homeDateEl && dateStr) {
        try { homeDateEl.textContent = new Date(dateStr).toLocaleString('es-VE', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' }); } catch(e) {}
    }
    const adminDateEl = document.getElementById('bcvAdminDate');
    if (adminDateEl && dateStr) {
        try { adminDateEl.textContent = new Date(dateStr).toLocaleString('es-VE', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' }); } catch(e) {}
    }
}
const CREDIT_INITIAL = appSettings?.creditInit || 50;

function getInitialPct() {
    const level = state.user?.level || 1;
    if (level === 3) return (appSettings?.pct3 || 20) / 100;
    if (level === 2) return (appSettings?.pct2 || 30) / 100;
    return (appSettings?.pct1 || 40) / 100;
}

function getInstallments(total) {
    if (total < 15) return 1;
    if (total <= 30) return 2;
    return 3;
}

let state = {
    user: JSON.parse(localStorage.getItem('am_user')) || null,
    cart: JSON.parse(localStorage.getItem('am_cart')) || [],
    orders: JSON.parse(localStorage.getItem('am_orders')) || [],
    payments: JSON.parse(localStorage.getItem('am_payments')) || [],
    currentCategory: 'todos',
    currentProduct: null,
    checkoutPlan: null,
    checkoutStep: 1,
    screenHistory: [],
    onboardingDone: localStorage.getItem('am_onboarding') === '1'
};

function save() {
    localStorage.setItem('am_user', JSON.stringify(state.user));
    localStorage.setItem('am_cart', JSON.stringify(state.cart));
    localStorage.setItem('am_orders', JSON.stringify(state.orders));
    localStorage.setItem('am_payments', JSON.stringify(state.payments));
    syncToAdmin();
}

// ============================================
// VALIDATION HELPERS
// ============================================

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isEmailRegistered(email) {
    const normalized = email.trim().toLowerCase();
    const allUsers = JSON.parse(localStorage.getItem('am_all_users')) || [];
    return allUsers.some(u => (u.email || '').toLowerCase() === normalized);
}



function syncToAdmin() {
    const allUsers = JSON.parse(localStorage.getItem('am_all_users')) || [];
    if (state.user) {
        const idx = allUsers.findIndex(u => u.id === state.user.id);
        if (idx >= 0) {
            allUsers[idx] = { ...state.user };
        } else {
            allUsers.push({ ...state.user });
        }
        localStorage.setItem('am_all_users', JSON.stringify(allUsers));
    }

    const allOrders = JSON.parse(localStorage.getItem('am_all_orders')) || [];
    state.orders.forEach(o => {
        const idx = allOrders.findIndex(x => x.id === o.id);
        if (idx >= 0) {
            allOrders[idx] = { ...o };
        } else {
            allOrders.push({ ...o });
        }
    });
    localStorage.setItem('am_all_orders', JSON.stringify(allOrders));

    try {
        const ch = new BroadcastChannel('azo_medi_sync');
        ch.postMessage({ type: 'data_update' });
        setTimeout(() => ch.close(), 100);
    } catch(e) {}
}

// Listen for admin updates
try {
    const syncChannel = new BroadcastChannel('azo_medi_sync');
    syncChannel.onmessage = (e) => {
        if (e.data.type === 'data_update') {
            appSettings = JSON.parse(localStorage.getItem('am_settings')) || appSettings;
            updateBCVDisplays(getTasaBCV());
        }
    };
} catch(e) {}

window.addEventListener('storage', (e) => {
    if (e.key === 'am_settings') {
        appSettings = JSON.parse(localStorage.getItem('am_settings')) || appSettings;
        updateBCVDisplays(getTasaBCV());
    }
});

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    fetchTasaBCV();
    setInterval(fetchTasaBCV, 30 * 60 * 1000);

    setTimeout(() => {
        const splash = document.getElementById('screen-splash');
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.4s ease';
        setTimeout(() => {
            if (state.user) {
                requestLocationOnce();
                showScreen('home');
            } else if (state.onboardingDone) {
                showScreen('auth');
            } else {
                showScreen('onboarding');
            }
        }, 400);
    }, 1000);
});

// ============================================
// LOCATION — request once, keep active
// ============================================

let locationWatchId = null;
let currentLocation = null;
let locationRequested = false;

function startLocationTracking() {
    if (!navigator.geolocation || locationWatchId) return;
    
    locationWatchId = navigator.geolocation.watchPosition(
        pos => {
            currentLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        },
        err => {
            if (!locationRequested) {
                showToast('Activa tu ubicacion para usar la app', 'error');
                locationRequested = true;
            }
        },
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 30000 }
    );
}

function stopLocationTracking() {
    if (locationWatchId) {
        navigator.geolocation.clearWatch(locationWatchId);
        locationWatchId = null;
    }
}

function requestLocationOnce() {
    if (locationRequested || !navigator.geolocation) return;
    locationRequested = true;
    
    navigator.geolocation.getCurrentPosition(
        pos => {
            currentLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            startLocationTracking();
        },
        err => {
            showToast('Debes activar tu ubicacion para usar la app', 'error');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
}

function requireLocation() {
    if (currentLocation) return Promise.resolve(currentLocation);
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) { reject(new Error('GPS no disponible')); return; }
        navigator.geolocation.getCurrentPosition(
            pos => {
                currentLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                resolve(currentLocation);
            },
            err => reject(err),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    });
}

let savedRegisteredCedulas = JSON.parse(localStorage.getItem('am_cedulas')) || [];

function isCedulaRegistered(cedula) {
    const normalized = cedula.trim().toUpperCase();
    return savedRegisteredCedulas.some(c => c === normalized);
}

function registerCedula(cedula) {
    const normalized = cedula.trim().toUpperCase();
    if (!isCedulaRegistered(normalized)) {
        savedRegisteredCedulas.push(normalized);
        localStorage.setItem('am_cedulas', JSON.stringify(savedRegisteredCedulas));
    }
}

function isValidCedulaFormat(cedula) {
    const clean = cedula.trim().toUpperCase();
    return /^[VE]-\d{7,10}$/.test(clean);
}

// ============================================
// NAVIGATION
// ============================================

function showScreen(id) {
    if (id === 'checkout') {
        if (state.cart.length === 0) { showToast('El carrito esta vacio', 'error'); return; }
        if (!state.user) { showToast('Inicia sesion primero', 'error'); showScreen('auth'); return; }
        if (state.user.verified === false) { showToast('Tu cuenta esta pendiente de verificacion. No puedes realizar compras aun.', 'error'); return; }
        
        state.checkoutStep = 1;
        
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-checkout').classList.add('active');
        document.getElementById('bottomNav').style.display = 'none';
        renderCheckout();
        window.scrollTo(0, 0);
        return;
    }
    
    if (id !== 'splash' && id !== 'onboarding' && id !== 'auth') {
        state.screenHistory.push(id);
    }
    
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById('screen-' + id);
    if (screen) screen.classList.add('active');

    const nav = document.getElementById('bottomNav');
    if (['home', 'catalog', 'cart', 'orders', 'profile'].includes(id)) {
        nav.style.display = '';
        document.querySelectorAll('.nav-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.screen === id);
        });
    } else {
        nav.style.display = 'none';
    }

    if (id === 'home') renderHome();
    if (id === 'catalog') renderCatalog();
    if (id === 'cart') renderCart();
    if (id === 'orders') renderOrders();
    if (id === 'profile') renderProfile();
    if (id === 'credit') renderCreditDetail();
    if (id === 'payments') renderPayments();
    if (id === 'settings') renderSettings();

    window.scrollTo(0, 0);
}

function goBack() {
    const prev = state.screenHistory.pop();
    if (prev) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-' + prev).classList.add('active');
        const nav = document.getElementById('bottomNav');
        if (['home', 'catalog', 'cart', 'orders', 'profile'].includes(prev)) {
            nav.style.display = '';
            document.querySelectorAll('.nav-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.screen === prev);
            });
        } else {
            nav.style.display = 'none';
        }
        window.scrollTo(0, 0);
    } else {
        showScreen('home');
    }
}

function navTo(id, el) {
    state.screenHistory = [];
    showScreen(id);
}

// ============================================
// ONBOARDING
// ============================================

let currentSlide = 0;

function nextOnboarding() {
    const slides = document.querySelectorAll('.onboarding-slide');
    const dots = document.querySelectorAll('.onboarding-dots .dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide++;
    
    if (currentSlide >= slides.length) {
        finishOnboarding();
        return;
    }
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    const btn = document.getElementById('btnOnboardingNext');
    if (currentSlide === slides.length - 1) {
        btn.textContent = 'Comenzar';
    }
}

function finishOnboarding() {
    state.onboardingDone = true;
    localStorage.setItem('am_onboarding', '1');
    showScreen('auth');
}

// ============================================
// AUTH
// ============================================

function showForm(form) {
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.getElementById('form' + form.charAt(0).toUpperCase() + form.slice(1)).classList.add('active');
}

function togglePassword(id) {
    const el = document.getElementById(id);
    el.type = el.type === 'password' ? 'text' : 'password';
}

function doLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value.trim();
    
    if (!email || !pass) { showToast('Completa todos los campos', 'error'); return; }
    
    const saved = JSON.parse(localStorage.getItem('am_user'));
    if (saved && (saved.email === email || saved.phone === email) && saved.password === pass) {
        state.user = saved;
        save();
        showToast('Bienvenido ' + state.user.name);
        requestLocationOnce();
        showScreen('home');
        return;
    }

    const allUsers = JSON.parse(localStorage.getItem('am_all_users')) || [];
    const found = allUsers.find(u => (u.email === email || u.phone === email) && u.password === pass);
    if (found) {
        state.user = found;
        save();
        showToast('Bienvenido ' + state.user.name);
        requestLocationOnce();
        showScreen('home');
        return;
    }

    showToast('Correo o contrasena incorrectos. Registrate si no tienes cuenta.', 'error');
    showForm('register');
    document.getElementById('regEmail').value = email;
}

function doLoginPhone() {
    showForm('phone');
}

function handleCedulaPhoto(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('cedulaPreview').src = e.target.result;
        document.getElementById('cedulaPreview').style.display = 'block';
        document.getElementById('cedulaUploadPlaceholder').style.display = 'none';
        state.cedulaPhotoData = e.target.result;
    };
    reader.readAsDataURL(file);
}

function doRegister() {
    const name = document.getElementById('regName').value.trim();
    const apellido = document.getElementById('regApellido').value.trim();
    const age = document.getElementById('regAge').value.trim();
    const cedula = document.getElementById('regCedula').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPassword').value.trim();
    const locationAuth = document.getElementById('regLocationCheck').checked;
    const cedulaPhoto = state.cedulaPhotoData;
    const street = document.getElementById('regStreet').value.trim();
    const house = document.getElementById('regHouse').value.trim();
    const apartment = document.getElementById('regApartment').value.trim();
    const ref = document.getElementById('regRef').value.trim();
    
    if (!name || !apellido) { showToast('Nombre y apellido son obligatorios', 'error'); return; }
    if (!age || age < 16) { showToast('Debes tener al menos 16 anos', 'error'); return; }
    if (!cedula) { showToast('La cedula es obligatoria', 'error'); return; }
    if (!isValidCedulaFormat(cedula)) { showToast('Formato de cedula invalido. Use V-12345678 o E-12345678', 'error'); return; }
    if (isCedulaRegistered(cedula)) { showToast('Esta cedula ya esta registrada', 'error'); return; }
    if (!cedulaPhoto) { showToast('Debes subir la foto de tu cedula', 'error'); return; }
    if (!phone) { showToast('El telefono es obligatorio', 'error'); return; }
    if (!email) { showToast('El correo es obligatorio', 'error'); return; }
    if (!isValidEmail(email)) { showToast('Ingresa un correo electronico valido', 'error'); return; }
    if (isEmailRegistered(email)) { showToast('Este correo ya esta registrado', 'error'); return; }
    if (!pass || pass.length < 6) { showToast('La contrasena debe tener minimo 6 caracteres', 'error'); return; }
    if (!street) { showToast('La calle es obligatoria', 'error'); return; }
    if (!house) { showToast('La casa o apartamento es obligatorio', 'error'); return; }
    if (!locationAuth) { showToast('Debes autorizar el uso de tu ubicacion', 'error'); return; }
    
    showToast('Obteniendo tu ubicacion...', 'info');
    
    requireLocation().then(loc => {
        registerCedula(cedula);
        
        state.user = {
            id: 'user_' + Date.now(),
            name: name + ' ' + apellido,
            email: email,
            phone: phone,
            cedula: cedula,
            cedulaPhoto: cedulaPhoto,
            password: pass,
            age: age,
            street: street,
            house: house,
            apartment: apartment,
            ref: ref,
            level: 1,
            points: 0,
            creditLine: CREDIT_INITIAL,
            creditUsed: 0,
            location: loc,
            verified: false,
            createdAt: new Date().toISOString()
        };
        save();
        syncToAdmin();
        state.cedulaPhotoData = null;
        showToast('Cuenta creada. Pendiente de aprobacion por el administrador.');
        startLocationTracking();
        showScreen('home');
    }).catch(err => {
        showToast('Debes activar tu GPS para registrarte', 'error');
    });
}

function sendOTP() {
    const phone = document.getElementById('phoneInput').value.trim();
    if (!phone) { showToast('Ingresa tu telefono', 'error'); return; }
    
    showForm('OTP');
    showToast('Codigo enviado (demo: 1234)', 'info');
    
    let t = 60;
    const timer = setInterval(() => {
        t--;
        document.getElementById('otpTimer').textContent = t;
        if (t <= 0) clearInterval(timer);
    }, 1000);
}

function otpInput(el, idx) {
    if (el.value.length === 1 && idx < 3) {
        document.querySelector(`.otp-input[data-otp="${idx + 1}"]`).focus();
    }
}

function verifyOTP() {
    const inputs = document.querySelectorAll('.otp-input');
    const code = Array.from(inputs).map(i => i.value).join('');
    
    if (code === '1234' || code.length === 4) {
        const phone = document.getElementById('phoneInput').value.trim();
        state.user = {
            id: 'user_' + Date.now(),
            name: 'Usuario',
            email: '',
            phone,
            cedula: '',
            password: '',
            level: 1,
            points: 0,
            creditLine: CREDIT_INITIAL,
            creditUsed: 0,
            createdAt: new Date().toISOString()
        };
        save();
        showToast('Verificado!');
        showScreen('home');
    } else {
        showToast('Codigo incorrecto', 'error');
    }
}

function doLogout() {
    if (!confirm('Cerrar sesion?')) return;
    state.user = null;
    stopLocationTracking();
    save();
    showScreen('auth');
}

// ============================================
// HOME
// ============================================

function renderHome() {
    if (!state.user) return;
    
    document.getElementById('greetingText').textContent = 'Hola, ' + state.user.name.split(' ')[0] + '!';
    document.getElementById('userCreditLine').textContent = '$' + getAvailableCredit().toFixed(2);
    
    const bcvDisplay = document.getElementById('bcvRateDisplay');
    if (bcvDisplay) bcvDisplay.textContent = getTasaBCV().toFixed(2);
    
    let verifyBanner = document.getElementById('verifyBanner');
    if (state.user.verified === false && !verifyBanner) {
        const banner = document.createElement('div');
        banner.id = 'verifyBanner';
        banner.style.cssText = 'background:#ff6b35;color:#fff;padding:12px 16px;border-radius:12px;margin:8px 16px;font-size:0.85rem;display:flex;align-items:center;gap:8px;';
        banner.innerHTML = '<span style="font-size:1.2rem">&#9888;</span><div><strong>Cuenta pendiente de verificacion</strong><br><span style="font-size:0.8rem;opacity:0.9">Un administrador debe aprobar tu cuenta antes de poder realizar compras.</span></div>';
        const homeContent = document.getElementById('screen-home');
        const firstCard = homeContent.querySelector('.card, .home-hero');
        if (firstCard) firstCard.parentNode.insertBefore(banner, firstCard);
    } else if (state.user.verified !== false && verifyBanner) {
        verifyBanner.remove();
    }
    
    const featured = AZOMEDI_PRODUCTS.filter(p => p.stock > 0).slice(0, 8);
    document.getElementById('featuredProducts').innerHTML = featured.map(p => productCardHTML(p)).join('');
    
    const all = state.currentCategory === 'todos' ? AZOMEDI_PRODUCTS : AZOMEDI_PRODUCTS.filter(p => p.category === state.currentCategory);
    document.getElementById('homeProducts').innerHTML = all.map(p => productCardHTML(p)).join('');
    
    updateCartBadges();
}

function productCardHTML(p) {
    const installments = getInstallments(p.price);
    const initial = p.price * getInitialPct();
    const remaining = p.price - initial;
    const installment = (remaining / installments).toFixed(2);
    const inStock = p.stock > 0;
    
    return `<div class="product-card ${!inStock ? 'out-of-stock' : ''}" onclick="showProduct('${p.id}')">
        <div class="product-card-img">
            <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=placeholder-icon>&#127854;</div>'">
            ${inStock ? '<span class="product-card-badge">Disponible</span>' : '<span class="product-card-badge out">Agotado</span>'}
        </div>
        <div class="product-card-body">
            <h4>${p.name}</h4>
            <div class="product-card-price">$${p.price.toFixed(2)}</div>
            <div class="product-card-installment">Desde $${installment}/cuota</div>
            <div class="product-card-stock">${inStock ? p.stock + ' disponibles' : 'Sin stock'}</div>
        </div>
    </div>`;
}

function filterCategory(cat, el) {
    state.currentCategory = cat;
    
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    if (el) el.classList.add('active');
    
    if (document.getElementById('screen-home').classList.contains('active')) {
        renderHome();
    }
    if (document.getElementById('screen-catalog').classList.contains('active')) {
        renderCatalog();
    }
}

function searchProducts() {
    const q = document.getElementById('searchInput').value.toLowerCase().trim();
    let filtered = AZOMEDI_PRODUCTS;
    
    if (state.currentCategory !== 'todos') {
        filtered = filtered.filter(p => p.category === state.currentCategory);
    }
    if (q) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    
    document.getElementById('homeProducts').innerHTML = filtered.map(p => productCardHTML(p)).join('');
}

function searchCatalogProducts() {
    const q = document.getElementById('catalogSearchInput').value.toLowerCase().trim();
    let filtered = AZOMEDI_PRODUCTS;
    
    if (state.currentCategory !== 'todos') {
        filtered = filtered.filter(p => p.category === state.currentCategory);
    }
    if (q) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    
    document.getElementById('catalogProducts').innerHTML = filtered.map(p => productCardHTML(p)).join('');
}

// ============================================
// CATALOG
// ============================================

function renderCatalog() {
    let filtered = AZOMEDI_PRODUCTS;
    if (state.currentCategory !== 'todos') {
        filtered = filtered.filter(p => p.category === state.currentCategory);
    }
    document.getElementById('catalogProducts').innerHTML = filtered.map(p => productCardHTML(p)).join('');
}

// ============================================
// PRODUCT DETAIL
// ============================================

function showProduct(id) {
    const p = AZOMEDI_PRODUCTS.find(pr => pr.id === id);
    if (!p) return;
    state.currentProduct = p;
    
    const installments = getInstallments(p.price);
    const initial = p.price * getInitialPct();
    const remaining = p.price - initial;
    const cuota = installments > 0 ? remaining / installments : 0;
    
    document.getElementById('productDetail').innerHTML = `
        <div class="pd-image">
            <img src="${p.image}" alt="${p.name}" onerror="this.parentElement.innerHTML='<div class=placeholder-icon>&#127854;</div>'">
        </div>
        <div class="pd-info">
            <span class="pd-category">${p.category}</span>
            <h1 class="pd-name">${p.name}</h1>
            <div class="pd-price">$${p.price.toFixed(2)}</div>
            <div class="pd-price-sub">Bs. ${(p.price * getTasaBCV()).toFixed(2)} al cambio BCV</div>
            <div class="pd-stock ${p.stock <= 0 ? 'out' : ''}">${p.stock > 0 ? '✓ ' + p.stock + ' disponibles' : '✗ Sin stock'}</div>
            ${p.description ? '<p class="pd-description">' + p.description + '</p>' : ''}
        </div>
        <div class="pd-plan">
            <h3>Tu plan de pago</h3>
            <div class="plan-row highlight"><span>Cuota inicial (${(getInitialPct() * 100).toFixed(0)}%)</span><span>$${initial.toFixed(2)}</span></div>
            <div class="plan-row"><span>Cuotas restantes</span><span>${installments} x $${cuota.toFixed(2)}</span></div>
            <div class="plan-row"><span>Frecuencia</span><span>Cada 14 dias</span></div>
            <div class="plan-row"><span>Interes</span><span class="text-green">0% (sin interes)</span></div>
            <div class="plan-row"><span>Total</span><span>$${p.price.toFixed(2)}</span></div>
        </div>
        ${p.stock > 0 ? `
        <div class="pd-quantity">
            <label>Cantidad</label>
            <div class="qty-controls">
                <button onclick="changeQty(-1)">-</button>
                <span id="qtyValue">1</span>
                <button onclick="changeQty(1)">+</button>
            </div>
        </div>
        <button class="btn-primary btn-full btn-lg" onclick="addToCart('${p.id}')">
            Agregar al carrito — $${p.price.toFixed(2)}
        </button>
        ` : `
        <button class="btn-outline btn-full btn-lg" disabled style="opacity:0.5">
            Producto agotado
        </button>
        `}
    `;
    
    showScreen('product');
}

let currentQty = 1;

function changeQty(delta) {
    currentQty = Math.max(1, Math.min(currentQty + delta, 10));
    document.getElementById('qtyValue').textContent = currentQty;
}

// ============================================
// CART
// ============================================

function addToCart(productId) {
    const p = AZOMEDI_PRODUCTS.find(pr => pr.id === productId);
    if (!p || p.stock <= 0) return;
    
    const existing = state.cart.find(c => c.id === productId);
    if (existing) {
        existing.qty = Math.min(existing.qty + currentQty, p.stock);
    } else {
        state.cart.push({ id: productId, qty: currentQty });
    }
    
    currentQty = 1;
    save();
    updateCartBadges();
    showToast(p.name + ' agregado al carrito');
}

function removeFromCart(id) {
    state.cart = state.cart.filter(c => c.id !== id);
    save();
    renderCart();
    updateCartBadges();
}

function updateCartQty(id, delta) {
    const item = state.cart.find(c => c.id === id);
    const p = AZOMEDI_PRODUCTS.find(pr => pr.id === id);
    if (!item || !p) return;
    
    item.qty = Math.max(1, Math.min(item.qty + delta, p.stock));
    save();
    renderCart();
}

function clearCart() {
    if (!confirm('Vacias el carrito?')) return;
    state.cart = [];
    save();
    renderCart();
    updateCartBadges();
}

function renderCart() {
    const items = document.getElementById('cartItemsList');
    const footer = document.getElementById('cartFooter');
    const empty = document.getElementById('emptyCart');
    
    if (state.cart.length === 0) {
        empty.style.display = '';
        items.style.display = 'none';
        footer.style.display = 'none';
        return;
    }
    
    empty.style.display = 'none';
    items.style.display = '';
    footer.style.display = '';
    
    let subtotal = 0;
    
    items.innerHTML = state.cart.map(c => {
        const p = AZOMEDI_PRODUCTS.find(pr => pr.id === c.id);
        if (!p) return '';
        const total = p.price * c.qty;
        subtotal += total;
        return `<div class="cart-item">
            <div class="cart-item-img">
                <img src="${p.image}" alt="${p.name}" onerror="this.parentElement.innerHTML='<div class=placeholder-icon>&#127854;</div>'">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${p.name}</div>
                <div class="cart-item-price">$${p.price.toFixed(2)} c/u</div>
                <div class="cart-item-qty">
                    <button onclick="updateCartQty('${p.id}', -1)">-</button>
                    <span>${c.qty}</span>
                    <button onclick="updateCartQty('${p.id}', 1)">+</button>
                </div>
            </div>
            <div>
                <div class="cart-item-total">$${total.toFixed(2)}</div>
                <button class="cart-item-remove" onclick="removeFromCart('${p.id}')">✕</button>
            </div>
        </div>`;
    }).join('');
    
    const initial = subtotal * getInitialPct();
    document.getElementById('cartSubtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('cartInitial').textContent = '$' + initial.toFixed(2);
    document.getElementById('cartTotal').textContent = '$' + subtotal.toFixed(2);
    
    const pctEl = document.getElementById('cartPct');
    if (pctEl) pctEl.textContent = Math.round(getInitialPct() * 100);
    
    updateCartBadges();
}

function getCartTotal() {
    return state.cart.reduce((sum, c) => {
        const p = AZOMEDI_PRODUCTS.find(pr => pr.id === c.id);
        return sum + (p ? p.price * c.qty : 0);
    }, 0);
}

function updateCartBadges() {
    const count = state.cart.reduce((s, c) => s + c.qty, 0);
    const navBadge = document.getElementById('navCartBadge');
    const prodBadge = document.getElementById('productCartBadge');
    
    if (navBadge) {
        navBadge.style.display = count > 0 ? '' : 'none';
        navBadge.textContent = count;
    }
    if (prodBadge) {
        prodBadge.style.display = count > 0 ? '' : 'none';
        prodBadge.textContent = count;
    }
}

// ============================================
// CHECKOUT
// ============================================

function showScreenCheckout() {
    showScreen('checkout');
}

function renderCheckout() {
    document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
    document.getElementById('checkoutStep' + state.checkoutStep).classList.add('active');
    
    document.querySelectorAll('.step').forEach(s => {
        const sn = parseInt(s.dataset.step);
        s.classList.remove('active', 'done');
        if (sn === state.checkoutStep) s.classList.add('active');
        if (sn < state.checkoutStep) s.classList.add('done');
    });
    
    document.getElementById('checkoutBack').style.display = state.checkoutStep > 1 ? '' : 'none';
    
    const btn = document.getElementById('checkoutNext');
    if (state.checkoutStep === 1) {
        renderPlanOptions();
        btn.textContent = 'Continuar';
    } else if (state.checkoutStep === 2) {
        renderCheckoutPaymentMethods();
        btn.textContent = 'Registrar pago';
    } else if (state.checkoutStep === 3) {
        btn.textContent = 'Volver al inicio';
        renderOrderConfirmation();
    }
    
    window.scrollTo(0, 0);
}

function getActivePaymentMethods() {
    try {
        const methods = JSON.parse(localStorage.getItem('am_payment_methods')) || null;
        if (methods && methods.length) return methods.filter(m => m.active);
    } catch(e) {}
    return [
        { id: 'pm_1', name: 'Pago Movil', type: 'pago_movil', icon: '📱', bank: 'Banco de Venezuela', account: 'J-XXXXXXXX-X', phone: '0412-7232760', instructions: 'Solo digitos en la referencia', active: true },
        { id: 'pm_2', name: 'Transferencia Bancaria', type: 'transferencia', icon: '🏦', bank: 'Banco de Venezuela', account: 'J-XXXXXXXX-X', phone: '0412-7232760', instructions: 'Transferencia directa', active: true },
        { id: 'pm_3', name: 'Efectivo (USD)', type: 'efectivo', icon: '💵', bank: '', account: '', phone: '', instructions: 'Pago en efectivo en punto de venta', active: true }
    ];
}

function renderCheckoutPaymentMethods() {
    const methods = getActivePaymentMethods();
    const container = document.getElementById('checkoutPaymentMethods');
    container.innerHTML = methods.map((m, i) => `
        <label class="payment-method">
            <input type="radio" name="payMethod" value="${m.type}" data-pmid="${m.id}" ${i === 0 ? 'checked' : ''}>
            <div class="payment-method-card">
                <div class="pm-icon">${m.icon || '💳'}</div>
                <div>
                    <h4>${m.name}</h4>
                    <p>${m.bank || m.instructions || ''}</p>
                </div>
            </div>
        </label>
    `).join('');

    document.querySelectorAll('input[name="payMethod"]').forEach(r => {
        r.addEventListener('change', () => renderPaymentInfoForMethod(r.value));
    });

    renderPaymentInfoForMethod(methods[0]?.type || 'pago_movil');
}

function renderPaymentInfoForMethod(type) {
    const methods = getActivePaymentMethods();
    const m = methods.find(pm => pm.type === type) || methods[0];
    const infoEl = document.getElementById('paymentInfo');

    if (!m || (!m.bank && !m.phone && !m.account && !m.instructions)) {
        infoEl.innerHTML = '';
        return;
    }

    let rows = '';
    if (m.bank) rows += `<div class="info-row"><span>Banco:</span><strong>${m.bank}</strong></div>`;
    if (m.account) rows += `<div class="info-row"><span>RIF / Cuenta:</span><strong>${m.account}</strong></div>`;
    if (m.phone) rows += `<div class="info-row"><span>Telefono:</span><strong>${m.phone}</strong></div>`;
    if (m.instructions) rows += `<div class="info-row"><span>Instrucciones:</span><strong>${m.instructions}</strong></div>`;

    infoEl.innerHTML = `<div class="payment-info-box"><h4>Datos para ${m.name}</h4>${rows}</div>`;
}

function renderPlanOptions() {
    const total = getCartTotal();
    const installments = getInstallments(total);
    const initial = total * getInitialPct();
    const remaining = total - initial;
    const cuota = installments > 0 ? remaining / installments : 0;
    
    const options = [
        { n: installments, label: installments + ' cuota(s) cada 14 dias', cuota: cuota },
    ];
    
    document.getElementById('planOptions').innerHTML = options.map((o, i) => `
        <div class="plan-option ${i === 0 ? 'selected' : ''}" onclick="selectPlan(${i}, this)">
            <div class="plan-option-header">
                <div class="plan-option-title">${o.label}</div>
                <div class="plan-option-check">✓</div>
            </div>
            <div class="plan-option-details">
                <span>Inicial: $${initial.toFixed(2)} + ${o.n} cuota(s) de $${o.cuota.toFixed(2)}</span>
            </div>
            <div class="plan-option-details">
                <span>Total: $${total.toFixed(2)}</span>
                <span class="plan-option-total">0% interes</span>
            </div>
        </div>
    `).join('');
    
    state.checkoutPlan = { initial, installments: options[0].n, cuota: options[0].cuota, total };
}

function selectPlan(idx, el) {
    document.querySelectorAll('.plan-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
}

function nextStep() {
    if (state.checkoutStep === 2) {
        const ref = document.getElementById('payReference').value.trim();
        const amount = parseFloat(document.getElementById('payAmount').value);
        const captureInput = document.getElementById('payCapture');
        const capture = captureInput && captureInput.files[0] ? null : null;
        
        if (!ref) { showToast('Ingresa la referencia', 'error'); return; }
        if (!amount || amount <= 0) { showToast('Ingresa el monto pagado', 'error'); return; }
        
        state.pendingPaymentRef = ref;
        state.pendingPaymentAmount = amount;
        
        if (captureInput && captureInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                state.pendingPaymentCapture = e.target.result;
                state.checkoutStep++;
                renderCheckout();
            };
            reader.readAsDataURL(captureInput.files[0]);
            return;
        }
    }
    
    if (state.checkoutStep === 3) {
        state.cart = [];
        save();
        updateCartBadges();
        state.screenHistory = [];
        showScreen('home');
        return;
    }
    
    state.checkoutStep++;
    renderCheckout();
}

function prevStep() {
    if (state.checkoutStep > 1) {
        state.checkoutStep--;
        renderCheckout();
    }
}

function renderOrderConfirmation() {
    const total = getCartTotal();
    const items = state.cart.map(c => {
        const p = AZOMEDI_PRODUCTS.find(pr => pr.id === c.id);
        return p ? `<div class="os-row"><span>${p.name} x${c.qty}</span><span>$${(p.price * c.qty).toFixed(2)}</span></div>` : '';
    }).join('');
    
    const order = {
        id: 'ORD-' + Date.now(),
        items: [...state.cart],
        total,
        plan: state.checkoutPlan,
        status: 'pending',
        date: new Date().toISOString(),
        userId: state.user?.id,
        paymentRef: state.pendingPaymentRef || '',
        paymentAmount: state.pendingPaymentAmount || 0,
        paymentCapture: state.pendingPaymentCapture || null,
        paymentStatus: 'pending',
        bcvRate: getTasaBCV()
    };
    
    state.orders.push(order);
    state.user.points = (state.user.points || 0) + Math.floor(total);
    state.user.creditUsed = (state.user.creditUsed || 0) + (state.checkoutPlan?.initial || 0);
    
    // Save to vault
    const vault = JSON.parse(localStorage.getItem('am_payments_vault')) || [];
    vault.push({
        orderId: order.id,
        userId: order.userId,
        reference: order.paymentRef,
        amount: order.paymentAmount,
        capture: order.paymentCapture,
        status: 'pending',
        date: order.date,
        bcvRate: order.bcvRate
    });
    localStorage.setItem('am_payments_vault', JSON.stringify(vault));
    
    state.pendingPaymentRef = null;
    state.pendingPaymentAmount = null;
    state.pendingPaymentCapture = null;
    
    save();
    
    document.getElementById('orderSummary').innerHTML = items + `
        <div class="os-row"><span>Inicial pagada</span><span>$${(state.checkoutPlan?.initial || 0).toFixed(2)}</span></div>
        <div class="os-row"><span>Cuotas restantes</span><span>${state.checkoutPlan?.installments || 0}</span></div>
        <div class="os-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
    `;
}

// ============================================
// ORDERS
// ============================================

function renderOrders() {
    const list = document.getElementById('ordersList');
    const empty = document.getElementById('emptyOrders');
    
    const myOrders = state.orders.filter(o => o.userId === state.user?.id);
    
    if (myOrders.length === 0) {
        empty.style.display = '';
        list.style.display = 'none';
        return;
    }
    
    empty.style.display = 'none';
    list.style.display = '';
    
    list.innerHTML = myOrders.reverse().map(o => {
        const itemNames = o.items.map(c => {
            const p = AZOMEDI_PRODUCTS.find(pr => pr.id === c.id);
            return p ? p.name + ' x' + c.qty : '';
        }).filter(Boolean).join(', ');
        
        return `<div class="order-card ${o.status}">
            <div class="pc-header">
                <h4>${o.id}</h4>
                <span class="pc-badge ${o.status}">${o.status === 'pending' ? 'Pendiente' : o.status === 'completed' ? 'Completado' : o.status}</span>
            </div>
            <div class="pc-details">
                <span>${itemNames.substring(0, 40)}${itemNames.length > 40 ? '...' : ''}</span>
            </div>
            <div class="pc-details">
                <span class="pc-amount">$${o.total.toFixed(2)}</span>
                <span>${new Date(o.date).toLocaleDateString('es-VE')}</span>
            </div>
        </div>`;
    }).join('');
}

// ============================================
// PAYMENTS
// ============================================

function renderPayments() {
    const list = document.getElementById('paymentsList');
    const empty = document.getElementById('emptyPayments');
    
    const myOrders = state.orders.filter(o => o.userId === state.user?.id && o.status === 'pending');
    
    if (myOrders.length === 0) {
        empty.style.display = '';
        list.style.display = 'none';
        return;
    }
    
    empty.style.display = 'none';
    list.style.display = '';
    
    list.innerHTML = myOrders.map(o => {
        const remaining = o.total - (o.plan?.initial || 0);
        const cuota = o.plan?.cuota || (remaining / 3);
        const installments = o.plan?.installments || 4;
        
        let html = `<div class="payment-card" style="margin-bottom:6px">
            <div class="pc-header">
                <h4>Inicial — ${o.id}</h4>
                <span class="pc-badge paid">Pagada</span>
            </div>
            <div class="pc-details">
                <span>Cuota inicial</span>
                <span class="pc-amount">$${(o.plan?.initial || 0).toFixed(2)}</span>
            </div>
        </div>`;
        
        for (let i = 1; i < installments; i++) {
            const paid = i <= 0;
            html += `<div class="payment-card pending">
                <div class="pc-header">
                    <h4>Cuota ${i} de ${installments - 1}</h4>
                    <span class="pc-badge pending">Pendiente</span>
                </div>
                <div class="pc-details">
                    <span>Vence en ~${i * 14} dias</span>
                    <span class="pc-amount">$${cuota.toFixed(2)}</span>
                </div>
            </div>`;
        }
        
        return html;
    }).join('');
}

// ============================================
// CREDIT DETAIL
// ============================================

function getAvailableCredit() {
    if (!state.user) return 0;
    return Math.max(0, (state.user.creditLine || CREDIT_INITIAL) - (state.user.creditUsed || 0));
}

function renderCreditDetail() {
    if (!state.user) return;
    
    const available = getAvailableCredit();
    const used = state.user.creditUsed || 0;
    const total = state.user.creditLine || CREDIT_INITIAL;
    const level = state.user.level || 1;
    const progress = Math.min(100, (state.user.points || 0) / 50 * 100);
    
    document.getElementById('creditDetailAmount').textContent = '$' + total.toFixed(2);
    document.getElementById('creditDetailBS').textContent = 'Bs. ' + (total * getTasaBCV()).toFixed(2);
    document.getElementById('creditUsed').textContent = '$' + used.toFixed(2);
    document.getElementById('creditAvailable').textContent = '$' + available.toFixed(2);
    document.getElementById('creditLevel').textContent = 'Nivel ' + level;
    document.getElementById('creditProgressFill').style.width = progress + '%';
}

// ============================================
// PROFILE
// ============================================

function renderProfile() {
    if (!state.user) return;
    
    document.getElementById('profileAvatar').textContent = (state.user.name || 'U').charAt(0).toUpperCase();
    document.getElementById('profileName').textContent = state.user.name || 'Usuario';
    document.getElementById('profileEmail').textContent = state.user.email || state.user.phone || 'Sin email';
    document.getElementById('profileOrders').textContent = state.orders.filter(o => o.userId === state.user.id).length;
    document.getElementById('profilePoints').textContent = state.user.points || 0;
    document.getElementById('profileCredit').textContent = '$' + getAvailableCredit().toFixed(0);
    
    const level = state.user.level || 1;
    document.getElementById('profileLevel').innerHTML = `<span class="level-badge">Nivel ${level}</span><span class="level-label">${level === 3 ? 'Premium' : level === 2 ? 'Silver' : 'Miembro'}</span>`;
}

// ============================================
// SETTINGS
// ============================================

function renderSettings() {
    if (!state.user) return;
    document.getElementById('settingsName').value = state.user.name || '';
    document.getElementById('settingsEmail').value = state.user.email || '';
    document.getElementById('settingsPhone').value = state.user.phone || '';
}

function saveSettings() {
    state.user.name = document.getElementById('settingsName').value.trim() || state.user.name;
    state.user.email = document.getElementById('settingsEmail').value.trim();
    state.user.phone = document.getElementById('settingsPhone').value.trim();
    save();
    showToast('Configuracion guardada');
    goBack();
}

// ============================================
// WHATSAPP
// ============================================

function openWhatsApp() {
    window.open('https://wa.me/584127232760?text=Hola%20Azo%20Medi%20 necesito%20ayuda', '_blank');
}

// ============================================
// TOAST
// ============================================

function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(-10px)'; }, 2500);
    setTimeout(() => toast.remove(), 3000);
}

// ============================================
// PAYMENT METHOD TOGGLE
// ============================================

document.querySelectorAll('input[name="payMethod"]').forEach(r => {
    r.addEventListener('change', () => {
        const box = document.getElementById('paymentInfo');
        if (r.value === 'efectivo') {
            box.innerHTML = '<div class="payment-info-box"><h4>Pago en efectivo (USD)</h4><p style="font-size:0.85rem;color:var(--text-secondary)">Acercate a nuestro punto de venta en Trujillo con el monto exacto.</p></div>';
        } else {
            box.innerHTML = `<div class="payment-info-box"><h4>Datos para el ${r.value === 'pago_movil' ? 'pago movil' : 'transferencia'}</h4>
                <div class="info-row"><span>Banco:</span><strong>Banco de Venezuela</strong></div>
                <div class="info-row"><span>RIF:</span><strong>J-XXXXXXXX-X</strong></div>
                <div class="info-row"><span>Teléfono:</span><strong>0412-7232760</strong></div>
                <div class="info-row"><span>Referencia:</span><strong>Solo digitos</strong></div></div>`;
        }
    });
});
