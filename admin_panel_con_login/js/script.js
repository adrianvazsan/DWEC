// Función para mostrar u ocultar los formularios
function ShowHide() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}
function cerrarSesion() {
    localStorage.removeItem('users'); // Elimina los datos de los usuarios almacenados en localStorage
    window.location.href = 'index.html'; // Redirige al usuario a la página de inicio (index.html)
}

$(document).ready(function () {
    // Alternar entre login y registro
    $('#cambiarARegistro').on('click', function (e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        $('#loginForm').addClass('d-none'); // Oculta el formulario y título del login
        $('#loginTitulo').addClass('d-none'); // Oculta el título del login
        $('#registroForm').removeClass('d-none'); // Muestra el formulario del registro
        $('#registraTitulo').removeClass('d-none'); // Muestra el título del registro
    });

    $('#cambiarALogin').on('click', function (e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        $('#registroForm').addClass('d-none'); // Oculta el formulario y título del registro
        $('#registraTitulo').addClass('d-none'); // Oculta el título del registro
        $('#loginForm').removeClass('d-none'); // Muestra el formulario del login
        $('#loginTitulo').removeClass('d-none'); // Muestra el título del login
    });

    // Validación y registro
    $('#registroForm').on('submit', function (e) {
        e.preventDefault();  // Evita el envío del formulario por defecto
        // Obtiene los valores de los campos de registro
        const name = $("#registerName").val(); 
        const email = $('#registerEmail').val();
        const password = $('#registerPassword').val(); 
        const repeatPassword = $('#repeatPassword').val(); 

        // Validación del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Validación de la contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-])[A-Za-z\d@$!%*?&_\-]{6,}$/;
        if (!passwordRegex.test(password)) {
            alert('La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.');
            return;
        }

        // Verifica si las contraseñas coinciden
        if (password !== repeatPassword) {
            $('#errorContraseña').removeClass('d-none'); // Muestra un mensaje de error si no coinciden
            return;
        } else {
            $('#errorContraseña').addClass('d-none'); // Oculta el mensaje de error si coinciden
        }

        // Recupera los usuarios almacenados en localStorage o inicializa un array vacío
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verifica si el correo ya está registrado
        if (users.some(user => user.email === email)) {
            alert('El correo ya está registrado.');
            return;
        }

        // Agrega el nuevo usuario al array y lo guarda en localStorage
        users.push({name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        // Notifica al usuario y lo redirige a la vista de login
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        $('#cambiarALogin').click();
    });

    // Proceso de inicio de sesión
    $('#loginForm').on('submit', function (e) {
        e.preventDefault(); // Evita el envío del formulario por defecto
        // Obtiene los valores de los campos de inicio de sesión
        const name = $("#loginName").val();
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();

        // Recupera los usuarios almacenados en localStorage o inicializa un array vacío
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user =>user.name === name && user.email === email && user.password === password); // Busca un usuario que coincida con las credenciales ingresadas

        if (user) {
            alert('Inicio de sesión exitoso.'); // Si encuentra un usuario, muestra un mensaje y redirige al dashboard
            window.location.href = 'admin.html';
        } else {
            alert('Credenciales incorrectas.'); // Si no encuentra un usuario, muestra un mensaje de error
        }
    });
});


// Función para recuperar usuarios almacenados en localStorage
function obtenerUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Mostrar los datos de los usuarios en una tabla utilizando DataTables
$(document).ready(function(){
    let usuarios = obtenerUsers(); // Recupera la lista de usuarios almacenados en localStorage
    $('#tabla').DataTable({
        retrieve: true,
        paging: true, // Habilitar la paginación
        pageLength: 4, // Mostrar 4 registros por página (puedes ajustarlo a tus necesidades)
        lengthMenu: [4, 10, 25, 50], // Opciones en el menú desplegable de registros por página
        language: {
            processing: "Procesando...",
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            loadingRecords: "Cargando...",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "Ningún dato disponible en esta tabla",
            paginate: {
                first: "Primero",
                previous: "Anterior",
                next: "Siguiente",
                last: "Último"
            },
            aria: {
                sortAscending: ": Activar para ordenar la columna de manera ascendente",
                sortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        }
    }); 
    //Limpiar la talba antes de llenarla
    tabla.clear();
    //Agregar cada usuario a la tabla 
    usuarios.forEach(usuario => {
        tabla.row.add([usuario.name,usuario.email,usuario.password]).draw();
    });
});