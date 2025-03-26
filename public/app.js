document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("produce-form");
    const produceContainer = document.getElementById("produce-list");
    const successMessage = document.getElementById("add-produce-success-message");
    const weatherAlert = document.getElementById("weather-alert");

    // ✅ Safeguard checks
    if (!form || !produceContainer || !successMessage || !weatherAlert) {
        console.error("One or more essential elements are missing from the DOM.");
        return; // Prevents further issues
    }

    // 🥕 Add Produce Form Submission
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById('name')?.value.trim();
        const price = document.getElementById('price')?.value.trim();
        const quantity = document.getElementById('quantity')?.value.trim();
        const harvestDate = document.getElementById('harvest-date')?.value;

        if (!name || !price || !quantity || !harvestDate) {
            alert("Please fill in all fields correctly.");
            return;
        }

        try {
            const response = await fetch('/produce/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price, quantity, harvestDate })
            });

            const result = await response.json();
            alert(result.message || "Produce added successfully!");

            // Refresh produce list
            loadProduce();

            // Success message
            successMessage.classList.remove("hidden");
            form.reset();

            setTimeout(() => successMessage.classList.add("hidden"), 3000);
        } catch (error) {
            console.error("Error adding produce:", error);
            alert("Failed to add produce. Please try again.");
        }
    });

    // 🥦 Load Produce Function
    async function loadProduce() {
        try {
            const response = await fetch('/produce');
            if (!response.ok) throw new Error("Failed to fetch produce data");

            const produceList = await response.json();
            produceContainer.innerHTML = '';

            produceList.forEach(produce => {
                const listItem = document.createElement('li');
                listItem.textContent = `${produce.name} - KES ${produce.price}`;
                produceContainer.appendChild(listItem);
            });
        } catch (error) {
            console.error("Error fetching produce data:", error);
            produceContainer.innerHTML = `<p>Failed to load produce data.</p>`;
        }
    }

    // 🌤️ Weather Data Fetch
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-1.286389&longitude=36.817223&current_weather=true')
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch weather data");
            return response.json();
        })
        .then(data => {
            weatherAlert.innerHTML = `
                <h3>Weather Update</h3>
                <p>Temperature: ${data.current_weather.temperature}°C</p>
                <p>Wind Speed: ${data.current_weather.windspeed} km/h</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherAlert.innerHTML = `<p>Weather data unavailable.</p>`;
        });

    // 🚜 Initial Produce Load
    loadProduce();
});

const produceData = [
    { name: "Tomatoes", quantity: 50, price: 100 },
    { name: "Maize", quantity: 100, price: 50 },
    { name: "Potatoes", quantity: 30, price: 70 }
];

function renderProduceList() {
    const produceList = document.getElementById('produce-list');

    if (!produceList) {
        console.error("Produce list element not found.");
        return;
    }

    produceList.innerHTML = ''; // Clear previous entries

    produceData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.quantity} kg @ KES ${item.price}/kg`;
        produceList.appendChild(listItem);
    });
}

// Run the function when the DOM loads
document.addEventListener('DOMContentLoaded', renderProduceList);
