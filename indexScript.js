let multiplier = 1;
let auraLevel = 0;
let previousLevelAchievement = 10;
let statsList = document.querySelector("ol");
let level = document.getElementById("level");
let nav = document.getElementById("mainNav");
let pfp = document.getElementById("pfp");

pfp.addEventListener("mouseover", pfpViewed);

nav.addEventListener("mouseover", navViewed);

setTimeout(auraAchievementFunction, 30000);

setTimeout(auraLevelIncrement, 1000);

function auraLevelIncrement(){
    if(auraLevel===previousLevelAchievement) {
        multiplier*=2;
        previousLevelAchievement*=10;
        levelAchievement();
    }
    auraLevel++;
    level.innerText = "Aura Level: " + auraLevel;

    setTimeout(auraLevelIncrement, 1000*multiplier);
}

function auraAchievementFunction() {
    let achievement = document.createElement("li");
    let firstChild = statsList.firstChild;
    achievement.innerHTML= "Acknowledged AuraQuest 🤫"
    statsList.insertBefore(achievement, firstChild);
    statsList.removeChild(statsList.lastElementChild);
}

function levelAchievement() {
    let achievement = document.createElement("li");
    let firstChild = statsList.firstChild;
    achievement.innerHTML = "Reached Aura Level " + auraLevel + " 📈";
    statsList.insertBefore(achievement, firstChild);
    statsList.removeChild(statsList.lastElementChild);
}

function navViewed() {
    let achievement = document.createElement("li");
    let firstChild = statsList.firstChild;
    achievement.innerHTML = "Auraful Navigation 🧭";
    statsList.insertBefore(achievement, firstChild);
    statsList.removeChild(statsList.lastElementChild);
    nav.removeEventListener("mouseover", navViewed);
}

function pfpViewed() {
    let achievement = document.createElement("li");
    let firstChild = statsList.firstChild;
    achievement.innerHTML = "Self Acknowledgement 🔥";
    statsList.insertBefore(achievement, firstChild);
    statsList.removeChild(statsList.lastElementChild);
    pfp.removeEventListener("mouseover", pfpViewed);
}
