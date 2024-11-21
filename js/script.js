let productos = JSON.parse(localStorage.getItem('productos')) || [
    {
        nombre: "Pizza Margarita",
        precio: 12.99,
        descripcion: "Deliciosa pizza con queso mozzarella y albahaca fresca.",
        imagen: "https://via.placeholder.com/150"
    }
];

function renderizarMenu() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';
    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <span>$${producto.precio.toFixed(2)}</span>
                <button>Agregar al carrito</button>
            </div>`;
    });
}

window.onload = renderizarMenu;;

// Obtener productos desde localStorage
let productos = JSON.parse(localStorage.getItem('productos')) || [];

// Renderizar el menú
function renderizarMenu() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';
    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <span class="producto-precio">$${producto.precio.toFixed(2)}</span>
                <button class="agregar-carrito" data-nombre="${producto.nombre}">Agregar al carrito</button>
            </div>`;
    });

    // Agregar funcionalidad al botón "Agregar al carrito"
    document.querySelectorAll('.agregar-carrito').forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

// Carrito de compras
let carrito = [];

// Agregar productos al carrito
function agregarAlCarrito(event) {
    const nombreProducto = event.target.dataset.nombre;
    const producto = productos.find(p => p.nombre === nombreProducto);

    if (producto) {
        carrito.push(producto);
        alert(`${producto.nombre} agregado al carrito.`);
        console.log("Carrito actual:", carrito);
    }
}

// Generar enlace de WhatsApp con el carrito
function generarEnlaceWhatsApp() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    let mensaje = "¡Hola! Quiero realizar el siguiente pedido:\n\n";

    carrito.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio.toFixed(2)}\n`;
    });

    mensaje += `\nTotal: $${total.toFixed(2)}`;
    const url = `https://wa.me/2324342375?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Vincular botón del carrito con WhatsApp
document.getElementById('finalizar-pedido')?.addEventListener('click', generarEnlaceWhatsApp);

// Renderizar el menú al cargar la página
window.onload = renderizarMenu;