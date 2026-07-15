// ============================================
// ControlPro - Sistema Profesional de Deudas
// ============================================

// Estado global
const PRODUCTOS_AZO_MEDI = [
    { id: '96f6c786-6598-5b6b-8389-6c927eace6d6', codigo: 'AZO001', nombre: '4 en 1', descripcion: '', precioUSD: 13, stock: 0, categoria: 'Suplementos' },
    { id: '7e1c6556-b272-53a6-801b-6841d80b333a', codigo: 'AZO002', nombre: 'Aceite (Glicerina)', descripcion: '', precioUSD: 5, stock: 4, categoria: 'Aceites cosméticos' },
    { id: 'f590890e-9fff-554c-a355-c0f7e219393c', codigo: 'AZO003', nombre: 'Aceite de Coco 60 ml', descripcion: '', precioUSD: 5, stock: 1, categoria: 'Aceites cosméticos' },
    { id: 'ad4bc66b-ddbf-5fdb-9b6c-1dafe04fc8d7', codigo: 'AZO004', nombre: 'Aceite de Ricino 60 ml', descripcion: '', precioUSD: 5, stock: 0, categoria: 'Aceites cosméticos' },
    { id: '92c2107c-b530-594f-b11b-cd55120dc105', codigo: 'AZO005', nombre: 'Aceite Mineral', descripcion: '', precioUSD: 4, stock: 5, categoria: 'Aceites cosméticos' },
    { id: 'c039696e-3ff4-55b0-9d0f-b13a6797fed9', codigo: 'AZO006', nombre: 'Ácido Fólico', descripcion: '', precioUSD: 13, stock: 1, categoria: 'Suplementos' },
    { id: 'd2f7ebd2-da2d-5128-9a77-0df3b14693c1', codigo: 'AZO007', nombre: 'Alcachofa', descripcion: '', precioUSD: 10, stock: 0, categoria: 'Suplementos' },
    { id: '2e64fd7b-454f-585d-9f88-e18fe5f466c9', codigo: 'AZO008', nombre: 'Arándano Rojo', descripcion: '', precioUSD: 13, stock: 1, categoria: 'Suplementos' },
    { id: 'a25d1fc4-64dd-5658-af13-f8a960f4bc31', codigo: 'AZO009', nombre: 'Artiflex Advantage (Articulaciones)', descripcion: '', precioUSD: 17, stock: 0, categoria: 'Suplementos' },
    { id: '8c10739f-51cf-5cc9-94d6-f2d27be8205d', codigo: 'AZO010', nombre: 'Ashwagandha', descripcion: '', precioUSD: 14, stock: 2, categoria: 'Suplementos' },
    { id: '0fc6a0aa-1f00-565b-961e-970df8f5504d', codigo: 'AZO011', nombre: 'Biotina', descripcion: '', precioUSD: 13, stock: 3, categoria: 'Suplementos' },
    { id: 'a7170df5-2ce6-5211-ad36-00b1e5d76949', codigo: 'AZO012', nombre: 'Cardo Lechoso', descripcion: '', precioUSD: 10, stock: 1, categoria: 'Suplementos' },
    { id: '105dfdfb-3207-594e-a058-980c6cae87e5', codigo: 'AZO013', nombre: 'Cartílago + Uña de gato', descripcion: '', precioUSD: 13, stock: 1, categoria: 'Suplementos' },
    { id: 'ae4e333c-322c-57e5-aa3f-27c4585066ae', codigo: 'AZO014', nombre: 'Cartílago de Tiburón', descripcion: '', precioUSD: 13, stock: 0, categoria: 'Suplementos' },
    { id: '652c2f1b-ceed-5fd1-bbc6-c12ff9fc5100', codigo: 'AZO015', nombre: 'Cáscara Sagrada', descripcion: '', precioUSD: 13, stock: 1, categoria: 'Suplementos' },
    { id: '0024e673-7e62-5e84-838a-4a1e8c519e2c', codigo: 'AZO016', nombre: 'Cáscara sagradaa', descripcion: '', precioUSD: 10, stock: 0, categoria: 'Suplementos' },
    { id: '1cd12179-11ac-5dfb-af19-6c0b1c11f9ff', codigo: 'AZO017', nombre: 'Castaña de indias', descripcion: '', precioUSD: 10, stock: 1, categoria: 'Suplementos' },
    { id: '8435a000-3cc2-562e-9c63-d3cce24c7379', codigo: 'AZO018', nombre: 'Centella Asiática', descripcion: '', precioUSD: 10, stock: 1, categoria: 'Suplementos' },
    { id: 'e7898518-7220-589a-bc42-ea87fac16548', codigo: 'AZO019', nombre: 'Centella asiática.', descripcion: '', precioUSD: 13, stock: 2, categoria: 'Suplementos' },
    { id: 'db212312-3a1a-52de-82d2-833f421b5cfd', codigo: 'AZO020', nombre: 'Centrunex Man', descripcion: '', precioUSD: 14, stock: 2, categoria: 'Suplementos' },
    { id: 'c305b8da-f41c-59c5-82ed-e355ff9dcb8d', codigo: 'AZO021', nombre: 'Centrunex Silver', descripcion: '', precioUSD: 14, stock: 1, categoria: 'Suplementos' },
    { id: '2e6d2d0b-e50f-54b5-8ab7-da072e2d4178', codigo: 'AZO022', nombre: 'Centrunex Woman', descripcion: '', precioUSD: 14, stock: 1, categoria: 'Suplementos' },
    { id: 'e04e5dfa-4522-595f-9df3-af289837722c', codigo: 'AZO023', nombre: 'Cerebron Plus', descripcion: '', precioUSD: 10, stock: 1, categoria: 'Suplementos' },
    { id: '66b8a565-fd29-5923-8dd3-fa95fd4a8314', codigo: 'AZO024', nombre: 'Circuvida', descripcion: '', precioUSD: 10, stock: 1, categoria: 'Suplementos' },
    { id: '07f8f383-bacb-5e0b-8625-892148e0a5a6', codigo: 'AZO025', nombre: 'Citrato de magnesio', descripcion: '', precioUSD: 10, stock: 2, categoria: 'Suplementos' },
    { id: 'fd58d1cb-a36b-512a-9a48-5fb197322dfb', codigo: 'AZO026', nombre: 'Citrato de potasio', descripcion: '', precioUSD: 10, stock: 2, categoria: 'Suplementos' },
    { id: 'd777da1d-c7fa-58fd-b4ff-3a6d9175bc42', codigo: 'AZO027', nombre: 'Cloruro de magnesio', descripcion: '', precioUSD: 4, stock: 4, categoria: 'Bebidas-Depurativos-Polvos' },
    { id: 'cc4fceba-6867-5eff-9aa0-94e10fbfe795', codigo: 'AZO028', nombre: 'Colágeno', descripcion: '', precioUSD: 13, stock: 1, categoria: 'Suplementos' },
    { id: 'b7e956c3-cb35-57f1-8d88-9497254aef04', codigo: 'AZO029', nombre: 'Colágeno con elastina + vitamina E y C', descripcion: '', precioUSD: 13, stock: 2, categoria: 'Suplementos' },
    { id: '76594519-5bdc-5e27-8e9a-048a1009c9ff', codigo: 'AZO030', nombre: 'Colágeno con Vitamina C', descripcion: '', precioUSD: 13, stock: 0, categoria: 'Suplementos' },
    { id: 'b9bf80b4-08fb-5e14-84a4-9bb1ba7ce29f', codigo: 'AZO031', nombre: 'Colágeno hidrolizado en polvo', descripcion: '', precioUSD: 35, stock: 1, categoria: 'Bebidas-Depurativos-Polvos' },
    { id: '54d0e4d8-5763-50fa-853f-b3acc321dd30', codigo: 'AZO032', nombre: 'Colón Cleanser 300gr', descripcion: '', precioUSD: 14, stock: 3, categoria: 'Bebidas-Depurativos-Polvos' },
    { id: 'fd041751-7ff9-55a9-94b7-fe145fb33123', codigo: 'AZO033', nombre: 'Creatina Monohidratada 100 servicios', descripcion: 'Polvo verde y blanco, envase plástico cilíndrico 500g', precioUSD: 35, stock: 2, categoria: 'Bebidas-Depurativos-Polvos' },
    { id: '4be21d9a-77ab-5f04-aa79-e065a6c4130a', codigo: 'AZO034', nombre: 'Creatina Monohidratada Cápsulas', descripcion: 'Frasco negro con tapa negra, etiqueta naranja, 60 tabletas', precioUSD: 13, stock: 2, categoria: 'Suplementos' },
    { id: 'efd05107-9ac0-58aa-9ac0-cb4015b4a3e3', codigo: 'AZO035', nombre: 'DaflonX Force', descripcion: '', precioUSD: 10, stock: 1, categoria: 'Suplementos' },
    { id: '36243d9b-14fd-512d-88b6-271801eeeef1', codigo: 'AZO036', nombre: 'Depurativo Natural 1lt', descripcion: '', precioUSD: 7, stock: 1, categoria: 'Bebidas-Depurativos-Polvos' },
    { id: '8ea6475c-5b36-516b-8308-f89bb174a09f', codigo: 'AZO037', nombre: 'Depurativo Prostavida 1 Lt', descripcion: '', precioUSD: 7, stock: 2, categoria: 'Bebidas-Depurativos-Polvos' },
    { id: '196c6467-29f9-5612-8b54-45740cda35ba', codigo: 'AZO038', nombre: 'Depurativo Sana Colon 1 Lt', descripcion: '', precioUSD: 7, stock: 2, categoria: 'Bebidas-Depurativos-Polvos' },
    { id: 'd04c9583-4cb9-5f50-a2d9-9fca9a33196e', codigo: 'AZO039', nombre: 'Depurativo Sanaliv 1 Lt', descripcion: '', precioUSD: 7, stock: 1, categoria: 'Bebidas-Depurativos-Polvos' },
    { id: 'c5913578-6a75-5f9f-a7cd-c9e278851363', codigo: 'AZO040', nombre: 'Depurativo Vida Riñón', descripcion: '', precioUSD: 7, stock: 3, categoria: 'Bebidas-Depurativos-Polvos' },
    { id: '7f56a8a3-521c-5216-b251-e9f3b0449b64', codigo: 'AZO041', nombre: 'Depurativo Zarzaparrilla 1lt', descripcion: '', precioUSD: 7, stock: 2, categoria: 'Bebidas-Depurativos-Polvos' },
    { id: '18811f12-eb0f-5db0-ae57-02a199631dc1', codigo: 'AZO042', nombre: 'Depurativo Zarzaparrilla Plus 1 Lt', descripcion: '', precioUSD: 7, stock: 1, categoria: 'Bebidas-Depurativos-Polvos' },
    { id: '5c737426-f46e-5518-9b27-7e4fcb3eb65c', codigo: 'AZO043', nombre: 'Dulce Sueño', descripcion: '', precioUSD: 13, stock: 1, categoria: 'Suplementos' },
    { id: 'b9f26068-6be8-59bf-ae18-3c85bff99ad7', codigo: 'AZO044', nombre: 'ErectoMax', descripcion: '', precioUSD: 13, stock: 1, categoria: 'Suplementos' },
    { id: 'ff58c66e-d890-5e74-b4ac-4b3ce7fa5a11', codigo: 'AZO045', nombre: 'Glicinato de Magnesio', descripcion: '', precioUSD: 14, stock: 2, categoria: 'Suplementos' },
    { id: '32f4d9df-d8c1-5bea-8bb1-68c1ef978f3e', codigo: 'AZO046', nombre: 'Glicinato de magnesio.', descripcion: '', precioUSD: 18, stock: 0, categoria: 'Suplementos' },
    { id: 'bfc530e9-e7e7-5ca7-b1f8-cc128646e972', codigo: 'AZO047', nombre: 'Inmuno Pulmonar', descripcion: '', precioUSD: 7, stock: 1, categoria: 'Suplementos' },
    { id: 'dbaf360c-8043-5e70-9692-1241da1fcc3c', codigo: 'AZO048', nombre: 'L Glutamina', descripcion: '', precioUSD: 13, stock: 0, categoria: 'Suplementos' },
    { id: 'ff191bb2-4077-509c-ada5-f268296c8a0f', codigo: 'AZO049', nombre: 'Laxante Natural (Quenopodio)', descripcion: 'Desparasitante', precioUSD: 4, stock: 5, categoria: 'Suplementos' },
    { id: 'c3a1fa3e-d480-5e92-b1c3-04ee597e04ad', codigo: 'AZO050', nombre: 'Levadura de Cerveza', descripcion: '', precioUSD: 11, stock: 1, categoria: 'Suplementos' },
    { id: '85d81ba5-b70e-50cc-a4f1-79cc7c172ef4', codigo: 'AZO051', nombre: 'Lochita', descripcion: '', precioUSD: 10, stock: 2, categoria: 'Suplementos' },
    { id: 'c5fb8ef7-f758-5fab-98fc-bd7f32cedbd9', codigo: 'AZO052', nombre: 'Luteina', descripcion: '', precioUSD: 13, stock: 1, categoria: 'Suplementos' },
    { id: '13f585e5-a217-5eab-afe9-e5a5465954b9', codigo: 'AZO053', nombre: 'Maca', descripcion: '', precioUSD: 14, stock: 2, categoria: 'Suplementos' },
    { id: 'c00e5ad1-695b-5531-9f08-bb20615ce094', codigo: 'AZO054', nombre: 'Magnesio + Vitamina C', descripcion: '', precioUSD: 13, stock: 1, categoria: 'Suplementos' },
    { id: '27d0663c-f693-591a-bea8-4062d9062a9f', codigo: 'AZO055', nombre: 'Magnesio + Zinc', descripcion: '', precioUSD: 13, stock: 1, categoria: 'Suplementos' },
    { id: '48b3677c-873f-52be-99a3-7687da534450', codigo: 'AZO056', nombre: 'Magnevita', descripcion: '', precioUSD: 10, stock: 0, categoria: 'Suplementos' },
    { id: '00c0bfb9-8a45-5b58-bc92-e4b675bd42d0', codigo: 'AZO057', nombre: 'Melatonina 120 pastillas', descripcion: '', precioUSD: 18, stock: 0, categoria: 'Suplementos' },
    { id: '1c6182ce-67b4-5283-bc32-0660e7673fe1', codigo: 'AZO058', nombre: 'Nad+', descripcion: '', precioUSD: 13, stock: 1, categoria: 'Suplementos' },
    { id: 'b01a536f-57c0-5f29-9f0e-335e8227441e', codigo: 'AZO059', nombre: 'Nad+Resveratrol', descripcion: '', precioUSD: 14, stock: 3, categoria: 'Suplementos' },
    { id: '88bc741c-1df2-5514-a13b-3ca19c12d807', codigo: 'AZO060', nombre: 'Ñame Salvaje', descripcion: '', precioUSD: 13, stock: 0, categoria: 'Suplementos' },
    { id: '59a647c0-3143-54c1-adb8-68363c2ac6ae', codigo: 'AZO061', nombre: 'Ñame salvajee', descripcion: '', precioUSD: 10, stock: 2, categoria: 'Suplementos' },
    { id: '71d40262-1f5a-569f-a60c-ef1baef04fce', codigo: 'AZO062', nombre: 'Omega 3', descripcion: '', precioUSD: 14, stock: 4, categoria: 'Suplementos' },
    { id: '77043530-eb89-5a6a-ac46-20e383cad393', codigo: 'AZO063', nombre: 'Orégano', descripcion: '', precioUSD: 13, stock: 0, categoria: 'Suplementos' },
    { id: '025f376c-d667-5b1a-aaa4-37a885539670', codigo: 'AZO064', nombre: 'Probiótico Advantage 30 billion', descripcion: '', precioUSD: 17, stock: 6, categoria: 'Suplementos' },
    { id: '4ce07be2-6b21-58f1-b36e-9f5852423a4a', codigo: 'AZO065', nombre: 'Prostavida', descripcion: '', precioUSD: 10, stock: 2, categoria: 'Suplementos' },
    { id: '319fca7e-734e-5260-9dd9-ecbe24596c39', codigo: 'AZO066', nombre: 'Rábano yodado', descripcion: '', precioUSD: 6, stock: 2, categoria: 'Suplementos' },
    { id: '72d818f3-00c9-54af-a312-4ece92b207d2', codigo: 'AZO067', nombre: 'Resverastrol', descripcion: '', precioUSD: 10, stock: 3, categoria: 'Suplementos' },
    { id: '68011c5b-54e3-574b-a7b8-fdb3556da35a', codigo: 'AZO068', nombre: 'Resveratroll', descripcion: '', precioUSD: 14, stock: 2, categoria: 'Suplementos' },
    { id: 'ee8ece93-3740-5323-985b-ae918a72b117', codigo: 'AZO069', nombre: 'Saw Palmetto', descripcion: '', precioUSD: 9, stock: 1, categoria: 'Suplementos' },
    { id: '28427a25-d055-5cf0-b2ed-081dadaca21a', codigo: 'AZO070', nombre: 'Selenio', descripcion: '', precioUSD: 13, stock: 1, categoria: 'Suplementos' },
    { id: 'b1343502-6010-5525-a3ad-9eeeaab7f12d', codigo: 'AZO071', nombre: 'Sobres Sábila y Linaza', descripcion: '', precioUSD: 1.5, stock: 11, categoria: 'Bebidas-Depurativos-Polvos' },
    { id: '28769045-aba2-5aeb-a081-c0c0a1453995', codigo: 'AZO072', nombre: 'Valeriana', descripcion: '', precioUSD: 10, stock: 0, categoria: 'Suplementos' },
    { id: '1f1541e7-1a2d-56d7-8d73-45dd95bb2d5a', codigo: 'AZO073', nombre: 'Vibaxina', descripcion: '', precioUSD: 13, stock: 1, categoria: 'Suplementos' },
    { id: 'a7ac8479-ab38-55b2-882c-23995f50442c', codigo: 'AZO074', nombre: 'Vinagre de Manzana 60 tabletas', descripcion: 'Frasco plástico morado con tapa roja, 60 tabletas recubiertas', precioUSD: 13, stock: 2, categoria: 'Suplementos' },
    { id: 'a048959e-8ea0-5d6b-b7f1-dbfa6fea21d9', codigo: 'AZO075', nombre: 'Vitamina C', descripcion: '', precioUSD: 11, stock: 2, categoria: 'Suplementos' },
    { id: 'c724dbbe-deb0-5b13-8346-a41f12393fc4', codigo: 'AZO076', nombre: 'Vitamina C.', descripcion: '', precioUSD: 17, stock: 0, categoria: 'Suplementos' },
    { id: '8f41e2b5-7366-511a-8fd9-dd1d0442444d', codigo: 'AZO077', nombre: 'Vitamina D3', descripcion: '', precioUSD: 13, stock: 0, categoria: 'Suplementos' },
    { id: '49361e24-aacd-5e34-bdee-0bf0e1be20e4', codigo: 'AZO078', nombre: 'Vitamina D3+ K2', descripcion: '', precioUSD: 13, stock: 3, categoria: 'Suplementos' },
    { id: 'ccbb78f5-5f80-57b4-97a2-796ae0fee08e', codigo: 'AZO079', nombre: 'Vitamina E', descripcion: '', precioUSD: 14, stock: 2, categoria: 'Suplementos' },
    { id: '89da002c-f1d3-5173-bb95-f8a9b50473aa', codigo: 'AZO080', nombre: 'Vitamina E.', descripcion: '', precioUSD: 24, stock: 0, categoria: 'Suplementos' },
    { id: '0ed4e36e-f566-566b-9270-70a7991ff4fd', codigo: 'AZO081', nombre: 'Zinc Citrato', descripcion: '', precioUSD: 14, stock: 1, categoria: 'Suplementos' }
];

