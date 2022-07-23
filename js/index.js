// Calculador de cantidad de ladrillos x m2, según el tipo de ladrillo.
// Se necesitan 56 ladrillos comunes x m2
// Se necesitan 16 ladrillos huecos x m2
// Se necesitan 13 bloques de hormigon x m2
// 18kg de cemento x m2 de pared
// 0.04 m3 de Arena x m2 de pared

/*La intención es que la calculadora solo admita numeros en las medidas y 
le avise al usuario si no está seleccionando el tipo de ladrillo correcto. 
Luego, sobre las medidas ingresadas por el usuario, el simulador calulará la cantidad necesaria de ladrillos y cemento.
Mostrará una alerta lo que el usuario necesita y volcará en el carrito (arreglo por ahora):
Cantidad
Objeto
Precio calculado de objeto en base a la cantidad*/

//Creo una funciion para customizar el color de la tarjeta de usuario, segun el color del boton que pulse
function customize() {
    let prueba = document.getElementById("perfiles");
    const elegirColor = (e) => {
        if (e.target.id == "botonAzul") { //con e.target.id, puedo escuchar el ID del boton que se haya pulsado
            let cambio = document.getElementById("tarjeta"); //selecciono el ID a modificar
            //primero me aseguro de remover cualquier clase de color existente
            cambio.classList.remove('text-bg-light', 'text-bg-primary', 'text-bg-secondary', 'text-bg-success', 'text-bg-danger', 'text-bg-warning', 'text-bg-info')
            cambio.classList.add('text-bg-primary'); //agrego la clase de la tarjeta de bootstrap
        } else if (e.target.id == "botonGris") {
            let cambio = document.getElementById("tarjeta");
            cambio.classList.remove('text-bg-light', 'text-bg-primary', 'text-bg-secondary', 'text-bg-success', 'text-bg-danger', 'text-bg-warning', 'text-bg-info')
            cambio.classList.add('text-bg-secondary');
        } else if (e.target.id == "botonVerde") {
            let cambio = document.getElementById("tarjeta");
            cambio.classList.remove('text-bg-light', 'text-bg-primary', 'text-bg-secondary', 'text-bg-success', 'text-bg-danger', 'text-bg-warning', 'text-bg-info')
            cambio.classList.add('text-bg-success');
        } else if (e.target.id == "botonRojo") {
            let cambio = document.getElementById("tarjeta");
            cambio.classList.remove('text-bg-light', 'text-bg-primary', 'text-bg-secondary', 'text-bg-success', 'text-bg-danger', 'text-bg-warning', 'text-bg-info')
            cambio.classList.add('text-bg-danger');
        } else if (e.target.id == "botonAmarillo") {
            let cambio = document.getElementById("tarjeta");
            cambio.classList.remove('text-bg-light', 'text-bg-primary', 'text-bg-secondary', 'text-bg-success', 'text-bg-danger', 'text-bg-warning', 'text-bg-info')
            cambio.classList.add('text-bg-warning');
        } else if (e.target.id == "botonTurquesa") {
            let cambio = document.getElementById("tarjeta");
            cambio.classList.remove('text-bg-light', 'text-bg-primary', 'text-bg-secondary', 'text-bg-success', 'text-bg-danger', 'text-bg-warning', 'text-bg-info')
            cambio.classList.add('text-bg-info');
        } else {
            customize(); //vuelvo a inicializar la función si no selecciona un color valido
        }
    }
    prueba.addEventListener("click", elegirColor); //agrego un evento, que espera un click 
}

//creo una clase con la estructura deseada
class Usuario {
    constructor(nombre, email, clave) {
        this.nombre = nombre;
        this.email = email;
        this.clave = clave;
    }
}
// Genero un arreglo, donde almacenaré los datos de usuario
const usuarios = [];

//Funcion para esconder el formulario de Registro
function esconderRegistro() {
    const cambio = document.getElementById("formRegistro")
    cambio.classList.add('d-none');
}

//Funcion para esconder el formulario de Login
function esconderLogin() {
    const cambio = document.getElementById("formLogin")
    cambio.classList.add('d-none');
}

//Funcion para mostrar el formulario de Login
function mostrarLogin() {
    const cambio = document.getElementById("formLogin")
    cambio.classList.remove('d-none')
}




