const eventsTable = document.querySelector('#events');
const weatherIcon = document.querySelector('#weatherIcon');
const currentTemp = document.querySelector('#currentTemp');
const weatherForecastTable = document.querySelector('#weatherForecast');

const featuredBusinessesContainer = document.querySelector('#featuredBusinesses');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=51.05463&lon=3.72180&units=metric&appid=6a5f3ff3ccf7c08878897af76878cba4';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    const temp = data.main.temp; // Current temperature
    const weather = data.weather[0].description; // Weather description
    const tempMax = data.main.temp_max; // Maximum temperature
    const tempMin = data.main.temp_min; // Minimum temperature
    const humidity = data.main.humidity; // Humidity percentage
    const sunriseTimestamp = data.sys.sunrise; // Sunrise timestamp
    const sunsetTimestamp = data.sys.sunset; // Sunset timestamp

    const sunrise = new Date(sunriseTimestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(sunsetTimestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    currentTemp.innerHTML = `
        <strong>${temp}&deg;</strong> C<br>
        ${weather.charAt(0).toUpperCase() + weather.slice(1)}<br>
        High: ${tempMax}&deg;<br>
        Low: ${tempMin}&deg;<br>
        Humidity: ${humidity}%<br>
        Sunrise: ${sunrise}<br>
        Sunset: ${sunset}
    `;
}

apiFetch();