let state = {
    clientes: JSON.parse(localStorage.getItem('cp_clientes')) || [],
    pagos: JSON.parse(localStorage.getItem('cp_pagos')) || [],
    productos: JSON.parse(localStorage.getItem('cp_productos')) || [],
    ventas: JSON.parse(localStorage.getItem('cp_ventas')) || [],
    cotizaciones: JSON.parse(localStorage.getItem('cp_cotizaciones')) || [],
    carrito: [],
    carritoCotizacion: [],
    config: JSON.parse(localStorage.getItem('cp_config')) || {
        empresa: { nombre: '', telefono: '', email: '', direccion: '' },
        visual: { colorPrimario: '#2563eb', colorSecundario: '#10b981', colorAcento: '#f59e0b', font: "'Inter', sans-serif", fontSize: '16px', logo: null },
        moneda: { principal: 'USD', ambasMonedas: true },
        mensajes: {
            recordatorio: 'Hola {nombre}, te recordamos tu pago pendiente de ${monto} (Bs. {monto_bs}). Vence el {fecha}.',
            atraso: 'Hola {nombre}, tu pago de ${monto} (Bs. {monto_bs}) está atrasado por {dias} días.'
        }
    },
    tasaBCV: parseFloat(localStorage.getItem('cp_tasaBCV')) || null,
    tasaParalelo: parseFloat(localStorage.getItem('cp_tasaParalelo')) || null,
    fechaTasaBCV: localStorage.getItem('cp_fechaTasaBCV') || null,
    filtroActual: 'todos'
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    setupNavigation();
    setupFilters();
    setupForms();
    loadConfig();
    loadConfigVisual();
    obtenerTasas();

    // Cargar productos del catálogo Azo Medi (81 productos)
    const PRODUCTOS_VERSION = 3;
    const storedVersion = parseInt(localStorage.getItem('cp_productos_version') || '0');
    if (state.productos.length === 0 || storedVersion < PRODUCTOS_VERSION) {
        state.productos = PRODUCTOS_AZO_MEDI.map(p => ({
            ...p,
            precioBS: state.tasaBCV ? p.precioUSD * state.tasaBCV : 0,
            fechaCreacion: new Date().toISOString()
        }));
        localStorage.setItem('cp_productos', JSON.stringify(state.productos));
        localStorage.setItem('cp_productos_version', PRODUCTOS_VERSION);
    }

    renderDashboard();
    renderClientes();
    renderPagos();
    renderReportes();
    renderRecordatorios();
    renderProductos();
    renderVentas();
    renderCarritoVenta();
    renderProductosVenta();
    cargarSelectClientesVenta();
    renderCotizaciones();
    cargarSelectClientesCotizacion();
    initCalculadora();
    setTimeout(() => cargarEstadisticas(), 500);
}

function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + (type === 'error' ? 'danger' : type);
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(12px)'; }, 2800);
    setTimeout(() => toast.remove(), 3200);
}

// ============================================
// NAVEGACIÓN
// ============================================
function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            document.getElementById('section-' + section).classList.add('active');
            document.getElementById('pageTitle').textContent = item.querySelector('.nav-text').textContent;
            if (window.innerWidth <= 768) toggleSidebar();
        });
    });
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// ============================================
// TASAS BCV - MÚLTIPLES FUENTES CON CORS
// ============================================
async function obtenerTasas() {
    const el = document.getElementById('tasaBCV');
    if (el) el.textContent = 'Cargando...';

    // Fuente 1: ve.dolarapi.com (CORS habilitado, oficial BCV + paralelo)
    try {
        const res = await fetch('https://ve.dolarapi.com/v1/dolares', { cache: 'no-cache' });
        if (res.ok) {
            const data = await res.json();
            const oficial = data.find(d => d.fuente === 'oficial');
            const paralelo = data.find(d => d.fuente === 'paralelo');
            
            if (oficial && oficial.promedio) {
                state.tasaBCV = oficial.promedio;
                state.tasaParalelo = paralelo ? paralelo.promedio : null;
                state.fechaTasaBCV = oficial.fechaActualizacion ? oficial.fechaActualizacion.split('T')[0] : new Date().toISOString().split('T')[0];
                localStorage.setItem('cp_tasaBCV', state.tasaBCV);
                localStorage.setItem('cp_tasaParalelo', state.tasaParalelo);
                localStorage.setItem('cp_fechaTasaBCV', state.fechaTasaBCV);
                mostrarTasa();
                return;
            }
        }
    } catch (e) { console.log('Fuente 1 falló:', e); }

    // Fuente 2: bcv.today con proxy CORS
    try {
        const res = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://bcv.today/api/v1/rate.json'), { cache: 'no-cache' });
        if (res.ok) {
            const data = await res.json();
            if (data.USD && data.USD > 1) {
                state.tasaBCV = data.USD;
                state.fechaTasaBCV = data.date || data.effective_date;
                localStorage.setItem('cp_tasaBCV', state.tasaBCV);
                localStorage.setItem('cp_fechaTasaBCV', state.fechaTasaBCV);
                mostrarTasa();
                return;
            }
        }
    } catch (e) { console.log('Fuente 2 falló:', e); }

    // Si todas fallan, usar última conocida
    mostrarTasa();
}

function mostrarTasa() {
    const el = document.getElementById('tasaBCV');
    const fechaEl = document.getElementById('fechaBCV');
    const headerEl = document.getElementById('headerTasa');
    
    if (state.tasaBCV) {
        const texto = 'Bs. ' + state.tasaBCV.toFixed(2);
        const textoCompleto = state.tasaParalelo ? 
            texto + ' | Paralelo: Bs. ' + state.tasaParalelo.toFixed(2) : texto;
        
        if (el) el.textContent = textoCompleto;
        if (headerEl) headerEl.textContent = textoCompleto;
        if (fechaEl && state.fechaTasaBCV) fechaEl.textContent = formatearFecha(state.fechaTasaBCV);
        recalcularPreciosBS();
    } else {
        if (el) el.textContent = 'No disponible';
        if (headerEl) headerEl.textContent = 'N/A';
    }
}

function recalcularPreciosBS() {
    if (!state.tasaBCV) return;
    state.productos.forEach(p => {
        p.precioBS = p.precioUSD * state.tasaBCV;
    });
    localStorage.setItem('cp_productos', JSON.stringify(state.productos));
}

// ============================================
// FILTROS
// ============================================
function setupFilters() {
    const buscarCliente = document.getElementById('buscarCliente');
    if (buscarCliente) buscarCliente.addEventListener('input', renderClientes);
    
    const buscarPago = document.getElementById('buscarPago');
    if (buscarPago) buscarPago.addEventListener('input', renderPagos);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            state.filtroActual = e.target.dataset.filter;
            renderClientes();
        });
    });
}

// ============================================
// CONVERSIONES
// ============================================
function convertirMontoCliente() {
    const monto = parseFloat(document.getElementById('cMonto').value) || 0;
    const moneda = document.getElementById('cMoneda').value;
    const conv = document.getElementById('cMontoConvertido');
    const tasa = document.getElementById('cTasaBCV');

    if (tasa) tasa.value = state.tasaBCV ? 'Bs. ' + state.tasaBCV.toFixed(2) : 'No disponible';

    if (!conv || !state.tasaBCV || monto === 0) {
        if (conv) conv.value = state.tasaBCV ? 'Ingresa un monto' : 'Tasa no disponible';
        return;
    }

    conv.value = moneda === 'USD' ?
        'Bs. ' + (monto * state.tasaBCV).toFixed(2) :
        '$' + (monto / state.tasaBCV).toFixed(2);
}

function convertirMontoPago() {
    const monto = parseFloat(document.getElementById('pMonto').value) || 0;
    const moneda = document.getElementById('pClienteMoneda').value;
    const conv = document.getElementById('pMontoConvertido');

    if (!conv || !state.tasaBCV || monto === 0) {
        if (conv) conv.value = '';
        return;
    }

    conv.value = moneda === 'USD' ?
        'Bs. ' + (monto * state.tasaBCV).toFixed(2) :
        '$' + (monto / state.tasaBCV).toFixed(2);
}

// ============================================
// CLIENTES
// ============================================
function abrirModalCliente(id) {
    document.getElementById('clienteForm').reset();
    document.getElementById('clienteEditId').value = '';
    document.getElementById('clienteModalTitle').textContent = 'Nuevo Cliente';
    document.getElementById('cFechaInicio').value = new Date().toISOString().split('T')[0];
    document.getElementById('cTasaBCV').value = state.tasaBCV ? 'Bs. ' + state.tasaBCV.toFixed(2) : 'No disponible';
    document.getElementById('cMontoConvertido').value = '';
    document.getElementById('clienteModal').classList.add('active');
}