//agrego un "listener" que espera la entrada del formulario de registro
let formulario = document.getElementById("formRegistro");
formulario.addEventListener("submit", validarFormulario);

//creo esta funcion para guardar los datos del resgistro en un arreglo
function validarFormulario(e) {
    e.preventDefault() //Evito que se recargue el formulario
    let nombre = e.target.children[0].children[1].value; //cargo en una variable el valor del formulario
    let email = e.target.children[1].children[1].value;
    let clave = e.target.children[2].children[1].value;
    const usuario = new Usuario(nombre, email, clave);
    usuarios.push(usuario) // llevos los datos de usuario al arreglo "usuarios"
    esconderRegistro()
    mostrarLogin()
    console.log(usuario);
}
//agrego un "listener" que espera la entrada del formulario de Login
let formularioLogin = document.getElementById("formLogin");
formularioLogin.addEventListener("submit", validarFormularioLogin);

//creo esta funcion para validar que los datos del usuario, coincidan con los del registro
function validarFormularioLogin(e) {
    e.preventDefault() //Evito que se recargue el formulario
    //Si está correcto, hago el span de la tarjeta de usuario
    if ((usuarios[0].nombre === e.target.children[0].children[1].value) && (usuarios[0].clave === e.target.children[1].children[1].value)) {
        const mensaje = document.getElementById("tarjetaSpan"); // busco el ID a modificar
        mensaje.innerHTML = `<div id="tarjeta" class="card text-center text-bg-light mx-auto" style="width: 13rem;">
                                    <img src="./img/user.png" class="card-img-top align-self-center mt-3" alt="foto usuario" style="width: 3rem;">

                                    <h4 class="card-header">${usuarios[0].nombre}</h4>
                                    <h6 class="card-title">Bienvenido</h6>
                                    <p class="card-text">Te enviamos un correo a <b>${usuarios[0].email}</b>, para validar tu registro</p>
                                    <div id="perfiles">
                                    <button id="botonAzul" type="button" class="btn btn-primary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .25rem;"></button>
                                    <button id="botonGris" type="button" class="btn btn-secondary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .25rem;"></button>
                                    <button id="botonVerde" type="button" class="btn btn-success" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .25rem;"></button>
                                    <button id="botonRojo" type="button" class="btn btn-danger" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .25rem;"></button>
                                    <button id="botonAmarillo" type="button" class="btn btn-warning" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .25rem;"></button>
                                    <button id="botonTurquesa" type="button" class="btn btn-info" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .25rem;"></button>
                                    </div>
                            </div>`;
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ya podes realizar tu pedido!',
            showConfirmButton: false,
            timer: 1500
        })
        esconderLogin();
        customize();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los datos ingresados son incorrectos',
        })
    }
}

//ACA COMIENZA EL CODIGO PARA EL CALCULO DE MATERIALES

//Genero un arreglo vacio, para usar de carrito
const carrito = [];

// Defino la estructura de mi lista de materiales
class Materiales {
    constructor(id, nombre, descripcion, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
    }
}

// Defino mi lista de materiales
const material1 = new Materiales("1", "Arena", "Arena x m3", 5000);
const material2 = new Materiales("2", "Cal", "Cal Milagro x 25Kg", 1573);
const material3 = new Materiales("3", "Cemento", "Cemento Avellaneda x 50Kg", 1202);
const material4 = new Materiales("4", "Ladrillo Comun", "Ladrillo Comun 5.5x18x25", 35);
const material5 = new Materiales("5", "Ladrillo Hueco", "Ladrillo Hueco 12x18x33", 98);
const material6 = new Materiales("6", "Bloque Hormigon", "Bloque Liso 19x19x39", 200);

//Comienzo a escuchar el Asistente de Compra
let launch = document.getElementById("asistenteLaunch");
launch.addEventListener("click", asistenteMostrar);

function asistenteMostrar() {
    let cambio = document.getElementById("asistente-datos"); //selecciono el ID a modificar
    //primero me aseguro de remover cualquier clase de color existente
    cambio.classList.remove('d-none'); //agrego la clase de la tarjeta de bootstrap
}

//agrego un "listener" que espera la entrada del formulario de Login
let formularioCalculo = document.getElementById("formCalculo");
formularioCalculo.addEventListener("submit", validarCalculo);

