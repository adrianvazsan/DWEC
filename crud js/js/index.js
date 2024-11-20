// Clase que representa una Tarea individual
class Tarea {
    constructor(id, descripcion) {
        this.id = id; // Identificador único de la tarea
        this.descripcion = descripcion; // Descripción de la tarea
    }

    // Método para obtener la descripción de la tarea
    getDescripcion() {
        return this.descripcion;
    }

    // Método para actualizar la descripción de la tarea
    setDescripcion(nuevaDescripcion) {
        if (nuevaDescripcion.trim() === '') { // Validación: la descripción no puede estar vacía
            throw new Error('La descripción no puede estar vacía.');
        }
        this.descripcion = nuevaDescripcion; // Actualiza la descripción
    }
}

// Clase que administra las tareas
class TareaManager {
    constructor() {
        this.tareas = this.cargarTareas(); // Carga las tareas desde las cookies al inicializar
    }

    // Agrega una nueva tarea con una descripción dada
    agregarTarea(descripcion) {
        const id = this.tareas.length ? this.tareas[this.tareas.length - 1].id + 1 : 1; // Genera un ID único
        const nuevaTarea = new Tarea(id, descripcion); // Crea una nueva instancia de Tarea
        this.tareas.push(nuevaTarea); // Añade la nueva tarea a la lista
        this.guardarTareas(); // Guarda las tareas actualizadas en las cookies
        return nuevaTarea; // Retorna la nueva tarea
    }

    // Retorna la lista de tareas
    obtenerTareas() {
        return this.tareas;
    }

    // Edita una tarea existente, identificada por su ID
    editarTarea(id, nuevaDescripcion) {
        const tarea = this.tareas.find(t => t.id === id); // Busca la tarea por ID
        if (tarea) {
            try {
                tarea.setDescripcion(nuevaDescripcion); // Intenta actualizar la descripción
                this.guardarTareas(); // Guarda los cambios en las cookies
            } catch (error) {
                alert(error.message); // Muestra un mensaje si ocurre un error
            }
        }
    }

    // Elimina una tarea por su ID
    eliminarTarea(id) {
        this.tareas = this.tareas.filter(t => t.id !== id); // Filtra las tareas para excluir la seleccionada
        this.guardarTareas(); // Guarda los cambios en las cookies
    }

    // Guarda las tareas en las cookies
    guardarTareas() {
        document.cookie = `tareas=${JSON.stringify(this.tareas)};path=/`; // Convierte las tareas a JSON y las guarda
    }

    // Carga las tareas desde las cookies
    cargarTareas() {
        const cookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('tareas=')); // Busca la cookie con las tareas
        return cookie ? JSON.parse(cookie.split('=')[1]) : []; // Retorna las tareas o una lista vacía si no hay cookie
    }
}

// Variables globales
const tareaManager = new TareaManager(); // Instancia del administrador de tareas
const tablaTareas = document.getElementById('tablaTareas'); // Referencia a la tabla HTML para mostrar tareas
const guardar = document.getElementById('guardar'); // Botón de guardar en el modal de edición/creación
const eliminar = document.getElementById('eliminar'); // Botón de confirmación para eliminar
let eliminarId = null; // ID de la tarea que será eliminada

// Función para renderizar la lista de tareas en la tabla HTML
function renderTareas() {
    tablaTareas.innerHTML = ''; // Limpia el contenido actual de la tabla
    tareaManager.obtenerTareas().forEach(tarea => {
        const row = document.createElement('tr'); // Crea una nueva fila
        row.innerHTML = `
            <td>${tarea.id}</td>
            <td>${tarea.descripcion}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="openEditModal(${tarea.id}, '${tarea.descripcion}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="openDeleteModal(${tarea.id})">Eliminar</button>
            </td>
        `; // Inserta el contenido de la tarea y los botones
        tablaTareas.appendChild(row); // Añade la fila a la tabla
    });
}

// Abre el modal para editar una tarea
function openEditModal(id, descripcion) {
    document.getElementById('taskId').value = id; // Llena el campo de ID en el modal
    document.getElementById('taskDescription').value = descripcion; // Llena el campo de descripción en el modal
    const modal = new bootstrap.Modal(document.getElementById('añadirModal')); // Crea una instancia del modal de Bootstrap
    modal.show(); // Muestra el modal
}

// Abre el modal para confirmar la eliminación de una tarea
function openDeleteModal(id) {
    eliminarId = id; // Guarda el ID de la tarea a eliminar
    const modal = new bootstrap.Modal(document.getElementById('confirmModal')); // Crea una instancia del modal de Bootstrap
    modal.show(); // Muestra el modal
}

// Evento: Guardar una tarea (nueva o editada)
guardar.addEventListener('click', () => {
    const taskId = document.getElementById('taskId').value; // Obtiene el ID del modal
    const taskDescription = document.getElementById('taskDescription').value; // Obtiene la descripción del modal

    if (taskDescription.trim() === '') { // Validación: la descripción no puede estar vacía
        alert('La descripción no puede estar vacía.');
        return;
    }

    if (taskId) { // Si hay un ID, significa que es una edición
        tareaManager.editarTarea(parseInt(taskId), taskDescription);
    } else { // Si no hay ID, se crea una nueva tarea
        tareaManager.agregarTarea(taskDescription);
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('añadirModal')); // Obtiene la instancia del modal
    modal.hide(); // Cierra el modal
    document.getElementById('taskForm').reset(); // Limpia el formulario
    renderTareas(); // Actualiza la lista de tareas
});

// Evento: Confirmar la eliminación de una tarea
eliminar.addEventListener('click', () => {
    if (eliminarId !== null) { // Si hay un ID para eliminar
        tareaManager.eliminarTarea(eliminarId); // Elimina la tarea
        eliminarId = null; // Resetea el ID de eliminación
        const modal = bootstrap.Modal.getInstance(document.getElementById('confirmModal')); // Obtiene la instancia del modal
        modal.hide(); // Cierra el modal
        renderTareas(); // Actualiza la lista de tareas
    }
});

// Inicializa la aplicación cargando las tareas al DOMContentLoaded
document.addEventListener('DOMContentLoaded', renderTareas);
