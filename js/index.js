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

//Genero un alerta por ahora de bienvenida al asistente
alert("Bienvenido al Asistente, que le ayudará a dimensioar los materiales necesarios a comprar");

//Genero un arreglo vacio, para usar de carrito
const carrito = [];

// Defino la estructura de mi lista de materiales
class Materiales {
    constructor(nombre, descripcion, precio) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

// Defino mi lista de materiales
const material1 = new Materiales("Arena", "Arena x m3", 5000);
const material2 = new Materiales("Cal", "Cal Milagro x 25Kg", 1573);
const material3 = new Materiales("Cemento", "Cemento Avellaneda x 50Kg", 1202);
const material4 = new Materiales("Ladrillo Comun", "Ladrillo Comun 5.5x18x25", 35);
const material5 = new Materiales("Ladrillo Hueco", "Ladrillo Hueco 12x18x33", 98);
const material6 = new Materiales("Bloque Hormigon", "Bloque Liso 19x19x39", 200);

// Calculo los m2 en base al imput del usuario y devuelvo la cantidad de ladrillos según el tipo solicitado.
const computo = (ancho, alto) => {
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
// Comienzo a solicitar los datos al usuario (ANCHO, LARGO y TIPO DE PARED)

    let ancho = parseInt(prompt("Ingrese el ancho de la pared"));
    while (isNaN(ancho)) {
        alert('solo numeros!');
        ancho = parseInt(prompt("Ingrese el ancho de la pared"));
    }
    let alto = parseInt(prompt("Ingrese el alto de la pared"));
    while (isNaN(alto)) {
        alert('solo numeros!');
        alto = parseInt(prompt("Ingrese el ancho de la pared"));
    }
    let tipo = prompt("Indique si será de ladrillos COMUNES, HUECOS o BLOQUES").toLowerCase();



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
    // Muestro por alert, las cantidades calculadas de ladrillos y cemento(kg)
    alert(`Usted necesita:\n ${resultado} ${tipo} \n  ${resultadoCemento} Kg de ${material3.nombre} \n ${resultadoArena} m3 de ${material1.nombre}`);
    // Alimento el arreglo Carrito, con Cantidad de ladrillos, tipo de material y el subtotal para ese item.
    carrito.push(resultado, anotacion(tipo), calcularPrecio(tipo, resultado));
    // Alimento el arreglo Carrito, calculando la cantidad de bolsas de cemento, según los Kg calculados. tambien subo tipo de material y el subtotal para ese item.
    carrito.push(Math.round((calcularCemento(superficie) / 50)), material3, material3.precio * Math.round((calcularCemento(superficie) / 50)));
    carrito.push((Math.ceil(calcularArena(superficie))), material1, material1.precio * Math.ceil(calcularArena(superficie)));
} else {
    alert("Seleccione correctamente el tipo de ladrillos");
}

console.log(carrito);