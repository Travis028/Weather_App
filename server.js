const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Helper function to read database
function readDatabase() {
    const dbPath = path.join(__dirname, 'db.json');
    const dbContent = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(dbContent);
}

// Get all weather data
app.get('/api/weather', (req, res) => {
    try {
        const db = readDatabase();
        res.json(db.weather);
    } catch (error) {
        res.status(500).json({ error: 'Error reading weather data' });
    }
});

// Get weather by city name
app.get('/api/weather/:city', (req, res) => {
    try {
        const db = readDatabase();
        const cityName = req.params.city;
        const weatherData = db.weather.find(weather => 
            weather.city.toLowerCase() === cityName.toLowerCase()
        );

        if (weatherData) {
            res.json(weatherData);
        } else {
            res.status(404).json({ error: `Weather data for ${cityName} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error reading weather data' });
    }
});

// Add new weather data
app.post('/api/weather', (req, res) => {
    try {
        const db = readDatabase();
        const newWeather = req.body;
        db.weather.push(newWeather);
        
        fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(db, null, 2));
        res.status(201).json(newWeather);
    } catch (error) {
        res.status(500).json({ error: 'Error adding weather data' });
    }
});

// Update weather data
app.put('/api/weather/:city', (req, res) => {
    try {
        const db = readDatabase();
        const cityName = req.params.city;
        const updatedData = req.body;
        
        const index = db.weather.findIndex(weather => 
            weather.city.toLowerCase() === cityName.toLowerCase()
        );

        if (index !== -1) {
            db.weather[index] = { ...db.weather[index], ...updatedData };
            fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(db, null, 2));
            res.json(db.weather[index]);
        } else {
            res.status(404).json({ error: `Weather data for ${cityName} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating weather data' });
    }
});

// Delete weather data
app.delete('/api/weather/:city', (req, res) => {
    try {
        const db = readDatabase();
        const cityName = req.params.city;
        
        const index = db.weather.findIndex(weather => 
            weather.city.toLowerCase() === cityName.toLowerCase()
        );

        if (index !== -1) {
            db.weather.splice(index, 1);
            fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(db, null, 2));
            res.json({ message: `Weather data for ${cityName} deleted successfully` });
        } else {
            res.status(404).json({ error: `Weather data for ${cityName} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting weather data' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});