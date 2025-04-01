const express = require('express');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();


// Middleware
app.use(express.json()); // Important for parsing JSON data
app.use(cors()); // Enable CORS for all routes
app.use(express.static('public')); // Serves static files from 'public' folder

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Cache-Control Headers (Ensure updated content is served)
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.render('index');
    app.get('/about', (req, res) => res.render('about'));
    app.get('/weather', (req, res) => res.render('weather'));

});

// Produce Data Route
const produceData = [
    { id: 1, name: 'Tomatoes', price: 'KES 100/kg', quantity: '50 kg', harvestDate: '25th March 2025' },
    { id: 2, name: 'Maize', price: 'KES 50/kg', quantity: '100 kg', harvestDate: '1st April 2025' }
];

app.get('/produce', (req, res) => {
    res.json(produceData);
});

// PUT Route for Updating Produce
app.put('/produce/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const produceIndex = produceData.findIndex(item => item.id === Number(id));
    if (produceIndex !== -1) {
        produceData[produceIndex] = { ...produceData[produceIndex], ...updatedData };
        res.json({ message: `Produce with ID ${id} updated successfully!`, updatedData });
    } else {
        res.status(404).json({ error: `Produce with ID ${id} not found.` });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