function guardarCliente() {
    const editId = document.getElementById('clienteEditId').value;
    const moneda = document.getElementById('cMoneda').value;
    const monto = parseFloat(document.getElementById('cMonto').value);
    
    if (isNaN(monto) || monto <= 0) { alert('Monto inválido'); return; }
    
    let montoUSD, montoBS;
    if (moneda === 'USD') {
        montoUSD = monto;
        montoBS = state.tasaBCV ? monto * state.tasaBCV : 0;
    } else {
        montoBS = monto;
        montoUSD = state.tasaBCV ? monto / state.tasaBCV : 0;
    }
    
    if (editId) {
        const idx = state.clientes.findIndex(c => c.id == editId);
        if (idx !== -1) {
            state.clientes[idx] = {
                ...state.clientes[idx],
                nombre: document.getElementById('cNombre').value.trim(),
                cedula: document.getElementById('cCedula').value.trim(),
                telefono: document.getElementById('cTelefono').value.trim(),
                email: document.getElementById('cEmail').value.trim(),
                direccion: document.getElementById('cDireccion').value.trim(),
                monedaOriginal: moneda,
                montoOriginal: monto,
                montoUSD, montoBS,
                fechaInicio: document.getElementById('cFechaInicio').value,
                fechaVencimiento: document.getElementById('cFechaVencimiento').value,
                descripcion: document.getElementById('cDescripcion').value.trim()
            };
        }
    } else {
        state.clientes.push({
            id: 'cli_' + Date.now(),
            nombre: document.getElementById('cNombre').value.trim(),
            cedula: document.getElementById('cCedula').value.trim(),
            telefono: document.getElementById('cTelefono').value.trim(),
            email: document.getElementById('cEmail').value.trim(),
            direccion: document.getElementById('cDireccion').value.trim(),
            monedaOriginal: moneda,
            montoOriginal: monto,
            montoUSD, montoBS,
            montoPagadoUSD: 0,
            montoPagadoBS: 0,
            fechaInicio: document.getElementById('cFechaInicio').value,
            fechaVencimiento: document.getElementById('cFechaVencimiento').value,
            descripcion: document.getElementById('cDescripcion').value.trim(),
            pagos: [],
            productosAdquiridos: [],
            estado: 'pendiente',
            fechaCreacion: new Date().toISOString(),
            tasaBCVCreacion: state.tasaBCV
        });
    }
    
    guardarDatos();
    renderClientes();
    renderDashboard();
    renderReportes();
    renderRecordatorios();
    cerrarModal('clienteModal');
}

function editarCliente(id) {
    const c = state.clientes.find(cl => cl.id == id);
    if (!c) return;
    
    document.getElementById('clienteEditId').value = c.id;
    document.getElementById('clienteModalTitle').textContent = 'Editar Cliente';
    document.getElementById('cNombre').value = c.nombre;
    document.getElementById('cCedula').value = c.cedula || '';
    document.getElementById('cTelefono').value = c.telefono || '';
    document.getElementById('cEmail').value = c.email || '';
    document.getElementById('cDireccion').value = c.direccion || '';
    document.getElementById('cMoneda').value = c.monedaOriginal;
    document.getElementById('cMonto').value = c.montoOriginal;
    document.getElementById('cFechaInicio').value = c.fechaInicio;
    document.getElementById('cFechaVencimiento').value = c.fechaVencimiento;
    document.getElementById('cDescripcion').value = c.descripcion || '';
    
    convertirMontoCliente();
    document.getElementById('clienteModal').classList.add('active');
}

function eliminarCliente(id) {
    if (!confirm('¿Eliminar este cliente y todos sus pagos?')) return;
    state.clientes = state.clientes.filter(c => c.id != id);
    state.pagos = state.pagos.filter(p => p.clienteId != id);
    guardarDatos();
    renderClientes();
    renderPagos();
    renderDashboard();
    renderReportes();
    renderRecordatorios();
}

function renderClientes() {
    const busqueda = normalizar(document.getElementById('buscarCliente')?.value);
    const container = document.getElementById('clientesContainer');
    if (!container) return;
    
    let filtrados = state.clientes.filter(c => {
        const match = normalizar(c.nombre).includes(busqueda) ||
                      (c.telefono || '').includes(busqueda) ||
                      normalizar(c.email || '').includes(busqueda) ||
                      normalizar(c.cedula || '').includes(busqueda);
        if (!match) return false;
        if (state.filtroActual === 'todos') return true;
        if (state.filtroActual === 'pagado') return c.estado === 'pagado';
        if (state.filtroActual === 'pendiente') return c.estado === 'pendiente' && !esMoroso(c);
        if (state.filtroActual === 'moroso') return esMoroso(c);
        return true;
    });
    
    if (filtrados.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No hay clientes</h3><p>Agrega tu primer cliente</p></div>';
        return;
    }
    
    container.innerHTML = filtrados.map(c => {
        const moroso = esMoroso(c);
        const estado = moroso ? 'moroso' : c.estado;
        const pendiente = Math.max(0, c.montoUSD - c.montoPagadoUSD);
        const pendienteBS = Math.max(0, c.montoBS - c.montoPagadoBS);
        const tel = (c.telefono || '').replace(/[^0-9]/g, '');
        const progreso = c.montoUSD > 0 ? Math.min(100, (c.montoPagadoUSD / c.montoUSD) * 100) : 0;
        
        return `<div class="client-card" data-id="${c.id}">
            <div class="client-card-header">
                <div class="client-avatar">${(c.nombre || 'C').charAt(0).toUpperCase()}</div>
                <div class="client-card-title">
                    <h4>${c.nombre}</h4>
                    <span class="badge badge-${estado}">${moroso ? 'Moroso' : c.estado === 'pagado' ? 'Pagado' : 'Pendiente'}</span>
                </div>
            </div>
            <div class="client-card-body">
                ${c.cedula ? `<div class="client-info-row"><span class="client-info-label">Cedula:</span><span>${c.cedula}</span></div>` : ''}
                ${c.telefono ? `<div class="client-info-row"><span class="client-info-label">Telefono:</span><span>${c.telefono}</span></div>` : ''}
                ${c.email ? `<div class="client-info-row"><span class="client-info-label">Email:</span><span>${c.email}</span></div>` : ''}
                <div class="client-info-row"><span class="client-info-label">Deuda:</span><span class="text-navy">$${c.montoUSD.toFixed(2)} / Bs. ${c.montoBS.toFixed(2)}</span></div>
                <div class="client-info-row"><span class="client-info-label">Pagado:</span><span class="text-green">$${c.montoPagadoUSD.toFixed(2)}</span></div>
                <div class="client-info-row"><span class="client-info-label">Pendiente:</span><span class="text-red">$${pendiente.toFixed(2)}</span></div>
                <div class="client-info-row"><span class="client-info-label">Vence:</span><span>${formatearFecha(c.fechaVencimiento)}</span></div>
                <div class="client-progress">
                    <div class="client-progress-bar"><div class="client-progress-fill" style="width:${progreso}%"></div></div>
                    <span>${progreso.toFixed(0)}%</span>
                </div>
            </div>
            <div class="client-card-actions">
                ${c.estado !== 'pagado' ? `<button class="btn-success btn-sm" onclick="event.stopPropagation();abrirModalPago('${c.id}')" title="Registrar pago">Pagar</button>` : ''}
                <button class="btn-primary btn-sm" onclick="event.stopPropagation();verDetalles('${c.id}')" title="Ver detalles">Ver</button>
                <button class="btn-secondary btn-sm" onclick="event.stopPropagation();editarCliente('${c.id}')" title="Editar">Editar</button>
                ${tel ? `<a href="${genWhatsApp(c)}" target="_blank" class="btn-whatsapp btn-sm" onclick="event.stopPropagation()" title="WhatsApp">WhatsApp</a>` : ''}
                <button class="btn-danger btn-sm" onclick="event.stopPropagation();eliminarCliente('${c.id}')" title="Eliminar">Eliminar</button>
            </div>
        </div>`;
    }).join('');
}

// ============================================
// PAGOS
// ============================================
function abrirModalPago(clienteId) {
    const c = state.clientes.find(cl => cl.id === clienteId);
    if (!c) return;
    
    const pendiente = Math.max(0, c.montoUSD - c.montoPagadoUSD);
    const pendienteBS = Math.max(0, c.montoBS - c.montoPagadoBS);
    
    document.getElementById('pClienteId').value = c.id;
    document.getElementById('pClienteMoneda').value = c.monedaOriginal;
    document.getElementById('pagoClienteInfo').innerHTML = `
        <strong>${c.nombre}</strong><br>
        Pendiente: $${pendiente.toFixed(2)} (Bs. ${pendienteBS.toFixed(2)})
    `;
    document.getElementById('pMontoInfo').textContent = 'Moneda: ' + (c.monedaOriginal === 'USD' ? 'Dólares' : 'Bolívares');
    document.getElementById('pMonto').value = '';
    document.getElementById('pMontoConvertido').value = '';
    document.getElementById('pFecha').value = new Date().toISOString().split('T')[0];
    document.getElementById('pagoModal').classList.add('active');
}

function guardarPago() {
    const clienteId = parseInt(document.getElementById('pClienteId').value);
    const c = state.clientes.find(cl => cl.id === clienteId);
    if (!c) return;
    
    const monto = parseFloat(document.getElementById('pMonto').value);
    if (isNaN(monto) || monto <= 0) { alert('Monto inválido'); return; }
    
    const moneda = document.getElementById('pClienteMoneda').value;
    let montoUSD, montoBS;
    if (moneda === 'USD') {
        montoUSD = monto;
        montoBS = state.tasaBCV ? monto * state.tasaBCV : 0;
    } else {
        montoBS = monto;
        montoUSD = state.tasaBCV ? monto / state.tasaBCV : 0;
    }
    
    const pago = {
        id: Date.now(),
        clienteId: c.id,
        clienteNombre: c.nombre,
        montoUSD, montoBS,
        monedaOriginal: moneda,
        montoOriginal: monto,
        fecha: document.getElementById('pFecha').value,
        metodo: document.getElementById('pMetodo').value,
        referencia: document.getElementById('pReferencia').value.trim(),
        notas: document.getElementById('pNotas').value.trim(),
        fechaCreacion: new Date().toISOString()
    };
    
    state.pagos.push(pago);
    c.pagos.push(pago.id);
    c.montoPagadoUSD += montoUSD;
    c.montoPagadoBS += montoBS;
    c.estado = c.montoPagadoUSD >= c.montoUSD ? 'pagado' : 'pendiente';
    
    guardarDatos();
    renderPagos();
    renderClientes();
    renderDashboard();
    renderReportes();
    renderRecordatorios();
    cerrarModal('pagoModal');
    alert('Pago registrado exitosamente');
}

function renderPagos() {
    const busqueda = document.getElementById('buscarPago')?.value.toLowerCase() || '';
    const tbody = document.getElementById('pagosTableBody');
    
    let pagos = [...state.pagos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    if (busqueda) {
        pagos = pagos.filter(p => 
            (p.clienteNombre || '').toLowerCase().includes(busqueda) ||
            (p.referencia || '').toLowerCase().includes(busqueda) ||
            (p.notas || '').toLowerCase().includes(busqueda)
        );
    }
    
    if (pagos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><h3>No hay pagos registrados</h3></div></td></tr>';
        return;
    }
    
    tbody.innerHTML = pagos.map(p => `<tr>
        <td>${formatearFecha(p.fecha)}</td>
        <td>${p.clienteNombre}</td>
        <td>$${p.montoUSD.toFixed(2)}</td>
        <td>Bs. ${p.montoBS.toFixed(2)}</td>
        <td>${capitalizar(p.metodo)}</td>
        <td>${p.referencia || p.notas || '-'}</td>
    </tr>`).join('');
}

function filtrarPagos() {
    const desde = document.getElementById('fechaDesde').value;
    const hasta = document.getElementById('fechaHasta').value;
    
    let pagos = state.pagos;
    if (desde) pagos = pagos.filter(p => p.fecha >= desde);
    if (hasta) pagos = pagos.filter(p => p.fecha <= hasta);
    
    const tbody = document.getElementById('pagosTableBody');
    if (pagos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><h3>No hay pagos en ese rango</h3></div></td></tr>';
        return;
    }
    
    tbody.innerHTML = pagos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).map(p => `<tr>
        <td>${formatearFecha(p.fecha)}</td>
        <td>${p.clienteNombre}</td>
        <td>$${p.montoUSD.toFixed(2)}</td>
        <td>Bs. ${p.montoBS.toFixed(2)}</td>
        <td>${capitalizar(p.metodo)}</td>
        <td>${p.referencia || p.notas || '-'}</td>
    </tr>`).join('');
}

// ============================================
// DASHBOARD
// ============================================
function renderDashboard() {
    const totalUSD = state.clientes.reduce((s, c) => s + (c.montoUSD || 0), 0);
    const totalBS = state.clientes.reduce((s, c) => s + (c.montoBS || 0), 0);
    const pagadoUSD = state.clientes.reduce((s, c) => s + (c.montoPagadoUSD || 0), 0);
    const pagadoBS = state.clientes.reduce((s, c) => s + (c.montoPagadoBS || 0), 0);
    const pendienteUSD = totalUSD - pagadoUSD;
    const pendienteBS = totalBS - pagadoBS;
    const morosos = state.clientes.filter(c => esMoroso(c));
    const morososMonto = morosos.reduce((s, c) => s + Math.max(0, c.montoUSD - c.montoPagadoUSD), 0);
    
    setText('dashTotalUSD', '$' + totalUSD.toFixed(2));
    setText('dashTotalBS', 'Bs. ' + totalBS.toFixed(2));
    setText('dashPagadoUSD', '$' + pagadoUSD.toFixed(2));
    setText('dashPagadoBS', 'Bs. ' + pagadoBS.toFixed(2));
    setText('dashPendienteUSD', '$' + pendienteUSD.toFixed(2));
    setText('dashPendienteBS', 'Bs. ' + pendienteBS.toFixed(2));
    setText('dashMorosos', morosos.length);
    setText('dashMorososMonto', '$' + morososMonto.toFixed(2));
    
    // Últimos clientes
    const ultimos = [...state.clientes].sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)).slice(0, 5);
    document.getElementById('ultimosClientes').innerHTML = ultimos.length === 0 ? 
        '<p class="empty-state">No hay clientes</p>' :
        ultimos.map(c => `<div class="list-item"><div class="list-item-info"><h4>${c.nombre}</h4><p>$${c.montoUSD.toFixed(2)} - ${formatearFecha(c.fechaCreacion)}</p></div></div>`).join('');
    
    // Últimos pagos
    const ultimosPagos = [...state.pagos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 5);
    document.getElementById('ultimosPagos').innerHTML = ultimosPagos.length === 0 ?
        '<p class="empty-state">No hay pagos</p>' :
        ultimosPagos.map(p => `<div class="list-item"><div class="list-item-info"><h4>${p.clienteNombre}</h4><p>$${p.montoUSD.toFixed(2)} - ${formatearFecha(p.fecha)}</p></div></div>`).join('');
    
    // Resumen estados
    const pagados = state.clientes.filter(c => c.estado === 'pagado').length;
    const pendientes = state.clientes.filter(c => c.estado === 'pendiente' && !esMoroso(c)).length;
    document.getElementById('resumenEstados').innerHTML = `
        <div class="list-item"><span>Pagados</span><span class="badge badge-pagado">${pagados}</span></div>
        <div class="list-item"><span>Pendientes</span><span class="badge badge-pendiente">${pendientes}</span></div>
        <div class="list-item"><span>Morosos</span><span class="badge badge-moroso">${morosos.length}</span></div>
        <div class="list-item"><strong>Total Clientes</strong><strong>${state.clientes.length}</strong></div>
    `;
}

