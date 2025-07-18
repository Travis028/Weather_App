// Function to search for weather data by city name
function getWeatherByCity(cityName) {
    // Get the database content
    const db = require('./db.json');
    
    // Find the weather data for the specified city
    const weatherData = db.weather.find(weather => weather.city.toLowerCase() === cityName.toLowerCase());
    
    // Return the found data or a message if not found
    if (weatherData) {
        return weatherData;
    } else {
        return { error: `Weather data for ${cityName} not found` };
    }
}

// Example usage:
// const nairobiWeather = getWeatherByCity("Nairobi");
// console.log(nairobiWeather);
