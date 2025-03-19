
const apiKey = '5758f5315612391616d8a5d1244522e6'; 
const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherDisplay = document.getElementById('weatherDisplay');

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();

  if (location) {
    try {
      const weatherData = await getWeatherData(location);
      displayWeather(weatherData);
    } catch (error) {
      console.error('Error:', error.message);
      weatherDisplay.innerHTML = `<p>${error.message}</p>`;
    }
  } else {
    weatherDisplay.innerHTML = `<p>Please enter a valid location.</p>`;
  }
});

async function getWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    const errorData = await response.json();
    console.error('API Error:', errorData);
    throw new Error(errorData.message || 'Unable to fetch weather data');
  }
  return response.json();
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const temperature = main.temp;
  const weatherDescription = weather[0].description;
  const icon = weather[0].icon;

  // Set dynamic background based on weather condition
  const body = document.body;
  if (weatherDescription.includes('rain')) {
    body.style.background = 'linear-gradient(135deg, #4b6cb7, #182848)';
  } else if (weatherDescription.includes('cloud')) {
    body.style.background = 'linear-gradient(135deg, #bdc3c7, #2c3e50)';
  } else {
    body.style.background = 'linear-gradient(135deg, #6a11cb, #2575fc)';
  }

  weatherDisplay.innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Condition: ${weatherDescription}</p>
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherDescription}">
  `;
}