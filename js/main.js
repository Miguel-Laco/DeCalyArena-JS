// Calculador de cantidad de ladrillos x m2, según el tipo de ladrillo. (Tabique de 30)
// Se necesitan 62 ladrillos comunes x m2
// Se necesitan 17 ladrillos huecos x m2
// Se necesitan 13 bloques de hormigon x m2
// 11,88kg de cemento x m2 de pared
// 22,92Kg de cal x m2 de pared
// 3 m3 de Arena x m2 de pared

/*La intención es que la calculadora solo admita numeros en las medidas y 
le avise al usuario si no está seleccionando el tipo de ladrillo correcto. 
Luego, sobre las medidas ingresadas por el usuario, el simulador calulará la cantidad necesaria de ladrillos y cemento.
Mostrará una alerta lo que el usuario necesita y volcará en el carrito:
Cantidad
Objeto
Precio calculado de objeto en base a la cantidad*/


//Portal de ingreso a la pagina
Swal.fire({
    imageUrl: './img/deCalyArena-03.png',
    showDenyButton: true,
    showCancelButton: false,
    allowOutsideClick: false,
    confirmButtonText: 'Registrarse',
    denyButtonText: `Ingresar`,
}).then((result) => {
    if (result.isConfirmed) {
        mostrarRegistro();
    } else if (result.isDenied) {
        mostrarLogin();
    }
})

//Funcion para mostrar el formulario de Registro
function mostrarRegistro() {
    const cambio = document.getElementById("formRegistro");
    cambio.classList.remove('d-none');
}

//Funcion para mostrar el formulario de Login
export function mostrarLogin() {
    const cambio = document.getElementById("formLogin");
    cambio.classList.remove('d-none');
}

//Agrego el llamado al carrousel "Splide"
const splide = new Splide('.splide', {
    type: 'loop',
    autoWidth: true,
    perPage: 3,
    autoScroll: {
        speed: 2,
        pauseOnHover: false,
    }
});
splide.mount(window.splide.Extensions);