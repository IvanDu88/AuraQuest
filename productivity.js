window.onload = function () {

    const form = document.querySelector(".goal-form form");

    // Stats tracking - start from the static values already shown in HTML
    let totalPoints = 850;
    let tasksCompletedWeek = 12;
    let totalFocusSeconds = 6 * 3600 + 15 * 60;
    let sessionsCompleted = 3;

    // Stats display elements
    const pointsDisplay = document.getElementById("stat-points");
    const tasksDisplay = document.getElementById("stat-tasks");
    const focusDisplay = document.getElementById("stat-focus");
    const sessionsDisplay = document.getElementById("stat-sessions");

    // Table bodies for all three responsive tables
    const desktopTbody = document.querySelector(".desktop-table tbody");
    const mobileTable = document.querySelector(".mobile-table table");
    const tabletTable = document.querySelector(".tablet-table table");

    // ---- WIRE UP PRE-EXISTING STATIC CHECKBOXES ----
    desktopTbody.querySelectorAll("tr").forEach(function (row) {
        const checkbox = row.querySelector("input[type='checkbox']");
        if (checkbox) {
            wireDesktopCheckbox(checkbox, row);
        }
    });

    function wireDesktopCheckbox(checkbox, row) {
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

        if (goalInput.value.trim() === "") {
            errorMessage += "Goal description cannot be empty.\n";
        }
        if (prioritySelect.value === "") {
            errorMessage += "Please select a priority.\n";
        }

        if (errorMessage !== "") {
            alert(errorMessage);
            return;
        }

        const taskText = goalInput.value.trim();
        const priority = prioritySelect.value;

        let priorityClass = "priority-low";
        if (priority === "High") priorityClass = "priority-high";
        else if (priority === "Medium") priorityClass = "priority-medium";

        // --- Add to DESKTOP table ---
        const newDesktopRow = document.createElement("tr");

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

        newDesktopRow.appendChild(taskTd);
        newDesktopRow.appendChild(priorityTd);
        newDesktopRow.appendChild(statusTd);
        newDesktopRow.appendChild(actionTd);
        desktopTbody.appendChild(newDesktopRow);

        wireDesktopCheckbox(checkbox, newDesktopRow);

        // --- Add to MOBILE table ---
        const dividerRow = document.createElement("tr");
        dividerRow.innerHTML = "<td colspan='2'><hr></td>";
        mobileTable.appendChild(dividerRow);

        const mobileTaskRow = document.createElement("tr");
        mobileTaskRow.innerHTML = "<th>Task:</th><td>" + taskText + "</td>";

        const mobilePriorityRow = document.createElement("tr");
        mobilePriorityRow.innerHTML = "<th>Priority:</th><td class='" + priorityClass + "'>" + priority + "</td>";

        const mobileStatusTd = document.createElement("td");
        mobileStatusTd.textContent = "Not Started";
        const mobileStatusRow = document.createElement("tr");
        mobileStatusRow.innerHTML = "<th>Status:</th>";
        mobileStatusRow.appendChild(mobileStatusTd);

        const mobileActionTd = document.createElement("td");
        const mobileCheckbox = document.createElement("input");
        mobileCheckbox.type = "checkbox";
        mobileActionTd.appendChild(mobileCheckbox);
        mobileActionTd.appendChild(document.createTextNode(" Mark Complete"));
        const mobileActionRow = document.createElement("tr");
        mobileActionRow.innerHTML = "<th>Action:</th>";
        mobileActionRow.appendChild(mobileActionTd);

        mobileCheckbox.addEventListener("click", function () {
            if (mobileCheckbox.checked) {
                mobileStatusTd.textContent = "✓ Completed";
                mobileActionTd.textContent = "Done!";
            }
        });

        mobileTable.appendChild(mobileTaskRow);
        mobileTable.appendChild(mobilePriorityRow);
        mobileTable.appendChild(mobileStatusRow);
        mobileTable.appendChild(mobileActionRow);

        // --- Add to TABLET table ---
        const tabletRows = Array.from(tabletTable.querySelectorAll("tr"));
        let statusHeaderRow = null;
        tabletRows.forEach(function (row) {
            const th = row.querySelector("th");
            if (th && th.textContent.trim() === "Status") {
                statusHeaderRow = row;
            }
        });

        const tabletTaskRow = document.createElement("tr");
        tabletTaskRow.innerHTML = "<td>" + taskText + "</td><td class='" + priorityClass + "'>" + priority + "</td>";

        if (statusHeaderRow) {
            tabletTable.insertBefore(tabletTaskRow, statusHeaderRow);
        } else {
            tabletTable.appendChild(tabletTaskRow);
        }

        const tabletStatusTd = document.createElement("td");
        tabletStatusTd.textContent = "Not Started";
        const tabletActionTd = document.createElement("td");
        const tabletCheckbox = document.createElement("input");
        tabletCheckbox.type = "checkbox";
        tabletActionTd.appendChild(tabletCheckbox);
        tabletActionTd.appendChild(document.createTextNode(" Mark Complete"));
        const tabletStatusRow = document.createElement("tr");
        tabletStatusRow.appendChild(tabletStatusTd);
        tabletStatusRow.appendChild(tabletActionTd);
        tabletTable.appendChild(tabletStatusRow);

        tabletCheckbox.addEventListener("click", function () {
            if (tabletCheckbox.checked) {
                tabletStatusTd.textContent = "✓ Completed";
                tabletActionTd.textContent = "Done!";
            }
        });

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
