const heroUrl = 'https://superhero-search.p.rapidapi.com/api/heroes';
    const villainUrl = 'https://superhero-search.p.rapidapi.com/api/villains';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '916085f96cmsh2fe27f95f6c9037p1d7685jsnd8555a82e1a9',  // Your actual API key
            'x-rapidapi-host': 'superhero-search.p.rapidapi.com'
        }
    };

    // Function to check if the page is index.html
    function isIndexPage() {
        return window.location.pathname.endsWith('index.html');
    }

    // Function to check if the page is characters.html
    function isCharactersPage() {
        return window.location.pathname.endsWith('characters.html');
    }

    // Function to populate heroes
    function displayHeroes(heroes, container, limit) {
        if (!Array.isArray(heroes)) {
            console.error("Heroes data is not an array:", heroes);
            return;
        }

        const heroContainer = document.getElementById(container);
        heroes.slice(0, limit).forEach(hero => {
            const publisher = hero.biography.publisher;

            const heroDiv = document.createElement('div');
            heroDiv.classList.add('hero');
            heroDiv.innerHTML = `
                <img src="${hero.images.lg}" alt="${hero.name}" loading="lazy">
                <h3>${hero.name}</h3>
                <p>Publisher: ${publisher}</p>
            `;
            heroContainer.appendChild(heroDiv);
        });
    }

    // Function to populate villains
    function displayVillains(villains, container, limit) {
        if (!Array.isArray(villains)) {
            console.error("Villains data is not an array:", villains);
            return;
        }

        const villainContainer = document.getElementById(container);
        villains.slice(0, limit).forEach(villain => {
            const publisher = villain.biography.publisher;

            const villainDiv = document.createElement('div');
            villainDiv.classList.add('villain');
            villainDiv.innerHTML = `
                <img src="${villain.images.lg}" alt="${villain.name}" loading="lazy">
                <h3>${villain.name}</h3>
                <p>Publisher: ${publisher}</p>
            `;
            villainContainer.appendChild(villainDiv);
        });
    }

    // Function to populate heroes with full details
    function displayHeroesWithDetails(heroes, container, limit) {
        if (!Array.isArray(heroes)) {
            console.error("Heroes data is not an array:", heroes);
            return;
        }

        const heroContainer = document.getElementById(container);
        heroes.slice(0, limit).forEach(hero => {
            const publisher = hero.biography.publisher;
            const fullName = hero.fullName || hero.name; // Use fullName if available
            const firstAppearance = hero.biography.firstAppearance;

            const heroDiv = document.createElement('div');
            heroDiv.classList.add('hero');
            heroDiv.innerHTML = `
                <img src="${hero.images.lg}" alt="${hero.name}" loading="lazy">
                <h3>${hero.name}</h3>
                <p>Full Name: ${fullName}</p>
                <p>Publisher: ${publisher}</p>
                <p>First Appearance: ${firstAppearance}</p>
            `;
            heroContainer.appendChild(heroDiv);
        });
    }

    // Function to populate villains with full details
    function displayVillainsWithDetails(villains, container, limit) {
        if (!Array.isArray(villains)) {
            console.error("Villains data is not an array:", villains);
            return;
        }

        const villainContainer = document.getElementById(container);
        villains.slice(0, limit).forEach(villain => {
            const publisher = villain.biography.publisher;
            const fullName = villain.fullName || villain.name; // Use fullName if available
            const firstAppearance = villain.biography.firstAppearance;

            const villainDiv = document.createElement('div');
            villainDiv.classList.add('villain');
            villainDiv.innerHTML = `
                <img src="${villain.images.lg}" alt="${villain.name}" loading="lazy">
                <h3>${villain.name}</h3>
                <p>Full Name: ${fullName}</p>
                <p>Publisher: ${publisher}</p>
                <p>First Appearance: ${firstAppearance}</p>
            `;
            villainContainer.appendChild(villainDiv);
        });
    }

    // Fetch heroes data
    async function fetchHeroes() {
        try {
            const response = await fetch(heroUrl, options);
            
            if (response.status === 403) {
                throw new Error("403 Forbidden: API key might be invalid or not have access to this endpoint.");
            }

            const data = await response.json();  // parse the JSON

            console.log("Fetched heroes data:", data);  // Debugging - log the fetched data

            if (isIndexPage()) {
                if (Array.isArray(data)) {
                    displayHeroes(data, 'heroRow', 10);  // Display 10 heroes in heroRow
                } else if (data.results) {
                    displayHeroes(data.results, 'heroRow', 10);
                } else {
                    console.error("Unexpected data format for heroes, no heroes array found.");
                }
            } else if (isCharactersPage()) {
                if (Array.isArray(data)) {
                    displayHeroesWithDetails(data, 'heroGrid', 20);  // Display 20 heroes with details in heroGrid
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

    // Fetch villains data
    async function fetchVillains() {
        try {
            const response = await fetch(villainUrl, options);
            
            if (response.status === 403) {
                throw new Error("403 Forbidden: API key might be invalid or not have access to this endpoint.");
            }

            const data = await response.json();  // parse the JSON

            console.log("Fetched villains data:", data);  // Debugging - log the fetched data

            if (isIndexPage()) {
                if (Array.isArray(data)) {
                    displayVillains(data, 'villainRow', 10);  // Display 10 villains in villainRow
                } else if (data.results) {
                    displayVillains(data.results, 'villainRow', 10);
                } else {
                    console.error("Unexpected data format for villains, no villains array found.");
                }
            } else if (isCharactersPage()) {
                if (Array.isArray(data)) {
                    displayVillainsWithDetails(data, 'villainGrid', 20);  // Display 20 villains with details in villainGrid
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

    // Load the heroes and villains when the page is loaded
    document.addEventListener('DOMContentLoaded', () => {
        fetchHeroes();
        fetchVillains();
    });