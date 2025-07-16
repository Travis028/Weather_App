const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherDisplay = document.getElementById("weatherDisplay");
const errorMessage = document.getElementById("errorMessage");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  weatherDisplay.classList.add("hidden");
  errorMessage.classList.add("hidden");

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

function displayWeather(data) {
  const { name, sys, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  weatherDisplay.innerHTML = `
    <h2>${name}, ${sys.country}</h2>
    <img src="${iconUrl}" alt="${weather[0].description}">
    <p><strong> Temperature:</strong> ${main.temp}°C</p>
    <p><strong> Weather:</strong> ${weather[0].description}</p>
    <p><strong> Humidity:</strong> ${main.humidity}%</p>
    <p><strong> Wind Speed:</strong> ${wind.speed} m/s</p>
  `;
  weatherDisplay.classList.remove("hidden");
}

function showError(message) {
  errorMessage.textContent = ` ${message}`;
  errorMessage.classList.remove("hidden");
}
