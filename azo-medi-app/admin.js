// ============================================
// Azo Medi — Panel de Administracion
// ============================================

const STORAGE_KEY = 'am_admin_data';

let adminData = {
    settings: JSON.parse(localStorage.getItem('am_settings')) || {
        brandName: 'Azo Medi',
        primary: '#1A2732',
        accent: '#FED74D',
        bg: '#F5F7FA',
        bank: 'Banco de Venezuela',
        rif: 'J-XXXXXXXX-X',
        payPhone: '0412-7232760',
        whatsapp: '584127232760',
        creditInit: 50,
        pct1: 40,
        pct2: 30,
        pct3: 20,
        tasa: 36.5
    },
    payments: JSON.parse(localStorage.getItem('am_payments_vault')) || [],
    products: JSON.parse(localStorage.getItem('am_products_edit')) || null
};

// ============================================
// SYNC — BroadcastChannel + localStorage
// ============================================

let channel = null;
try {
    channel = new BroadcastChannel('azo_medi_sync');
    channel.onmessage = (e) => {
        if (e.data.type === 'data_update') {
            loadAllData();
        }
    };
} catch(err) {}

window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('am_')) {
        loadAllData();
    }
});

function broadcastUpdate() {
    if (channel) {
        channel.postMessage({ type: 'data_update' });
    }
}

function loadAllData() {
    adminData.settings = JSON.parse(localStorage.getItem('am_settings')) || adminData.settings;
    adminData.payments = JSON.parse(localStorage.getItem('am_payments_vault')) || [];
    renderCurrentPage();
    updateSyncStatus();
}

function saveAdminData() {
    localStorage.setItem('am_settings', JSON.stringify(adminData.settings));
    localStorage.setItem('am_payments_vault', JSON.stringify(adminData.payments));
    broadcastUpdate();
}

function updateSyncStatus() {
    const el = document.getElementById('syncStatus');
    if (el) {
        el.querySelector('span:last-child').textContent = 'Sincronizado — ' + new Date().toLocaleTimeString('es-VE');
    }
}

// ============================================
// NAVIGATION
// ============================================

let currentPage = 'dashboard';

function showPage(page) {
    currentPage = page;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.toggle('active', n.dataset.page === page);
    });
    document.getElementById('pageTitle').textContent = {
        dashboard: 'Dashboard',
        clients: 'Clientes',
        vault: 'Boveda de Pagos',
        orders: 'Pedidos',
        products: 'Productos',
        settings: 'Configuracion'
    }[page] || page;

    renderCurrentPage();
}

