document.getElementById('form-timestamp').value = new Date().toISOString();



const levelDetails = document.querySelector("#level-details");
const levelButtons = document.querySelectorAll('.levelButton');

levelButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Define your membership levels
        const membershipLevels = ['Non Profit', 'Bronze', 'Silver', 'Gold'];

        const membershipDescription = [
            "Ideal for non-profit organizations, this membership provides essential access to our business network, resources, and events. Non-profits will be listed on our website, helping to raise visibility and connect with the broader business community.", 
            "Perfect for small businesses, this entry-level membership offers access to Chamber events, networking opportunities, and an online listing. Bronze members will be featured in our directory, ensuring visibility to potential clients and collaborators.", 
            "Designed for growing businesses, Silver members enjoy all Bronze benefits, with added perks like being featured on the front page of our website for increased exposure. This level is ideal for those looking to enhance their brand presence in the city.", 
            "Our most comprehensive membership offers all Silver benefits, plus exclusive invitations to high-level networking events and VIP access to Chamber-hosted functions. Gold members are also given priority registration for workshops and conferences, helping you stay ahead in the business community."
        ];

        // Call the displayLevelDetails function with the corresponding membership level
        displayLevelDetails(membershipLevels[index], membershipDescription[index]);
    });
});

function displayLevelDetails(membershipLevels, membershipDescription){
    levelDetails.innerHTML = '';
    levelDetails.innerHTML = `
        <button id="closeModal">X</button>
        <h4>${membershipLevels}</h4>
        <p>${membershipDescription}</p>
    `;
    levelDetails.showModal();

    closeModal.addEventListener("click", () => {
        levelDetails.close();
    });
}