//Transformaciones de strings

const ciudades = ["Tokio", "Berlin", "Paris", "New York", "Sevilla"];

// Usando el toUpperCase y el map convertimos todos los nombres de ciudades a mayusculas.
const mayusculas = ciudades.map(ciudad => ciudad.toUpperCase());
console.log("Ciudades en mayúsculas:", mayusculas);

// Usamos el sort para ordenar los elementos del array alfabeticamente.
const ordenadas = [...mayusculas].sort();
console.log("Ciudades ordenadas:", ordenadas);

// Usando el some y el startsWith buscamos si alguna de las palabras comienza por m.
const empiezanM = ciudades.some(ciudad => ciudad.startsWith("M"));
console.log("¿Alguna ciudad comienza con 'M'? :", empiezanM);

// Con el every comprobamos si todas las ciudades tienen 4 caracteres como minimo.
const cuatroMas = ciudades.every(ciudad => ciudad.length > 4);
console.log("¿Todas las ciudades tienen más de 4 caracteres? :", cuatroMas);
