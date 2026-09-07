const IGV = 0.18; //
let carrito = [];
let categoriaActual = 'Café';

// Arreglo de objetos
const inventario = [
    // --- CAFÉ ---
    { id: 1, nombre: "Café Americano", precio: 9.50, categoria: "Café", imagen: "https://images.pexels.com/photos/19573020/pexels-photo-19573020.jpeg" },
    { id: 2, nombre: "Caffè Mocha", precio: 14.50, categoria: "Café", imagen: "https://images.pexels.com/photos/14704656/pexels-photo-14704656.jpeg" },
    { id: 3, nombre: "Caramel Macchiato", precio: 15.00, categoria: "Café", imagen: "https://images.pexels.com/photos/15086185/pexels-photo-15086185.jpeg" },
    { id: 4, nombre: "Cappuccino", precio: 12.50, categoria: "Café", imagen: "https://images.pexels.com/photos/2559312/pexels-photo-2559312.jpeg" },
    { id: 5, nombre: "Cold Brew", precio: 13.00, categoria: "Café", imagen: "https://images.pexels.com/photos/25956830/pexels-photo-25956830.jpeg" },

    // --- BEBIDAS ---
    { id: 6, nombre: "Matcha Latte", precio: 15.50, categoria: "Bebidas", imagen: "https://images.pexels.com/photos/17366787/pexels-photo-17366787.jpeg" },
    { id: 7, nombre: "Chocolate Caliente", precio: 13.50, categoria: "Bebidas", imagen: "https://images.pexels.com/photos/10406759/pexels-photo-10406759.jpeg" },
    { id: 8, nombre: "Té Chai Latte", precio: 14.00, categoria: "Bebidas", imagen: "https://images.pexels.com/photos/37146476/pexels-photo-37146476.jpeg" },
    { id: 9, nombre: "Refresco Berry Hibiscus", precio: 12.00, categoria: "Bebidas", imagen: "https://media.istockphoto.com/id/1311089753/es/foto/t%C3%A9-fr%C3%ADo-de-hibisco-o-karkade-con-lim%C3%B3n-menta-y-hielo-en-vidrio-sobre-una-mesa-de-madera.jpg?b=1&s=612x612&w=0&k=20&c=_Vpf95CC-F6HLTS_9qZ2IkOWf27-5bvz4RBx67XjTi8=" },

    // --- SNACKS ---
    { id: 10, nombre: "Croissant de Mantequilla", precio: 8.50, categoria: "Snacks", imagen: "https://images.pexels.com/photos/29850845/pexels-photo-29850845.jpeg" },
    { id: 11, nombre: "Panini Pollo y Queso", precio: 18.00, categoria: "Snacks", imagen: "https://images.pexels.com/photos/32715053/pexels-photo-32715053.jpeg" },
    { id: 12, nombre: "Wrap de Pavo y Queso", precio: 16.50, categoria: "Snacks", imagen: "https://images.pexels.com/photos/15010305/pexels-photo-15010305.jpeg" },
    { id: 13, nombre: "Quiche Lorraine", precio: 15.00, categoria: "Snacks", imagen: "https://images.pexels.com/photos/29538433/pexels-photo-29538433.jpeg" },

    // --- POSTRES ---
    { id: 14, nombre: "Cheesecake de Maracuyá", precio: 14.50, categoria: "Postres", imagen: "https://images.pexels.com/photos/38134573/pexels-photo-38134573.jpeg" },
    { id: 15, nombre: "Muffin de Arándanos", precio: 9.00, categoria: "Postres", imagen: "https://images.pexels.com/photos/36927102/pexels-photo-36927102.jpeg" },
    { id: 16, nombre: "Brownie con Fudge", precio: 9.50, categoria: "Postres", imagen: "https://images.pexels.com/photos/17488694/pexels-photo-17488694.jpeg" },
    { id: 17, nombre: "Torta de Zanahoria", precio: 13.50, categoria: "Postres", imagen: "https://images.pexels.com/photos/13188970/pexels-photo-13188970.jpeg" }
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