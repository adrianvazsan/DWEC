//Manipulación básica de arrays

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Usar map para crear un nuevo array con los cuadrados de los números originales
const cuadrados = numeros.map(num => num ** 2);
console.log("Cuadrados:", cuadrados);

// Usando el filter creamos un array solamente con los numeros pares.
const numerosPares = numeros.filter(num => num % 2 === 0);
console.log("Números pares:", numerosPares);

// Utilizamos el reduce para calcular la suma de todos los numeros del array.
const sumaTotal = numeros.reduce((acumulador, num) => acumulador + num, 0);
console.log("Suma total:", sumaTotal);