function renderCurrentPage() {
    switch(currentPage) {
        case 'dashboard': renderDashboard(); break;
        case 'clients': renderClients(); break;
        case 'vault': renderVault(); break;
        case 'orders': renderOrders(); break;
        case 'products': renderProducts(); break;
        case 'settings': renderSettings(); break;
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// ============================================
// DASHBOARD
// ============================================

function renderDashboard() {
    const users = getAllUsers();
    const orders = getAllOrders();
    const totalRevenue = orders.reduce((s, o) => s + (o.plan?.initial || 0), 0);
    const pendingAmount = orders.filter(o => o.status === 'pending').reduce((s, o) => s + o.total - (o.plan?.initial || 0), 0);

    document.getElementById('statUsers').textContent = users.length;
    document.getElementById('statRevenue').textContent = '$' + totalRevenue.toFixed(2);
    document.getElementById('statOrders').textContent = orders.length;
    document.getElementById('statPending').textContent = '$' + pendingAmount.toFixed(2);

    // Recent orders
    const recent = orders.slice(-5).reverse();
    document.getElementById('recentOrders').innerHTML = recent.length ? recent.map(o => {
        const user = users.find(u => u.id === o.userId);
        return `<div class="data-row" onclick="showOrderDetail('${o.id}')">
            <div class="data-avatar">${(user?.name || 'U').charAt(0)}</div>
            <div class="data-info">
                <h4>${o.id}</h4>
                <p>${user?.name || 'Desconocido'} — ${new Date(o.date).toLocaleDateString('es-VE')}</p>
            </div>
            <div class="data-meta">
                <div class="amount">$${o.total.toFixed(2)}</div>
                <span class="badge ${o.status}">${o.status === 'pending' ? 'Pendiente' : 'Completado'}</span>
            </div>
        </div>`;
    }).join('') : '<p class="empty-state">Sin pedidos aun</p>';

    // Recent clients
    const recentUsers = users.slice(-5).reverse();
    document.getElementById('recentClients').innerHTML = recentUsers.length ? recentUsers.map(u => `
        <div class="data-row" onclick="showClientDetail('${u.id}')">
            <div class="data-avatar gold">${(u.name || 'U').charAt(0)}</div>
            <div class="data-info">
                <h4>${u.name || 'Sin nombre'}</h4>
                <p>${u.cedula || 'Sin cedula'} — ${u.phone || ''}</p>
            </div>
            <div class="data-meta">
                <span class="badge nivel">Nivel ${u.level || 1}</span>
            </div>
        </div>
    `).join('') : '<p class="empty-state">Sin clientes aun</p>';
}

// ============================================
// CLIENTS
// ============================================

function renderClients() {
    const users = getAllUsers();
    const q = document.getElementById('searchClients')?.value?.toLowerCase() || '';
    let filtered = users;

    if (q) {
        filtered = users.filter(u =>
            (u.name || '').toLowerCase().includes(q) ||
            (u.cedula || '').toLowerCase().includes(q) ||
            (u.phone || '').includes(q) ||
            (u.email || '').toLowerCase().includes(q)
        );
    }

    document.getElementById('clientsList').innerHTML = filtered.length ? filtered.map(u => `
        <div class="data-row" onclick="showClientDetail('${u.id}')">
            <div class="data-avatar ${u.verified !== false ? 'gold' : ''}" style="${u.verified === false ? 'opacity:0.5' : ''}">${(u.name || 'U').charAt(0)}</div>
            <div class="data-info">
                <h4>${u.name || 'Sin nombre'} ${u.verified === false ? '<span style="color:var(--red);font-size:0.75rem">&#9679; Sin verificar</span>' : ''}</h4>
                <p>${u.cedula || 'Sin cedula'} — ${u.phone || ''}</p>
                <p style="font-size:0.75rem;color:var(--text-muted)">&#128231; ${u.email || 'Sin email'} | &#128274; ${u.password || '***'}</p>
            </div>
            <div class="data-meta">
                <span class="badge nivel">Nivel ${u.level || 1}</span>
                <div class="date">${new Date(u.createdAt).toLocaleDateString('es-VE')}</div>
            </div>
            <button class="btn-icon btn-sm" onclick="event.stopPropagation(); deleteClient('${u.id}')" title="Eliminar">&#128465;</button>
        </div>
    `).join('') : '<p class="empty-state">No se encontraron clientes</p>';
}

function deleteClient(userId) {
    const users = getAllUsers();
    const u = users.find(us => us.id === userId);
    if (!u) return;
    if (!confirm('Eliminar a ' + (u.name || 'este cliente') + '? Podra registrarse de nuevo con los mismos datos.')) return;

    const allUsers = JSON.parse(localStorage.getItem('am_all_users')) || [];
    const filtered = allUsers.filter(us => us.id !== userId);
    localStorage.setItem('am_all_users', JSON.stringify(filtered));

    if (u.cedula) {
        const cedulas = JSON.parse(localStorage.getItem('am_cedulas')) || [];
        const cleaned = cedulas.filter(c => c !== u.cedula.trim().toUpperCase());
        localStorage.setItem('am_cedulas', JSON.stringify(cleaned));
    }

    const allOrders = JSON.parse(localStorage.getItem('am_all_orders')) || [];
    const cleanedOrders = allOrders.filter(o => o.userId !== userId);
    localStorage.setItem('am_all_orders', JSON.stringify(cleanedOrders));

    const allVault = JSON.parse(localStorage.getItem('am_payments_vault')) || [];
    const cleanedVault = allVault.filter(v => v.userId !== userId);
    localStorage.setItem('am_payments_vault', JSON.stringify(cleanedVault));

    const allPayments = JSON.parse(localStorage.getItem('am_payments')) || [];
    const cleanedPayments = allPayments.filter(p => p.userId !== userId);
    localStorage.setItem('am_payments', JSON.stringify(cleanedPayments));

    const cart = JSON.parse(localStorage.getItem('am_cart')) || [];
    const cleanedCart = cart.filter(c => c.userId !== userId);
    localStorage.setItem('am_cart', JSON.stringify(cleanedCart));

    const single = JSON.parse(localStorage.getItem('am_user'));
    if (single && single.id === userId) {
        localStorage.removeItem('am_user');
    }

    broadcastUpdate();
    renderClients();
    renderPendingVerifications();
    showToast('Cliente eliminado. Ya puede registrarse de nuevo.', 'success');
}

function openAddClientModal() {
    document.getElementById('addCliName').value = '';
    document.getElementById('addCliApellido').value = '';
    document.getElementById('addCliAge').value = '';
    document.getElementById('addCliCedula').value = '';
    document.getElementById('addCliPhone').value = '';
    document.getElementById('addCliEmail').value = '';
    document.getElementById('addCliPass').value = '';
    document.getElementById('addCliStreet').value = '';
    document.getElementById('addCliHouse').value = '';
    document.getElementById('addCliApartment').value = '';
    document.getElementById('addCliRef').value = '';
    document.getElementById('addCliLevel').value = '1';
    document.getElementById('addCliVerified').checked = true;
    document.getElementById('addClientModal').classList.add('active');
}

function closeAddClientModal() {
    document.getElementById('addClientModal').classList.remove('active');
}

function saveNewClient() {
    const name = document.getElementById('addCliName').value.trim();
    const apellido = document.getElementById('addCliApellido').value.trim();
    const age = document.getElementById('addCliAge').value.trim();
    const cedula = document.getElementById('addCliCedula').value.trim();
    const phone = document.getElementById('addCliPhone').value.trim();
    const email = document.getElementById('addCliEmail').value.trim();
    const pass = document.getElementById('addCliPass').value.trim();
    const street = document.getElementById('addCliStreet').value.trim();
    const house = document.getElementById('addCliHouse').value.trim();
    const apartment = document.getElementById('addCliApartment').value.trim();
    const ref = document.getElementById('addCliRef').value.trim();
    const level = parseInt(document.getElementById('addCliLevel').value) || 1;
    const verified = document.getElementById('addCliVerified').checked;

    if (!name || !apellido) { showToast('Nombre y apellido obligatorios', 'error'); return; }
    if (!cedula) { showToast('La cedula es obligatoria', 'error'); return; }
    if (!email) { showToast('El email es obligatorio', 'error'); return; }
    if (!pass || pass.length < 6) { showToast('Contrasena minimo 6 caracteres', 'error'); return; }

    const allUsers = JSON.parse(localStorage.getItem('am_all_users')) || [];
    const cedulaClean = cedula.trim().toUpperCase();
    if (allUsers.some(u => (u.cedula || '').trim().toUpperCase() === cedulaClean)) {
        showToast('Esta cedula ya esta registrada', 'error'); return;
    }
    if (allUsers.some(u => (u.email || '').toLowerCase() === email.toLowerCase())) {
        showToast('Este email ya esta registrado', 'error'); return;
    }

    const creditLines = { 1: 50, 2: 100, 3: 200 };
    const newUser = {
        id: 'user_' + Date.now(),
        name: name + ' ' + apellido,
        email,
        phone,
        cedula: cedulaClean,
        password: pass,
        age,
        street,
        house,
        apartment,
        ref,
        level,
        points: 0,
        creditLine: creditLines[level] || 50,
        creditUsed: 0,
        verified,
        createdAt: new Date().toISOString()
    };

    allUsers.push(newUser);
    localStorage.setItem('am_all_users', JSON.stringify(allUsers));

    const cedulas = JSON.parse(localStorage.getItem('am_cedulas')) || [];
    if (!cedulas.includes(cedulaClean)) {
        cedulas.push(cedulaClean);
        localStorage.setItem('am_cedulas', JSON.stringify(cedulas));
    }

    broadcastUpdate();
    closeAddClientModal();
    renderClients();
    showToast('Cliente creado exitosamente', 'success');
}

function showClientDetail(userId) {
    const users = getAllUsers();
    const u = users.find(us => us.id === userId);
    if (!u) return;

    const orders = getAllOrders().filter(o => o.userId === u.id);
    const verified = u.verified !== false;

    document.getElementById('clientDetail').innerHTML = `
        <div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap">
            <div style="text-align:center">
                <div style="width:80px;height:80px;background:var(--accent);color:var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:800;margin:0 auto 8px">${(u.name || 'U').charAt(0)}</div>
                <span class="badge nivel">Nivel ${u.level || 1}</span>
            </div>
            <div style="flex:1;min-width:200px">
                <h2 style="margin-bottom:4px">${u.name || 'Sin nombre'}</h2>
                <span class="badge ${verified ? 'confirmed' : 'rejected'}" style="margin-bottom:12px;display:inline-block">${verified ? 'Verificada' : 'Pendiente'}</span>
                <div class="vault-info">
                    <span>Cedula:</span><strong>${u.cedula || 'N/A'}</strong>
                    <span>Edad:</span><strong>${u.age ? u.age + ' anos' : 'N/A'}</strong>
                    <span>Telefono:</span><strong>${u.phone || 'N/A'}</strong>
                    <span>Email:</span><strong>${u.email || 'N/A'}</strong>
                    <span>Contrasena:</span><strong>${u.password || 'N/A'}</strong>
                    <span>Direccion:</span><strong>${u.street || 'N/A'} ${u.house || ''} ${u.apartment ? '- ' + u.apartment : ''}</strong>
                    <span>Referencia:</span><strong>${u.ref || 'N/A'}</strong>
                    <span>Registro:</span><strong>${new Date(u.createdAt).toLocaleDateString('es-VE')}</strong>
                    <span>Credito:</span><strong>$${(u.creditLine || 50).toFixed(2)}</strong>
                    <span>Usado:</span><strong>$${(u.creditUsed || 0).toFixed(2)}</strong>
                    <span>Puntos:</span><strong>${u.points || 0}</strong>
                </div>
            </div>
        </div>
        ${u.cedulaPhoto ? `
        <div style="margin-top:16px">
            <label style="font-size:0.8rem;font-weight:600;color:var(--text-sec);display:block;margin-bottom:8px">Foto de Cedula</label>
            <img src="${u.cedulaPhoto}" style="max-height:200px;border-radius:8px;border:1px solid var(--border);cursor:pointer" onclick="previewImage(this.src)">
        </div>` : ''}
        ${u.location ? `
        <div style="margin-top:16px">
            <label style="font-size:0.8rem;font-weight:600;color:var(--text-sec);display:block;margin-bottom:8px">Ubicacion del dispositivo</label>
            <p style="font-size:0.9rem">Lat: ${u.location.lat?.toFixed(6)}, Lng: ${u.location.lng?.toFixed(6)}</p>
            <a href="https://www.google.com/maps?q=${u.location.lat},${u.location.lng}" target="_blank" style="color:var(--blue);font-size:0.85rem">Ver en Google Maps</a>
        </div>` : ''}
        <div style="margin-top:16px">
            <label style="font-size:0.8rem;font-weight:600;color:var(--text-sec);display:block;margin-bottom:8px">Pedidos (${orders.length})</label>
            ${orders.length ? orders.map(o => `
                <div style="padding:8px 0;border-bottom:1px solid var(--border);font-size:0.85rem">
                    <strong>${o.id}</strong> — $${o.total.toFixed(2)} — <span class="badge ${o.status}">${o.status}</span> — ${new Date(o.date).toLocaleDateString('es-VE')}
                </div>
            `).join('') : '<p style="color:var(--text-muted);font-size:0.85rem">Sin pedidos</p>'}
        </div>
    `;
    document.getElementById('clientModal').classList.add('active');

    const isVerified = u.verified !== false;
    document.getElementById('clientActions').innerHTML = `
        <button class="btn-danger" onclick="deleteClient('${u.id}'); closeClientModal();">Eliminar</button>
        <button class="btn-outline" onclick="closeClientModal()">Cerrar</button>
        <button class="${isVerified ? 'btn-danger' : 'btn-success'}" onclick="verifyUser('${u.id}', ${!isVerified}); closeClientModal();">${isVerified ? 'Desaprobar' : 'Aprobar Cuenta'}</button>
    `;
}

function closeClientModal() {
    document.getElementById('clientModal').classList.remove('active');
}

// ============================================
// VAULT (Boveda de Pagos)
// ============================================

function renderVault() {
    const payments = JSON.parse(localStorage.getItem('am_payments_vault')) || [];
    const orders = getAllOrders();
    const users = getAllUsers();
    const q = document.getElementById('searchVault')?.value?.toLowerCase() || '';
    const filter = document.getElementById('filterVault')?.value || 'all';

    let allEntries = [];

    payments.forEach(p => {
        const order = orders.find(o => o.id === p.orderId);
        const user = users.find(u => u.id === p.userId);
        allEntries.push({
            ...p,
            type: 'payment',
            orderTotal: order?.total || 0,
            userName: user?.name || 'Desconocido',
            userCedula: user?.cedula || '',
            bcvRate: p.bcvRate || null
        });
    });

    orders.forEach(o => {
        if (o.paymentCapture || o.paymentRef) {
            const user = users.find(u => u.id === o.userId);
            if (!allEntries.find(e => e.orderId === o.id)) {
                allEntries.push({
                    type: 'capture',
                    orderId: o.id,
                    userId: o.userId,
                    capture: o.paymentCapture,
                    reference: o.paymentRef || '',
                    amount: o.paymentAmount || o.plan?.initial || 0,
                    status: o.paymentStatus || 'pending',
                    date: o.date,
                    orderTotal: o.total,
                    userName: user?.name || 'Desconocido',
                    userCedula: user?.cedula || '',
                    bcvRate: o.bcvRate || null
                });
            }
        }
    });

    allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (q) {
        allEntries = allEntries.filter(e =>
            e.userName.toLowerCase().includes(q) ||
            (e.reference || '').toLowerCase().includes(q) ||
            (e.orderId || '').toLowerCase().includes(q) ||
            (e.userCedula || '').toLowerCase().includes(q)
        );
    }

    if (filter !== 'all') {
        allEntries = allEntries.filter(e => e.status === filter);
    }

    document.getElementById('vaultList').innerHTML = allEntries.length ? allEntries.map((e, i) => `
        <div class="vault-card" onclick="showPaymentDetail(${i})" data-idx="${i}">
            <div class="vault-header">
                <h4>${e.orderId || 'N/A'}</h4>
                <span class="badge ${e.status || 'pending'}">${statusText(e.status)}</span>
            </div>
            <div class="vault-info">
                <span>Cliente:</span><strong>${e.userName}</strong>
                <span>Cedula:</span><strong>${e.userCedula || 'N/A'}</strong>
                <span>Monto:</span><strong>$${(e.amount || 0).toFixed(2)}</strong>
                <span>Referencia:</span><strong>${e.reference || 'Sin referencia'}</strong>
                <span>Fecha:</span><strong>${new Date(e.date).toLocaleDateString('es-VE')}</strong>
                <span>Total pedido:</span><strong>$${(e.orderTotal || 0).toFixed(2)}</strong>
                <span>Tasa BCV:</span><strong>${e.bcvRate ? e.bcvRate.toFixed(2) : 'N/A'}</strong>
            </div>
            ${e.capture ? `<img src="${e.capture}" class="vault-capture" onclick="event.stopPropagation();previewImage(this.src)">` : '<p style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:12px">Sin capture adjunto</p>'}
        </div>
    `).join('') : '<p class="empty-state">No hay pagos en la boveda</p>';

    window._vaultEntries = allEntries;
}

function showPaymentDetail(idx) {
    const e = window._vaultEntries?.[idx];
    if (!e) return;

    document.getElementById('paymentDetail').innerHTML = `
        <div class="vault-info" style="margin-bottom:16px">
            <span>Pedido:</span><strong>${e.orderId || 'N/A'}</strong>
            <span>Cliente:</span><strong>${e.userName}</strong>
            <span>Cedula:</span><strong>${e.userCedula || 'N/A'}</strong>
            <span>Monto inicial:</span><strong>$${(e.amount || 0).toFixed(2)}</strong>
            <span>Total pedido:</span><strong>$${(e.orderTotal || 0).toFixed(2)}</strong>
            <span>Referencia:</span><strong>${e.reference || 'Sin referencia'}</strong>
            <span>Fecha:</span><strong>${new Date(e.date).toLocaleString('es-VE')}</strong>
        </div>
        ${e.capture ? `<img src="${e.capture}" style="max-width:100%;max-height:400px;border-radius:8px;cursor:pointer;display:block;margin:0 auto" onclick="previewImage(this.src)">` : '<p style="text-align:center;color:var(--text-muted);padding:20px">Sin capture adjunto</p>'}
    `;

    document.getElementById('paymentActions').innerHTML = `
        <button class="btn-outline" onclick="closePaymentModal()">Cerrar</button>
        <button class="btn-success" onclick="confirmPayment('${e.orderId}')">Confirmar Pago</button>
        <button class="btn-danger" onclick="rejectPayment('${e.orderId}')">Rechazar</button>
    `;

    document.getElementById('paymentModal').classList.add('active');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('active');
}

function confirmPayment(orderId) {
    const orders = getAllOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx >= 0) {
        orders[idx].status = 'completed';
        orders[idx].paymentStatus = 'confirmed';
        localStorage.setItem('am_orders', JSON.stringify(orders));
    }

    const payments = JSON.parse(localStorage.getItem('am_payments_vault')) || [];
    const pi = payments.findIndex(p => p.orderId === orderId);
    if (pi >= 0) {
        payments[pi].status = 'confirmed';
    } else {
        payments.push({ orderId, status: 'confirmed', date: new Date().toISOString() });
    }
    localStorage.setItem('am_payments_vault', JSON.stringify(payments));

    saveAdminData();
    closePaymentModal();
    renderVault();
    showToast('Pago confirmado', 'success');
}

function rejectPayment(orderId) {
    const payments = JSON.parse(localStorage.getItem('am_payments_vault')) || [];
    const pi = payments.findIndex(p => p.orderId === orderId);
    if (pi >= 0) {
        payments[pi].status = 'rejected';
    } else {
        payments.push({ orderId, status: 'rejected', date: new Date().toISOString() });
    }
    localStorage.setItem('am_payments_vault', JSON.stringify(payments));

    const orders = getAllOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx >= 0) {
        orders[idx].paymentStatus = 'rejected';
        localStorage.setItem('am_orders', JSON.stringify(orders));
    }

    saveAdminData();
    closePaymentModal();
    renderVault();
    showToast('Pago rechazado', 'error');
}

