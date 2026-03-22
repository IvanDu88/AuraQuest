let input = document.getElementsByTagName("input");
let category = document.getElementById("Category");
let newBudget = true;
let moneyDisplay1 = document.getElementById("money1");
let moneyDisplay2 = document.getElementById("money2");
let moneyDisplay3 = document.getElementById("money3");
let savingsGoalProgress = document.getElementById("goal");
let tableCells = document.getElementsByTagName("td");
let tableValues = [0,0,0,0,0,0];

let originalBudget = 0;
let budget = 0;
let savingsGoal = 0;
let click = 0;
let counter = 3;

input[2].addEventListener("click", validation);
input[4].addEventListener("click", validation);


function validation(event) {
    event.preventDefault();
    
    if(event.target===input[2]){

        if(budget>0) {
            newBudget = confirm("Are you sure you want to submit a new budget and savings goal? (This will reset everything)");
        }

        let errorMessage = "";
        if(input[0].value<0) {
            errorMessage += "Budget cannot be a negative amount\n";
        }
        if(input[0].value===0) {
            errorMessage += "Budget cannot be $0\n";
        }
        if(input[0].value==="") {
            errorMessage += "Enter a Budget\n";
        }
        if(input[1].value<0) {
            errorMessage += "Savings cannot be a negative amount\n";
        }
        if(input[1].value===0) {
            errorMessage += "Savings cannot be $0 (Don't spend it all in one place)\n";
        }
        if(input[1].value==="") {
            errorMessage += "Enter a Savings Goal\n";
        }

        if(errorMessage!=="")
            alert(errorMessage);
        else if(newBudget) {
            input[5].removeEventListener("click", validation);
            budget=input[0].valueAsNumber;
            originalBudget=input[0].valueAsNumber;
            savingsGoal=input[1].valueAsNumber;
            input[0].value="";
            input[1].value="";
            moneyDisplay1.innerText="Remaining Money: $" + budget;
            moneyDisplay2.innerText="Remaining Money: $" + budget;
            moneyDisplay3.innerText="Remaining Money: $" + budget;
            savingsGoalProgress.innerHTML = "<p>Your savings goal of <span style='color:red;'>$" + savingsGoal + " is 0% complete</span></p>";
            newBudget=false;
            for(let i = 0; i<tableCells.length; i++) {
                tableCells[i].innerText="$0";
            }
        }
    }

    if(event.target===input[4]) {
        let errorMessage = "";
        if(savingsGoal===0) {
            alert("Set a Budget and a Savings Goal First")
        }
        if(input[3].value<0) {
            errorMessage += "Spendings cannot be a negative amount\n";
        }
        if(input[3].value===0) {
            errorMessage += "Default $0\n";
        }
        if(input[3].value==="") {
            errorMessage += "Enter an amount to spend\n";
        }
        if(input[3].valueAsNumber>budget) {
            errorMessage += "You can't spend more than what you have\n";
        }
        if(category.value==="") {
            errorMessage += "Select a category\n"
        }

        if(errorMessage!==""&&savingsGoal!==0)
            alert(errorMessage);
        else {
            input[5].addEventListener("click", validation);
            if(category.value==="Food") {
                tableValues[0]+=input[3].valueAsNumber;
                for(let i = 0; i<tableCells.length; i+=6) {
                    tableCells[i].innerText="$"+tableValues[0];
                }
            }
            if(category.value==="Personal") {
                tableValues[1]+=input[3].valueAsNumber;
                for(let i = 1; i<tableCells.length; i+=6) {
                    tableCells[i].innerText="$"+tableValues[1];
                }
            }
            if(category.value==="Savings") {
                tableValues[2]+=input[3].valueAsNumber;
                for(let i = 2; i<tableCells.length; i+=6) {
                    tableCells[i].innerText="$"+tableValues[2];
                }
                if(tableValues[2]/savingsGoal<0.69)
                    savingsGoalProgress.innerHTML = "<p>Your savings goal of <span style='color:red;'>$" + savingsGoal + " is " + Math.round((tableValues[2]/savingsGoal)*100) +"% complete</span>👎</p>";
                else if(tableValues[2]/savingsGoal>=0.69&&tableValues[2]/savingsGoal<=0.99)
                    savingsGoalProgress.innerHTML = "<p>Your savings goal of <span style='color:#BA8E23;'>$" + savingsGoal + " is " + Math.round((tableValues[2]/savingsGoal)*100) +"% complete</span>🤷</p>";
                else
                    savingsGoalProgress.innerHTML = "<p>Your savings goal of <span style='color:green;'>$" + savingsGoal + " is 100% complete</span>🎉</p>";
            }
            if(category.value==="Family") {
                tableValues[3]+=input[3].valueAsNumber;
                for(let i = 3; i<tableCells.length; i+=6) {
                    tableCells[i].innerText="$"+tableValues[3];
                }
            }
            if(category.value==="Transportation") {
                tableValues[4]+=input[3].valueAsNumber;
                for(let i = 4; i<tableCells.length; i+=6) {
                    tableCells[i].innerText="$"+tableValues[4];
                }
            }
            if(category.value==="School/Housing") {
                tableValues[5]+=input[3].valueAsNumber;
                for(let i = 5; i<tableCells.length; i+=6) {
                    tableCells[i].innerText="$"+tableValues[5];
                }
            }

            budget-=input[3].valueAsNumber;

            category.value="";
            input[3].value="";

            moneyDisplay1.innerText="Remaining Money: $" + budget;
            moneyDisplay2.innerText="Remaining Money: $" + budget;
            moneyDisplay3.innerText="Remaining Money: $" + budget;
        }
        
    }

    if(event.target===input[5]) {
        click++;
        if(click===1) {
            let countdown = setInterval(() => {
                input[5].value=counter;
                input[5].disabled = true;
                if(counter===0) {
                    clearInterval(countdown);
                    input[5].value="Confirm Reset";
                    input[5].disabled = false;
                }
                counter--;
            }, 1000);
        }
        else{
            for(let i = 0; i<tableCells.length; i++) {
                tableCells[i].innerText="$0";
            }
            for(let i = 0; i<tableValues.length; i++) {
                tableValues[i]=0;
            }
            click=0;
            counter=3;
            budget=originalBudget;
            moneyDisplay1.innerText="Remaining Money: $" + budget;
            moneyDisplay2.innerText="Remaining Money: $" + budget;
            moneyDisplay3.innerText="Remaining Money: $" + budget;
            savingsGoalProgress.innerHTML = "<p>Your savings goal of <span style='color:red;'>$" + savingsGoal + " is 0% complete</span></p>";
            input[5].value="Reset Spendings";
            input[5].removeEventListener("click", validation);
        }
    }
}