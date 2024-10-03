const eventsTable = document.querySelector('#events');

const weatherIcon = document.querySelector('#weatherIcon');
const currentTemp = document.querySelector('#currentTemp');

const todayFor = document.querySelector('#today');
const tomorrowFor = document.querySelector('#tomorrow');
const overmorrowFor = document.querySelector('#overmorrow');

const featuredBusinessesContainer = document.querySelector('#featuredBusinesses');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=51.05463&lon=3.72180&units=metric&appid=6a5f3ff3ccf7c08878897af76878cba4';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayCurrentResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayCurrentResults(data) {
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



const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=51.05463&lon=3.72180&units=metric&appid=6a5f3ff3ccf7c08878897af76878cba4';

async function apiFetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecastResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Replace these with the actual 'dt' values you're looking for
const todayDt = 1727989200;
const tomorrowDt = 1728000000;
const overmorrowDt = 1728010800;

function displayForecastResults(data) {
     
    data.list.forEach(item => {
        if (item.dt === todayDt) {
            todayFor.innerHTML = `Today: ${item.main.temp}&deg;C`;
        } else if (item.dt === tomorrowDt) {
            tomorrowFor.innerHTML = `Tomorrow: ${item.main.temp}&deg;C`;
        } else if (item.dt === overmorrowDt) {
            overmorrowFor.innerHTML = `Overmorrow: ${item.main.temp}&deg;C`;
        }
    });
}

apiFetchForecast();



const businessUrl = 'data/members.json';

async function getMemberData(businessUrl) {
    const response = await fetch(businessUrl);
    const data = await response.json();
    displayMembers(data.members);
}

getMemberData(businessUrl);

const displayMembers = (members) => {
    // Filter the members to include only those with membership level 3
    const filteredMembers = members.filter(member => member.membership_level === 3);

    filteredMembers.forEach((member) => {
        let card = document.createElement('section');

        let name = document.createElement('h3');
        let line = document.createElement('hr');
        let contentDivide = document.createElement('div');
        let picture = document.createElement('img');
        let infoDivide = document.createElement('div')
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');

        picture.setAttribute('src', member.image_source);
        picture.setAttribute('alt', `Picture of ${member.name}`);
        picture.setAttribute('loading', 'lazy');
        picture.setAttribute('width', '200');
        picture.setAttribute('height', '200');

        name.textContent = `${member.name}`;
        address.innerHTML = `<strong>ADDRESS: </strong>${member.address}`;
        phone.innerHTML = `<strong>PHONE: </strong>${member.phone_number}`;

        website.innerHTML = `<strong>URL: </strong>${member.website_url}`;
        website.setAttribute('href', `${member.website_url}`);
        website.setAttribute('target', '_blank');

        infoDivide.appendChild(address);
        infoDivide.appendChild(phone);
        infoDivide.appendChild(website);

        contentDivide.appendChild(picture);
        contentDivide.appendChild(infoDivide);

        card.appendChild(name);
        card.appendChild(line);
        card.appendChild(contentDivide);
    
        featuredBusinessesContainer.appendChild(card);
    });
}