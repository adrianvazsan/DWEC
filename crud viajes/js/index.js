// Clases base
class Viaje {
    constructor(codigo, destino, precio, tipo) {
        this.codigo = codigo;
        this.destino = destino;
        this.precio = precio;
        this.tipo = tipo;
    }
    getInfo() {
        return `${this.codigo}: ${this.destino} - ${this.precio}€ (${this.tipo})`;
    }
}

class Cliente {
    constructor(nombre, apellido, email, telefono) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
    }
    getResumen() {
        return `${this.nombre} ${this.apellido}`;
    }
}

class Reserva {
    constructor(cliente, viaje) {
        this.cliente = cliente;
        this.viaje = viaje;
    }
    getResumen() {
        return `${this.cliente.getResumen()} ha reservado ${this.viaje.getInfo()}`;
    }
}

// Variables globales
const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
const viajes = JSON.parse(localStorage.getItem("viajes")) || [];
const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

// Referencias del DOM
const tablaClientes = document.getElementById("lista-clientes");
const tablaViajes = document.getElementById("lista-viajes");
const tablaReservas = document.getElementById("lista-reservas");
const selectClienteReserva = document.getElementById("cliente-reserva");
const selectViajeReserva = document.getElementById("viaje-reserva");

// Formularios
const formCliente = document.getElementById("form-cliente");
const formViaje = document.getElementById("form-viaje");
const formReserva = document.getElementById("form-reserva");

// Funciones para mostrar datos o mensajes vacíos
function actualizarClientes() {
    tablaClientes.innerHTML = clientes.length
        ? clientes.map((c, i) => `
            <tr>
                <td>${c.nombre} ${c.apellido}</td>
                <td>${c.email}</td>
                <td>${c.telefono}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="eliminarCliente(${i})">Eliminar</button>
                </td>
            </tr>`).join("")
        : `<tr><td colspan="4" class="text-center">No hay clientes añadidos</td></tr>`;
        actualizarSelects();
}

function actualizarViajes() {
    tablaViajes.innerHTML = viajes.length
        ? viajes.map((v, i) => `
            <tr>
                <td>${v.codigo}</td>
                <td>${v.destino}</td>
                <td>${v.precio}€</td>
                <td>${v.tipo}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="eliminarViaje(${i})">Eliminar</button>
                </td>
            </tr>`).join("")
        : `<tr><td colspan="5" class="text-center">No hay viajes añadidos</td></tr>`;
        actualizarSelects();
}

function actualizarReservas() {
    tablaReservas.innerHTML = reservas.length
        ? reservas.map((r, i) => `
            <tr>
                <td>${r.cliente.nombre} ${r.cliente.apellido}</td>
                <td>${r.viaje.destino}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="eliminarReserva(${i})">Cancelar</button>
                </td>
            </tr>`).join("")
        : `<tr><td colspan="3" class="text-center">No hay reservas realizadas</td></tr>`;
}

// Función para actualizar los select
function actualizarSelects() {
    // Actualizar select de clientes
    selectClienteReserva.innerHTML = '<option disabled selected>Selecciona un cliente</option>';
    clientes.forEach((cliente, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${cliente.nombre} ${cliente.apellido}`;
        selectClienteReserva.appendChild(option);
    });

    // Actualizar select de viajes
    selectViajeReserva.innerHTML = '<option disabled selected>Selecciona un viaje</option>';
    viajes.forEach((viaje, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${viaje.destino} - ${viaje.precio}€`;
        selectViajeReserva.appendChild(option);
    });
}

// Funciones de añadir elementos
function añadirCliente(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    if (!nombre || !apellido || !email || !telefono) {
        alert("Por favor, completa todos los campos del cliente.");
        return;
    }

    clientes.push(new Cliente(nombre, apellido, email, telefono));
    localStorage.setItem("clientes", JSON.stringify(clientes));
    actualizarClientes();
    formCliente.reset();
}

function añadirViaje(event) {
    event.preventDefault();
    const codigo = document.getElementById("codigo-viaje").value.trim();
    const destino = document.getElementById("destino").value.trim();
    const precio = document.getElementById("precio").value.trim();
    const tipo = document.getElementById("tipo-viaje").value;

    if (!codigo || !destino || !precio || !tipo) {
        alert("Por favor, completa todos los campos del viaje.");
        return;
    }

    viajes.push(new Viaje(codigo, destino, parseFloat(precio), tipo));
    localStorage.setItem("viajes", JSON.stringify(viajes));
    actualizarViajes();
    formViaje.reset();
}

function añadirReserva(event) {
    event.preventDefault();
    const clienteIndex = document.getElementById("cliente-reserva").selectedIndex - 1;
    const viajeIndex = document.getElementById("viaje-reserva").selectedIndex - 1;

    if (clienteIndex < 0 || viajeIndex < 0) {
        alert("Por favor, selecciona un cliente y un viaje.");
        return;
    }

    reservas.push(new Reserva(clientes[clienteIndex], viajes[viajeIndex]));
    localStorage.setItem("reservas", JSON.stringify(reservas));
    actualizarReservas();
    formReserva.reset();
}

// Función de eliminar cliente con validación
function eliminarCliente(index) {
    const clienteRelacionado = reservas.some(reserva => reserva.cliente === clientes[index]);

    if (clienteRelacionado) {
        alert("No se puede eliminar este cliente porque tiene reservas asociadas.");
        return;
    }

    clientes.splice(index, 1);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    actualizarClientes();
}

// Función de eliminar viaje con validación
function eliminarViaje(index) {
    const viajeRelacionado = reservas.some(reserva => reserva.viaje === viajes[index]);

    if (viajeRelacionado) {
        alert("No se puede eliminar este viaje porque tiene reservas asociadas.");
        return;
    }

    viajes.splice(index, 1);
    localStorage.setItem("viajes", JSON.stringify(viajes));
    actualizarViajes();
}

function eliminarReserva(index) {
    reservas.splice(index, 1);
    localStorage.setItem("reservas", JSON.stringify(reservas));
    actualizarReservas();
}

// Inicializar datos
actualizarClientes();
actualizarViajes();
actualizarReservas();
formCliente.addEventListener("submit", añadirCliente);
formViaje.addEventListener("submit", añadirViaje);
formReserva.addEventListener("submit", añadirReserva);
