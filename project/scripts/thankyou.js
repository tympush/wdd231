const currentUrl = window.location.href;

const everything = currentUrl.split('?');

let formData = everything[1].split('&');

function show(cup) {
    console.log("Looking for:", cup);
    let result = "";
    formData.forEach((element) => {
        console.log("Checking element:", element);
        const [key, value] = element.split('=');
        if (key === cup) {
            result = decodeURIComponent(value).replace(/\+/g, ' '); // Properly decode the URL component and replace + with space
            console.log("Found:", result);
        }
    });
    return result || "Not provided";
}

// Function to format the timestamp in 'YYYY-MM-DD HH:MM:SS' format
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const showInfo = document.querySelector('#results')
showInfo.innerHTML = `
    <p><strong>Comic Title:</strong> ${show("comic-title")}</p>
    <p><strong>Publisher:</strong> ${show("publisher")}</p>
    <p><strong>Reviewer Username:</strong> ${show("username")}</p>
    <p><strong>Review Score:</strong> ${show("score")} star</p>
    <p><strong>Text Review:</strong> ${show("text-review")}</p>
    <p><strong>Time of Submission:</strong> ${formatTimestamp(show("form-timestamp"))}</p>
`;
