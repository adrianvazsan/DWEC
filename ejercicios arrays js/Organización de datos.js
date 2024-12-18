//Organización de datos

const arrEstudiantes = [
    { nombre: "Ana", edad: 20, nota: 8 },
    { nombre: "Luis", edad: 22, nota: 5 },
    { nombre: "María", edad: 19, nota: 7 },
    { nombre: "Carlos", edad: 21, nota: 4 }
];

// Usar filter para obtener los estudiantes aprobados (nota mayor o igual a 5).
const aprobados = arrEstudiantes.filter(estudiante => estudiante.nota >= 5);
console.log("Estudiantes aprobados:", aprobados);

// Ordenar a los estudiantes por edad con sort
const ordenEdad = [...arrEstudiantes].sort((a, b) => a.edad - b.edad);
console.log("Estudiantes ordenados por edad:", ordenEdad);

// Usar map para crear un array que solo contenga los nombres de los estudiantes.
const nombresEstudiantes = arrEstudiantes.map(estudiante => estudiante.nombre);
console.log("Nombres de los estudiantes:", nombresEstudiantes);

// Calcular la nota promedio de los estudiantes con reduce.
const sumaNotas = arrEstudiantes.reduce((acumulador, estudiante) => acumulador + estudiante.nota, 0);
const notaPromedio = sumaNotas / arrEstudiantes.length;
console.log("Nota promedio de los estudiantes:", notaPromedio);
