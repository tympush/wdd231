document.getElementById('form-timestamp').value = new Date().toISOString();

document.addEventListener('DOMContentLoaded', function () {
    // Set the current timestamp in the hidden input field
    document.getElementById('form-timestamp').value = new Date().toISOString();

    // Handle form submission
    const form = document.querySelector('.designOne');
    form.addEventListener('submit', function () {
        // Get the current count from localStorage, or initialize to 0
        let reviewCount = localStorage.getItem('reviewCount') || 0;

        // Increment the review count
        reviewCount = parseInt(reviewCount) + 1;

        // Store the updated count back to localStorage
        localStorage.setItem('reviewCount', reviewCount);
    });
});