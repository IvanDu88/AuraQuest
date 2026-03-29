window.onload = function () {

    const challengeForm = document.querySelector(".challenge-section form");
    const challengeSelect = document.getElementById("challenge");
    const milestonesOl = document.querySelector(".milestones-section ol");

    let totalPoints = 1250;
    let badgesEarned = 15;
    let currentLevel = 8;
    let currentXP = 750;
    const xpPerLevel = 1000;

    const pointsDisplay = document.querySelector(".progress-overview ul li:nth-child(1)");
    const levelDisplay = document.querySelector(".progress-overview ul li:nth-child(2)");
    const badgesDisplay = document.querySelector(".progress-overview ul li:nth-child(3)");
    const xpDisplay = document.querySelector(".progress-overview ul li:nth-child(4)");

    // Track which challenges have already been accepted
    const acceptedChallenges = [];

    const bonusPoints = {
        "Weekend Warrior - Complete 5 tasks this weekend": 100,
        "Health Hero - Log all health metrics for 7 days": 150,
        "Budget Boss - Stay under budget for the month": 200,
        "Meditation Master - Practice mindfulness daily for a week": 175
    };

    // ---- HOVER EFFECT ON BADGE EMOJIS ----
    const badgeEmojis = document.querySelectorAll(".badge-emoji");

    badgeEmojis.forEach(function (cell) {
        cell.addEventListener("mouseover", function (event) {
            event.target.style.fontSize = "1.8em";
            event.target.style.cursor = "pointer";
        });
        cell.addEventListener("mouseout", function (event) {
            event.target.style.fontSize = "";
        });
    });

    // ---- LOCKED BADGES HOVER ----
    const lockedRows = document.querySelectorAll(".locked-badges.desktop-table tbody tr");

    lockedRows.forEach(function (row) {
        row.addEventListener("mouseover", function (event) {
            event.currentTarget.style.backgroundColor = "#f0f0f0";
        });
        row.addEventListener("mouseout", function (event) {
            event.currentTarget.style.backgroundColor = "";
        });
    });

    // ---- CHALLENGE FORM VALIDATION & DYNAMIC MILESTONE ----
    challengeForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (challengeSelect.value === "" || challengeSelect.value === null) {
            alert("Please select a challenge before accepting!");
            return;
        }

        const challengeName = challengeSelect.value;

        // Prevent accepting the same challenge twice
        if (acceptedChallenges.indexOf(challengeName) !== -1) {
            alert("You have already accepted \"" + challengeName + "\"! Choose a different challenge.");
            return;
        }

        const earned = bonusPoints[challengeName] || 100;
        totalPoints += earned;
        badgesEarned++;
        currentXP += earned;
        acceptedChallenges.push(challengeName);

        // Level up if XP threshold crossed
        while (currentXP >= xpPerLevel) {
            currentXP -= xpPerLevel;
            currentLevel++;
        }

        // Update progress overview
        pointsDisplay.innerHTML = "<strong>Total Points:</strong> " + totalPoints.toLocaleString() + " ⭐";
        levelDisplay.innerHTML = "<strong>Current Level:</strong> " + currentLevel;
        badgesDisplay.innerHTML = "<strong>Badges Earned:</strong> " + badgesEarned + " / 30";
        xpDisplay.innerHTML = "<strong>Progress to Next Level:</strong> " + currentXP + " / " + xpPerLevel + " XP";

        // Disable the accepted option in the dropdown so it's visually unavailable
        const options = challengeSelect.querySelectorAll("option");
        options.forEach(function (opt) {
            if (opt.value === challengeName) {
                opt.disabled = true;
                opt.textContent = opt.textContent + " ✓";
            }
        });

        // Dynamically prepend a new milestone entry
        const today = new Date();
        const dateStr = today.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });

        const newMilestone = document.createElement("li");
        newMilestone.innerHTML = "<strong>" + dateStr + ":</strong> Accepted \"" + challengeName + "\"! 🎯 (+" + earned + " points)";

        const firstChild = milestonesOl.firstChild;
        milestonesOl.insertBefore(newMilestone, firstChild);

        // Flash the new milestone green for 2 seconds
        newMilestone.style.color = "green";
        newMilestone.style.fontWeight = "bold";
        setTimeout(function () {
            newMilestone.style.color = "";
            newMilestone.style.fontWeight = "";
        }, 2000);

        // Confirmation message
        let confirmation = document.getElementById("challengeConfirm");
        if (!confirmation) {
            confirmation = document.createElement("p");
            confirmation.id = "challengeConfirm";
            confirmation.style.fontWeight = "bold";
            confirmation.style.color = "green";
            challengeForm.parentElement.insertBefore(confirmation, challengeForm);
        }
        confirmation.textContent = "🎉 Challenge accepted! +" + earned + " points added. Keep it up!";

        challengeForm.reset();

        // Clear confirmation after 3 seconds
        setTimeout(function () {
            if (confirmation) confirmation.textContent = "";
        }, 3000);
    });

    // ---- KEY EVENT: Enter on challenge select triggers submit ----
    challengeSelect.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            challengeForm.querySelector("input[type='submit']").click();
        }
    });

    // ---- INTERVAL: Pulse XP display every 10 seconds ----
    setInterval(function () {
        xpDisplay.style.color = "#BA8E23";
        setTimeout(function () {
            xpDisplay.style.color = "";
        }, 800);
    }, 10000);
};
