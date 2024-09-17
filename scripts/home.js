const year = document.querySelector("#currentyear");
const today = new Date();
year.innerHTML = `${today.getFullYear()}`;

const modified = document.querySelector("#lastModified");
modified.innerHTML = `Last Modification: ${document.lastModified}`