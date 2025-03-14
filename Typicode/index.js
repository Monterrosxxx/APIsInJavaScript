// Variables para controlar la paginación
let currentPage = 1;
let totalPages = 0;
const itemsPerPage = 20; // Cantidad de tareas por página

// Elementos del DOM
const todosContainer = document.getElementById('todos-container');
const loadingElement = document.getElementById('loading');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');

// Función para obtener las tareas
async function fetchTodos(page = 1) {
    try {
        // Mostrar el cargador
        loadingElement.style.display = 'flex';
        todosContainer.style.display = 'none';

        // Calcular el inicio y el fin de los índices para la paginación
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Obtener los datos de la API
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();

        // Calcular el total de páginas
        totalPages = Math.ceil(data.length / itemsPerPage);

        // Actualizar información de paginación
        currentPage = page;

        // Actualizar botones de paginación
        updatePaginationButtons();

        // Mostrar las tareas de la página actual
        displayTodos(data.slice(startIndex, endIndex));
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        todosContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar las tareas. Por favor, intenta de nuevo más tarde.</p>
            </div>
        `;
    } finally {
        // Ocultar el cargador
        loadingElement.style.display = 'none';
        todosContainer.style.display = 'grid';
    }
}

// Función para mostrar las tareas
function displayTodos(todos) {
    // Limpiar el contenedor
    todosContainer.innerHTML = '';

    // Mostrar cada tarea
    todos.forEach(todo => {
        // Determinar clases de estado
        let completedClass = todo.completed ? 'true' : 'false';

        // Crear tarjeta de tarea
        const todoCard = document.createElement('div');
        todoCard.className = 'todo-card';
        todoCard.innerHTML = `
            <div class="todo-info">
                <h3 class="todo-title">${todo.title}</h3>
                <div class="todo-details">
                    <p><i class="fas fa-user"></i> User ID: ${todo.userId}</p>
                </div>
                <span class="completed ${completedClass}">
                    <i class="fas fa-check-circle"></i> ${todo.completed ? 'Completada' : 'Pendiente'}
                </span>
            </div>
        `;

        // Agregar la tarjeta al contenedor
        todosContainer.appendChild(todoCard);
    });
}

// Función para actualizar los botones de paginación
function updatePaginationButtons() {
    // Actualizar el texto de la página actual
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

    // Habilitar/deshabilitar botones según corresponda
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Event listeners para botones de paginación
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        fetchTodos(currentPage - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        fetchTodos(currentPage + 1);
    }
});

// Cargar las tareas al cargar la página
fetchTodos();