// Identify the area where log items will end up
const logDiv = document.getElementById("logDiv");

// Retrieving the elements for the information at the top of the page
const calories = document.getElementById("calories");
const fats = document.getElementById("totalFats");
const carbs = document.getElementById("totalCarbs");
const protein = document.getElementById("totalProtein");

// Start with an empty log
let log = [];

// Check if the log item already exists in local storage
if (localStorage.getItem('log')) {
    log = JSON.parse(localStorage.getItem('log'));
}

window.onload = LoadLog();

function LoadLog() {

    // Clear the log list
    logDiv.innerHTML = '';

    // For every log item in the list, make a series of elements
    log.forEach(item => {
        const infoDivLog = document.createElement('div');
        const namePLog = document.createElement('p');
        const calPLog = document.createElement('p');
        const fatPLog = document.createElement('p');
        const carbPLog = document.createElement('p');
        const proteinPLog = document.createElement('p');
        const buttonDivLog = document.createElement('div');
        const separationDivLog = document.createElement('div');
        const macroCalDivLog = document.createElement('div');
        const macroDivLog = document.createElement('div');
        const removeButtonLog = document.createElement('button');
        namePLog.textContent = item.name;
        const calsLog = (item.fats * 9) + (item.carbs * 4) + (item.protein * 4);
        calPLog.textContent = Math.floor(calsLog) + " kcal";
        fatPLog.textContent = "Fat: " + item.fats + " g";
        carbPLog.textContent = "Carbs: " + item.carbs + " g";
        proteinPLog.textContent = "Protein: " + item.protein + " g";
        removeButtonLog.textContent = "REMOVE";

        // When an item is removed, change total values and remove the item from the log list
        removeButtonLog.addEventListener("click", function (event) {
            event.preventDefault();

            // Remove the item from the list, then save the list and render list without the item
            const index = log.findIndex(food => food.name == item.name);
            localStorage.setItem('carbs', parseInt(localStorage.getItem('carbs')) - log[index].carbs);
            localStorage.setItem('fats', parseInt(localStorage.getItem('fats')) - log[index].fats);
            localStorage.setItem('protein', parseInt(localStorage.getItem('protein')) - log[index].protein);
            localStorage.setItem('calories',
                (parseInt(localStorage.getItem('protein')) * 4) +
                (parseInt(localStorage.getItem('carbs')) * 4) +
                (parseInt(localStorage.getItem('fats')) * 9)
            );
            log.splice(index, 1);
            localStorage.setItem('log', JSON.stringify(log));
            macroLoad();
            LoadLog();
        });

        // Make a hierarchy for the elements created
        infoDivLog.appendChild(namePLog);
        macroDivLog.appendChild(fatPLog);
        macroDivLog.appendChild(carbPLog);
        macroDivLog.appendChild(proteinPLog);
        macroCalDivLog.appendChild(macroDivLog);
        macroCalDivLog.appendChild(calPLog);
        buttonDivLog.appendChild(macroCalDivLog);
        separationDivLog.appendChild(infoDivLog);
        separationDivLog.appendChild(buttonDivLog);
        separationDivLog.appendChild(removeButtonLog);
        logDiv.appendChild(separationDivLog);
        removeButtonLog.classList.add("remove");
        separationDivLog.classList.add("foodItem");
        namePLog.classList.add("foodItemName");
        buttonDivLog.classList.add("buttonDiv");
        separationDivLog.classList.add("sepDiv");
        calPLog.classList.add("circle");
        macroCalDivLog.classList.add("macroCalDiv");
    });
};

window.onload = macroLoad();

function macroLoad() {

    // If the user doesn't have localStorage items saved, make new values
    if (!localStorage.getItem('calories') || !localStorage.getItem('fats') || !localStorage.getItem('carbs') || !localStorage.getItem('protein'))
        newDay();

    // Get the values for macro nutrients from the user's local storage
    calories.textContent = parseInt(localStorage.getItem('calories'));
    fats.textContent = parseInt(localStorage.getItem('fats'));
    carbs.textContent = parseInt(localStorage.getItem('carbs'));
    protein.textContent = parseInt(localStorage.getItem('protein'));
}