// ============================================
// ORDERS
// ============================================

function renderOrders() {
    const orders = getAllOrders();
    const users = getAllUsers();
    const q = document.getElementById('searchOrders')?.value?.toLowerCase() || '';
    const filter = document.getElementById('filterOrders')?.value || 'all';

    let filtered = orders;
    if (filter !== 'all') filtered = orders.filter(o => o.status === filter);
    if (q) {
        filtered = filtered.filter(o => {
            const user = users.find(u => u.id === o.userId);
            return o.id.toLowerCase().includes(q) ||
                (user?.name || '').toLowerCase().includes(q) ||
                (user?.cedula || '').toLowerCase().includes(q);
        });
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    document.getElementById('ordersList').innerHTML = filtered.length ? filtered.map(o => {
        const user = users.find(u => u.id === o.userId);
        return `<div class="data-row" onclick="showOrderDetail('${o.id}')">
            <div class="data-avatar">${(user?.name || 'U').charAt(0)}</div>
            <div class="data-info">
                <h4>${o.id}</h4>
                <p>${user?.name || 'Desconocido'} — ${user?.cedula || ''}</p>
            </div>
            <div class="data-meta">
                <div class="amount">$${o.total.toFixed(2)}</div>
                <span class="badge ${o.status}">${o.status === 'pending' ? 'Pendiente' : 'Completado'}</span>
            </div>
        </div>`;
    }).join('') : '<p class="empty-state">No se encontraron pedidos</p>';
}

function showOrderDetail(orderId) {
    const orders = getAllOrders();
    const users = getAllUsers();
    const o = orders.find(or => or.id === orderId);
    if (!o) return;

    const user = users.find(u => u.id === o.userId);
    const items = (o.items || []).map(c => {
        const products = JSON.parse(localStorage.getItem('am_products_override')) || (typeof AZOMEDI_PRODUCTS !== 'undefined' ? AZOMEDI_PRODUCTS : []);
        const p = products.find(pr => pr.id === c.id);
        return p ? `${p.name} x${c.qty} — $${(p.price * c.qty).toFixed(2)}` : `Producto ${c.id} x${c.qty}`;
    }).join('<br>');

    document.getElementById('paymentDetail').innerHTML = `
        <div class="vault-info" style="margin-bottom:16px">
            <span>Pedido:</span><strong>${o.id}</strong>
            <span>Estado:</span><span class="badge ${o.status}">${o.status}</span>
            <span>Fecha:</span><strong>${new Date(o.date).toLocaleString('es-VE')}</strong>
            <span>Total:</span><strong>$${o.total.toFixed(2)}</strong>
        </div>
        <div style="margin-bottom:16px">
            <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:6px">Cliente</label>
            <p>${user?.name || 'N/A'} — ${user?.cedula || ''} — ${user?.phone || ''}</p>
        </div>
        <div style="margin-bottom:16px">
            <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:6px">Productos</label>
            <p style="line-height:1.8">${items}</p>
        </div>
        ${o.plan ? `
        <div>
            <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:6px">Plan de Pago</label>
            <p>Inicial: $${(o.plan.initial || 0).toFixed(2)} — Cuotas: ${o.plan.installments || 0} x $${(o.plan.cuota || 0).toFixed(2)}</p>
        </div>` : ''}
    `;

    document.getElementById('paymentActions').innerHTML = `
        <button class="btn-outline" onclick="closePaymentModal()">Cerrar</button>
        <button class="btn-success" onclick="completeOrder('${o.id}')">Marcar Completado</button>
    `;

    document.getElementById('paymentModal').classList.add('active');
}

function completeOrder(orderId) {
    const orders = getAllOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx >= 0) {
        orders[idx].status = 'completed';
        localStorage.setItem('am_orders', JSON.stringify(orders));
        saveAdminData();
    }
    closePaymentModal();
    renderOrders();
    showToast('Pedido completado', 'success');
}

