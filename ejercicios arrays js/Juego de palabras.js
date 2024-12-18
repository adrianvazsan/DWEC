//Juego de palabras

const arrFrase = ["La", "vida", "es", "bella", "y", "divertida"];

// Usando reduce pasamos la frase entera a un solo string.
const fraseCompleta = arrFrase.reduce((acumulador, palabra) => acumulador + " " + palabra);
console.log("Frase reconstruida:", fraseCompleta);

// Con el reverse invertimos el orden de las palabras.
const fraseInvertida = [...arrFrase].reverse().join(" ");
console.log("Frase invertida:", fraseInvertida);

// Con el includes buscamos si esta la palabra bella en el array.
const contieneBella = arrFrase.includes("bella");
console.log("¿La palabra 'bella' está en la frase?", contieneBella);
