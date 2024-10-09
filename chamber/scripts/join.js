document.getElementById('form-timestamp').value = new Date().toISOString();



const levelDetails = document.querySelector("#level-details");
const levelButtons = document.querySelectorAll('.levelButton');

levelButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Define your membership levels
        const membershipLevels = ['Non Profit', 'Bronze', 'Silver', 'Gold'];

        // Call the displayLevelDetails function with the corresponding membership level
        displayLevelDetails(membershipLevels[index]);
    });
});

function displayLevelDetails(membershipLevels){
    levelDetails.innerHTML = '';
    levelDetails.innerHTML = `
        <button id="closeModal">X</button>
        <p>${membershipLevels}</p>
    `;
    levelDetails.showModal();

    closeModal.addEventListener("click", () => {
        levelDetails.close();
    });
}