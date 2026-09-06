const IGV = 0.18; //
let carrito = [];
let categoriaActual = 'Café';

// Arreglo de objetos
const inventario = [
    { id: 1, nombre: "Café Americano", precio: 8.50, categoria: "Café", imagen: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop" },
    { id: 2, nombre: "Mocca Caliente", precio: 12.00, categoria: "Café", imagen: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&h=300&fit=crop" },
    { id: 3, nombre: "Latte Macchiato", precio: 11.50, categoria: "Café", imagen: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop" },
    { id: 4, nombre: "Té Helado Limón", precio: 9.00, categoria: "Bebidas", imagen: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop" },
    { id: 5, nombre: "Croissant de Mantequilla", precio: 6.50, categoria: "Snacks", imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&h=300&fit=crop" },
    { id: 6, nombre: "Torta de Chocolate", precio: 14.00, categoria: "Postres", imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&h=300&fit=crop" },
    { id: 7, nombre: "Empanada de Carne", precio: 7.00, categoria: "Snacks", imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&h=300&fit=crop" }
];

// Lab 4: Valores únicos con Set
const inicializarCategorias = () => {
    const listaCategorias = inventario.map(prod => prod.categoria);
    const categoriasUnicas = [...new Set(listaCategorias)];
    
    const contenedor = document.getElementById("contenedor-categorias");
    contenedor.innerHTML = "";
    
    categoriasUnicas.forEach(cat => {
        contenedor.innerHTML += `
            <button class="btn-cat ${cat === categoriaActual ? 'activo' : ''}" 
                    onclick="cambiarCategoria('${cat}', this)">
                ${cat}
            </button>
        `;
    });
};

// Lab 4: Funciones flecha + map
const aplicarDescuentoVIP = () => {
    if (carrito.length === 0) return alert("Agregue productos primero.");
    carrito = carrito.map(item => ({
        ...item,
        precio: parseFloat((item.precio * 0.90).toFixed(2))
    }));
    renderizarCarrito();
    alert("¡Descuento VIP del 10% aplicado a toda la orden!");
};

// Lab 3: Normalizar nombre y Extraer iniciales
const prepararNombreParaVaso = (nombre) => {
    let nombreLimpio = nombre.trim().toLowerCase().replace('_', ' ');
    let inicial = nombreLimpio.charAt(0).toUpperCase();
    return { nombreLimpio, inicial };
};

// Lab 3: Ocultar información de correo
const enmascararDatosPrivados = (correo) => {
    if(!correo) return { emailOculto: "No registrado" };
    let arrobaIndex = correo.indexOf('@');
    let emailOculto = correo.substring(0, 3) + "***" + correo.substring(arrobaIndex);
    return { emailOculto };
};

// Lab 3: Generar palabra
const generarNumeroOrden = (apellidos, nombre, dni) => {
    let inicialesApellidos = apellidos ? apellidos.split(' ').map(p => p.charAt(0)).join('') : 'XX';
    let inicialNombre = nombre ? nombre.charAt(0) : 'X';
    let numerosDni = dni ? dni.slice(-2) : '00';
    return `${inicialesApellidos.toUpperCase()}${inicialNombre.toUpperCase()}${numerosDni}`;
};

const renderizarProductos = (filtroTexto = "") => {
    const contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = "";

    const filtrados = inventario.filter(p => 
        p.categoria === categoriaActual && 
        p.nombre.toLowerCase().includes(filtroTexto.toLowerCase())
    );

    filtrados.forEach(p => {
        contenedor.innerHTML += `
            <div class="tarjeta-producto" onclick="agregarAlCarrito(${p.id})">
                <img src="${p.imagen}" alt="${p.nombre}" class="img-producto">
                <h3>${p.nombre}</h3>
                <p class="precio">S/ ${p.precio.toFixed(2)}</p>
            </div>
        `;
    });
};

const renderizarCarrito = () => {
    const contenedor = document.getElementById("items-carrito");
    
    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="vacio">El carrito está vacío</p>';
        actualizarTotales(0);
        return;
    }

    contenedor.innerHTML = "";
    carrito.forEach((item, index) => {
        let textoModificador = item.modificadores ? `<br><small style="color:#888;">➤ ${item.modificadores}</small>` : '';
        
        contenedor.innerHTML += `
            <div class="item-carrito">
                <button class="item-btn" onclick="eliminarDelCarrito(${index})">✖</button>
                <span style="flex:1; margin-left:10px;">${item.nombre} <b>x${item.cantidad}</b> ${textoModificador}</span>
                <span style="font-weight:bold; color:var(--accent);">S/ ${(item.precio * item.cantidad).toFixed(2)}</span>
            </div>
        `;
    });

    // Lab 4: Reduce para calcular la suma total
    const subtotal = carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
    actualizarTotales(subtotal);
};

const actualizarTotales = (subtotal) => {
    const tax = subtotal * IGV;
    const total = Math.round((subtotal + tax) * 100) / 100; 

    document.getElementById("subtotal").innerText = `S/ ${subtotal.toFixed(2)}`;
    document.getElementById("impuesto").innerText = `S/ ${tax.toFixed(2)}`;
    document.getElementById("total").innerText = `S/ ${total.toFixed(2)}`;
};

let productoTemporal = null;


// TEMA 1 y 4: CONDICIONALES Y MODIFICADORES
const agregarAlCarrito = (id) => {
    const producto = inventario.find(p => p.id === id);

    if (producto.categoria === "Café") {
        productoTemporal = producto;
        document.getElementById("modal-nombre-producto").innerText = `Personalizar: ${producto.nombre}`;
        
        document.getElementById("mod-tamano").value = "0";
        document.getElementById("mod-leche").value = "0";
        
        document.getElementById("modal-modificadores").className = "modal-visible";
    } else {
        insertarAlCarrito(producto, "Estándar", "N/A", 0);
    }
};

const cerrarModal = () => {
    document.getElementById("modal-modificadores").className = "modal-oculto";
    productoTemporal = null;
};

const confirmarBebida = () => {
    let selectTamano = document.getElementById("mod-tamano");
    let selectLeche = document.getElementById("mod-leche");

    let extraPrecio = parseFloat(selectTamano.value) + parseFloat(selectLeche.value);

    let textoTamano = selectTamano.options[selectTamano.selectedIndex].text.split(' ')[0];
    let textoLeche = selectLeche.options[selectLeche.selectedIndex].text.split(' ')[0];

    insertarAlCarrito(productoTemporal, textoTamano, textoLeche, extraPrecio);
    cerrarModal();
};

const insertarAlCarrito = (producto, tamano, leche, extraPrecio) => {
    const idUnico = `${producto.id}-${tamano}-${leche}`;
    const itemEnCarrito = carrito.find(item => item.idUnico === idUnico);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito = [...carrito, { 
            ...producto, 
            idUnico: idUnico,
            precio: producto.precio + extraPrecio, 
            modificadores: tamano !== "Estándar" ? `${tamano}, Leche ${leche}` : '',
            cantidad: 1 
        }];
    }
    renderizarCarrito();
};

const eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    renderizarCarrito();
};

const buscarProductos = () => renderizarProductos(document.getElementById("buscador").value);

const cambiarCategoria = (nuevaCat, btnElement) => {
    categoriaActual = nuevaCat;
    document.querySelectorAll('.btn-cat').forEach(btn => btn.classList.remove('activo'));
    btnElement.classList.add('activo');
    renderizarProductos();
};

const cancelarOrden = () => {
    carrito = [];
    document.querySelectorAll('.datos-cliente input').forEach(input => input.value = '');
    renderizarCarrito();
};

const cerrarTicket = () => {
    document.getElementById("modal-ticket").className = "modal-oculto";
};

const imprimirTicket = () => {
    window.print(); 
};

const procesarPago = () => {
    if (carrito.length === 0) return alert("El carrito está vacío.");
    
    let nombre = document.getElementById("nombreCliente").value;
    let apellidos = document.getElementById("apellidosCliente").value;
    let dni = document.getElementById("dniCliente").value;
    let correo = document.getElementById("correoCliente").value;

    if(!nombre || !apellidos || dni.length < 2) {
        return alert("Por favor complete los nombres, apellidos y DNI.");
    }

    let { nombreLimpio } = prepararNombreParaVaso(nombre);
    let ordenCodigo = generarNumeroOrden(apellidos, nombre, dni);
    let { emailOculto } = enmascararDatosPrivados(correo);
    
    let totalTexto = document.getElementById("total").innerText.replace('S/ ', '');
    let totalNumerico = parseFloat(totalTexto);
    
    let estrellasGanadas = Math.floor(totalNumerico); 

    // TICKET DEL CLIENTE
    let ticketCliente = 
`==================================
     ☕ EL BUEN GRANO - RECIBO
==================================
ORDEN #: ${ordenCodigo}
Cliente: ${nombreLimpio.toUpperCase()}
Correo: ${emailOculto}
Estrellas ganadas: ${estrellasGanadas} pts
----------------------------------
${carrito.map(i => {
    let detalleMod = i.modificadores ? `\n  (${i.modificadores})` : '';
    let precioTotalItem = (i.precio * i.cantidad).toFixed(2);
    return `${i.cantidad}x ${i.nombre}${detalleMod}\n  -> S/ ${precioTotalItem}`;
}).join('\n----------------------------------\n')}
----------------------------------
TOTAL PAGADO: S/ ${totalNumerico.toFixed(2)}
==================================
     ¡Gracias por su visita!`;

    document.getElementById("ticket-texto").innerText = ticketCliente;

    document.getElementById("modal-ticket").className = "modal-visible";
    
    cancelarOrden(); 
};
// Arranque inicial
inicializarCategorias();
renderizarProductos();