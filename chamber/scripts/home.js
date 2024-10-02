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
            displayForecastResults(data);
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

function displayForecastResults(data) {
    
    todayFor.innerHTML = `Today: ${data}&deg;C`;
    tomorrowFor.innerHTML = `Tomorrow: ${data}&deg;C`;
    overmorrowFor.innerHTML = `Overmorrow: ${data}&deg;C`;
}

// Function to format a date object into YYYY-MM-DD
function formatDate(date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
  
// Get current date
let currentDate = new Date();
  
// Get tomorrow's date
let tomorrowDate = new Date();
tomorrowDate.setDate(currentDate.getDate() + 1);
  
// Get the day after tomorrow's date
let overmorrowDate = new Date();
overmorrowDate.setDate(currentDate.getDate() + 2);
  
// Store the dates in YYYY-MM-DD format
let currentDateFormatted = formatDate(currentDate);
let tomorrowDateFormatted = formatDate(tomorrowDate);
let overmorrowDateFormatted = formatDate(overmorrowDate);
  
console.log("Current Date:", currentDateFormatted);
console.log("Tomorrow:", tomorrowDateFormatted);
console.log("Day After Tomorrow:", overmorrowDateFormatted);
  


apiFetch();



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

        let picture = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');

        picture.setAttribute('src', member.image_source);
        picture.setAttribute('alt', `Picture of ${member.name}`);
        picture.setAttribute('loading', 'lazy');
        picture.setAttribute('width', '200');
        picture.setAttribute('height', '200');

        name.textContent = `${member.name}`;
        address.textContent = `${member.address}`;
        phone.textContent = `${member.phone_number}`;

        website.textContent = `${member.website_url}`;
        website.setAttribute('href', `${member.website_url}`);
        website.setAttribute('target', '_blank');

        card.appendChild(picture);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
    
        featuredBusinessesContainer.appendChild(card);
    });
}