// ============================================
// PRODUCTS
// ============================================

function getProducts() {
    const override = JSON.parse(localStorage.getItem('am_products_override'));
    if (override && override.length > 0) return override;
    return (typeof AZOMEDI_PRODUCTS !== 'undefined') ? [...AZOMEDI_PRODUCTS] : [];
}

function renderProducts() {
    const products = getProducts();
    const q = document.getElementById('searchProducts')?.value?.toLowerCase() || '';
    let filtered = products;

    if (q) {
        filtered = products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            (p.category || '').toLowerCase().includes(q)
        );
    }

    document.getElementById('productsList').innerHTML = filtered.map(p => `
        <div class="prod-row">
            <img src="${p.image}" class="prod-img" onerror="this.style.display='none'">
            <div class="prod-info">
                <h4>${p.name}</h4>
                <p>$${p.price.toFixed(2)} — Stock: ${p.stock} — ${p.category || 'Sin categoria'}</p>
            </div>
            <div class="prod-actions">
                <button class="btn-icon btn-sm" onclick="editProduct('${p.id}')">✏️</button>
                <button class="btn-icon btn-sm" onclick="deleteProduct('${p.id}')">🗑️</button>
            </div>
        </div>
    `).join('') || '<p class="empty-state">No se encontraron productos</p>';
}

