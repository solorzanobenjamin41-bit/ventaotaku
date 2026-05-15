const productoArray = [
    {
        id: "figura-01",
        titulo: "Figura de Yukari Yakumo (Touhou)",
        imagen: "img/figura1.jpg.jpg",
        categoria: {
            nombre: "Figuras",
            id: "figuras",
        },
        precio: 190,
    },
    {
        id: "figura-02",
        titulo: "Figura de IJN Kaga (Azur Lane)",
        imagen: "img/figura2.jpg.jpg",
        categoria: {
            nombre: "Figuras",
            id: "figuras",
        },
        precio: 190,
    },
    {
        id: "figura-03",
        titulo: "Figura de Link (Zelda)",
        imagen: "img/figura3.jpg.jpg",
        categoria: {
            nombre: "Figuras",
            id: "figuras",
        },
        precio: 190,
    },
    {
        id: "figura-04",
        titulo: "Figura de la mas lenta que Agnes (Uma Musume)",
        imagen: "img/figura4.jpg.jpg",
        categoria: {
            nombre: "Figuras",
            id: "figuras",
        },
        precio: 190,
    },
    // Agregar más productos para posters y llaveros si es necesario
];

const contenedorProductos = document.querySelector('.contenedor-productos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.querySelector('.titulo-principal');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const numerito = document.querySelector('.numerito');

// Función para cargar productos
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = '';

    productosElegidos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}

// Función para actualizar botones agregar
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll('.producto-agregar');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

// Función para agregar al carrito
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.getAttribute('data-id');
    const productoAgregado = productoArray.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
}

// Función para actualizar numerito
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

// Cargar productos iniciales
cargarProductos(productoArray);

// Event listeners para categorías
botonesCategorias.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove('active'));
        e.currentTarget.classList.add('active');

        if (e.currentTarget.id != 'todos') {
            const productosBoton = productoArray.filter(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productosBoton[0]?.categoria.nombre || 'Productos';
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = 'Todos los productos';
            cargarProductos(productoArray);
        }
    });
});

// Inicializar carrito desde localStorage
let productosEnCarrito = JSON.parse(localStorage.getItem('productos-en-carrito')) || [];
actualizarNumerito();