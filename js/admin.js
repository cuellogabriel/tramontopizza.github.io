// Datos para iniciar sesión
const adminUser = {
    username: "admin",
    password: "1234"
};

// Validar inicio de sesión
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const loginPanel = document.getElementById('login-panel');
const adminPanel = document.getElementById('admin-panel');
const logoutButton = document.getElementById('logout-button');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminUser.username && password === adminUser.password) {
        loginPanel.style.display = 'none';
        adminPanel.style.display = 'block';
    } else {
        loginError.style.display = 'block';
        setTimeout(() => {
            loginError.style.display = 'none';
        }, 3000);
    }
});

// Cerrar sesión
logoutButton.addEventListener('click', () => {
    loginPanel.style.display = 'block';
    adminPanel.style.display = 'none';
    loginForm.reset();
});

// Gestión de productos
let productos = JSON.parse(localStorage.getItem('productos')) || [];

const adminForm = document.getElementById('admin-form');
const productList = document.getElementById('product-list');

adminForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('product-name').value;
    const precio = parseFloat(document.getElementById('product-price').value);
    const descripcion = document.getElementById('product-description').value;
    const imagen = document.getElementById('product-image').value;

    const nuevoProducto = { nombre, precio, descripcion, imagen };
    productos.push(nuevoProducto);

    localStorage.setItem('productos', JSON.stringify(productos));

    adminForm.reset();
    renderizarListaProductos();
});

// Renderizar lista de productos en el panel
function renderizarListaProductos() {
    productList.innerHTML = '';
    productos.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${producto.nombre}</strong> - $${producto.precio.toFixed(2)}<br>
            ${producto.descripcion}<br>
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100px; height: auto;"><br>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        productList.appendChild(li);
    });
}

// Eliminar producto
function eliminarProducto(index) {
    productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productos));
    renderizarListaProductos();
}

// Renderizar al cargar la página
renderizarListaProductos();