function openProductModal(id) {
    document.getElementById('editProductId').value = '';
    document.getElementById('modalTitle').textContent = 'Agregar Producto';
    document.getElementById('prodName').value = '';
    document.getElementById('prodPrice').value = '';
    document.getElementById('prodStock').value = '';
    document.getElementById('prodCategory').value = '';
    document.getElementById('prodImage').value = '';
    document.getElementById('prodDesc').value = '';
    document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function editProduct(id) {
    const products = getProducts();
    const p = products.find(pr => pr.id === id);
    if (!p) return;

    document.getElementById('editProductId').value = p.id;
    document.getElementById('modalTitle').textContent = 'Editar Producto';
    document.getElementById('prodName').value = p.name;
    document.getElementById('prodPrice').value = p.price;
    document.getElementById('prodStock').value = p.stock;
    document.getElementById('prodCategory').value = p.category || '';
    document.getElementById('prodImage').value = p.image || '';
    document.getElementById('prodDesc').value = p.description || '';
    document.getElementById('productModal').classList.add('active');
}

function saveProduct() {
    const editId = document.getElementById('editProductId').value;
    const name = document.getElementById('prodName').value.trim();
    const price = parseFloat(document.getElementById('prodPrice').value);
    const stock = parseInt(document.getElementById('prodStock').value) || 0;
    const category = document.getElementById('prodCategory').value.trim();
    const image = document.getElementById('prodImage').value.trim();
    const description = document.getElementById('prodDesc').value.trim();

    if (!name || isNaN(price)) { showToast('Nombre y precio son obligatorios', 'error'); return; }

    let products = getProducts();

    if (editId) {
        const idx = products.findIndex(p => p.id === editId);
        if (idx >= 0) {
            products[idx] = { ...products[idx], name, price, stock, category, image, description };
        }
    } else {
        products.push({
            id: 'prod_' + Date.now(),
            name, price, stock, category, image, description
        });
    }

    localStorage.setItem('am_products_override', JSON.stringify(products));
    saveAdminData();
    closeProductModal();
    renderProducts();
    showToast(editId ? 'Producto actualizado' : 'Producto agregado', 'success');
}

function deleteProduct(id) {
    if (!confirm('Eliminar este producto?')) return;
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem('am_products_override', JSON.stringify(products));
    saveAdminData();
    renderProducts();
    showToast('Producto eliminado', 'success');
}

// ============================================
// SETTINGS
// ============================================

function renderSettings() {
    const s = adminData.settings;
    document.getElementById('settBrandName').value = s.brandName || 'Azo Medi';
    document.getElementById('settPrimary').value = s.primary || '#1A2732';
    document.getElementById('settPrimaryHex').value = s.primary || '#1A2732';
    document.getElementById('settAccent').value = s.accent || '#FED74D';
    document.getElementById('settAccentHex').value = s.accent || '#FED74D';
    document.getElementById('settBg').value = s.bg || '#F5F7FA';
    document.getElementById('settBgHex').value = s.bg || '#F5F7FA';
    document.getElementById('settCreditInit').value = s.creditInit || 50;
    document.getElementById('settPct1').value = s.pct1 || 40;
    document.getElementById('settPct2').value = s.pct2 || 30;
    document.getElementById('settPct3').value = s.pct3 || 20;
    document.getElementById('settTasa').value = s.tasa || 36.5;
    renderPaymentMethods();
    renderPendingVerifications();
}

function syncColor(pickerId, val) {
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
        document.getElementById(pickerId).value = val;
    }
}

