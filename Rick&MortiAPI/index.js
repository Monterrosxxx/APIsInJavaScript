// Variables para controlar la paginación
let currentPage = 1;
let totalPages = 0;
 
// Elementos del DOM
const charactersContainer = document.getElementById('characters-container');
const loadingElement = document.getElementById('loading');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');
 
// Función para obtener los personajes
async function fetchCharacters(page = 1) {
    try {
        // Mostrar el cargador
        loadingElement.style.display = 'flex';
        charactersContainer.style.display = 'none';
       
        // Obtener los datos de la API
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
        const data = await response.json();
       
        // Actualizar información de paginación
        totalPages = data.info.pages;
        currentPage = page;
       
        // Actualizar botones de paginación
        updatePaginationButtons();
       
        // Mostrar los personajes
        displayCharacters(data.results);
    } catch (error) {
        console.error('Error al obtener los personajes:', error);
        charactersContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar los personajes. Por favor, intenta de nuevo más tarde.</p>
            </div>
        `;
    } finally {
        // Ocultar el cargador
        loadingElement.style.display = 'none';
        charactersContainer.style.display = 'grid';
    }
}
 
// Función para mostrar los personajes
function displayCharacters(characters) {
    // Limpiar el contenedor
    charactersContainer.innerHTML = '';
   
    // Mostrar cada personaje
    characters.forEach(character => {
        // Determinar clases de estado
        let statusClass = 'unknown';
        if (character.status.toLowerCase() === 'alive') {
            statusClass = 'alive';
        } else if (character.status.toLowerCase() === 'dead') {
            statusClass = 'dead';
        }
       
        // Crear tarjeta de personaje
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';
        characterCard.innerHTML = `
            <img src="${character.image}" alt="${character.name}" class="character-image">
            <div class="character-info">
                <h3 class="character-name">${character.name}</h3>
                <div class="character-details">
                    <p><i class="fas fa-globe"></i> ${character.location.name}</p>
                    <p><i class="fas fa-dna"></i> ${character.species}</p>
                    <span class="status ${statusClass}">
                        <i class="fas fa-circle"></i> ${character.status}
                    </span>
                </div>
            </div>
        `;
       
        // Agregar la tarjeta al contenedor
        charactersContainer.appendChild(characterCard);
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
        fetchCharacters(currentPage - 1);
    }
});
 
nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        fetchCharacters(currentPage + 1);
    }
});
 
// Cargar los personajes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters();
});