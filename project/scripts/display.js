// display.js
export function isIndexPage() {
    return window.location.pathname.endsWith('index.html');
}

export function isCharactersPage() {
    return window.location.pathname.endsWith('characters.html');
}

export function displayHeroes(heroes, container, limit) {
    if (!Array.isArray(heroes)) {
        console.error("Heroes data is not an array:", heroes);
        return;
    }

    const heroContainer = document.getElementById(container);
    
    const heroesToDisplay = isIndexPage() ? heroes.slice(0, limit).concat(heroes.slice(0, limit)) : heroes.slice(0, limit);

    heroesToDisplay.forEach(hero => {
        const publisher = hero.biography.publisher;

        const heroDiv = document.createElement('div');
        heroDiv.classList.add('hero', 'slide');
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

export function displayVillains(villains, container, limit) {
    if (!Array.isArray(villains)) {
        console.error("Villains data is not an array:", villains);
        return;
    }

    const villainContainer = document.getElementById(container);
    
    const villainsToDisplay = isIndexPage() ? villains.slice(0, limit).concat(villains.slice(0, limit)) : villains.slice(0, limit);

    villainsToDisplay.forEach(villain => {
        const publisher = villain.biography.publisher;

        const villainDiv = document.createElement('div');
        villainDiv.classList.add('villain', 'slide');
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

export function displayHeroesWithDetails(heroes, container, limit) {
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

export function displayVillainsWithDetails(villains, container, limit) {
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