// ============================================
// REPORTES
// ============================================
function renderReportes() {
    const totalUSD = state.clientes.reduce((s, c) => s + (c.montoUSD || 0), 0);
    const pagadoUSD = state.clientes.reduce((s, c) => s + (c.montoPagadoUSD || 0), 0);
    const pendienteUSD = totalUSD - pagadoUSD;
    
    document.getElementById('resumenGeneral').innerHTML = `
        <div class="list-item"><span>Total en Deudas</span><strong>$${totalUSD.toFixed(2)}</strong></div>
        <div class="list-item"><span>Total Cobrado</span><strong style="color:var(--secondary)">$${pagadoUSD.toFixed(2)}</strong></div>
        <div class="list-item"><span>Pendiente</span><strong style="color:var(--accent)">$${pendienteUSD.toFixed(2)}</strong></div>
        <div class="list-item"><span>Total Clientes</span><strong>${state.clientes.length}</strong></div>
        <div class="list-item"><span>Total Pagos</span><strong>${state.pagos.length}</strong></div>
    `;
    
    // Pagos por mes
    const pagosPorMes = {};
    state.pagos.forEach(p => {
        const mes = p.fecha.substring(0, 7);
        pagosPorMes[mes] = (pagosPorMes[mes] || 0) + p.montoUSD;
    });
    document.getElementById('pagosPorMes').innerHTML = Object.keys(pagosPorMes).length === 0 ?
        '<p class="empty-state">Sin datos</p>' :
        Object.entries(pagosPorMes).sort((a, b) => b[0].localeCompare(a[0])).map(([mes, total]) => 
            `<div class="list-item"><span>${mes}</span><strong>$${total.toFixed(2)}</strong></div>`
        ).join('');
    
    // Top clientes
    const top = [...state.clientes].sort((a, b) => b.montoPagadoUSD - a.montoPagadoUSD).slice(0, 5);
    document.getElementById('topClientes').innerHTML = top.length === 0 ?
        '<p class="empty-state">Sin datos</p>' :
        top.map(c => `<div class="list-item"><div class="list-item-info"><h4>${c.nombre}</h4><p>Pagado: $${c.montoPagadoUSD.toFixed(2)}</p></div></div>`).join('');
    
    // Morosos
    const morosos = state.clientes.filter(c => esMoroso(c));
    document.getElementById('clientesMorososList').innerHTML = morosos.length === 0 ?
        '<p class="empty-state">No hay morosos</p>' :
        morosos.map(c => `<div class="list-item"><div class="list-item-info"><h4>${c.nombre}</h4><p>$${Math.max(0, c.montoUSD - c.montoPagadoUSD).toFixed(2)} - ${Math.abs(calcularDiasRestantes(c.fechaVencimiento))} días atraso</p></div></div>`).join('');
}

function exportarCSV() {
    let csv = 'Nombre,Cédula,Teléfono,Email,Monto USD,Monto BS,Pagado USD,Pendiente USD,Fecha Inicio,Vencimiento,Estado\n';
    state.clientes.forEach(c => {
        csv += `"${c.nombre}","${c.cedula || ''}","${c.telefono || ''}","${c.email || ''}",${c.montoUSD},${c.montoBS},${c.montoPagadoUSD},${Math.max(0, c.montoUSD - c.montoPagadoUSD)},${c.fechaInicio},${c.fechaVencimiento},${c.estado}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clientes_' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
    URL.revokeObjectURL(url);
}

function imprimirReporte() {
    window.print();
}

// ============================================
// RECORDATORIOS
// ============================================
function renderRecordatorios() {
    const pendientes = state.clientes.filter(c => c.estado !== 'pagado' && c.telefono);
    const container = document.getElementById('recordatoriosList');
    
    if (pendientes.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No hay clientes pendientes</h3><p>Agrega clientes con teléfono para enviar recordatorios</p></div>';
        return;
    }
    
    container.innerHTML = pendientes.map(c => {
        const pendiente = Math.max(0, c.montoUSD - c.montoPagadoUSD);
        const pendienteBS = Math.max(0, c.montoBS - c.montoPagadoBS);
        const moroso = esMoroso(c);
        const dias = Math.abs(calcularDiasRestantes(c.fechaVencimiento));
        const estado = moroso ? `⚠️ Atrasado ${dias} días` : `📅 Vence en ${dias} días`;
        
        return `<div class="recordatorio-item">
            <div>
                <h4>${c.nombre}</h4>
                <p>Pendiente: $${pendiente.toFixed(2)} (Bs. ${pendienteBS.toFixed(2)}) | ${estado}</p>
            </div>
            <div class="recordatorio-actions">
                <a href="${genWhatsApp(c, true)}" target="_blank" class="btn-whatsapp">📱 Enviar</a>
                <button class="btn-secondary" onclick="marcarEnviado(${c.id})">✓ Enviado</button>
            </div>
        </div>`;
    }).join('');
}

function marcarEnviado(clienteId) {
    const c = state.clientes.find(cl => cl.id === clienteId);
    if (c) {
        c.fechaUltimoRecordatorio = new Date().toISOString();
        guardarDatos();
        alert('Recordatorio marcado para ' + c.nombre);
        renderRecordatorios();
    }
}

// ============================================
// DETALLES
// ============================================
function verDetalles(id) {
    const c = state.clientes.find(cl => cl.id == id);
    if (!c) return;
    
    const pendiente = Math.max(0, c.montoUSD - c.montoPagadoUSD);
    const pendienteBS = Math.max(0, c.montoBS - c.montoPagadoBS);
    const progreso = c.montoUSD > 0 ? ((c.montoPagadoUSD / c.montoUSD) * 100) : 0;
    const pagosCliente = state.pagos.filter(p => p.clienteId == c.id).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const ventasCliente = state.ventas.filter(v => v.clienteId == c.id).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const tel = (c.telefono || '').replace(/[^0-9]/g, '');
    
    const productosHTML = ventasCliente.length === 0 
        ? '<p class="empty-state">Sin ventas registradas</p>'
        : ventasCliente.map(v => {
            const numVenta = state.ventas.indexOf(v) + 1;
            return `
            <div class="venta-resumen">
                <div class="venta-resumen-header">
                    <strong>Venta #${numVenta}</strong>
                    <span>${formatearFecha(v.fecha.substring(0, 10))}</span>
                    <span class="badge badge-${v.metodoPago === 'efectivo' ? 'secondary' : 'accent'}">${capitalizar(v.metodoPago)}</span>
                </div>
                <table class="venta-productos-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cant.</th>
                            <th>Precio U.</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${v.items.map(item => `
                            <tr>
                                <td>${item.nombre}</td>
                                <td>${item.cantidad}</td>
                                <td>$${item.precioUSD.toFixed(2)}</td>
                                <td>$${(item.precioUSD * item.cantidad).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="venta-resumen-footer">
                    <span>IVA: $${v.iva.toFixed(2)}</span>
                    <strong>Total: $${v.totalUSD.toFixed(2)} / Bs. ${v.totalBS.toFixed(2)}</strong>
                </div>
            </div>`;
        }).join('');
    
    document.getElementById('detallesContenido').innerHTML = `
        <div style="padding:20px">
            <div class="form-row" style="margin-bottom:20px">
                <div><strong>Nombre:</strong> ${c.nombre}</div>
                <div><strong>Cédula:</strong> ${c.cedula || '-'}</div>
                <div><strong>Teléfono:</strong> ${c.telefono || '-'}</div>
                <div><strong>Email:</strong> ${c.email || '-'}</div>
                <div><strong>Dirección:</strong> ${c.direccion || '-'}</div>
                <div><strong>Estado:</strong> <span class="badge badge-${esMoroso(c) ? 'moroso' : c.estado}">${esMoroso(c) ? 'Moroso' : c.estado === 'pagado' ? 'Pagado' : 'Pendiente'}</span></div>
                <div><strong>Monto Total:</strong> $${c.montoUSD.toFixed(2)} / Bs. ${c.montoBS.toFixed(2)}</div>
                <div><strong>Pagado:</strong> $${c.montoPagadoUSD.toFixed(2)} / Bs. ${c.montoPagadoBS.toFixed(2)}</div>
                <div><strong>Pendiente:</strong> $${pendiente.toFixed(2)} / Bs. ${pendienteBS.toFixed(2)}</div>
                <div><strong>Inicio:</strong> ${formatearFecha(c.fechaInicio)}</div>
                <div><strong>Vencimiento:</strong> ${formatearFecha(c.fechaVencimiento)}</div>
                <div><strong>Progreso:</strong> ${progreso.toFixed(0)}%</div>
                <div><strong>Tasa BCV al crear:</strong> ${c.tasaBCVCreacion ? 'Bs. ' + c.tasaBCVCreacion : '-'}</div>
            </div>

            <h3 style="margin:15px 0 10px">🛒 Productos Comprados (${ventasCliente.length} venta(s))</h3>
            ${productosHTML}
            
            <h3 style="margin:15px 0 10px">💰 Historial de Pagos (${pagosCliente.length})</h3>
            ${pagosCliente.length === 0 ? '<p class="empty-state">Sin pagos registrados</p>' :
                pagosCliente.map(p => `<div class="list-item">
                    <div class="list-item-info"><h4>${formatearFecha(p.fecha)} - ${capitalizar(p.metodo)}</h4><p>${p.referencia || p.notas || ''}</p></div>
                    <strong style="color:var(--secondary)">+$${p.montoUSD.toFixed(2)}</strong>
                </div>`).join('')}
            
            <div style="text-align:center;margin-top:20px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
                ${tel ? `<a href="${genWhatsApp(c, true)}" target="_blank" class="btn-whatsapp">📱 WhatsApp</a>` : ''}
                <button class="btn-primary" onclick="cerrarModal('detallesModal');editarCliente('${c.id}')">✏️ Editar Cliente</button>
                ${c.estado !== 'pagado' ? `<button class="btn-success" onclick="cerrarModal('detallesModal');abrirModalPago('${c.id}')">💰 Registrar Pago</button>` : ''}
            </div>
        </div>
    `;
    
    document.getElementById('detallesModal').classList.add('active');
}

// ============================================
// CONFIGURACIÓN
// ============================================
function loadConfig() {
    const cfg = state.config;
    setText('empresaName', cfg.empresa.nombre || 'Mi Empresa');
    document.getElementById('configEmpresa').value = cfg.empresa.nombre || '';
    document.getElementById('configTelefono').value = cfg.empresa.telefono || '';
    document.getElementById('configEmail').value = cfg.empresa.email || '';
    document.getElementById('configDireccion').value = cfg.empresa.direccion || '';
    document.getElementById('configMonedaPrincipal').value = cfg.moneda.principal;
    document.getElementById('configAmbasMonedas').checked = cfg.moneda.ambasMonedas;
    document.getElementById('msgRecordatorio').value = cfg.mensajes.recordatorio;
    document.getElementById('msgAtraso').value = cfg.mensajes.atraso;
}

function loadConfigVisual() {
    const v = state.config.visual;
    document.documentElement.style.setProperty('--primary', v.colorPrimario);
    document.documentElement.style.setProperty('--primary-dark', darkenColor(v.colorPrimario, 20));
    document.documentElement.style.setProperty('--primary-light', v.colorPrimario + '20');
    document.documentElement.style.setProperty('--secondary', v.colorSecundario);
    document.documentElement.style.setProperty('--secondary-dark', darkenColor(v.colorSecundario, 20));
    document.documentElement.style.setProperty('--accent', v.colorAcento);
    document.documentElement.style.setProperty('--accent-dark', darkenColor(v.colorAcento, 20));
    document.documentElement.style.setProperty('--font-family', v.font);
    document.documentElement.style.setProperty('--font-size-base', v.fontSize);
    document.body.style.fontFamily = v.font;
    document.body.style.fontSize = v.fontSize;
    
    document.getElementById('colorPrimario').value = v.colorPrimario;
    document.getElementById('colorSecundario').value = v.colorSecundario;
    document.getElementById('colorAcento').value = v.colorAcento;
    document.getElementById('configFont').value = v.font;
    document.getElementById('configFontSize').value = v.fontSize;
    
    if (v.logo) {
        document.getElementById('logoImg').src = v.logo;
        document.getElementById('logoImg').style.display = 'block';
        document.getElementById('logoText').style.display = 'none';
        document.getElementById('logoPreview').innerHTML = `<img src="${v.logo}" alt="Logo">`;
    }
    
    document.querySelectorAll('.color-picker-row input[type="color"]').forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.nextElementSibling.textContent = e.target.value;
        });
    });
}

function guardarConfigEmpresa() {
    state.config.empresa = {
        nombre: document.getElementById('configEmpresa').value.trim(),
        telefono: document.getElementById('configTelefono').value.trim(),
        email: document.getElementById('configEmail').value.trim(),
        direccion: document.getElementById('configDireccion').value.trim()
    };
    setText('empresaName', state.config.empresa.nombre || 'Mi Empresa');
    guardarDatos();
    alert('Datos de empresa guardados');
}

function subirLogo(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        state.config.visual.logo = e.target.result;
        document.getElementById('logoImg').src = e.target.result;
        document.getElementById('logoImg').style.display = 'block';
        document.getElementById('logoText').style.display = 'none';
        document.getElementById('logoPreview').innerHTML = `<img src="${e.target.result}" alt="Logo">`;
        guardarDatos();
    };
    reader.readAsDataURL(file);
}

