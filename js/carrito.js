import {
    productos
} from "./productos.js";

//Creo un modal para usar de carrito
const contenedorCarrito = document.getElementById("contenedorCarrito");

//Genero un arreglo vacio, para usar de carrito
let carrito = [];

// Voy a revisar si existe algo en mi carrito, guardado en localStorage, para mostrar luego del Login.
function checkUserCarrito() {
    const userCarrito = (localStorage.getItem(`userCarrito`));
    if (JSON.parse(localStorage.getItem(userCarrito)) !== null) {
        let carritotemp = JSON.parse(localStorage.getItem(userCarrito))
        if (carritotemp) {
            carrito.push(...carritotemp)
        }
    }
}

//Creo una funcion que agrega al carrito el producto seleccionado mediante el id
const agregarAlCarritoAsistente = (prodId, cant) => {
    const existe = carrito.some(prod => prod.id === prodId)
    if (existe) { //valido si existe el item en el carrito
        const temp = carrito.find(prod => prod.id === prodId);
        temp.cantidad = temp.cantidad + cant
    } else { //si no existe en el carrito
        const item = productos.find((prod) => prod.id === prodId);
        item.cantidad = cant //Sumo a lo que había en el carrito, la nueva cuenta.
        carrito.push(item); //subo el resultado al carrmito
    }
    actualizarCarrito() //refresco
}

//Agrego una funcion que agrega al carrito el producto seleccionado mediante el id
const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId)
    if (existe) { //valido si existe el item en el carrito
        const temp = carrito.map(prod => {
            prod.id === prodId && prod.cantidad++ //sumo uno a la cantidad existente
        })
    } else { //si no existe en el carrito
        const item = productos.find((prod) => prod.id === prodId);
        if (item) {
            const temp = productos.map(prod => {
                if (prod.id === prodId) {
                    prod.cantidad = 1 //genero esto, para asegurarme que la cantidad la deje en 1 si no existe
                }
            })
        }
        carrito.push(item); //subo el resultado al carrito
    }
    actualizarCarrito() //refresco
}

//Eliminar del Carrito
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId) //busco el producto
    if (item) {
        const temp = productos.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad = 1 //genero esto, para asegurarme que la cantidad queda en 0 al bajar el ID
            }
        })
    }
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1) //Hago un "splice", que se para en la posicion seleccionada y borra 1 en este caso
    actualizarCarrito(); //refresco el carrito para mostrar cambios
}

//Actualizar Carrito
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((prod) => {
        const div = document.createElement(`div`)
        div.classList.add("row")
        div.innerHTML = `
        <div class="col">${prod.nombre}</div>
        <div class="col-3">Precio:$ ${prod.precio}</div>
        <div class="col-4">Cantidad: ${prod.cantidad}</div>
        <a type="button" id="borrar${prod.id}" class="col-1 mx-auto"> <img class="basura" src="./img/basura.png" alt="basurero"> </a>
        `
        contenedorCarrito.appendChild(div)
        //Agrego para cada producto un evento que escucha el boton borrar 
        const boton = document.getElementById(`borrar${prod.id}`)
        boton.addEventListener(`click`, () => {
            eliminarDelCarrito(prod.id)
        })
    })
    //Modifico el contador del carrito
    const contadorCarrito = document.getElementById("contadorCarrito");
    contadorCarrito.innerText = carrito.length;
    //Modifico el precio total
    const precioTotal = document.getElementById("precioTotal");
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
    //Almaceno el carrito y uso como clave el correo del usuario, para recuperar productos
    localStorage.setItem(localStorage.userCarrito, JSON.stringify(carrito))
}

//Vaciar Carrito, llamando al boton que tengo generado
const botonVaciar = document.getElementById("vaciar-carrito");
botonVaciar.addEventListener(`click`, () => {
    carrito.length = 0 //dejo en 0 la longitud del carrito
    actualizarCarrito(); //refresco el carrito para mostrar cambios
})


//Simulación de Pago
const botonMp = document.getElementById("boton-pagar");
botonMp.addEventListener("click", e => pagar());

const pagar = () => {
    if (carrito.length !== 0) {
        botonVaciar.click()
Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `Ya procesamos tu pedido!
    Acércate a una de nuestras sucursales`,
    showConfirmButton: false,
    timer: 1500
})
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: `No encontramos nada en tu carrito de compra`,
            showConfirmButton: false,
            timer: 1500
        })
    }

}



export {
    carrito,
    botonVaciar,
    checkUserCarrito,
    agregarAlCarritoAsistente,
    agregarAlCarrito,
    actualizarCarrito,
}