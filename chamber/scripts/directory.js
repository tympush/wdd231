const url = 'data/members.json';

const directoryGrid = document.querySelector('.directoryGrid');

async function getMemberData(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

getMemberData(url);

const displayMembers = (members) => {
    members.forEach((member) => {
    
        let card = document.createElement('section');

        let picture = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('p');

        picture.setAttribute('src', member.image_source);
        picture.setAttribute('alt', `Picture of ${member.name}`);
        picture.setAttribute('loading', 'lazy');
        picture.setAttribute('width', '512');
        picture.setAttribute('height', '512');

        name.textContent = `${member.name}`;
        address.textContent = `${member.address}`;
        phone.textContent = `${member.phone_number}`;
        website.textContent = `${member.website_url}`;

        card.appendChild(picture);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
    
        directoryGrid.appendChild(card);
    });
}



const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

gridbutton.addEventListener("click", () => {
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}