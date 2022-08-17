import { mostrarLogin } from "./main.js";

//creo una clase con la estructura deseada para los usuarios
class Usuario {
    constructor(nombre, email, clave) {
        this.nombre = nombre;
        this.email = email;
        this.clave = clave;
    }
}

//Funcion para esconder el formulario de Registro
function esconderRegistro() {
    const cambio = document.getElementById("formRegistro")
    cambio.classList.add('d-none');
}

//agrego un "listener" que espera la entrada del formulario de registro
let formulario = document.getElementById("formRegistro");
formulario.addEventListener("submit", validarFormularioRegistro);


//creo esta funcion para validar el registro y guardar los datos en un arreglo en localStorage
function validarFormularioRegistro(e) {
    e.preventDefault() //Evito que se recargue el formulario
    //valido que el formulario no este vacio
    if (!e.target.children[0].children[1].value || !e.target.children[2].children[1].value || !e.target.children[1].children[1].value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor complete todos los campos',
        })
    } else {
        let nombre = e.target.children[0].children[1].value; //cargo en una variable el valor del formulario
        let email = e.target.children[1].children[1].value;
        let clave = e.target.children[2].children[1].value;
        const usuario = new Usuario(nombre, email, clave);
        //Guardo el usuario generado utilizando JSON stringify, para que mantenga el formato.
        localStorage.setItem(`${email}`, JSON.stringify(usuario));
        //escondo el formulario de registro
        esconderRegistro()
        //muetro el formulario de login
        mostrarLogin()
        //Dejo un log del usuario generado, para ayudar con el login y las pruebas durante el proyecto
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `<b>${nombre}</b>, registramos tus datos a la cuenta ${email}`,
            showConfirmButton: false,
            timer: 5000
        })
    }
}


export { validarFormularioRegistro }