window.onload = function () {

    const form = document.querySelector(".goal-form form");
    const timerDisplay = document.querySelector(".timer-display");
    const sessionSelect = document.getElementById("session-type");
    const timerButtons = document.querySelectorAll(".timer-controls input[type='button']");
    const startBtn = timerButtons[0];
    const pauseBtn = timerButtons[1];
    const resetBtn = timerButtons[2];
    const sessionsDisplay = document.querySelector(".stats-section ul li:nth-child(3)");
    const focusTimeDisplay = document.querySelector(".stats-section ul li:nth-child(4)");
    const pointsDisplay = document.querySelector(".stats-section ul li:nth-child(2)");

    // Desktop tbody for dynamic goal insertion
    const desktopTbody = document.querySelector(".desktop-table tbody");

    let timerInterval = null;
    let secondsLeft = 25 * 60;
    let isPaused = false;
    let sessionsCompleted = 3;
    let totalPoints = 850;
    let totalFocusSeconds = 6 * 3600 + 15 * 60;
    let tasksCompletedWeek = 12;

    // ---- GOAL FORM VALIDATION & DOM MANIPULATION ----
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const goalInput = document.getElementById("goal");
        const priority = document.getElementById("priority").value;
        const deadline = document.getElementById("deadline").value;

        let errorMessage = "";

        if (goalInput.value.trim() === "") {
            errorMessage += "Goal description cannot be empty.\n";
        }
        if (priority === "") {
            errorMessage += "Please select a priority.\n";
        }

        if (errorMessage !== "") {
            alert(errorMessage);
            return;
        }

        // Create a new row in the desktop table
        const newRow = document.createElement("tr");

        const taskTd = document.createElement("td");
        taskTd.textContent = goalInput.value.trim();

        const priorityTd = document.createElement("td");
        priorityTd.textContent = priority;
        if (priority === "High") priorityTd.className = "priority-high";
        else if (priority === "Medium") priorityTd.className = "priority-medium";
        else priorityTd.className = "priority-low";

        const statusTd = document.createElement("td");
        statusTd.textContent = deadline ? "Due: " + deadline : "Not Started";

        const actionTd = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const label = document.createElement("span");
        label.textContent = " Mark Complete";

        // Checkbox click event: update status and award points
        checkbox.addEventListener("click", function (event) {
            if (event.target.checked) {
                statusTd.textContent = "✓ Completed";
                actionTd.textContent = "Done!";
                tasksCompletedWeek++;
                totalPoints += 10;
                sessionsDisplay.innerHTML = "<strong>Tasks Completed This Week:</strong> " + tasksCompletedWeek;
                pointsDisplay.innerHTML = "<strong>Total Points Earned:</strong> " + totalPoints + " ⭐";
            }
        });

        actionTd.appendChild(checkbox);
        actionTd.appendChild(label);

        newRow.appendChild(taskTd);
        newRow.appendChild(priorityTd);
        newRow.appendChild(statusTd);
        newRow.appendChild(actionTd);

        desktopTbody.appendChild(newRow);

        form.reset();
    });

    // ---- POMODORO TIMER ----
    function getSessionSeconds() {
        const val = sessionSelect.value;
        if (val.includes("25")) return 25 * 60;
        if (val.includes("5")) return 5 * 60;
        if (val.includes("15")) return 15 * 60;
        return 25 * 60;
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = formatTime(secondsLeft);
    }

    // Session type change resets timer
    sessionSelect.addEventListener("change", function () {
        clearInterval(timerInterval);
        timerInterval = null;
        isPaused = false;
        secondsLeft = getSessionSeconds();
        updateTimerDisplay();
    });

    startBtn.addEventListener("click", function () {
        if (timerInterval !== null) return;

        timerInterval = setInterval(function () {
            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;

                // Only count as session if it was a Work session
                if (sessionSelect.value.includes("25")) {
                    sessionsCompleted++;
                    totalFocusSeconds += 25 * 60;
                    totalPoints += 25;

                    // Update sessions count with tomatoes
                    const tomatoStr = "🍅".repeat(sessionsCompleted);
                    document.querySelector(".timer-section p:last-of-type strong").nextSibling.textContent = "";
                    document.querySelector(".timer-section p:last-of-type").innerHTML =
                        "<strong>Sessions Completed Today:</strong> <span class='emoji-large'>" + sessionsCompleted + " " + tomatoStr + "</span>";

                    // Update stats
                    const hrs = Math.floor(totalFocusSeconds / 3600);
                    const mins = Math.floor((totalFocusSeconds % 3600) / 60);
                    focusTimeDisplay.innerHTML = "<strong>Focus Time This Week:</strong> " + hrs + " hours " + mins + " minutes";
                    pointsDisplay.innerHTML = "<strong>Total Points Earned:</strong> " + totalPoints + " ⭐";
                }

                alert("⏰ Time's up! Great work!");
                secondsLeft = getSessionSeconds();
                updateTimerDisplay();
                return;
            }
            secondsLeft--;
            updateTimerDisplay();
        }, 1000);
    });

    pauseBtn.addEventListener("click", function () {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
            isPaused = true;
        } else if (isPaused) {
            // Resume
            timerInterval = setInterval(function () {
                if (secondsLeft <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    alert("⏰ Time's up!");
                    secondsLeft = getSessionSeconds();
                    updateTimerDisplay();
                    return;
                }
                secondsLeft--;
                updateTimerDisplay();
            }, 1000);
            isPaused = false;
        }
    });

    resetBtn.addEventListener("click", function () {
        clearInterval(timerInterval);
        timerInterval = null;
        isPaused = false;
        secondsLeft = getSessionSeconds();
        updateTimerDisplay();
    });

    // Initialize timer display
    updateTimerDisplay();
};
