// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

function fetchWeatherAlerts(state) {
    alertsDisplay.replaceChildren();
    clearError();

    fetch(`${weatherApi}${state}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch weather alerts.");
        }

        return response.json();
    })
    .then(data => {
        displayAlerts(data);
        clearError();
        stateInput.value = "";
    })
    .catch(error => {
        displayError(error.message);
    });
}
const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}
function clearError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
}
function displayAlerts(data) {
    alertsDisplay.replaceChildren();
    alertsDisplay.textContent = data.title + ": " + data.features.length;

    data.features.forEach(alert => {
        const headline = document.createElement("p");
        headline.textContent = alert.properties.headline;
        alertsDisplay.appendChild(headline);
    })
}

fetchButton.addEventListener("click", () => {
    const state = stateInput.value.trim().toUpperCase();

    if (state.length !== 2) {
        alertsDisplay.replaceChildren();
        displayError("Please enter a two-letter state abbreviation.");
        return;
    }
    fetchWeatherAlerts(state);
    stateInput.value = "";
});