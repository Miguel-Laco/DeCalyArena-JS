//Creo una funciion para customizar el color de la tarjeta de usuario, segun el color del boton que pulse, manipulando las clases.
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

export { customize }