function saveSettings() {
    adminData.settings.brandName = document.getElementById('settBrandName').value.trim();
    adminData.settings.primary = document.getElementById('settPrimary').value;
    adminData.settings.accent = document.getElementById('settAccent').value;
    adminData.settings.bg = document.getElementById('settBg').value;
    saveAdminData();
    applyBrandSettings();
    showToast('Marca y colores actualizados', 'success');
}

function saveFinancing() {
    adminData.settings.creditInit = parseFloat(document.getElementById('settCreditInit').value) || 50;
    adminData.settings.pct1 = parseFloat(document.getElementById('settPct1').value) || 40;
    adminData.settings.pct2 = parseFloat(document.getElementById('settPct2').value) || 30;
    adminData.settings.pct3 = parseFloat(document.getElementById('settPct3').value) || 20;
    adminData.settings.tasa = parseFloat(document.getElementById('settTasa').value) || 36.5;
    localStorage.setItem('am_settings', JSON.stringify(adminData.settings));
    broadcastUpdate();
    showToast('Financiamiento actualizado', 'success');
}

function savePaymentInfo() {
    adminData.settings.bank = document.getElementById('settBank').value.trim();
    adminData.settings.rif = document.getElementById('settRif').value.trim();
    adminData.settings.payPhone = document.getElementById('settPayPhone').value.trim();
    adminData.settings.whatsapp = document.getElementById('settWhatsApp').value.trim();
    localStorage.setItem('am_settings', JSON.stringify(adminData.settings));
    broadcastUpdate();
    showToast('Datos de pago actualizados', 'success');
}

// ============================================
// PAYMENT METHODS MANAGEMENT
// ============================================

