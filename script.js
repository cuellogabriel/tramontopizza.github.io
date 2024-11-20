let carrito = [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const total = document.getElementById('total');
    lista.innerHTML = '';
    let totalPrecio = 0;

    carrito.forEach((item, index) => {
        lista.innerHTML += `<li>${item.nombre} - $${item.precio} 
            <button onclick="eliminarDelCarrito(${index})">X</button></li>`;
        totalPrecio += item.precio;
    });

    total.textContent = `Total: $${totalPrecio}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function enviarPedido() {
    let mensaje = '¡Hola! Quiero pedir:\n';
    let total = 0;

    carrito.forEach(item => {
        mensaje += `- ${item.nombre}: $${item.precio}\n`;
        total += item.precio;
    });

    mensaje += `Total a pagar: $${total}`;
    const url = `https://wa.me/2324342375?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}