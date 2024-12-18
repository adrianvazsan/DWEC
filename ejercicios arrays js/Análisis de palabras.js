//Análisis de palabras

const palabras = ["La", "Programacion", "es", "muy", "importante", "hoy", "en", "dia"];

// Con el filter buscamos las palabras con mas de 5 letras.
const largas = palabras.filter(palabra => palabra.length > 5);
console.log("Palabras con más de 5 letras:", largas);

// Usando el map para transformar los elementos del array, con el split convertimos los string en array y con el join hacemos lo contrario, luego con el reverse se invierte el orden de los elementos del array.
const invertidas = palabras.map(palabra => palabra.split("").reverse().join(""));
console.log("Palabras invertidas:", invertidas);

// Usamos el sort para ordenar las palabras por logitud en una funcion personalizada.
const ordenLongitud = [...palabras].sort((a, b) => a.length - b.length);
console.log("Palabras ordenadas por longitud:", ordenLongitud);
