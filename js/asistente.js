import {
    agregarAlCarritoAsistente,
    carrito,
    botonVaciar
} from "./carrito.js";
import {
    productos
} from "./productos.js";

//Creo una funcion, que genera mediante DOM el formulario del asistente de calculo.
const asistenteMostrar = () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
        title: 'Bienvenido al <br>asistente de compra',
        html: `Ingresando los metros lineales de tu muro, la altura y el tipo de ladrillo deseado, el asistente te calculará los materiales necesarios. <br>
    Luego desde el carrito podrás eliminar lo que no quieras, o sumar desde el listado de productos, los adicionales que consideres. <br><br>
    <i> (el cálculo de los materiales, se realiza contemplando un tabique de 30cm, sin incluir revoques ni impermeabilización)</i>`,

        imageUrl: './img/deCalyArena-02.png',
        imageHeight: 300,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Manos a la obra!',
                'Ingresa las medidas de tus muros',
                'success'
            )
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Adiós',
                'Puedes consultarme cuando necesites',
                'error'
            )
        }
    })
    const contenedorAsistente = document.getElementById("asistente");
    const div = document.createElement("div");
    div.classList.add("mt-5")
    div.classList.add("mb-3")
    div.setAttribute("id", "asistete-datos")
    div.innerHTML = `
                    
                        <form id="formCalculo" class="row g-2 justify-content-center">
                            <div class="col-auto">
                                <label for="validationCustom01C" class="visually-hidden">Ancho</label>
                                <input type="number" class="form-control" id="validationCustom01C" placeholder="Ancho"
                                    aria-describedby="emailHelp">
                            </div>
                            <div class="col-auto">
                                <label for="inputCustom02C" class="visually-hidden">Largo</label>
                                <input type="number" class="form-control" id="inputCustom02C" placeholder="Alto">
                            </div>
                            <div class="col-auto">
                                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option selected>Tipo de Ladrillo</option>
                                    <option value="4">Ladrillo Comun</option>
                                    <option value="5">ladrillo Hueco</option>
                                    <option value="6">Bloque de Cemento</option>
                                </select>
                            </div>
                            <div class="col-auto">
                                <button type="submit" class="btn btn-primary">Calcular</button>
                            </div>
                        </form>
                    
                        `
    contenedorAsistente.appendChild(div)
    //agrego un "listener" que espera la entrada del formulario de calculo
    let formularioCalculo = document.getElementById("formCalculo");
    formularioCalculo.addEventListener("submit", validarCalculo);
    bloquearBoton();
}

//Comienzo a escuchar el Asistente de Compra
let launch = document.getElementById("asistenteLaunch");
launch.addEventListener("click", asistenteMostrar);

const bloquearBoton = () => {
    document.getElementById("asistenteLaunch").disabled = true;
}


function validarCalculo(e) {
    e.preventDefault() //Evito que se recargue el formulario
    if (!e.target.children[0].children[1].value || !e.target.children[1].children[1].value || !e.target.children[2].children[0].value) {
        Swal.fire({
            icon: 'error',
            title: 'Por favor complete todos los campos',
        })
    } else {
        sessionStorage.setItem("ancho", e.target.children[0].children[1].value); //cargo en una variable el valor del formulario
        sessionStorage.setItem("alto", e.target.children[1].children[1].value); //cargo en una variable el valor del formulario
        const existe = productos.find(prod => prod.id == e.target.children[2].children[0].value)
        sessionStorage.setItem("tipo", JSON.stringify(existe))
        asistente()
    }
}

//Creo una gran funcion, que engloba todas las funciones del asistente
function asistente() {
    let ancho = sessionStorage.getItem("ancho")
    let alto = sessionStorage.getItem("alto")
    let tipo = JSON.parse(sessionStorage.getItem("tipo"))
    let arena = productos.find(prod => prod.nombre == "Arena")
    let cal = productos.find(prod => prod.nombre == "Cal")
    let cemento = productos.find(prod => prod.nombre == "Cemento")
    // Calculo los m2 en base al imput del usuario y devuelvo la cantidad de ladrillos según el tipo solicitado.
    function computo(ancho, alto) {
        switch (tipo.nombre) {
            case "Ladrillo Comun":
                return 62 * ancho * alto;
            case "Ladrillo Hueco":
                return 17 * ancho * alto;
            case "Bloque Hormigon":
                return 13 * ancho * alto;
            default:
                return 0;
        }
    }
    // Almaceno en una variable la superficie de la pared, para luego calcular cemento y arena en un futuro
    let superficie = (ancho * alto);
    // Calculo de CEMENTO (11,88Kg x m2)
    function calcularCemento(parametro) {
        return parametro * 11, 88;
    }
    // Almaceno en una variable, la cantidad de cemento en Kg, según la supercifie calculada anteriormente.
    let resultadoCemento = calcularCemento(superficie);
    // Calculo de Cal (22,92Kg x m2)
    function calcularCal(parametro) {
        return parametro * 22, 92;
    }
    // Almaceno en una variable, la cantidad de Arena en Kg, según la supercifie calculada anteriormente.
    let resultadoCal = calcularCal(superficie);
    // Calculo de ARENA (3m3 x m2)
    function calcularArena(parametro) {
        return parametro * 3;
    }
    // Almaceno la cantidad de arena en una variable, según la superficie calculada
    let resultadoArena = calcularArena(superficie);
    // Almaceno en una variable la cantidad de ladrillos x m2.
        let resultado = computo(ancho, alto);
    if (resultado != 0) { //me aseguro que el númer ingresado no sea 0
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
                <td>${tipo.nombre}</td>
                <td>${resultado} Unidades</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>${cemento.nombre}</td>
                <td>${resultadoCemento} Kg</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>${arena.nombre}</td>
                <td>${resultadoArena} m3</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>${cal.nombre}</td>
                <td>${resultadoCal} Kg</td>
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
                // inicializo la cantidad de ladrillos, por si vuelve a correr el asistente.
                tipo.cantidad = 1;
                // Alimento el arreglo Carrito, con Cantidad de ladrillos, tipo de material y el subtotal para ese item.
                agregarAlCarritoAsistente(tipo.id, (tipo.cantidad * resultado));
                //Alimento el Carrito, calculando la cantidad de bolsas de cemento, según los Kg calculados.
                agregarAlCarritoAsistente(cemento.id, Math.ceil(calcularCemento(superficie) / 50));
                //Alimento el carrito con la cantidad de arena calculada
                agregarAlCarritoAsistente(arena.id, Math.ceil(calcularArena(superficie)));
                //Alimento el carrito con la cantidad de cal calculada
                agregarAlCarritoAsistente(cal.id, Math.ceil(calcularCal(superficie) / 25));
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
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Un muro de 0mts x 0mts, no requiere materiales',
        })
    }
}