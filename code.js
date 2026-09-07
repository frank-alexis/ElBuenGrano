const IGV = 0.18; //
let carrito = [];
let categoriaActual = 'Café';

// Arreglo de objetos
const inventario = [
    // --- CAFÉ ---
    { id: 1, nombre: "Café Americano", precio: 9.50, categoria: "Café", imagen: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop" },
    { id: 2, nombre: "Caffè Mocha", precio: 14.50, categoria: "Café", imagen: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&h=300&fit=crop" },
    { id: 3, nombre: "Caramel Macchiato", precio: 15.00, categoria: "Café", imagen: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop" },
    { id: 4, nombre: "Cappuccino", precio: 12.50, categoria: "Café", imagen: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop" },
    { id: 5, nombre: "Cold Brew", precio: 13.00, categoria: "Café", imagen: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300&h=300&fit=crop" },

    // --- BEBIDAS ---
    { id: 6, nombre: "Matcha Latte", precio: 15.50, categoria: "Bebidas", imagen: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300&h=300&fit=crop" },
    { id: 7, nombre: "Chocolate Caliente", precio: 13.50, categoria: "Bebidas", imagen: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=300&h=300&fit=crop" },
    { id: 8, nombre: "Té Chai Latte", precio: 14.00, categoria: "Bebidas", imagen: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300&h=300&fit=crop" },
    { id: 9, nombre: "Refresco Berry Hibiscus", precio: 12.00, categoria: "Bebidas", imagen: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop" },

    // --- SNACKS ---
    { id: 10, nombre: "Croissant de Mantequilla", precio: 8.50, categoria: "Snacks", imagen: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=300&h=300&fit=crop" },
    { id: 11, nombre: "Panini Pollo y Queso", precio: 18.00, categoria: "Snacks", imagen: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&h=300&fit=crop" },
    { id: 12, nombre: "Wrap de Pavo y Queso", precio: 16.50, categoria: "Snacks", imagen: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=300&fit=crop" },
    { id: 13, nombre: "Quiche Lorraine", precio: 15.00, categoria: "Snacks", imagen: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=300&h=300&fit=crop" },

    // --- POSTRES ---
    { id: 14, nombre: "Cheesecake de Maracuyá", precio: 14.50, categoria: "Postres", imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&h=300&fit=crop" },
    { id: 15, nombre: "Muffin de Arándanos", precio: 9.00, categoria: "Postres", imagen: "https://images.unsplash.com/photo-1607958996333-41aef7caefcc?w=300&h=300&fit=crop" },
    { id: 16, nombre: "Brownie con Fudge", precio: 9.50, categoria: "Postres", imagen: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=300&fit=crop" },
    { id: 17, nombre: "Torta de Zanahoria", precio: 13.50, categoria: "Postres", imagen: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=300&fit=crop" }
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

// Lab 3: Normalizar nombre y Extraer iniciales
// Lab 3: Ocultar información de correo
// Lab 3: Generar palabra

const prepararNombreParaVaso = (nombre) => {
    let nombreLimpio = nombre.trim().toLowerCase().replace('_', ' ');
    let inicial = nombreLimpio.charAt(0).toUpperCase();
    return { nombreLimpio, inicial };
};


const enmascararDatosPrivados = (correo) => {
    if(!correo) return { emailOculto: "No registrado" };
    let arrobaIndex = correo.indexOf('@');
    let emailOculto = correo.substring(0, 3) + "***" + correo.substring(arrobaIndex);
    return { emailOculto };
};


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
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    
    let nombre = document.getElementById("nombreCliente").value.trim();
    let apellidos = document.getElementById("apellidosCliente").value.trim();
    let dni = document.getElementById("dniCliente").value.trim();
    let correo = document.getElementById("correoCliente").value.trim();

    // 1. Validar nombre y apellidos
    const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nombre || !soloLetrasRegex.test(nombre)) {
        alert("Error: El nombre solo debe contener letras.");
        document.getElementById("nombreCliente").focus();
        return;
    }
    if (!apellidos || !soloLetrasRegex.test(apellidos)) {
        alert("Error: Los apellidos solo deben contener letras.");
        document.getElementById("apellidosCliente").focus();
        return;
    }

    // 2. Validar DNI 
    const soloNumerosDniRegex = /^\d{8}$/;
    if (!soloNumerosDniRegex.test(dni)) {
        alert("Error: El DNI debe contener exactamente 8 números.");
        document.getElementById("dniCliente").focus();
        return;
    }

    // 3. Validar Correo 
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo !== "" && !correoRegex.test(correo)) {
        alert("Error: El formato del correo electrónico no es válido.");
        document.getElementById("correoCliente").focus();
        return;
    }

    let { nombreLimpio } = prepararNombreParaVaso(nombre);
    let ordenCodigo = generarNumeroOrden(apellidos, nombre, dni);
    let { emailOculto } = enmascararDatosPrivados(correo);
    
    let totalTexto = document.getElementById("total").innerText.replace('S/ ', '');
    let totalNumerico = parseFloat(totalTexto);
    let estrellasGanadas = Math.floor(totalNumerico);

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