function eliminarLogo() {
    state.config.visual.logo = null;
    document.getElementById('logoImg').style.display = 'none';
    document.getElementById('logoText').style.display = 'block';
    document.getElementById('logoPreview').innerHTML = '<span>Sin logo</span>';
    document.getElementById('logoUpload').value = '';
    guardarDatos();
}

function aplicarPersonalizacion() {
    state.config.visual = {
        colorPrimario: document.getElementById('colorPrimario').value,
        colorSecundario: document.getElementById('colorSecundario').value,
        colorAcento: document.getElementById('colorAcento').value,
        font: document.getElementById('configFont').value,
        fontSize: document.getElementById('configFontSize').value,
        logo: state.config.visual.logo
    };
    loadConfigVisual();
    guardarDatos();
    alert('Personalización aplicada');
}

function guardarConfigMoneda() {
    state.config.moneda = {
        principal: document.getElementById('configMonedaPrincipal').value,
        ambasMonedas: document.getElementById('configAmbasMonedas').checked
    };
    guardarDatos();
    alert('Configuración de moneda guardada');
}

function guardarMensajes() {
    state.config.mensajes = {
        recordatorio: document.getElementById('msgRecordatorio').value,
        atraso: document.getElementById('msgAtraso').value
    };
    guardarDatos();
    alert('Mensajes guardados');
}

// ============================================
// DATOS
// ============================================
function guardarDatos() {
    localStorage.setItem('cp_clientes', JSON.stringify(state.clientes));
    localStorage.setItem('cp_pagos', JSON.stringify(state.pagos));
    localStorage.setItem('cp_config', JSON.stringify(state.config));
}

