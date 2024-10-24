// fetchData.js
const heroUrl = 'https://superhero-search.p.rapidapi.com/api/heroes';
const villainUrl = 'https://superhero-search.p.rapidapi.com/api/villains';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '2436d99d44mshb6c43a43fb232c7p11a952jsn3d2bef3e3a09b',
        'x-rapidapi-host': 'superhero-search.p.rapidapi.com'
    }
};

export async function fetchHeroes() {
    try {
        const response = await fetch(heroUrl, options);
        
        if (response.status === 403) {
            throw new Error("403 Forbidden: API key might be invalid or not have access to this endpoint.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching heroes:', error);
    }
}

export async function fetchVillains() {
    try {
        const response = await fetch(villainUrl, options);
        
        if (response.status === 403) {
            throw new Error("403 Forbidden: API key might be invalid or not have access to this endpoint.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching villains:', error);
    }
}
