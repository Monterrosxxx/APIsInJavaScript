const bitcoinDataContainer = document.getElementById('bitcoin-data');
const loadingElement = document.getElementById('loading');

async function fetchBitcoinData() {
    try {
        loadingElement.style.display = 'flex';
        bitcoinDataContainer.style.display = 'none';

        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin');
        const data = await response.json();

        displayBitcoinData(data);
    } catch (error) {
        console.error('Error al obtener los datos de Bitcoin:', error);
        bitcoinDataContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar los datos de Bitcoin. Por favor, intenta de nuevo más tarde.</p>
            </div>
        `;
    } finally {
        loadingElement.style.display = 'none';
        bitcoinDataContainer.style.display = 'block';
    }
}

function displayBitcoinData(data) {
    bitcoinDataContainer.innerHTML = `
        <h2>${data.name} (${data.symbol.toUpperCase()})</h2>
        <p><strong>Precio Actual:</strong> <span class="price">$${data.market_data.current_price.usd}</span></p>
        <p><strong>Capitalización de Mercado:</strong> $${data.market_data.market_cap.usd}</p>
        <p><strong>Volumen (24h):</strong> $${data.market_data.total_volume.usd}</p>
        <p><strong>Cambio (24h):</strong> ${data.market_data.price_change_percentage_24h.toFixed(2)}%</p>
        <p><strong>Rango en el Mercado:</strong> ${data.market_cap_rank}</p>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchBitcoinData();
});