window.onload = function () {

    const form1 = document.getElementById("form1");
    const form2 = document.getElementById("form2");
    const form3 = document.getElementById("form3");
    const entriesSection1 = document.getElementById("entries1");
    const entriesSection2 = document.getElementById("entries2");
    const entriesSection3 = document.getElementById("entries3");

    form1.addEventListener("submit", journal1);
    form2.addEventListener("submit", journal2);
    form3.addEventListener("submit", journal3);
    
function journal1 (event) {
        event.preventDefault();

        const date = document.getElementById("date1").value;
        const mood = document.getElementById("mood1").value;
        const entryText = document.getElementById("entry1").value.trim();

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

        entriesSection1.prepend(article);

        form1.reset();
    }


function journal2 (event) {
        event.preventDefault();

        const date = document.getElementById("date2").value;
        const mood = document.getElementById("mood2").value;
        const entryText = document.getElementById("entry2").value.trim();

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

        entriesSection2.prepend(article);

        form2.reset();
    
    }

function journal3 (event) {
        event.preventDefault();

        const date = document.getElementById("date3").value;
        const mood = document.getElementById("mood3").value;
        const entryText = document.getElementById("entry3").value.trim();

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

        entriesSection3.prepend(article);

        form3.reset();
    
    }

};