import {
    agregarAlCarrito
} from "./carrito.js";

//Creo un arreglo para almacenar todos los productos y poder itinerarlo luego al spawnear mis productos
let productos = []

// Defino la estructura de mi lista de materiales
class Materiales {
    constructor(id, nombre, cantidad, descripcion, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
    }
}

//Genero una funcion asyncronica, para traerme los productos de un json
const cargar = async () => {
    const response = await fetch("./json/data.json");
    const items = await response.json();
    items.forEach(item => {
        productos.push(new Materiales(item.id, item.nombre, item.cantidad, item.descripcion, item.precio, item.img))
    })
}

//Englobo en otra funcion asyncronica la funcion que renderiza los productos, para que espere la carga del arreglo.
const agruparAsync = async () => {
    await cargar();
    mostrarProductos(productos);
}

//Creo una funcion para generar mis productos medianete DOM
const mostrarProductos = (productos) => {
    const contenedorProductos = document.getElementById("productos");
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("col-12")
        div.classList.add("col-sm-6")
        div.classList.add("col-md-4")
        div.classList.add("mt-3")
        div.classList.add("mb-3")
        div.innerHTML = `
                        <div class="card text-center mx-auto" style="width: 18rem;">
                            <img src="${producto.img}" class="card-img-top" alt="Cemento">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">${producto.descripcion}</p>
                                <p class="card-text">Precio:$ ${producto.precio}</p>
                                <button class="btn btn-primary" id="boton${producto.id}">Comprar</button>
                            </div>
                        </div>
                        `
        contenedorProductos.appendChild(div)
        //Agrego para cada producto un evento que escucha el boton y lleva el producto al carrito
        const boton = document.getElementById(`boton${producto.id}`)
        boton.addEventListener(`click`, () => {
            agregarAlCarrito(producto.id)
        })
    })
}






export {
    productos,
    cargar,
    agruparAsync
}