function getPaymentMethods() {
    return JSON.parse(localStorage.getItem('am_payment_methods')) || [
        { id: 'pm_1', name: 'Pago Movil', type: 'pago_movil', icon: '📱', bank: 'Banco de Venezuela', account: 'J-XXXXXXXX-X', phone: '0412-7232760', instructions: 'Solo digitos en la referencia', active: true },
        { id: 'pm_2', name: 'Transferencia Bancaria', type: 'transferencia', icon: '🏦', bank: 'Banco de Venezuela', account: 'J-XXXXXXXX-X', phone: '0412-7232760', instructions: 'Transferencia directa', active: true },
        { id: 'pm_3', name: 'Efectivo (USD)', type: 'efectivo', icon: '💵', bank: '', account: '', phone: '', instructions: 'Pago en efectivo en punto de venta', active: true }
    ];
}

function renderPaymentMethods() {
    const methods = getPaymentMethods();
    document.getElementById('paymentMethodsList').innerHTML = methods.length ? methods.map(m => `
        <div class="data-row">
            <div class="data-avatar" style="background:${m.active ? 'var(--success)' : 'var(--text-muted)'};font-size:1.3rem">${m.icon || '💳'}</div>
            <div class="data-info">
                <h4>${m.name}</h4>
                <p>${m.bank || 'Sin banco'} — ${m.account || m.phone || 'Sin datos'}</p>
            </div>
            <div class="data-meta">
                <span class="badge ${m.active ? 'confirmed' : 'rejected'}">${m.active ? 'Activo' : 'Inactivo'}</span>
            </div>
            <div class="prod-actions">
                <button class="btn-icon btn-sm" onclick="editPaymentMethod('${m.id}')">✏️</button>
                <button class="btn-icon btn-sm" onclick="deletePaymentMethod('${m.id}')">🗑️</button>
            </div>
        </div>
    `).join('') : '<p class="empty-state">No hay metodos de pago configurados</p>';
}

function openPaymentMethodModal(id) {
    document.getElementById('editPmId').value = '';
    document.getElementById('pmModalTitle').textContent = 'Agregar Metodo de Pago';
    document.getElementById('pmName').value = '';
    document.getElementById('pmType').value = 'pago_movil';
    document.getElementById('pmIcon').value = '';
    document.getElementById('pmBank').value = '';
    document.getElementById('pmAccount').value = '';
    document.getElementById('pmPhone').value = '';
    document.getElementById('pmInstructions').value = '';
    document.getElementById('pmActive').checked = true;
    document.getElementById('paymentMethodModal').classList.add('active');
}

function closePaymentMethodModal() {
    document.getElementById('paymentMethodModal').classList.remove('active');
}

function editPaymentMethod(id) {
    const methods = getPaymentMethods();
    const m = methods.find(pm => pm.id === id);
    if (!m) return;
    document.getElementById('editPmId').value = m.id;
    document.getElementById('pmModalTitle').textContent = 'Editar Metodo de Pago';
    document.getElementById('pmName').value = m.name;
    document.getElementById('pmType').value = m.type;
    document.getElementById('pmIcon').value = m.icon;
    document.getElementById('pmBank').value = m.bank;
    document.getElementById('pmAccount').value = m.account;
    document.getElementById('pmPhone').value = m.phone;
    document.getElementById('pmInstructions').value = m.instructions;
    document.getElementById('pmActive').checked = m.active;
    document.getElementById('paymentMethodModal').classList.add('active');
}

function savePaymentMethod() {
    const editId = document.getElementById('editPmId').value;
    const name = document.getElementById('pmName').value.trim();
    const type = document.getElementById('pmType').value;
    const icon = document.getElementById('pmIcon').value.trim() || '💳';
    const bank = document.getElementById('pmBank').value.trim();
    const account = document.getElementById('pmAccount').value.trim();
    const phone = document.getElementById('pmPhone').value.trim();
    const instructions = document.getElementById('pmInstructions').value.trim();
    const active = document.getElementById('pmActive').checked;

    if (!name) { showToast('El nombre es obligatorio', 'error'); return; }

    let methods = getPaymentMethods();
    if (editId) {
        const idx = methods.findIndex(m => m.id === editId);
        if (idx >= 0) methods[idx] = { ...methods[idx], name, type, icon, bank, account, phone, instructions, active };
    } else {
        methods.push({ id: 'pm_' + Date.now(), name, type, icon, bank, account, phone, instructions, active });
    }

    localStorage.setItem('am_payment_methods', JSON.stringify(methods));
    broadcastUpdate();
    closePaymentMethodModal();
    renderPaymentMethods();
    showToast(editId ? 'Metodo actualizado' : 'Metodo agregado', 'success');
}

function deletePaymentMethod(id) {
    if (!confirm('Eliminar este metodo de pago?')) return;
    let methods = getPaymentMethods();
    methods = methods.filter(m => m.id !== id);
    localStorage.setItem('am_payment_methods', JSON.stringify(methods));
    broadcastUpdate();
    renderPaymentMethods();
    showToast('Metodo eliminado', 'success');
}

// ============================================
// ACCOUNT VERIFICATION
// ============================================

