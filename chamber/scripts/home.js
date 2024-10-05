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

function formatDateWithTime(date) {
    // Format the date to YYYY-MM-DD HH:00:00
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:00:00`;
}
  
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
  
function adjustToNext3HourInterval(date) {
    const hours = date.getHours();
    
    if (hours < 15) {
      date.setHours(15, 0, 0, 0);
    }
    else if (hours >= 15 && hours < 18) {
      date.setHours(18, 0, 0, 0);
    }
    else if (hours >= 18 && hours < 21) {
      date.setHours(21, 0, 0, 0);
    }
    else {
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 1);
    }
}

const now = new Date();

const tomorrow = new Date(now);
const overmorrow = new Date(now);

adjustToNext3HourInterval(now);

tomorrow.setHours(15, 0, 0, 0);
overmorrow.setHours(15, 0, 0, 0);
  
const todayDt = formatDateWithTime(now);
const tomorrowDt = formatDateWithTime(addDays(tomorrow, 1));
const overmorrowDt = formatDateWithTime(addDays(overmorrow, 2));
  
/*console.log("Today:", todayDt);
console.log("Tomorrow:", tomorrowDt);
console.log("Overmorrow:", overmorrowDt);*/

function getWeekdayName(dateStr) {
    const date = new Date(dateStr); // Convert the date string to a Date object
    const options = { weekday: 'long' }; // Specify that we want the full name of the weekday
    return date.toLocaleDateString('en-US', options); // Get the weekday name
}

function displayForecastResults(data) {
    data.list.forEach(item => {
        const roundedTemp = Math.round(item.main.temp); // Round the temperature to the nearest whole number

        if (item.dt_txt === todayDt) {
            todayFor.innerHTML = `Today: <strong>${roundedTemp}&deg;C</strong>`;
        } else if (item.dt_txt === tomorrowDt) {
            const tomorrowDayName = getWeekdayName(tomorrowDt); // Get the weekday name for tomorrow
            tomorrowFor.innerHTML = `${tomorrowDayName}: <strong>${roundedTemp}&deg;C</strong>`;
        } else if (item.dt_txt === overmorrowDt) {
            const overmorrowDayName = getWeekdayName(overmorrowDt); // Get the weekday name for overmorrow
            overmorrowFor.innerHTML = `${overmorrowDayName}: <strong>${roundedTemp}&deg;C</strong>`;
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
    // Filter members to include only those with membership level 2 or 3
    const filteredMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);

    // Shuffle the filtered members array to randomize their order
    const shuffledMembers = filteredMembers.sort(() => 0.5 - Math.random());

    // Select the first 3 members from the shuffled array
    const selectedMembers = shuffledMembers.slice(0, 3);

    selectedMembers.forEach((member) => {
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