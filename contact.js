window.onload = function () {

    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    // Live key event: show character count for message
    messageInput.addEventListener("keyup", function (event) {
        let existing = document.getElementById("charCount");
        if (!existing) {
            existing = document.createElement("p");
            existing.id = "charCount";
            existing.style.fontSize = "0.85em";
            existing.style.color = "gray";
            messageInput.parentElement.insertBefore(existing, messageInput.nextSibling);
        }
        existing.textContent = messageInput.value.length + " character(s) typed";
    });

    // Hover effect on submit button
    const submitBtn = document.querySelector("input[type='submit']");

    submitBtn.addEventListener("mouseover", function (event) {
        event.target.style.opacity = "0.8";
    });

    submitBtn.addEventListener("mouseout", function (event) {
        event.target.style.opacity = "1";
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let errorMessage = "";

        // Required field validation
        if (nameInput.value.trim() === "") {
            errorMessage += "Name is required.\n";
        }

        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === "") {
            errorMessage += "Email is required.\n";
        } else if (!emailRegex.test(emailInput.value.trim())) {
            errorMessage += "Please enter a valid email address (e.g. you@example.com).\n";
        }

        if (subjectInput.value.trim() === "") {
            errorMessage += "Subject is required.\n";
        }

        if (messageInput.value.trim() === "") {
            errorMessage += "Message cannot be empty.\n";
        }

        if (errorMessage !== "") {
            alert(errorMessage);
            return;
        }

        // Success: dynamically insert a confirmation paragraph
        let confirmation = document.getElementById("confirmMsg");
        if (!confirmation) {
            confirmation = document.createElement("p");
            confirmation.id = "confirmMsg";
            confirmation.style.fontWeight = "bold";
            confirmation.style.color = "green";
            form.parentElement.insertBefore(confirmation, form);
        }
        confirmation.textContent = "✅ Message sent! We'll get back to you at " + emailInput.value.trim() + " shortly.";

        // Remove char count if present
        const charCount = document.getElementById("charCount");
        if (charCount) charCount.remove();

        form.reset();
    });
};
