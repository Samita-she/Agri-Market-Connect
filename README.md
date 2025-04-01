# Agri-Market-Connect

![Agri-Market Connect Banner](images/banner.png)

## Project Owner
**Sheila Khanyunya Samita**

## Project Overview
**Agri-Market Connect** is an online platform designed to bridge the gap between small-scale farmers and potential buyers. By providing a streamlined marketplace, the platform empowers farmers to showcase their produce while enabling buyers to access fresh supplies directly from trusted sources.

---

## Problem Statement
Farmers often struggle to find reliable markets for their produce, while buyers such as restaurants, hotels, and wholesalers face challenges sourcing fresh produce directly from local suppliers. This platform aims to simplify that process by providing a dedicated space for:

✅ Produce listings with comprehensive details
✅ Buyer requests for specific produce needs
✅ Weather alerts to keep farmers informed
✅ Live market price tracking for better pricing decisions

---

## Solution
**Agri-Market Connect** offers:
- A user-friendly interface for farmers to post listings with details like price, quantity, and harvest date.
- A system for buyers to submit requests for specific produce needs.
- Integrated weather alerts for better planning and crop protection.
- A live market price tracker to assist farmers in setting fair prices.

---

## MVP Features
### 🎯 Key Features
- List available produce with detailed information (price, quantity, harvest date).
- Allow buyers to post produce requests.
- Display weather alerts to notify farmers about crop-impacting weather conditions.
- Showcase live market prices for common produce items.
- Enable farmers to update or delete listings when inventory changes.

---

## API Integration
### 🌦 Weather Alerts
API: [Open-Meteo](https://open-meteo.com/)

**Sample API Request:**
```
https://api.open-meteo.com/v1/forecast?latitude=1.2921&longitude=36.8219&hourly=temperature_2m
```

### 📈 Market Price Tracker
API: [Commodity Price Tracker](https://www.commoditypricetracker.com/)

**Sample API Request:**
```
https://api.commoditypricetracker.com/prices?commodity=maize
```

---

## Installation and Setup
1. **Clone the Repository**
```
git clone https://github.com/Samita-she/AgriMarketConnect.git
```

2. **Navigate to Project Folder**
```
cd AgriMarketConnect
```

3. **Install Dependencies**
```
npm install
```

4. **Run the Application**
```
npm start
```

---

## Screenshots
### Homepage
![Homepage](images/homepage.png)

### Produce Listings Page
![Produce Listings](images/produce-listings.png)

### Weather Alert Section
![Weather Alerts](images/weather-alerts.png)

---

## Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request with your improvements.

---

## License
This project is licensed under the **MIT License**.

---

## Contact Information
📧 **Email:** samitasheila1@gmail.com  
🌐 **LinkedIn:** [Sheila Khanyunya Samita](https://www.linkedin.com/in/sheila-samita-676362241)  
💻 **GitHub:** [Samita-she](https://github.com/Samita-she)

---
---

## Future Enhancements
🔹 Implement a chat feature for farmers and buyers to communicate directly.  
🔹 Add secure payment integration for streamlined transactions.

