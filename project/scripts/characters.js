// main.js
import { fetchHeroes, fetchVillains } from './fetchData.js';
import { displayHeroes, displayVillains, displayHeroesWithDetails, displayVillainsWithDetails, isIndexPage, isCharactersPage } from './display.js';

document.addEventListener('DOMContentLoaded', async () => {
    const heroesData = await fetchHeroes();
    const villainsData = await fetchVillains();

    if (isIndexPage()) {
        if (Array.isArray(heroesData)) {
            displayHeroes(heroesData, 'heroRow', 10);
        } else if (heroesData.results) {
            displayHeroes(heroesData.results, 'heroRow', 10);
        }

        if (Array.isArray(villainsData)) {
            displayVillains(villainsData, 'villainRow', 10);
        } else if (villainsData.results) {
            displayVillains(villainsData.results, 'villainRow', 10);
        }
    } else if (isCharactersPage()) {
        if (Array.isArray(heroesData)) {
            displayHeroesWithDetails(heroesData, 'heroGrid', 20);
        } else if (heroesData.results) {
            displayHeroesWithDetails(heroesData.results, 'heroGrid', 20);
        }

        if (Array.isArray(villainsData)) {
            displayVillainsWithDetails(villainsData, 'villainGrid', 20);
        } else if (villainsData.results) {
            displayVillainsWithDetails(villainsData.results, 'villainGrid', 20);
        }
    }
});
