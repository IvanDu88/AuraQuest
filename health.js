window.onload = function () {

    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const water = document.getElementById("water").value;
        const sleep = document.getElementById("sleep").value;
        const exercise = document.getElementById("exercise").value;
        const meals = document.getElementById("meals").value;

        // update table
        document.getElementById("waterStatus").textContent =
            water ? water + " cups 💧" : "No data";

        document.getElementById("sleepStatus").textContent =
            sleep ? sleep + " hours 😴" : "No data";

        document.getElementById("exerciseStatus").textContent =
            exercise ? exercise + " mins 🏃" : "No data";

        document.getElementById("mealsStatus").textContent =
            meals ? meals + " meals 🍽️" : "No data";
    });
};