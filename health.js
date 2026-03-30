

let submitButtons = document.getElementsByClassName("submitButton");

submitButtons[0].addEventListener("click", health); 
submitButtons[1].addEventListener("click", health1); 
submitButtons[2].addEventListener("click", health2); 
    
    
function health(event) {
    event.preventDefault(); 

    let errorMsg = "";

    let water = document.getElementById("water").value;
    let sleep = document.getElementById("sleep").value;
    let exercise = document.getElementById("exercise").value;
    let meals = document.getElementById("meals").value;

    if(water<0) {
        errorMsg+="Water Intake cannot be less than 0\n";
    }
    if(sleep<0) {
        errorMsg+="You cannot sleep negative hours\n";
    }
    if(exercise<0) {
        errorMsg+="You cannot exercise negative minutes\n";
    }

    if(errorMsg!=="") {
        alert(errorMsg);
    }
    else {
        // update table
        document.getElementById("waterStatus").textContent =
            water ? water + " cups 💧" : "No data";

        document.getElementById("sleepStatus").textContent =
            sleep ? sleep + " hours 😴" : "No data";

        document.getElementById("exerciseStatus").textContent =
            exercise ? exercise + " mins 🏃" : "No data";

        document.getElementById("mealsStatus").textContent =
            meals ? meals + " meals 🍽️" : "No data";
    }
}

function health1(event) {
    event.preventDefault(); 

    let errorMsg = "";

    let water = document.getElementById("water1").value;
    let sleep = document.getElementById("sleep1").value;
    let exercise = document.getElementById("exercise1").value;
    let meals = document.getElementById("meals1").value;

    if(water<0) {
        errorMsg+="Water Intake cannot be less than 0\n";
    }
    if(sleep<0) {
        errorMsg+="You cannot sleep negative hours\n";
    }
    if(exercise<0) {
        errorMsg+="You cannot exercise negative minutes\n";
    }

    if(errorMsg!=="") {
        alert(errorMsg);
    }
    else {
        // update table
        document.getElementById("waterStatus1").textContent =
            water ? water + " cups 💧" : "No data";

        document.getElementById("sleepStatus1").textContent =
            sleep ? sleep + " hours 😴" : "No data";

        document.getElementById("exerciseStatus1").textContent =
            exercise ? exercise + " mins 🏃" : "No data";

        document.getElementById("mealsStatus1").textContent =
            meals ? meals + " meals 🍽️" : "No data";
    }
}

function health2(event) {
    event.preventDefault(); 

    let errorMsg = "";

    let water = document.getElementById("water2").value;
    let sleep = document.getElementById("sleep2").value;
    let exercise = document.getElementById("exercise2").value;
    let meals = document.getElementById("meals2").value;

    if(water<0) {
        errorMsg+="Water Intake cannot be less than 0\n";
    }
    if(sleep<0) {
        errorMsg+="You cannot sleep negative hours\n";
    }
    if(exercise<0) {
        errorMsg+="You cannot exercise negative minutes\n";
    }

    if(errorMsg!=="") {
        alert(errorMsg);
    }
    else {
        // update table
        document.getElementById("waterStatus2").textContent =
            water ? water + " cups 💧" : "No data";

        document.getElementById("sleepStatus2").textContent =
            sleep ? sleep + " hours 😴" : "No data";

        document.getElementById("exerciseStatus2").textContent =
            exercise ? exercise + " mins 🏃" : "No data";

        document.getElementById("mealsStatus2").textContent =
            meals ? meals + " meals 🍽️" : "No data";
    }
}
