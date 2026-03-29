window.onload = function () {

    const form = document.querySelector("form");
    const entriesSection = document.querySelector("section article")?.parentElement;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const date = document.getElementById("date").value;
        const mood = document.getElementById("mood").value;
        const entryText = document.getElementById("entry").value.trim();

        if (entryText === "") {
            alert("Please write something!");
            return;
        }

        const article = document.createElement("article");

        const h3 = document.createElement("h3");
        h3.textContent = date || "No Date";

        const moodP = document.createElement("p");
        moodP.innerHTML = "<strong>Mood:</strong> " + mood;

        const textP = document.createElement("p");
        textP.textContent = entryText;

        article.appendChild(h3);
        article.appendChild(moodP);
        article.appendChild(textP);

        entriesSection.prepend(article);

        form.reset();
    });
};