import { customize } from "./tarjetaUsuario.js";
import { checkUserCarrito, actualizarCarrito } from "./carrito.js";
import { agruparAsync } from "./productos.js";

//Funcion para esconder el formulario de Login
function esconderLogin() {
    const cambio = document.getElementById("formLogin");
    cambio.classList.add('d-none');
}

//Funcion para mostrar el contenido de la pagina
function mostrarPrincipal() {
    const cambio = document.getElementById("seccion-Principal");
    cambio.classList.remove('d-none');
}

//agrego un "listener" que espera la entrada del formulario de Login
let formularioLogin = document.getElementById("formLogin");
formularioLogin.addEventListener("submit", validarFormularioLogin);

//Hago la validacion del login, utilizando JSON del arreglo almacenado y genero la tarjeta de usuario en caso de exito.
function validarFormularioLogin(e) {
    e.preventDefault();
    //valido que el formulario no este vacio
    if (!e.target.children[0].children[1].value || !e.target.children[2].children[1].value || !e.target.children[1].children[1].value) {
        Swal.fire({
            icon: 'error',
            title: 'Por favor complete todos los campos',
        })
    } else {
        //valido que el correo ingresado sea una cuenta registrada
        let usuarioStorage = JSON.parse(localStorage.getItem(`${e.target.children[1].children[1].value}`));
        //console.log(usuarioStorage);
        if (!usuarioStorage) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${e.target.children[1].children[1].value}, no se encuentra registrado`,
            })
        } else { //si esta registrada, valido con los datos coincidan con los que estan almacenados
            //Trabajo con Desestructuracion
            let {
                nombre,
                email,
                clave
            } = usuarioStorage
            if (nombre === e.target.children[0].children[1].value && clave === e.target.children[2].children[1].value && email === e.target.children[1].children[1].value) {
                //si los datos coinciden, genero la tarjeta de usuario y lo dejo pasar
                const mensaje = document.getElementById("tarjetaSpan"); // busco el ID a modificar
                mensaje.innerHTML = `<div id="tarjeta" class="card text-center text-bg-light mx-auto" style="width: 13rem;">
                                    <img src="./img/user.png" class="card-img-top align-self-center mt-3" alt="foto usuario" style="width: 3rem;">
                                    <h4 class="card-header">${nombre}</h4>
                                    <h6 class="card-title">Bienvenido</h6>
                                    <p class="card-text" id="correoStorage">Te enviamos un correo a <b>${email}</b>, para validar tu registro</p>
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
                    title: `<b>${nombre}</b>, ya podes realizar tu pedido!`,
                    showConfirmButton: false,
                    timer: 1500
                })
                //Una vez que se loguea, ejecuto varioas acciones:
                localStorage.setItem(`userCarrito`, `${nombre}`); //almaceno en la session, el mail, para luego trer el carrito correspondiente al mail
                esconderLogin();
                customize();
                mostrarPrincipal();
                checkUserCarrito();
                agruparAsync();
                actualizarCarrito();
            } else { //si no coinciden, le aviso que algun dato no coincide con el correo registrado
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `los datos ingresados, no coinciden con los que tenemos registrados en ${e.target.children[1].children[1].value}`,
                })
            }
        }
    }
}

export { validarFormularioLogin}