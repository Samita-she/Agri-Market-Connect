const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Render index.ejs on the root route
app.get('/', (req, res) => {
    res.render('index');
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});
app.get('/produce', (req, res) => {
    const produceData = [
        { name: 'Tomatoes', price: 'KES 100/kg', quantity: '50 kg', harvestDate: '25th March 2025' },
        { name: 'Maize', price: 'KES 50/kg', quantity: '100 kg', harvestDate: '1st April 2025' }
    ];
    res.json(produceData);  // Return JSON data
});

const cors = require('cors'); // Import CORS

app.use(cors()); // Enable CORS for all routes





