async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'your_api_key'; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            document.getElementById('weather').innerText = `Temperature: ${data.main.temp}°C, ${data.weather[0].description}`;
        } else {
            document.getElementById('weather').innerText = 'City not found!';
        }
    } catch (error) {
        document.getElementById('weather').innerText = 'Error fetching weather data';
    }
}
