const axios = require('axios');

let produceList = [];

exports.getProduce = (req, res) => {
    res.json(produceList);
};

exports.addProduce = (req, res) => {
    const { name, price, quantity, harvestDate } = req.body;
    const newProduce = { id: Date.now(), name, price, quantity, harvestDate };
    produceList.push(newProduce);
    res.json({ message: 'Produce added successfully!', newProduce });
};

exports.deleteProduce = (req, res) => {
    const { id } = req.params;
    produceList = produceList.filter(item => item.id !== parseInt(id));
    res.json({ message: 'Produce deleted successfully!' });
};
//fetch weather akerts
exports.getWeather = async (req, res) => {
    try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: -1.286389, // Nairobi example
                longitude: 36.817223,
                current_weather: true
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};
