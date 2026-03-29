window.onload = function () {

    const form = document.querySelector(".goal-form form");

    // Stats tracking
    let totalPoints = 850;
    let tasksCompletedWeek = 12;
    let totalFocusSeconds = 6 * 3600 + 15 * 60;
    let sessionsCompleted = 3;

    const pointsDisplay = document.getElementById("stat-points");
    const tasksDisplay = document.getElementById("stat-tasks");
    const focusDisplay = document.getElementById("stat-focus");
    const sessionsDisplay = document.getElementById("stat-sessions");

    const tbody = document.getElementById("tasks-tbody");

    // ---- WIRE UP PRE-EXISTING CHECKBOXES ----
    tbody.querySelectorAll("tr").forEach(function (row) {
        const checkbox = row.querySelector("input[type='checkbox']");
        if (checkbox) {
            wireCheckbox(checkbox, row);
        }
    });

    function wireCheckbox(checkbox, row) {
        checkbox.addEventListener("click", function () {
            if (checkbox.checked) {
                row.cells[2].textContent = "✓ Completed";
                row.cells[3].textContent = "Done!";
                tasksCompletedWeek++;
                totalPoints += 10;
                updateStats();
            }
        });
    }

    function updateStats() {
        pointsDisplay.innerHTML = "<strong>Total Points Earned:</strong> " + totalPoints + " ⭐";
        tasksDisplay.innerHTML = "<strong>Tasks Completed This Week:</strong> " + tasksCompletedWeek;
        const hrs = Math.floor(totalFocusSeconds / 3600);
        const mins = Math.floor((totalFocusSeconds % 3600) / 60);
        focusDisplay.innerHTML = "<strong>Focus Time This Week:</strong> " + hrs + " hours " + mins + " minutes";
    }

    // ---- GOAL FORM SUBMISSION ----
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const goalInput = document.getElementById("goal");
        const prioritySelect = document.getElementById("priority");

        let errorMessage = "";
        if (goalInput.value.trim() === "") errorMessage += "Goal description cannot be empty.\n";
        if (prioritySelect.value === "") errorMessage += "Please select a priority.\n";

        if (errorMessage !== "") {
            alert(errorMessage);
            return;
        }

        const taskText = goalInput.value.trim();
        const priority = prioritySelect.value;

        let priorityClass = "priority-low";
        if (priority === "High") priorityClass = "priority-high";
        else if (priority === "Medium") priorityClass = "priority-medium";

        const newRow = document.createElement("tr");

        const taskTd = document.createElement("td");
        taskTd.textContent = taskText;

        const priorityTd = document.createElement("td");
        priorityTd.textContent = priority;
        priorityTd.className = priorityClass;

        const statusTd = document.createElement("td");
        statusTd.textContent = "Not Started";

        const actionTd = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        actionTd.appendChild(checkbox);
        actionTd.appendChild(document.createTextNode(" Mark Complete"));

        newRow.appendChild(taskTd);
        newRow.appendChild(priorityTd);
        newRow.appendChild(statusTd);
        newRow.appendChild(actionTd);
        tbody.appendChild(newRow);

        wireCheckbox(checkbox, newRow);

        form.reset();
    });

    // ---- POMODORO TIMER ----
    const timerDisplay = document.querySelector(".timer-display");
    const sessionSelect = document.getElementById("session-type");
    const timerButtons = document.querySelectorAll(".timer-controls input[type='button']");
    const startBtn = timerButtons[0];
    const pauseBtn = timerButtons[1];
    const resetBtn = timerButtons[2];

    let timerInterval = null;
    let secondsLeft = 25 * 60;
    let isPaused = false;

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

                if (sessionSelect.value.includes("25")) {
                    sessionsCompleted++;
                    totalFocusSeconds += 25 * 60;
                    totalPoints += 25;
                    const tomatoStr = "🍅".repeat(sessionsCompleted);
                    sessionsDisplay.innerHTML = "<strong>Sessions Completed Today:</strong> <span class='emoji-large'>" + sessionsCompleted + " " + tomatoStr + "</span>";
                    updateStats();
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

    updateTimerDisplay();
};
