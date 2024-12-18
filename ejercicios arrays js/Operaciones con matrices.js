//Operaciones con matrices

const array1 = [10, 6, 1, 9, 3];
const array2 = [8, 6, 4, 12, 5];

// Usando el medoto map se crea un nuevo array con la suma de los elementos correspondientes de ambos arrays.
const suma = array1.map((num, index) => num + array2[index]);
console.log("Suma de los elementos correspondientes:", suma);

// Usando el map multiplicamos los elementos del array por su indice.
const multiIndice = array1.map((num, index) => num * index);
console.log("Elementos multiplicados por su índice:", multiIndice);

//usando el findIndex para buscar el primer numero que cumpla la condicion de ser mayor a 10.
const primeroMayorDiez = array2.findIndex(num => num > 10);
console.log("Índice del primer número mayor a 10 en array2:", primeroMayorDiez);
