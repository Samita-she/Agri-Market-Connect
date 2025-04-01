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
async function fetchWeatherData() {
    try {
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Nairobi');
        const data = await response.json();

        renderWeatherData(data.current || {});
    } catch (error) {
        console.error("Error fetching weather data:", error);
        renderWeatherData(null); // Handle missing data gracefully
    }
}

async function fetchWeatherData() {
    try {
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Nairobi');
        const data = await response.json();

        renderWeatherData(data.current || {});
    } catch (error) {
        console.error("Error fetching weather data:", error);
        renderWeatherData(null);
    }
}
//Render weather data
function renderWeatherData(weatherData) {
    const weatherinfo = document.getElementById('weather-info');

    if (!weatherinfo) {
        console.error("Element with ID 'weather-info' not found.");
        return;
    }

    if (!weatherinfo) {
        weatherinfo.innerHTML = `<p>No weather data available.</p>`;
    } else {
        weatherinfo.innerHTML = `
                <h3>Weather in Nairobi</h3>
                <p>Temperature: ${weatherData.temp_c}°C</p>
                <p>Condition: ${weatherData.condition.text}</p>
            `;
    }


fetchWeatherData(); 
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
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent.`);
        document.getElementById("contact-form").reset();
    } else {
        alert("Please fill in all fields.");
    }
});

