const mainnav = document.querySelector(".navigation");
const hambutton = document.querySelector("#menu");

hambutton.addEventListener("click", () => {
    mainnav.classList.toggle("show");
    hambutton.classList.toggle("show");
});



const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  const linkPage = link.getAttribute('href').split("/").pop();
  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});