const heroUrl = 'https://superhero-search.p.rapidapi.com/api/heroes';
const villainUrl = 'https://superhero-search.p.rapidapi.com/api/villains';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '916085f96cmsh2fe27f95f6c9037p1d7685jsnd8555a82e1a9',
        'x-rapidapi-host': 'superhero-search.p.rapidapi.com'
    }
};

function isIndexPage() {
    return window.location.pathname.endsWith('index.html');
}

function isCharactersPage() {
    return window.location.pathname.endsWith('characters.html');
}

function displayHeroes(heroes, container, limit) {
    if (!Array.isArray(heroes)) {
        console.error("Heroes data is not an array:", heroes);
        return;
    }

    const heroContainer = document.getElementById(container);
    
    // Apply this duplication logic ONLY for index.html
    const heroesToDisplay = isIndexPage() ? heroes.slice(0, limit).concat(heroes.slice(0, limit)) : heroes.slice(0, limit);

    heroesToDisplay.forEach(hero => {
        const publisher = hero.biography.publisher;

        const heroDiv = document.createElement('div');
        heroDiv.classList.add('hero', 'slide');  // Add 'slide' class here
        heroDiv.innerHTML = `
            <img src="${hero.images.lg}" alt="${hero.name}" loading="lazy" onerror="this.onerror=null; this.src='images/missing.webp';">
            <div class="hero-info">
                <h3>${hero.name}</h3>
                <p>Publisher: ${publisher}</p>
            </div>
        `;
        heroContainer.appendChild(heroDiv);
    });
}

function displayVillains(villains, container, limit) {
    if (!Array.isArray(villains)) {
        console.error("Villains data is not an array:", villains);
        return;
    }

    const villainContainer = document.getElementById(container);
    
    // Apply this duplication logic ONLY for index.html
    const villainsToDisplay = isIndexPage() ? villains.slice(0, limit).concat(villains.slice(0, limit)) : villains.slice(0, limit);

    villainsToDisplay.forEach(villain => {
        const publisher = villain.biography.publisher;

        const villainDiv = document.createElement('div');
        villainDiv.classList.add('villain', 'slide');  // Add 'slide' class here
        villainDiv.innerHTML = `
            <img src="${villain.images.lg}" alt="${villain.name}" loading="lazy" onerror="this.onerror=null; this.src='images/missing.webp';">
            <div class="villain-info">
                <h3>${villain.name}</h3>
                <p>Publisher: ${publisher}</p>
            </div>
        `;
        villainContainer.appendChild(villainDiv);
    });
}

function displayHeroesWithDetails(heroes, container, limit) {
    if (!Array.isArray(heroes)) {
        console.error("Heroes data is not an array:", heroes);
        return;
    }

    const heroContainer = document.getElementById(container);
    heroes.slice(0, limit).forEach(hero => {
        const publisher = hero.biography.publisher;
        const fullName = hero.fullName || hero.name; 
        const firstAppearance = hero.biography.firstAppearance;

        const heroDiv = document.createElement('div');
        heroDiv.classList.add('hero');
        heroDiv.innerHTML = `
            <img src="${hero.images.lg}" alt="${hero.name}" loading="lazy" onerror="this.onerror=null; this.src='images/missing.webp';">
            <div class="hero-info">
                <h3>${hero.name}</h3>
                <p>Full Name: ${fullName}</p>
                <p>Publisher: ${publisher}</p>
                <p>First Appearance: ${firstAppearance}</p>
            </div>
        `;
        heroContainer.appendChild(heroDiv);
    });
}

function displayVillainsWithDetails(villains, container, limit) {
    if (!Array.isArray(villains)) {
        console.error("Villains data is not an array:", villains);
        return;
    }

    const villainContainer = document.getElementById(container);
    villains.slice(0, limit).forEach(villain => {
        const publisher = villain.biography.publisher;
        const fullName = villain.fullName || villain.name; 
        const firstAppearance = villain.biography.firstAppearance;

        const villainDiv = document.createElement('div');
        villainDiv.classList.add('villain');
        villainDiv.innerHTML = `
            <img src="${villain.images.lg}" alt="${villain.name}" loading="lazy" onerror="this.onerror=null; this.src='images/missing.webp';">
            <div class="villain-info">
                <h3>${villain.name}</h3>
                <p>Full Name: ${fullName}</p>
                <p>Publisher: ${publisher}</p>
                <p>First Appearance: ${firstAppearance}</p>
            </div>
        `;
        villainContainer.appendChild(villainDiv);
    });
}

async function fetchHeroes() {
    try {
        const response = await fetch(heroUrl, options);
        
        if (response.status === 403) {
            throw new Error("403 Forbidden: API key might be invalid or not have access to this endpoint.");
        }

        const data = await response.json();

        if (isIndexPage()) {
            if (Array.isArray(data)) {
                displayHeroes(data, 'heroRow', 10);  // Show 10, append same 10 for index
            } else if (data.results) {
                displayHeroes(data.results, 'heroRow', 10);
            } else {
                console.error("Unexpected data format for heroes, no heroes array found.");
            }
        } else if (isCharactersPage()) {
            if (Array.isArray(data)) {
                displayHeroesWithDetails(data, 'heroGrid', 20);  // Do not duplicate for characters page
            } else if (data.results) {
                displayHeroesWithDetails(data.results, 'heroGrid', 20);
            } else {
                console.error("Unexpected data format for heroes, no heroes array found.");
            }
        }
    } catch (error) {
        console.error('Error fetching heroes:', error);
    }
}

async function fetchVillains() {
    try {
        const response = await fetch(villainUrl, options);
        
        if (response.status === 403) {
            throw new Error("403 Forbidden: API key might be invalid or not have access to this endpoint.");
        }

        const data = await response.json();

        if (isIndexPage()) {
            if (Array.isArray(data)) {
                displayVillains(data, 'villainRow', 10);  // Show 10, append same 10 for index
            } else if (data.results) {
                displayVillains(data.results, 'villainRow', 10);
            } else {
                console.error("Unexpected data format for villains, no villains array found.");
            }
        } else if (isCharactersPage()) {
            if (Array.isArray(data)) {
                displayVillainsWithDetails(data, 'villainGrid', 20);  // Do not duplicate for characters page
            } else if (data.results) {
                displayVillainsWithDetails(data.results, 'villainGrid', 20);
            } else {
                console.error("Unexpected data format for villains, no villains array found.");
            }
        }
    } catch (error) {
        console.error('Error fetching villains:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchHeroes();
    fetchVillains();
});
