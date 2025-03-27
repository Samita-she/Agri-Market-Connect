document.addEventListener("DOMContentLoaded", () => {
    loadProduce();
    renderWeatherData();
    setupEventListeners();
});

// 🥦 Load Produce Function
async function loadProduce() {
    const produceContainer = document.getElementById('produce-list');
    produceContainer.innerHTML = ''; // Clear previous content

    try {
        const response = await fetch('http://localhost:3000/produce');
        if (!response.ok) throw new Error('Failed to fetch produce data');

        const produceData = await response.json();

        produceData.forEach(produce => {
            const produceCard = document.createElement('div');
            produceCard.classList.add('produce-card');

            produceCard.innerHTML = `
                <h3>${produce.name}</h3>
                <p><strong>Category:</strong> ${produce.category}</p>
                <p><strong>Price:</strong> KES ${produce.price}</p>
                <p><strong>Quantity Available:</strong> ${produce.quantity} kg</p>
                <button class="edit-btn" data-id="${produce.id}">Edit</button>
                <button class="delete-btn" data-id="${produce.id}">Delete</button>
            `;

            produceCard.querySelector('.edit-btn').addEventListener('click', () => handleEdit(produce.id));
            produceCard.querySelector('.delete-btn').addEventListener('click', () => handleDelete(produce.id));

            produceContainer.appendChild(produceCard);
        });
    } catch (error) {
        console.error('Error loading produce:', error);
        produceContainer.innerHTML = `<p class="error">Failed to load produce data. Please try again later.</p>`;
    }
}

// 📝 Handle Edit Produce
async function handleEdit(id) {
    const newName = prompt('Enter new produce name:');
    if (newName) {
        try {
            const response = await fetch(`/produce/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName })
            });
            if (!response.ok) throw new Error('Failed to update produce');

            alert('Produce updated successfully!');
            loadProduce(); // Refresh listings
        } catch (error) {
            console.error('Error updating produce:', error);
            alert('Failed to update produce. Try again.');
        }
    }
}

// ❌ Handle Delete Produce
async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this produce?')) return;

    try {
        const response = await fetch(`http://localhost:3000/produce/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete produce');

        loadProduce(); // Refresh listings
    } catch (error) {
        console.error('Error deleting produce:', error);
        alert('Failed to delete produce. Try again.');
    }
}

// 🌤️ Render Weather Data
async function renderWeatherData() {
    const weatherAlert = document.getElementById("weather-alert");

    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-1.286389&longitude=36.817223&current_weather=true');
        if (!response.ok) throw new Error("Failed to fetch weather data");

        const data = await response.json();

        weatherAlert.innerHTML = `
            <h3>🌤️ Weather Update</h3>
            <p><strong>Temperature:</strong> ${data.current_weather.temperature}°C</p>
            <p><strong>Wind Speed:</strong> ${data.current_weather.windspeed} km/h</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherAlert.innerHTML = `<p class="error">Weather data currently unavailable. Please check back later.</p>`;
    }
}

// ➕ Add New Produce Entry
async function addProduce(event) {
    event.preventDefault();

    const name = document.getElementById('produce-name').value.trim();
    const category = document.getElementById('produce-category').value.trim();
    const price = parseFloat(document.getElementById('produce-price').value);
    const quantity = parseInt(document.getElementById('produce-quantity').value);

    if (!name || !category || isNaN(price) || isNaN(quantity)) {
        alert('Please fill in all fields correctly.');
        return;
    }

    const newProduce = { name, category, price, quantity };

    try {
        const response = await fetch('http://localhost:3000/produce', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduce)
        });

        if (!response.ok) throw new Error('Failed to add produce');

        alert('Produce added successfully!');
        loadProduce();
    } catch (error) {
        console.error('Error adding produce:', error);
        alert('Failed to add produce. Try again.');
    }
}

function setupEventListeners() {
    const form = document.getElementById('add-produce-form');
    if (form) form.addEventListener('submit', addProduce);
}
