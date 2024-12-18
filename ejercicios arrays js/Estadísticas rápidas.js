//Estadísticas rápidas

// Usando el Math.random generamos un numero aleatorio del 1 al 100 y con el bucle for para que genere un array de numeros aleatorios.
const aleatorio = [];
for (let i = 0; i < 20; i++) {
    aleatorio.push(Math.floor(Math.random() * 100) + 1);
}
console.log("Números aleatorios generados:", aleatorio);

// Usamos el Math.max para encontrar el numero mas alto.
const max = Math.max(...aleatorio);
console.log("Número más alto:", max);

// Usamos el Math.min para encontrar el numero mas bajo.
const min = Math.min(...aleatorio);
console.log("Número más bajo:", min);

// Usando el filter se crea un array que debe cumplir las condiciones para forma parte de el en este caso que sean impares.
const impares = aleatorio.filter(num => num % 2 !== 0).length;
console.log("Cantidad de números impares:", impares);
