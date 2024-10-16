function calculateDaysBetween(date1, date2) {
    const msPerDay = 24 * 60 * 60 * 1000; // milliseconds per day
    const timeDifference = Math.abs(date2 - date1); // absolute difference in milliseconds
    return Math.floor(timeDifference / msPerDay); // whole number of days
}

const now = new Date();
const lastVisit = localStorage.getItem('lastVisit');
const welcome = document.querySelector('#welcome');

if (!lastVisit) {
    welcome.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const lastVisitDate = new Date(lastVisit); // Parse stored date

    const daysBetween = calculateDaysBetween(lastVisitDate, now);

    if (daysBetween < 1) {
        // If the difference is less than 1 day (same day visit)
        welcome.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        // If it's been exactly 1 day since the last visit
        welcome.textContent = "You last visited 1 day ago.";
    } else {
        // If more than 1 day has passed since the last visit
        welcome.textContent = `You last visited ${daysBetween} days ago.`;
    }
}

localStorage.setItem('lastVisit', now);