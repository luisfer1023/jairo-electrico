const listaCarrito = document.getElementById("lista-carrito").querySelector("tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const cartCount = document.getElementById("cart-count");

document.addEventListener("DOMContentLoaded", function () {
    const agregarAlCarritoBtns = document.querySelectorAll(".agregar-carrito");

    cargarProductos();

    agregarAlCarritoBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const nombre = this.dataset.nombre;
            const precio = parseFloat(this.dataset.precio);

            agregarProductoAlCarrito(nombre, precio);
            actualizarContadorCarrito();
        });
    });

    vaciarCarritoBtn.addEventListener("click", function (event) {
        vaciarCarritoSinDesplazamiento(event);
        actualizarContadorCarrito();
    });

    listaCarrito.addEventListener("click", function (event) {
        eliminarProductoDelCarrito(event);
        guardarProductosEnLocalStorage();
        actualizarContadorCarrito();
    });
});

function cargarProductos() {
    const productosCarrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];
    productosCarrito.forEach(function (producto) {
        agregarProductoAlCarrito(producto.nombre, producto.precio, false);
    });
    actualizarContadorCarrito();
}

function agregarProductoAlCarrito(nombre, precio, guardar = true) {
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
        <td>${nombre}</td>
        <td>${precio} cop</td>
        <td><button class="eliminar-producto">Eliminar</button></td>
    `;
    listaCarrito.appendChild(nuevaFila);

    if (guardar) {
        guardarProductosEnLocalStorage();
    }
}

function eliminarProductoDelCarrito(event) {
    if (event.target.classList.contains("eliminar-producto")) {
        const fila = event.target.parentElement.parentElement;
        fila.remove();
        guardarProductosEnLocalStorage();
    }
}

function guardarProductosEnLocalStorage() {
    const productos = [];
    const filas = document.querySelectorAll("#lista-carrito tbody tr");
    filas.forEach(function (fila) {
        const nombre = fila.querySelector("td:first-child").textContent;
        const precio = parseFloat(fila.querySelector("td:nth-child(2)").textContent);
        productos.push({ nombre, precio });
    });
    localStorage.setItem("productosCarrito", JSON.stringify(productos));
}

function vaciarCarritoSinDesplazamiento(event) {
    event.preventDefault();
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
    localStorage.removeItem("productosCarrito");
}

function actualizarContadorCarrito() {
    const productosCarrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];
    const totalCantidad = productosCarrito.length;
    cartCount.textContent = totalCantidad;
}

const comprarBtn = document.getElementById("comprar-btn");
comprarBtn.addEventListener("click", function () {
    alert("¡Su pedido será procesado!");
});