function exportarDatos() {
    const data = { clientes: state.clientes, pagos: state.pagos, config: state.config, fecha: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'controlpro_backup_' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importarDatos(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.clientes) state.clientes = data.clientes;
            if (data.pagos) state.pagos = data.pagos;
            if (data.config) state.config = { ...state.config, ...data.config };
            guardarDatos();
            loadConfig();
            loadConfigVisual();
            renderDashboard();
            renderClientes();
            renderPagos();
            renderReportes();
            renderRecordatorios();
            alert('Datos importados correctamente');
        } catch (err) {
            alert('Error al importar: Archivo inválido');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function limpiarTodosDatos() {
    if (!confirm('⚠️ ¿ELIMINAR TODOS LOS DATOS?\n\nEsta acción no se puede deshacer.')) return;
    if (!confirm('¿Estás completamente seguro? Se borrarán todos los clientes, pagos y configuración.')) return;
    
    state.clientes = [];
    state.pagos = [];
    state.config = {
        empresa: { nombre: '', telefono: '', email: '', direccion: '' },
        visual: { colorPrimario: '#2563eb', colorSecundario: '#10b981', colorAcento: '#f59e0b', font: "'Inter', sans-serif", fontSize: '16px', logo: null },
        moneda: { principal: 'USD', ambasMonedas: true },
        mensajes: { recordatorio: 'Hola {nombre}, te recordamos tu pago pendiente.', atraso: 'Hola {nombre}, tu pago está atrasado.' }
    };
    guardarDatos();
    loadConfig();
    loadConfigVisual();
    renderDashboard();
    renderClientes();
    renderPagos();
    renderReportes();
    renderRecordatorios();
    alert('Todos los datos han sido eliminados');
}

// ============================================
// UTILIDADES
// ============================================
function esMoroso(c) {
    if (c.estado === 'pagado') return false;
    return new Date() > new Date(c.fechaVencimiento);
}

function calcularDiasRestantes(fecha) {
    const hoy = new Date(); hoy.setHours(0,0,0,0);
    const f = new Date(fecha); f.setHours(0,0,0,0);
    return Math.ceil((f - hoy) / (1000 * 60 * 60 * 24));
}

function formatearFecha(fecha) {
    if (!fecha) return '-';
    try {
        return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return fecha; }
}

function normalizar(str) {
    return (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function capitalizar(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function cerrarModal(id) {
    document.getElementById(id).classList.remove('active');
}

function genWhatsApp(c, esRecordatorio) {
    const tel = (c.telefono || '').replace(/[^0-9]/g, '');
    const pendiente = Math.max(0, c.montoUSD - c.montoPagadoUSD);
    const pendienteBS = Math.max(0, c.montoBS - c.montoPagadoBS);
    
    let msg;
    if (esRecordatorio) {
        const moroso = esMoroso(c);
        const dias = Math.abs(calcularDiasRestantes(c.fechaVencimiento));
        msg = moroso ? 
            state.config.mensajes.atraso.replace('{nombre}', c.nombre).replace('{monto}', '$' + pendiente.toFixed(2)).replace('{monto_bs}', 'Bs. ' + pendienteBS.toFixed(2)).replace('{dias}', dias) :
            state.config.mensajes.recordatorio.replace('{nombre}', c.nombre).replace('{monto}', '$' + pendiente.toFixed(2)).replace('{monto_bs}', 'Bs. ' + pendienteBS.toFixed(2)).replace('{fecha}', formatearFecha(c.fechaVencimiento));
    } else {
        msg = `Hola ${c.nombre}, tu saldo pendiente es $${pendiente.toFixed(2)} (Bs. ${pendienteBS.toFixed(2)}).`;
    }
    
    return `https://wa.me/${tel}?text=${encodeURIComponent(msg)}`;
}

function darkenColor(hex, percent) {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.max(0, (num >> 16) - Math.round(255 * percent / 100));
    const g = Math.max(0, ((num >> 8) & 0x00FF) - Math.round(255 * percent / 100));
    const b = Math.max(0, (num & 0x0000FF) - Math.round(255 * percent / 100));
    return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// ============================================
// PRODUCTOS
// ============================================
function setupForms() {
    // Formulario cliente
    document.getElementById('clienteForm').addEventListener('submit', (e) => {
        e.preventDefault();
        guardarCliente();
    });

    // Formulario pago
    document.getElementById('pagoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        guardarPago();
    });

    // Formulario producto
    const prodForm = document.getElementById('productoForm');
    if (prodForm) {
        prodForm.addEventListener('submit', (e) => {
            e.preventDefault();
            guardarProducto();
        });
    }

    // Formulario cliente rápido (POS)
    const crForm = document.getElementById('clienteRapidoForm');
    if (crForm) {
        crForm.addEventListener('submit', (e) => {
            e.preventDefault();
            guardarClienteRapido();
        });
    }

    // Conversiones de monto
    const montoInput = document.getElementById('cMonto');
    const monedaSelect = document.getElementById('cMoneda');
    if (montoInput) montoInput.addEventListener('input', convertirMontoCliente);
    if (monedaSelect) monedaSelect.addEventListener('change', convertirMontoCliente);

    const pMontoInput = document.getElementById('pMonto');
    if (pMontoInput) pMontoInput.addEventListener('input', convertirMontoPago);

    // Cerrar modales
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Color pickers
    const cp = document.getElementById('colorPrimario');
    const cs = document.getElementById('colorSecundario');
    const ca = document.getElementById('colorAcento');
    if (cp) cp.addEventListener('input', function() { document.getElementById('colorPrimarioHex').textContent = this.value; });
    if (cs) cs.addEventListener('input', function() { document.getElementById('colorSecundarioHex').textContent = this.value; });
    if (ca) ca.addEventListener('input', function() { document.getElementById('colorAcentoHex').textContent = this.value; });
}

function renderProductos() {
    const tbody = document.getElementById('productosTableBody');
    if (!tbody) return;

    const busqueda = normalizar(document.getElementById('buscarProducto')?.value);
    const orden = document.getElementById('ordenProductos')?.value || 'nombre-asc';
    let filtered = state.productos.filter(p =>
        normalizar(p.nombre).includes(busqueda) ||
        normalizar(p.codigo).includes(busqueda) ||
        normalizar(p.categoria).includes(busqueda) ||
        normalizar(p.descripcion).includes(busqueda)
    );

    switch (orden) {
        case 'nombre-asc': filtered.sort((a, b) => normalizar(a.nombre).localeCompare(normalizar(b.nombre))); break;
        case 'nombre-desc': filtered.sort((a, b) => normalizar(b.nombre).localeCompare(normalizar(a.nombre))); break;
        case 'precio-asc': filtered.sort((a, b) => a.precioUSD - b.precioUSD); break;
        case 'precio-desc': filtered.sort((a, b) => b.precioUSD - a.precioUSD); break;
        case 'stock-desc': filtered.sort((a, b) => b.stock - a.stock); break;
        case 'stock-asc': filtered.sort((a, b) => a.stock - b.stock); break;
        case 'agotados': filtered = filtered.filter(p => p.stock <= 0); break;
    }

    tbody.innerHTML = filtered.length === 0
        ? '<tr><td colspan="9" style="text-align:center;padding:30px;color:#999;">No hay productos registrados</td></tr>'
        : filtered.map(p => `
            <tr>
                <td><strong>${p.codigo}</strong></td>
                <td>${p.nombre}</td>
                <td>${p.descripcion || '-'}</td>
                <td>$${p.precioUSD.toFixed(2)}</td>
                <td>Bs. ${(p.precioBS || 0).toFixed(2)}</td>
                <td>${p.stock <= 5 ? `<span style="color:var(--danger);font-weight:700;">${p.stock} ⚠️</span>` : p.stock}</td>
                <td>${p.categoria || '-'}</td>
                <td>${p.stock > 0 ? '<span style="color:var(--success)">Activo</span>' : '<span style="color:var(--danger)">Agotado</span>'}</td>
                <td class="action-btns">
                    <button class="btn-sm btn-secondary" onclick="editarProducto('${p.id}')">✏️</button>
                    <button class="btn-sm btn-danger" onclick="eliminarProducto('${p.id}')">🗑️</button>
                </td>
            </tr>
        `).join('');
}

function abrirModalProducto(id) {
    document.getElementById('productoEditId').value = id || '';
    document.getElementById('productoModalTitle').textContent = id ? 'Editar Producto' : 'Nuevo Producto';

    if (id) {
        const p = state.productos.find(x => x.id === id);
        if (p) {
            document.getElementById('prodCodigo').value = p.codigo;
            document.getElementById('prodNombre').value = p.nombre;
            document.getElementById('prodDescripcion').value = p.descripcion || '';
            document.getElementById('prodPrecioUSD').value = p.precioUSD;
            document.getElementById('prodPrecioBS').value = 'Bs. ' + p.precioBS.toFixed(2);
            document.getElementById('prodStock').value = p.stock;
            document.getElementById('prodCategoria').value = p.categoria || '';
        }
    } else {
        document.getElementById('productoForm').reset();
        document.getElementById('prodPrecioBS').value = '';
    }

    document.getElementById('productoModal').classList.add('active');
}

function convertirPrecioProd() {
    const usd = parseFloat(document.getElementById('prodPrecioUSD').value) || 0;
    document.getElementById('prodPrecioBS').value = state.tasaBCV ? 'Bs. ' + (usd * state.tasaBCV).toFixed(2) : '';
}

function guardarProducto() {
    const id = document.getElementById('productoEditId').value;
    const precioUSD = parseFloat(document.getElementById('prodPrecioUSD').value) || 0;

    const data = {
        id: id || 'prod_' + Date.now(),
        codigo: document.getElementById('prodCodigo').value.trim(),
        nombre: document.getElementById('prodNombre').value.trim(),
        descripcion: document.getElementById('prodDescripcion').value.trim(),
        precioUSD: precioUSD,
        precioBS: state.tasaBCV ? precioUSD * state.tasaBCV : 0,
        stock: parseInt(document.getElementById('prodStock').value) || 0,
        categoria: document.getElementById('prodCategoria').value.trim(),
        fechaCreacion: id ? (state.productos.find(p => p.id === id)?.fechaCreacion || new Date().toISOString()) : new Date().toISOString()
    };

    if (id) {
        const idx = state.productos.findIndex(p => p.id === id);
        if (idx !== -1) state.productos[idx] = data;
    } else {
        state.productos.push(data);
    }

    localStorage.setItem('cp_productos', JSON.stringify(state.productos));
    cerrarModal('productoModal');
    renderProductos();
    renderProductosVenta();
    showToast(id ? 'Producto actualizado' : 'Producto creado', 'success');
}

function editarProducto(id) {
    abrirModalProducto(id);
}

function eliminarProducto(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    state.productos = state.productos.filter(p => p.id !== id);
    localStorage.setItem('cp_productos', JSON.stringify(state.productos));
    renderProductos();
    renderProductosVenta();
    showToast('Producto eliminado', 'success');
}

// ============================================
// PUNTO DE VENTA (CARRITO)
// ============================================
function renderProductosVenta() {
    const grid = document.getElementById('productsGridVenta');
    if (!grid) return;

    const busqueda = normalizar(document.getElementById('buscarProductoVenta')?.value);
    const orden = document.getElementById('ordenVenta')?.value || 'nombre-asc';
    let filtered = state.productos.filter(p =>
        normalizar(p.nombre).includes(busqueda) ||
        normalizar(p.codigo).includes(busqueda) ||
        normalizar(p.categoria).includes(busqueda)
    );

    switch (orden) {
        case 'nombre-asc': filtered.sort((a, b) => normalizar(a.nombre).localeCompare(normalizar(b.nombre))); break;
        case 'nombre-desc': filtered.sort((a, b) => normalizar(b.nombre).localeCompare(normalizar(a.nombre))); break;
        case 'precio-asc': filtered.sort((a, b) => a.precioUSD - b.precioUSD); break;
        case 'precio-desc': filtered.sort((a, b) => b.precioUSD - a.precioUSD); break;
        case 'stock-desc': filtered.sort((a, b) => b.stock - a.stock); break;
        case 'stock-asc': filtered.sort((a, b) => a.stock - b.stock); break;
        case 'agotados': filtered = filtered.filter(p => p.stock <= 0); break;
    }

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:#999;padding:40px;grid-column:1/-1;">No se encontraron productos.</p>';
        return;
    }

    grid.innerHTML = filtered.map(p => `
        <div class="product-card ${p.stock <= 0 ? 'sin-stock' : ''}" onclick="${p.stock > 0 ? `agregarAlCarrito('${p.id}')` : ''}">
            <div class="prod-name">${p.nombre}</div>
            <div class="prod-price">$${p.precioUSD.toFixed(2)}</div>
            <div class="prod-stock">${p.stock > 0 ? 'Stock: ' + p.stock : 'Agotado'}</div>
        </div>
    `).join('');
}

function buscarProductoParaVenta() {
    renderProductosVenta();
}

function agregarAlCarrito(prodId) {
    const prod = state.productos.find(p => p.id === prodId);
    if (!prod || prod.stock <= 0) return;

    const existente = state.carrito.find(c => c.prodId === prodId);
    if (existente) {
        if (existente.cantidad >= prod.stock) {
            showToast('No hay más stock disponible', 'error');
            return;
        }
        existente.cantidad++;
    } else {
        state.carrito.push({
            prodId: prodId,
            nombre: prod.nombre,
            precioUSD: prod.precioUSD,
            cantidad: 1
        });
    }

    renderCarritoVenta();
}

function cambiarCantidadCarrito(prodId, delta) {
    const item = state.carrito.find(c => c.prodId === prodId);
    if (!item) return;

    const prod = state.productos.find(p => p.id === prodId);
    item.cantidad += delta;

    if (item.cantidad <= 0) {
        state.carrito = state.carrito.filter(c => c.prodId !== prodId);
    } else if (prod && item.cantidad > prod.stock) {
        item.cantidad = prod.stock;
        showToast('Stock máximo alcanzado', 'error');
    }

    renderCarritoVenta();
}

function eliminarDelCarrito(prodId) {
    state.carrito = state.carrito.filter(c => c.prodId !== prodId);
    renderCarritoVenta();
}

function limpiarCarrito() {
    state.carrito = [];
    renderCarritoVenta();
}

function renderCarritoVenta() {
    const container = document.getElementById('cartItems');
    if (!container) return;

    if (state.carrito.length === 0) {
        container.innerHTML = '<p class="empty-cart">Carrito vacío</p>';
        document.getElementById('cartSubtotal').textContent = '$0.00';
        document.getElementById('cartIVA').textContent = '$0.00';
        document.getElementById('cartTotal').textContent = '$0.00';
        document.getElementById('cartTotalBS').textContent = 'Bs. 0.00';
        return;
    }

    container.innerHTML = state.carrito.map(c => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${c.nombre}</div>
                <div class="cart-item-price">$${c.precioUSD.toFixed(2)} c/u</div>
            </div>
            <div class="cart-item-qty">
                <button onclick="cambiarCantidadCarrito('${c.prodId}', -1)">−</button>
                <span>${c.cantidad}</span>
                <button onclick="cambiarCantidadCarrito('${c.prodId}', 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="eliminarDelCarrito('${c.prodId}')">×</button>
        </div>
    `).join('');

    const subtotal = state.carrito.reduce((sum, c) => sum + (c.precioUSD * c.cantidad), 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    const totalBS = state.tasaBCV ? total * state.tasaBCV : 0;

    document.getElementById('cartSubtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('cartIVA').textContent = '$' + iva.toFixed(2);
    document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);
    document.getElementById('cartTotalBS').textContent = 'Bs. ' + totalBS.toFixed(2);
}

function cargarSelectClientesVenta() {
    const select = document.getElementById('ventaCliente');
    if (!select) return;
    select.innerHTML = '<option value="">Venta al público general</option>';
    state.clientes.forEach(c => {
        select.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
    });
}

function nuevaVenta() {
    state.carrito = [];
    renderCarritoVenta();
    document.getElementById('buscarProductoVenta').value = '';
    renderProductosVenta();
}

function renderVentas() {
    const tbody = document.getElementById('ventasTableBody');
    if (!tbody) return;

    let filtered = [...state.ventas].reverse();

    const desde = document.getElementById('ventasFechaDesde')?.value;
    const hasta = document.getElementById('ventasFechaHasta')?.value;
    if (desde) filtered = filtered.filter(v => v.fecha.substring(0, 10) >= desde);
    if (hasta) filtered = filtered.filter(v => v.fecha.substring(0, 10) <= hasta);

    tbody.innerHTML = filtered.length === 0
        ? '<tr><td colspan="8" style="text-align:center;padding:30px;color:#999;">No hay ventas registradas</td></tr>'
        : filtered.map((v, i) => {
            const esFiado = v.metodoPago === 'fiado';
            const estado = v.estado || 'pagada';
            return `<tr>
                <td>#${state.ventas.indexOf(v) + 1}</td>
                <td>${formatearFecha(v.fecha.substring(0, 10))}</td>
                <td>${v.clienteNombre}</td>
                <td>${v.items.length} producto(s)</td>
                <td>$${v.totalUSD.toFixed(2)}</td>
                <td>Bs. ${v.totalBS.toFixed(2)}</td>
                <td>${esFiado ? '<span class="badge badge-pendiente">Fiado</span>' : capitalizar(v.metodoPago)}</td>
                <td class="action-btns">
                    <button class="btn-sm btn-secondary" onclick="verDetalleVenta('${v.id}')" title="Ver detalle">Ver</button>
                    ${esFiado && estado === 'pendiente' ? `<button class="btn-sm btn-success" onclick="marcarVentaPagada('${v.id}')" title="Marcar como pagada">Cobrar</button>` : ''}
                    <button class="btn-sm btn-secondary" onclick="imprimirComprobante(state.ventas.find(x=>x.id==='${v.id}'))" title="Imprimir">Print</button>
                    <button class="btn-delete-venta" onclick="eliminarVenta('${v.id}')" title="Eliminar venta">X</button>
                </td>
            </tr>`;
        }).join('');
}

function filtrarVentas() {
    renderVentas();
}

function verDetalleVenta(id) {
    const v = state.ventas.find(x => x.id === id);
    if (!v) return;

    const esFiado = v.metodoPago === 'fiado';
    const estado = v.estado || 'pagada';

    const html = `
        <div style="padding:20px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:15px;">
                <h3>Venta #${state.ventas.indexOf(v) + 1}</h3>
                ${esFiado ? `<span class="badge badge-pendiente">Fiado - ${estado === 'pagada' ? 'Pagada' : 'Pendiente'}</span>` : `<span class="badge badge-pagado">Pagada</span>`}
            </div>
            <p><strong>Fecha:</strong> ${new Date(v.fecha).toLocaleString('es-ES')}</p>
            <p><strong>Cliente:</strong> ${v.clienteNombre}</p>
            <p><strong>Metodo de pago:</strong> ${capitalizar(v.metodoPago)}</p>
            <p><strong>Tasa BCV:</strong> ${v.tasaBCV ? v.tasaBCV.toFixed(2) : 'N/A'}</p>
            <hr style="margin:15px 0;">
            <table class="data-table" style="margin-bottom:15px;">
                <thead>
                    <tr><th>Producto</th><th>Precio</th><th>Cant.</th><th>Subtotal</th></tr>
                </thead>
                <tbody>
                    ${v.items.map(item => `
                        <tr>
                            <td>${item.nombre}</td>
                            <td>$${item.precioUSD.toFixed(2)}</td>
                            <td>${item.cantidad}</td>
                            <td>$${item.subtotal.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div style="text-align:right;">
                <p>Subtotal: <strong>$${v.subtotal.toFixed(2)}</strong></p>
                <p>IVA (16%): <strong>$${v.iva.toFixed(2)}</strong></p>
                <p style="font-size:18px;color:var(--primary);">TOTAL: <strong>$${v.totalUSD.toFixed(2)} | Bs. ${v.totalBS.toFixed(2)}</strong></p>
            </div>
            ${esFiado && estado === 'pendiente' ? `<div style="text-align:center;margin-top:15px;"><button class="btn-success" onclick="marcarVentaPagada('${v.id}');cerrarModal('detalleVentaModal')">Marcar como Pagada</button></div>` : ''}
        </div>
    `;

    document.getElementById('detalleVentaContenido').innerHTML = html;
    document.getElementById('detalleVentaModal').classList.add('active');
}

function imprimirComprobante(venta) {
    if (!venta) return;

    const w = window.open('', '_blank');
    w.document.write(`
        <html><head><title>Comprobante</title>
        <style>
            body { font-family: Arial; padding: 20px; max-width: 400px; margin: 0 auto; }
            h2 { text-align: center; margin-bottom: 5px; }
            .center { text-align: center; color: #666; font-size: 13px; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { padding: 6px 4px; border-bottom: 1px dashed #ddd; text-align: left; font-size: 13px; }
            .total { text-align: right; font-size: 16px; font-weight: bold; margin-top: 10px; }
            .nota { text-align: center; color: #999; font-size: 11px; margin-top: 20px; }
        </style></head><body>
            <h2>${state.config.empresa.nombre || 'ControlPro'}</h2>
            <div class="center">${state.config.empresa.direccion || ''}<br>${state.config.empresa.telefono || ''}</div>
            <hr>
            <p><strong>Comprobante de Venta</strong></p>
            <p>Fecha: ${new Date(venta.fecha).toLocaleString('es-ES')}</p>
            <p>Cliente: ${venta.clienteNombre}</p>
            <p>Método: ${capitalizar(venta.metodoPago)}</p>
            <table>
                <thead><tr><th>Item</th><th>Cant</th><th>Precio</th><th>Subt</th></tr></thead>
                <tbody>
                    ${venta.items.map(i => `<tr><td>${i.nombre}</td><td>${i.cantidad}</td><td>$${i.precioUSD.toFixed(2)}</td><td>$${i.subtotal.toFixed(2)}</td></tr>`).join('')}
                </tbody>
            </table>
            <div class="total">TOTAL: $${venta.totalUSD.toFixed(2)} | Bs. ${venta.totalBS.toFixed(2)}</div>
            <p class="nota">¡Gracias por su compra!</p>
        </body></html>
    `);
    w.document.close();
    w.print();
}

function exportarVentasCSV() {
    if (state.ventas.length === 0) {
        showToast('No hay ventas para exportar', 'error');
        return;
    }

    let csv = 'N°,Fecha,Cliente,Subtotal USD,IVA USD,Total USD,Total BS,Método,Tasa BCV\n';
    state.ventas.forEach((v, i) => {
        csv += `${i + 1},"${new Date(v.fecha).toLocaleString('es-ES')}","${v.clienteNombre}",${v.subtotal.toFixed(2)},${v.iva.toFixed(2)},${v.totalUSD.toFixed(2)},${v.totalBS.toFixed(2)},"${v.metodoPago}",${v.tasaBCV || ''}\n`;
    });

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ventas_controlpro_${new Date().toISOString().substring(0, 10)}.csv`;
    link.click();
    showToast('CSV exportado', 'success');
}

// ============================================
// ESTADÍSTICAS Y GRÁFICAS
// ============================================
let chartVentasMes = null;
let chartMetodosPago = null;
let chartDiasSemana = null;

function cargarEstadisticas() {
    const periodo = document.getElementById('statsPeriodo')?.value || 'mes';
    const ahora = new Date();
    let ventasFiltradas = [...state.ventas];

    if (periodo === 'mes') {
        const mesActual = ahora.toISOString().substring(0, 7);
        ventasFiltradas = ventasFiltradas.filter(v => v.fecha.substring(0, 7) === mesActual);
    } else if (periodo === 'trimestre') {
        const hace3meses = new Date(ahora);
        hace3meses.setMonth(hace3meses.getMonth() - 3);
        ventasFiltradas = ventasFiltradas.filter(v => new Date(v.fecha) >= hace3meses);
    } else if (periodo === 'ano') {
        const anoActual = ahora.getFullYear().toString();
        ventasFiltradas = ventasFiltradas.filter(v => v.fecha.substring(0, 4) === anoActual);
    }

    const totalUSD = ventasFiltradas.reduce((sum, v) => sum + v.totalUSD, 0);
    const totalBS = ventasFiltradas.reduce((sum, v) => sum + v.totalBS, 0);
    const totalProductos = ventasFiltradas.reduce((sum, v) => sum + v.items.reduce((s, i) => s + i.cantidad, 0), 0);
    const clientesUnicos = [...new Set(ventasFiltradas.map(v => v.clienteId).filter(Boolean))].length;

    setText('statsVentasMesUSD', '$' + totalUSD.toFixed(2));
    setText('statsVentasMesBS', 'Bs. ' + totalBS.toFixed(2));
    setText('statsProductosVendidos', totalProductos.toString());
    setText('statsTicketPromedio', 'Ticket promedio: $' + (ventasFiltradas.length > 0 ? (totalUSD / ventasFiltradas.length).toFixed(2) : '0.00'));
    setText('statsClientesAtendidos', clientesUnicos.toString());

    // Mejor día
    const ventasPorDia = {};
    ventasFiltradas.forEach(v => {
        const dia = v.fecha.substring(0, 10);
        ventasPorDia[dia] = (ventasPorDia[dia] || 0) + v.totalUSD;
    });
    const mejorDia = Object.entries(ventasPorDia).sort((a, b) => b[1] - a[1])[0];
    setText('statsMejorDia', mejorDia ? formatearFecha(mejorDia[0]) : '--');
    setText('statsMejorDiaMonto', mejorDia ? '$' + mejorDia[1].toFixed(2) : '$0.00');

    // Gráfica: Ventas por mes
    renderChartVentasMes(periodo);

    // Gráfica: Métodos de pago
    renderChartMetodosPago(ventasFiltradas);

    // Gráfica: Días de semana
    renderChartDiasSemana(ventasFiltradas);

    // Top productos
    renderTopProductos(ventasFiltradas);
}

function renderChartVentasMes(periodo) {
    const canvas = document.getElementById('chartVentasMes');
    if (!canvas) return;

    const ahora = new Date();
    const meses = [];
    const totales = [];
    const mesesNombres = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    let numMeses = periodo === 'mes' ? 1 : periodo === 'trimestre' ? 3 : periodo === 'ano' ? 12 : 12;

    for (let i = numMeses - 1; i >= 0; i--) {
        const f = new Date(ahora);
        f.setMonth(f.getMonth() - i);
        const clave = f.toISOString().substring(0, 7);
        meses.push(mesesNombres[f.getMonth()] + ' ' + f.getFullYear().toString().substring(2));

        const total = state.ventas
            .filter(v => v.fecha.substring(0, 7) === clave)
            .reduce((sum, v) => sum + v.totalUSD, 0);
        totales.push(total);
    }

    if (chartVentasMes) chartVentasMes.destroy();

    chartVentasMes = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: [{
                label: 'Ventas USD',
                data: totales,
                backgroundColor: 'rgba(37, 99, 235, 0.7)',
                borderColor: '#2563eb',
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, ticks: { callback: v => '$' + v } }
            }
        }
    });
}

function renderChartMetodosPago(ventas) {
    const canvas = document.getElementById('chartMetodosPago');
    if (!canvas) return;

    const conteo = {};
    ventas.forEach(v => {
        conteo[v.metodoPago] = (conteo[v.metodoPago] || 0) + v.totalUSD;
    });

    const labels = Object.keys(conteo).map(capitalizar);
    const data = Object.values(conteo);
    const colores = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

    if (chartMetodosPago) chartMetodosPago.destroy();

    chartMetodosPago = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colores.slice(0, data.length),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function renderChartDiasSemana(ventas) {
    const canvas = document.getElementById('chartDiasSemana');
    if (!canvas) return;

    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const totales = new Array(7).fill(0);

    ventas.forEach(v => {
        const d = new Date(v.fecha).getDay();
        totales[d] += v.totalUSD;
    });

    if (chartDiasSemana) chartDiasSemana.destroy();

    chartDiasSemana = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: dias,
            datasets: [{
                label: 'Ventas USD',
                data: totales,
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#2563eb', '#ec4899'],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, ticks: { callback: v => '$' + v } }
            }
        }
    });
}

function renderTopProductos(ventas) {
    const container = document.getElementById('topProductosVendidos');
    if (!container) return;

    const conteo = {};
    ventas.forEach(v => {
        v.items.forEach(item => {
            if (!conteo[item.prodId]) {
                conteo[item.prodId] = { nombre: item.nombre, cantidad: 0, total: 0 };
            }
            conteo[item.prodId].cantidad += item.cantidad;
            conteo[item.prodId].total += item.subtotal;
        });
    });

    const top = Object.entries(conteo).sort((a, b) => b[1].total - a[1].total).slice(0, 5);

    if (top.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;padding:20px;">Sin datos aún</p>';
        return;
    }

    container.innerHTML = top.map(([_, p], i) => `
        <div class="top-producto-item">
            <div class="top-producto-rank">${i + 1}</div>
            <div class="top-producto-info">
                <div class="top-producto-name">${p.nombre}</div>
                <div class="top-producto-cant">${p.cantidad} vendidos</div>
            </div>
            <div class="top-producto-total">$${p.total.toFixed(2)}</div>
        </div>
    `).join('');
}

// ============================================
// CLIENTE RÁPIDO (DESDE EL POS)
// ============================================
function abrirModalClienteRapido() {
    document.getElementById('clienteRapidoForm').reset();
    document.getElementById('clienteRapidoModal').classList.add('active');
}

function guardarClienteRapido() {
    const nombre = document.getElementById('crNombre').value.trim();
    const telefono = document.getElementById('crTelefono').value.trim();
    if (!nombre || !telefono) {
        showToast('Nombre y teléfono son obligatorios', 'error');
        return;
    }

    const cliente = {
        id: 'cli_' + Date.now(),
        nombre: nombre,
        telefono: telefono,
        cedula: document.getElementById('crCedula').value.trim(),
        email: document.getElementById('crEmail').value.trim(),
        direccion: '',
        moneda: 'USD',
        montoUSD: 0,
        montoBS: 0,
        montoPagadoUSD: 0,
        montoPagadoBS: 0,
        fechaInicio: new Date().toISOString().split('T')[0],
        fechaVencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        descripcion: 'Cliente creado desde POS',
        estado: 'pendiente',
        tasaBCV: state.tasaBCV,
        productosAdquiridos: [],
        fechaCreacion: new Date().toISOString()
    };

    state.clientes.push(cliente);
    localStorage.setItem('cp_clientes', JSON.stringify(state.clientes));

    cerrarModal('clienteRapidoModal');
    cargarSelectClientesVenta();
    cargarSelectClientesCotizacion();

    // Seleccionar automáticamente el cliente nuevo
    document.getElementById('ventaCliente').value = cliente.id;

    showToast(`Cliente "${nombre}" creado y seleccionado`, 'success');
}

// ============================================
// VENTAS - PROCESAR
// ============================================
function procesarVenta() {
    if (state.carrito.length === 0) {
        showToast('El carrito esta vacio', 'error');
        return;
    }

    const subtotal = state.carrito.reduce((sum, c) => sum + (c.precioUSD * c.cantidad), 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    const totalBS = state.tasaBCV ? total * state.tasaBCV : 0;

    const clienteId = document.getElementById('ventaCliente').value;
    const cliente = clienteId ? state.clientes.find(c => c.id == clienteId) : null;

    const venta = {
        id: 'venta_' + Date.now(),
        fecha: new Date().toISOString(),
        clienteId: clienteId || null,
        clienteNombre: cliente ? cliente.nombre : 'Publico general',
        items: state.carrito.map(c => ({
            prodId: c.prodId,
            nombre: c.nombre,
            precioUSD: c.precioUSD,
            cantidad: c.cantidad,
            subtotal: c.precioUSD * c.cantidad
        })),
        subtotal: subtotal,
        iva: iva,
        totalUSD: total,
        totalBS: totalBS,
        metodoPago: document.getElementById('ventaMetodo').value,
        estado: 'pagada',
        tasaBCV: state.tasaBCV
    };

    if (cliente) {
        cliente.montoUSD = (cliente.montoUSD || 0) + total;
        cliente.montoBS = (cliente.montoBS || 0) + totalBS;
        cliente.montoPagadoUSD = (cliente.montoPagadoUSD || 0) + total;
        cliente.montoPagadoBS = (cliente.montoPagadoBS || 0) + totalBS;

        if (!cliente.productosAdquiridos) cliente.productosAdquiridos = [];
        state.carrito.forEach(c => {
            const existente = cliente.productosAdquiridos.find(pa => pa.prodId === c.prodId);
            if (existente) {
                existente.cantidad += c.cantidad;
                existente.total += c.precioUSD * c.cantidad;
            } else {
                cliente.productosAdquiridos.push({
                    prodId: c.prodId,
                    nombre: c.nombre,
                    precioUSD: c.precioUSD,
                    cantidad: c.cantidad,
                    total: c.precioUSD * c.cantidad,
                    fechaCompra: new Date().toISOString()
                });
            }
        });

        cliente.estado = cliente.montoUSD > cliente.montoPagadoUSD ? 'pendiente' : 'pagado';
        localStorage.setItem('cp_clientes', JSON.stringify(state.clientes));
    }

    state.carrito.forEach(c => {
        const prod = state.productos.find(p => p.id === c.prodId);
        if (prod) prod.stock = Math.max(0, prod.stock - c.cantidad);
    });

    state.ventas.push(venta);
    localStorage.setItem('cp_productos', JSON.stringify(state.productos));
    localStorage.setItem('cp_ventas', JSON.stringify(state.ventas));

    state.carrito = [];
    renderCarritoVenta();
    renderProductos();
    renderProductosVenta();
    renderVentas();
    renderClientes();
    renderDashboard();
    cargarEstadisticas();

    showToast(`Venta #${state.ventas.length} registrada: $${total.toFixed(2)}${cliente ? ' → ' + cliente.nombre : ''}`, 'success');

    if (confirm('Desea imprimir el comprobante?')) {
        imprimirComprobante(venta);
    }
}

// ============================================
// VENTA FIADA (CREDITO)
// ============================================
function procesarVentaFiada() {
    if (state.carrito.length === 0) {
        showToast('El carrito esta vacio', 'error');
        return;
    }

    const clienteId = document.getElementById('ventaCliente').value;
    if (!clienteId) {
        showToast('Seleccione un cliente para venta fiada', 'error');
        return;
    }

    const cliente = state.clientes.find(c => c.id == clienteId);
    if (!cliente) {
        showToast('Cliente no encontrado', 'error');
        return;
    }

    const subtotal = state.carrito.reduce((sum, c) => sum + (c.precioUSD * c.cantidad), 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    const totalBS = state.tasaBCV ? total * state.tasaBCV : 0;

    const venta = {
        id: 'venta_' + Date.now(),
        fecha: new Date().toISOString(),
        clienteId: clienteId,
        clienteNombre: cliente.nombre,
        items: state.carrito.map(c => ({
            prodId: c.prodId,
            nombre: c.nombre,
            precioUSD: c.precioUSD,
            cantidad: c.cantidad,
            subtotal: c.precioUSD * c.cantidad
        })),
        subtotal: subtotal,
        iva: iva,
        totalUSD: total,
        totalBS: totalBS,
        metodoPago: 'fiado',
        estado: 'pendiente',
        tasaBCV: state.tasaBCV
    };

    cliente.montoUSD = (cliente.montoUSD || 0) + total;
    cliente.montoBS = (cliente.montoBS || 0) + totalBS;

    if (!cliente.productosAdquiridos) cliente.productosAdquiridos = [];
    state.carrito.forEach(c => {
        const existente = cliente.productosAdquiridos.find(pa => pa.prodId === c.prodId);
        if (existente) {
            existente.cantidad += c.cantidad;
            existente.total += c.precioUSD * c.cantidad;
        } else {
            cliente.productosAdquiridos.push({
                prodId: c.prodId,
                nombre: c.nombre,
                precioUSD: c.precioUSD,
                cantidad: c.cantidad,
                total: c.precioUSD * c.cantidad,
                fechaCompra: new Date().toISOString()
            });
        }
    });

    cliente.estado = 'pendiente';
    localStorage.setItem('cp_clientes', JSON.stringify(state.clientes));

    state.carrito.forEach(c => {
        const prod = state.productos.find(p => p.id === c.prodId);
        if (prod) prod.stock = Math.max(0, prod.stock - c.cantidad);
    });

    state.ventas.push(venta);
    localStorage.setItem('cp_productos', JSON.stringify(state.productos));
    localStorage.setItem('cp_ventas', JSON.stringify(state.ventas));

    state.carrito = [];
    renderCarritoVenta();
    renderProductos();
    renderProductosVenta();
    renderVentas();
    renderClientes();
    renderDashboard();
    cargarEstadisticas();

    showToast(`Venta fiada #${state.ventas.length}: $${total.toFixed(2)} → ${cliente.nombre}`, 'success');
}

// ============================================
// ELIMINAR VENTAS
// ============================================
function marcarVentaPagada(id) {
    const venta = state.ventas.find(v => v.id === id);
    if (!venta) return;
    if (venta.metodoPago !== 'fiado') return;

    venta.estado = 'pagada';

    // Actualizar deuda del cliente
    if (venta.clienteId) {
        const cliente = state.clientes.find(c => c.id == venta.clienteId);
        if (cliente) {
            cliente.montoPagadoUSD = (cliente.montoPagadoUSD || 0) + venta.totalUSD;
            cliente.montoPagadoBS = (cliente.montoPagadoBS || 0) + venta.totalBS;
            cliente.estado = cliente.montoUSD > cliente.montoPagadoUSD ? 'pendiente' : 'pagado';
            localStorage.setItem('cp_clientes', JSON.stringify(state.clientes));
        }
    }

    localStorage.setItem('cp_ventas', JSON.stringify(state.ventas));
    renderVentas();
    renderClientes();
    renderDashboard();
    cargarEstadisticas();
    showToast(`Venta #${state.ventas.indexOf(venta) + 1} marcada como pagada`, 'success');
}

function eliminarVenta(id) {
    if (!confirm('¿Está seguro de eliminar esta venta? Se devolverá el stock y se actualizarán las deudas de clientes.')) return;

    const venta = state.ventas.find(v => v.id === id);
    if (!venta) return;

    // Devolver stock
    venta.items.forEach(item => {
        const prod = state.productos.find(p => p.id === item.prodId);
        if (prod) {
            prod.stock += item.cantidad;
        }
    });

    // Actualizar deuda del cliente
    if (venta.clienteId) {
        const cliente = state.clientes.find(c => c.id == venta.clienteId);
        if (cliente) {
            cliente.montoUSD = Math.max(0, (cliente.montoUSD || 0) - venta.totalUSD);
            cliente.montoBS = Math.max(0, (cliente.montoBS || 0) - venta.totalBS);

            // Si la venta ya estaba pagada (no era fiada), tambien descontar de lo pagado
            if (venta.estado === 'pagada' && venta.metodoPago !== 'fiado') {
                cliente.montoPagadoUSD = Math.max(0, (cliente.montoPagadoUSD || 0) - venta.totalUSD);
                cliente.montoPagadoBS = Math.max(0, (cliente.montoPagadoBS || 0) - venta.totalBS);
            }

            if (cliente.productosAdquiridos) {
                venta.items.forEach(item => {
                    const pa = cliente.productosAdquiridos.find(p => p.prodId === item.prodId);
                    if (pa) {
                        pa.cantidad -= item.cantidad;
                        pa.total -= item.subtotal;
                        if (pa.cantidad <= 0) {
                            cliente.productosAdquiridos = cliente.productosAdquiridos.filter(p => p.prodId !== item.prodId);
                        }
                    }
                });
            }

            cliente.estado = cliente.montoUSD > cliente.montoPagadoUSD ? 'pendiente' : 'pagado';
            localStorage.setItem('cp_clientes', JSON.stringify(state.clientes));
        }
    }

    state.ventas = state.ventas.filter(v => v.id !== id);
    localStorage.setItem('cp_ventas', JSON.stringify(state.ventas));
    localStorage.setItem('cp_productos', JSON.stringify(state.productos));

    renderVentas();
    renderProductos();
    renderProductosVenta();
    renderClientes();
    renderDashboard();
    cargarEstadisticas();
    showToast('Venta eliminada y stock devuelto', 'success');
}

// ============================================
// COTIZACIONES
// ============================================
function nuevaCotizacion() {
    state.carritoCotizacion = [];
    document.getElementById('cotizadorForm').style.display = 'block';
    document.getElementById('buscarProductoCotizacion').value = '';
    renderProductosCotizacion();
    renderCarritoCotizacion();
}

function cancelarCotizacion() {
    state.carritoCotizacion = [];
    document.getElementById('cotizadorForm').style.display = 'none';
}

function buscarProductoParaCotizacion() {
    renderProductosCotizacion();
}

function renderProductosCotizacion() {
    const grid = document.getElementById('productsGridCotizacion');
    if (!grid) return;

    const busqueda = normalizar(document.getElementById('buscarProductoCotizacion')?.value);
    let filtered = state.productos.filter(p =>
        p.stock > 0 && (
            normalizar(p.nombre).includes(busqueda) ||
            normalizar(p.codigo).includes(busqueda) ||
            normalizar(p.categoria).includes(busqueda)
        )
    );

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:#999;padding:20px;">Sin productos disponibles</p>';
        return;
    }

    grid.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="agregarAlCarritoCotizacion('${p.id}')">
            <div class="prod-name">${p.nombre}</div>
            <div class="prod-price">$${p.precioUSD.toFixed(2)}</div>
            <div class="prod-stock">Stock: ${p.stock}</div>
        </div>
    `).join('');
}

function agregarAlCarritoCotizacion(prodId) {
    const prod = state.productos.find(p => p.id === prodId);
    if (!prod || prod.stock <= 0) return;

    const existente = state.carritoCotizacion.find(c => c.prodId === prodId);
    if (existente) {
        existente.cantidad++;
    } else {
        state.carritoCotizacion.push({
            prodId: prodId,
            nombre: prod.nombre,
            precioUSD: prod.precioUSD,
            cantidad: 1
        });
    }
    renderCarritoCotizacion();
}

function cambiarCantidadCotizacion(prodId, delta) {
    const item = state.carritoCotizacion.find(c => c.prodId === prodId);
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        state.carritoCotizacion = state.carritoCotizacion.filter(c => c.prodId !== prodId);
    }
    renderCarritoCotizacion();
}

function eliminarDelCarritoCotizacion(prodId) {
    state.carritoCotizacion = state.carritoCotizacion.filter(c => c.prodId !== prodId);
    renderCarritoCotizacion();
}

function renderCarritoCotizacion() {
    const container = document.getElementById('cotizacionItems');
    if (!container) return;

    if (state.carritoCotizacion.length === 0) {
        container.innerHTML = '<p class="empty-cart">Agregue productos</p>';
        document.getElementById('cotizacionSubtotal').textContent = '$0.00';
        document.getElementById('cotizacionIVA').textContent = '$0.00';
        document.getElementById('cotizacionTotal').textContent = '$0.00';
        document.getElementById('cotizacionTotalBS').textContent = 'Bs. 0.00';
        return;
    }

    container.innerHTML = state.carritoCotizacion.map(c => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${c.nombre}</div>
                <div class="cart-item-price">$${c.precioUSD.toFixed(2)} c/u</div>
            </div>
            <div class="cart-item-qty">
                <button onclick="cambiarCantidadCotizacion('${c.prodId}', -1)">−</button>
                <span>${c.cantidad}</span>
                <button onclick="cambiarCantidadCotizacion('${c.prodId}', 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="eliminarDelCarritoCotizacion('${c.prodId}')">×</button>
        </div>
    `).join('');

    const subtotal = state.carritoCotizacion.reduce((sum, c) => sum + (c.precioUSD * c.cantidad), 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    const totalBS = state.tasaBCV ? total * state.tasaBCV : 0;

    document.getElementById('cotizacionSubtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('cotizacionIVA').textContent = '$' + iva.toFixed(2);
    document.getElementById('cotizacionTotal').textContent = '$' + total.toFixed(2);
    document.getElementById('cotizacionTotalBS').textContent = 'Bs. ' + totalBS.toFixed(2);
}

function cargarSelectClientesCotizacion() {
    const select = document.getElementById('cotizacionCliente');
    if (!select) return;
    select.innerHTML = '<option value="">Sin cliente</option>';
    state.clientes.forEach(c => {
        select.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
    });
}

function guardarCotizacion() {
    if (state.carritoCotizacion.length === 0) {
        showToast('Agregue productos a la cotización', 'error');
        return;
    }

    const subtotal = state.carritoCotizacion.reduce((sum, c) => sum + (c.precioUSD * c.cantidad), 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    const clienteId = document.getElementById('cotizacionCliente').value;
    const cliente = clienteId ? state.clientes.find(c => c.id == clienteId) : null;

    const cotizacion = {
        id: 'cot_' + Date.now(),
        fecha: new Date().toISOString(),
        clienteId: clienteId || null,
        clienteNombre: cliente ? cliente.nombre : 'Sin cliente',
        clienteTelefono: cliente ? cliente.telefono : '',
        items: state.carritoCotizacion.map(c => ({
            prodId: c.prodId,
            nombre: c.nombre,
            precioUSD: c.precioUSD,
            cantidad: c.cantidad,
            subtotal: c.precioUSD * c.cantidad
        })),
        subtotal: subtotal,
        iva: iva,
        totalUSD: total,
        totalBS: state.tasaBCV ? total * state.tasaBCV : 0,
        validez: parseInt(document.getElementById('cotizacionValidez').value),
        notas: document.getElementById('cotizacionNotas').value,
        estado: 'pendiente',
        tasaBCV: state.tasaBCV
    };

    state.cotizaciones.push(cotizacion);
    localStorage.setItem('cp_cotizaciones', JSON.stringify(state.cotizaciones));

    state.carritoCotizacion = [];
    document.getElementById('cotizadorForm').style.display = 'none';
    renderCotizaciones();
    showToast('Cotización guardada', 'success');
}

function enviarCotizacionWhatsApp() {
    if (state.carritoCotizacion.length === 0) {
        showToast('Agregue productos primero', 'error');
        return;
    }

    const clienteId = document.getElementById('cotizacionCliente').value;
    const cliente = clienteId ? state.clientes.find(c => c.id == clienteId) : null;
    const telefono = cliente ? cliente.telefono.replace(/[^0-9]/g, '') : '';

    const subtotal = state.carritoCotizacion.reduce((sum, c) => sum + (c.precioUSD * c.cantidad), 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    const totalBS = state.tasaBCV ? total * state.tasaBCV : 0;
    const validez = document.getElementById('cotizacionValidez').value;
    const notas = document.getElementById('cotizacionNotas').value;

    let msg = `📋 *COTIZACIÓN - ${state.config.empresa.nombre || 'ControlPro'}*\n`;
    msg += `📅 Fecha: ${new Date().toLocaleDateString('es-ES')}\n`;
    if (cliente) msg += `👤 Cliente: ${cliente.nombre}\n`;
    msg += `\n*Detalle:*\n`;

    state.carritoCotizacion.forEach(c => {
        msg += `• ${c.nombre} x${c.cantidad} - $${(c.precioUSD * c.cantidad).toFixed(2)}\n`;
    });

    msg += `\nSubtotal: $${subtotal.toFixed(2)}`;
    msg += `\nIVA (16%): $${iva.toFixed(2)}`;
    msg += `\n*TOTAL: $${total.toFixed(2)} (Bs. ${totalBS.toFixed(2)})*`;
    msg += `\n\n⏱️ Validez: ${validez} días`;
    if (notas) msg += `\n📝 ${notas}`;
    msg += `\n\n¡Gracias por su preferencia!`;

    if (telefono) {
        window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(msg)}`, '_blank');
    } else {
        // Copiar al portapapeles
        navigator.clipboard.writeText(msg).then(() => {
            showToast('Cotización copiada al portapapeles. Pegue en WhatsApp.', 'success');
        });
    }

    // Guardar cotización automáticamente
    guardarCotizacion();
}

function renderCotizaciones() {
    const tbody = document.getElementById('cotizacionesTableBody');
    if (!tbody) return;

    let filtered = [...state.cotizaciones].reverse();

    tbody.innerHTML = filtered.length === 0
        ? '<tr><td colspan="8" style="text-align:center;padding:30px;color:#999;">No hay cotizaciones</td></tr>'
        : filtered.map((c, i) => `
            <tr>
                <td>#${state.cotizaciones.indexOf(c) + 1}</td>
                <td>${formatearFecha(c.fecha.substring(0, 10))}</td>
                <td>${c.clienteNombre}</td>
                <td>${c.items.length} producto(s)</td>
                <td>$${c.totalUSD.toFixed(2)}</td>
                <td>${c.validez} días</td>
                <td><span class="cotizacion-estado ${c.estado}">${capitalizar(c.estado)}</span></td>
                <td class="action-btns">
                    <button class="btn-sm btn-secondary" onclick="verDetalleCotizacion('${c.id}')">👁️</button>
                    <button class="btn-sm btn-secondary" onclick="reenviarCotizacionWhatsApp('${c.id}')">📱</button>
                    <button class="btn-sm btn-secondary" onclick="cambiarEstadoCotizacion('${c.id}', 'aceptada')">✅</button>
                    <button class="btn-sm btn-danger" onclick="eliminarCotizacion('${c.id}')">🗑️</button>
                </td>
            </tr>
        `).join('');
}

function verDetalleCotizacion(id) {
    const c = state.cotizaciones.find(x => x.id === id);
    if (!c) return;

    const html = `
        <div style="padding:20px;">
            <h3 style="margin-bottom:15px;">Cotización #${state.cotizaciones.indexOf(c) + 1}</h3>
            <p><strong>Fecha:</strong> ${new Date(c.fecha).toLocaleString('es-ES')}</p>
            <p><strong>Cliente:</strong> ${c.clienteNombre}</p>
            <p><strong>Validez:</strong> ${c.validez} días</p>
            <p><strong>Estado:</strong> <span class="cotizacion-estado ${c.estado}">${capitalizar(c.estado)}</span></p>
            ${c.notas ? `<p><strong>Notas:</strong> ${c.notas}</p>` : ''}
            <hr style="margin:15px 0;">
            <table class="data-table" style="margin-bottom:15px;">
                <thead>
                    <tr><th>Producto</th><th>Precio</th><th>Cant.</th><th>Subtotal</th></tr>
                </thead>
                <tbody>
                    ${c.items.map(item => `
                        <tr>
                            <td>${item.nombre}</td>
                            <td>$${item.precioUSD.toFixed(2)}</td>
                            <td>${item.cantidad}</td>
                            <td>$${item.subtotal.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div style="text-align:right;">
                <p>Subtotal: <strong>$${c.subtotal.toFixed(2)}</strong></p>
                <p>IVA (16%): <strong>$${c.iva.toFixed(2)}</strong></p>
                <p style="font-size:18px;color:var(--primary);">TOTAL: <strong>$${c.totalUSD.toFixed(2)} | Bs. ${c.totalBS.toFixed(2)}</strong></p>
            </div>
        </div>
    `;

    document.getElementById('detalleCotizacionContenido').innerHTML = html;
    document.getElementById('detalleCotizacionModal').classList.add('active');
}

function reenviarCotizacionWhatsApp(id) {
    const c = state.cotizaciones.find(x => x.id === id);
    if (!c) return;

    const telefono = c.clienteTelefono ? c.clienteTelefono.replace(/[^0-9]/g, '') : '';

    let msg = `📋 *COTIZACIÓN - ${state.config.empresa.nombre || 'ControlPro'}*\n`;
    msg += `📅 Fecha: ${new Date(c.fecha).toLocaleDateString('es-ES')}\n`;
    if (c.clienteNombre !== 'Sin cliente') msg += `👤 Cliente: ${c.clienteNombre}\n`;
    msg += `\n*Detalle:*\n`;

    c.items.forEach(item => {
        msg += `• ${item.nombre} x${item.cantidad} - $${item.subtotal.toFixed(2)}\n`;
    });

    msg += `\nSubtotal: $${c.subtotal.toFixed(2)}`;
    msg += `\nIVA (16%): $${c.iva.toFixed(2)}`;
    msg += `\n*TOTAL: $${c.totalUSD.toFixed(2)} (Bs. ${c.totalBS.toFixed(2)})*`;
    msg += `\n\n⏱️ Validez: ${c.validez} días`;
    if (c.notas) msg += `\n📝 ${c.notas}`;

    if (telefono) {
        window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(msg)}`, '_blank');
    } else {
        navigator.clipboard.writeText(msg).then(() => {
            showToast('Cotización copiada al portapapeles', 'success');
        });
    }
}

function cambiarEstadoCotizacion(id, estado) {
    const c = state.cotizaciones.find(x => x.id === id);
    if (!c) return;
    c.estado = estado;
    localStorage.setItem('cp_cotizaciones', JSON.stringify(state.cotizaciones));
    renderCotizaciones();
    showToast('Estado actualizado', 'success');
}

function eliminarCotizacion(id) {
    if (!confirm('¿Eliminar esta cotización?')) return;
    state.cotizaciones = state.cotizaciones.filter(c => c.id !== id);
    localStorage.setItem('cp_cotizaciones', JSON.stringify(state.cotizaciones));
    renderCotizaciones();
    showToast('Cotización eliminada', 'success');
}

// ============================================
// CALCULADORA
// ============================================
let calcExpression = '';

function initCalculadora() {
    const el = document.getElementById('calcTasaBCV');
    if (el && state.tasaBCV) {
        el.textContent = 'Bs. ' + state.tasaBCV.toFixed(2);
    } else if (el) {
        el.textContent = 'No disponible';
    }
    const fechaEl = document.getElementById('calcTasaFecha');
    if (fechaEl && state.fechaTasaBCV) {
        fechaEl.textContent = 'Actualizado: ' + formatearFecha(state.fechaTasaBCV);
    }
    renderQuickConversions();
}

function convertirUSD() {
    const usd = parseFloat(document.getElementById('calcUSD').value) || 0;
    if (state.tasaBCV) {
        document.getElementById('calcBS').value = (usd * state.tasaBCV).toFixed(2);
    }
}

function convertirBS() {
    const bs = parseFloat(document.getElementById('calcBS').value) || 0;
    if (state.tasaBCV) {
        document.getElementById('calcUSD').value = (bs / state.tasaBCV).toFixed(2);
    }
}

function renderQuickConversions() {
    const container = document.getElementById('quickConversions');
    if (!container || !state.tasaBCV) return;

    const montos = [1, 5, 10, 20, 50, 100, 500, 1000];
    container.innerHTML = montos.map(m => `
        <div class="quick-conv-item">
            <span>$${m}</span>
            <span>Bs. ${(m * state.tasaBCV).toFixed(2)}</span>
        </div>
    `).join('');
}

function calcInput(val) {
    calcExpression += val;
    document.getElementById('calcDisplay').textContent = calcExpression;
}

function calcClear() {
    calcExpression = '';
    document.getElementById('calcDisplay').textContent = '0';
}

function calcResult() {
    try {
        const result = eval(calcExpression);
        document.getElementById('calcDisplay').textContent = result;
        calcExpression = result.toString();
    } catch {
        document.getElementById('calcDisplay').textContent = 'Error';
        calcExpression = '';
    }
}