function validarCalculo(e) {
    e.preventDefault() //Evito que se recargue el formulario
    sessionStorage.setItem("ancho", e.target.children[0].children[1].value); //cargo en una variable el valor del formulario
    sessionStorage.setItem("alto", e.target.children[1].children[1].value); //cargo en una variable el valor del formulario
    sessionStorage.setItem("tipo", e.target.children[2].children[0].value); //cargo en una variable el valor del formulario

    //sessionStorage.setItem("tipo", e.target.children[2].children[1].value); //cargo en una variable el valor del formulario
    asistente();
}

//Creo una gran funcion, que engloba todas las funciones del asistente
function asistente() {

    let ancho = sessionStorage.getItem("ancho")
    let alto = sessionStorage.getItem("alto")
    let tipo = sessionStorage.getItem("tipo")

    // Calculo los m2 en base al imput del usuario y devuelvo la cantidad de ladrillos según el tipo solicitado.
    function computo(ancho, alto) {
        switch (tipo) {
            case "comunes":
                return 60 * ancho * alto;

            case "huecos":
                return 16 * ancho * alto;

            case "bloques":
                return 13 * ancho * alto;

            default:
                return 0;
        }
    }

    // Almaceno en una variable la superficie de la pared, para luego calcular cemento y arena en un futuro
    let superficie = (ancho * alto);


    //Declaro una función "anotaciion", que la uso para unir el dato ingresado por el usuario, con mi lista de materiales.
    function anotacion(dato) {
        switch (dato) {
            case "comunes":
                return material4;

            case "huecos":
                return material5;

            case "bloques":
                return material6;

            default:
                return 0;
        }
    }

    //Genero una funcion, para calcular el precio, según el material elegido y su precio.
    function calcularPrecio(info, info2) {
        switch (info) {
            case "comunes":
                return material4.precio * info2;

            case "huecos":
                return material5.precio * info2;

            case "bloques":
                return material6.precio * info2;

            default:
                return 0;
        }
    }

    // Calculo de CEMENTO (18Kg x m2)
    function calcularCemento(parametro) {
        return parametro * 18;
    }
    // Almaceno en una variable, la cantidad de cemento en Kg, según la supercifie calculada anteriormente.
    let resultadoCemento = calcularCemento(superficie);

    // Calculo de ARENA
    function calcularArena(parametro) {
        return parametro * 0.04;
    }

    // Almaceno la cantidad de arena en una variable, según la superficie calculada
    let resultadoArena = calcularArena(superficie);

    // Almaceno en una variable la cantidad de ladrillos x m2.
    let resultado = computo(ancho, alto);
    if (resultado != 0) {
        // Utilizo un Sweet alert para mostrar el resultado del calculo
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Usted necesita:',
            text: `${resultado} ${tipo} \n ${resultadoCemento} Kg de ${material3.nombre} \n ${resultadoArena} m3 de ${material1.nombre}`,
            html: `<table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Material</th>
                <th scope="col">Cantidad</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Ladrillos ${tipo}</td>
                <td>${resultado} Unidades</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>${material3.nombre}</td>
                <td>${resultadoCemento} Kg</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>${material1.nombre}</td>
                <td>${resultadoArena} m3</td>
            </tr>
        </tbody>
    </table>`,
            imageUrl: './img/deCalyArena-02.png',
            imageHeight: 300,
            showCancelButton: true,
            confirmButtonText: 'Agregar al Carrito',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'En tu Carrito!',
                    'Los materiales ya están en tu carrito',
                    'success'
                )
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Borrado',
                    'Ya puedes volver a realizar tu calculo :)',
                    'error'
                )
            }
        })
        // Alimento el arreglo Carrito, con Cantidad de ladrillos, tipo de material y el subtotal para ese item.
        carrito.push(resultado, anotacion(tipo), calcularPrecio(tipo, resultado));
        // Alimento el arreglo Carrito, calculando la cantidad de bolsas de cemento, según los Kg calculados. tambien subo tipo de material y el subtotal para ese item.
        carrito.push(Math.round((calcularCemento(superficie) / 50)), material3, material3.precio * Math.round((calcularCemento(superficie) / 50)));
        carrito.push((Math.ceil(calcularArena(superficie))), material1, material1.precio * Math.ceil(calcularArena(superficie)));
    } else {
        Swal.fire('Debes ingresar las medidas de tu muro y el tipo de ladrillo, para que podamos ayudarte con tu proyecto')
    }
    console.log(carrito);
}