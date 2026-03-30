

let submitButtons = document.getElementsByClassName("submitButton");

submitButtons[0].addEventListener("click", health); 
submitButtons[1].addEventListener("click", health); 
submitButtons[2].addEventListener("click", health); 
    
    
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