function renderPendingVerifications() {
    const users = getAllUsers();
    const pending = users.filter(u => u.verified === false || u.verified === undefined);

    document.getElementById('pendingVerifications').innerHTML = pending.length ? pending.map(u => `
        <div class="data-row">
            <div class="data-avatar gold">${(u.name || 'U').charAt(0)}</div>
            <div class="data-info">
                <h4>${u.name || 'Sin nombre'}</h4>
                <p>${u.cedula || 'Sin cedula'} — ${u.phone || ''}</p>
                <p style="font-size:0.75rem;color:var(--text-muted)">Registro: ${new Date(u.createdAt).toLocaleDateString('es-VE')}</p>
            </div>
            <div class="prod-actions">
                <button class="btn-success btn-sm" onclick="verifyUser('${u.id}', true)" title="Aprobar">✓</button>
                <button class="btn-danger btn-sm" onclick="verifyUser('${u.id}', false)" title="Rechazar">✕</button>
                <button class="btn-icon btn-sm" onclick="showClientDetail('${u.id}')">👁️</button>
            </div>
        </div>
    `).join('') : '<p class="empty-state">Todas las cuentas estan verificadas</p>';
}

function verifyUser(userId, approved) {
    const allUsers = JSON.parse(localStorage.getItem('am_all_users')) || [];
    const single = JSON.parse(localStorage.getItem('am_user'));

    const action = approved ? 'aprobar' : 'rechazar';
    if (!confirm(`¿${action.charAt(0).toUpperCase() + action.slice(1)} esta cuenta?`)) return;

    if (single && single.id === userId) {
        single.verified = approved;
        localStorage.setItem('am_user', JSON.stringify(single));
    }

    const idx = allUsers.findIndex(u => u.id === userId);
    if (idx >= 0) {
        allUsers[idx].verified = approved;
        localStorage.setItem('am_all_users', JSON.stringify(allUsers));
    }

    broadcastUpdate();
    renderPendingVerifications();
    renderClients();
    showToast(approved ? 'Cuenta aprobada' : 'Cuenta rechazada', approved ? 'success' : 'error');
}

function applyBrandSettings() {
    const s = adminData.settings;
    document.documentElement.style.setProperty('--primary', s.primary);
    document.documentElement.style.setProperty('--accent', s.accent);
    document.documentElement.style.setProperty('--bg', s.bg);
    document.querySelector('.sidebar').style.background = s.primary;
    document.querySelector('.sidebar-logo').style.background = s.accent;
    document.querySelector('.sidebar-logo').style.color = s.primary;
    
    const bcvEl = document.getElementById('adminBcvRate');
    if (bcvEl) bcvEl.textContent = (s.tasa || 36.5).toFixed(2);
}

// ============================================
// UTILITIES
// ============================================

function getAllUsers() {
    const raw = localStorage.getItem('am_all_users');
    if (raw) return JSON.parse(raw);
    const single = localStorage.getItem('am_user');
    return single ? [JSON.parse(single)] : [];
}

function getAllOrders() {
    const raw = localStorage.getItem('am_all_orders');
    if (raw) return JSON.parse(raw);
    const single = localStorage.getItem('am_orders');
    return single ? JSON.parse(single) : [];
}

function statusText(s) {
    return { pending: 'Pendiente', confirmed: 'Confirmado', rejected: 'Rechazado', completed: 'Completado', paid: 'Pagado' }[s] || s || 'Pendiente';
}

function previewImage(src) {
    let overlay = document.querySelector('.img-preview-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'img-preview-overlay';
        overlay.innerHTML = '<img>';
        overlay.onclick = () => overlay.classList.remove('active');
        document.body.appendChild(overlay);
    }
    overlay.querySelector('img').src = src;
    overlay.classList.add('active');
}

function exportData() {
    const data = {
        users: getAllUsers(),
        orders: getAllOrders(),
        payments: adminData.payments,
        settings: adminData.settings,
        exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'azo-medi-export-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Datos exportados', 'success');
}

function showToast(msg, type) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast ' + (type || 'info');
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(-10px)'; }, 2500);
    setTimeout(() => toast.remove(), 3000);
}

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadAllData();
    applyBrandSettings();
    renderDashboard();
    fetchAdminTasaBCV();
    setInterval(updateSyncStatus, 30000);
    setInterval(fetchAdminTasaBCV, 30 * 60 * 1000);
});

async function fetchAdminTasaBCV() {
    try {
        const res = await fetch('https://ve.dolarapi.com/v1/dolares', { cache: 'no-cache' });
        if (res.ok) {
            const data = await res.json();
            const oficial = data.find(d => d.fuente === 'oficial');
            if (oficial && oficial.promedio) {
                adminData.settings.tasa = oficial.promedio;
                localStorage.setItem('am_settings', JSON.stringify(adminData.settings));
                const el = document.getElementById('adminBcvRate');
                if (el) el.textContent = oficial.promedio.toFixed(2);
                const input = document.getElementById('settTasa');
                if (input) input.value = oficial.promedio.toFixed(1);
                const dateEl = document.getElementById('bcvAdminDate');
                if (dateEl) dateEl.textContent = oficial.fechaActualizacion ? new Date(oficial.fechaActualizacion).toLocaleString('es-VE') : new Date().toLocaleTimeString('es-VE');
                broadcastUpdate();
                return;
            }
        }
    } catch(e) {}

    try {
        const res = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://bcv.today/api/v1/rate.json'), { cache: 'no-cache' });
        if (res.ok) {
            const data = await res.json();
            if (data.USD && data.USD > 1) {
                adminData.settings.tasa = data.USD;
                localStorage.setItem('am_settings', JSON.stringify(adminData.settings));
                const el = document.getElementById('adminBcvRate');
                if (el) el.textContent = data.USD.toFixed(2);
                const input = document.getElementById('settTasa');
                if (input) input.value = data.USD.toFixed(1);
                const dateEl = document.getElementById('bcvAdminDate');
                if (dateEl) dateEl.textContent = data.date || data.effective_date || new Date().toLocaleTimeString('es-VE');
                broadcastUpdate();
            }
        }
    } catch(e) {}
}
