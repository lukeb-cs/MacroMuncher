// Retrieving the elements for each of the form values on the left side of the page
const addedName = document.getElementById("n");
const addedFats = document.getElementById("f");
const addedCarbs = document.getElementById("c");
const addedProtein = document.getElementById("p");

// Retrieving the elements for the information at the top of the page
const calories = document.getElementById("calories");
const fats = document.getElementById("totalFats");
const carbs = document.getElementById("totalCarbs");
const protein = document.getElementById("totalProtein");

// Start with an empty log
let log = [];

// Start with no previous history
let history = [];

// Check if a history has been made before and set history to that value
if (localStorage.getItem('history')) {
    history = JSON.parse(localStorage.getItem('history'));
}

// List of custom foods displayed on the right side of the page
let foods = [
    { name: "Great Value Greek Yogurt (170g)", fats: 0, carbs: 5, protein: 17 },
    { name: "93% Lean Ground Beef (4oz)", fats: 8, carbs: 0, protein: 23 },
    { name: "Frosted Flakes (1c)", fats: 0, carbs: 32, protein: 1 },
    { name: "Heinz Ketchup (2tbsp)", fats: 0, carbs: 5, protein: 0 },
    { name: "Mission Keto Tortilla", fats: 6, carbs: 4, protein: 10 },
    { name: "Large Egg", fats: 5, carbs: 0, protein: 6 },
    { name: "Great Value Sugar Free Syrup (2tbsp)", fats: 0, carbs: 5, protein: 0 },
    { name: "Kodiak Pancake Mix (63g)", fats: 2.5, carbs: 32, protein: 15 },
    { name: "Rice (1/4c)", fats: 0, carbs: 36, protein: 3 },
    { name: "Fit Crunch Mint Chocolate Chip Bar", fats: 8, carbs: 15, protein: 16 },
    { name: "Pure Sesame Oil (1tbsp)", fats: 14, carbs: 0, protein: 0 },
    { name: "Low Sodium Soy Sauce (1tbsp)", fats: 0, carbs: 1, protein: 1 },
    { name: "Kraft American Cheese Slice", fats: 4, carbs: 2, protein: 4 },
];

// If there is already a food list in local storage, replace the current list with the new one
if (localStorage.getItem('foodList')) {
    foods = JSON.parse(localStorage.getItem('foodList'));
}

// What to do when the window first loads
window.onload = LoadFoods();

function LoadFoods() {

    // If the user doesn't have localStorage items saved, make new values
    if (!localStorage.getItem('calories') || !localStorage.getItem('fats') || !localStorage.getItem('carbs') || !localStorage.getItem('protein'))
        newDay();

    // Get the values for macro nutrients from the user's local storage
    calories.textContent = parseInt(localStorage.getItem('calories'));
    fats.textContent = parseInt(localStorage.getItem('fats'));
    carbs.textContent = parseInt(localStorage.getItem('carbs'));
    protein.textContent = parseInt(localStorage.getItem('protein'));

    // Retrieving the element where the food items will be displayed and clearing it
    const foodDiv = document.getElementById("foodDiv");
    foodDiv.innerHTML = '';

    // Sorting the food item list into alphabetical order
    foods.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

    // For each of the foods, make a new tile and put the information on the tile
    foods.forEach(item => {
        const infoDiv = document.createElement('div');
        const nameP = document.createElement('p');
        const calP = document.createElement('p');
        const fatP = document.createElement('p');
        const carbP = document.createElement('p');
        const proteinP = document.createElement('p');
        const form = document.createElement('form');
        const input = document.createElement('input');
        const addButton = document.createElement('button');
        const buttonDiv = document.createElement('div');
        const separationDiv = document.createElement('div');
        const macroCalDiv = document.createElement('div');
        const macroDiv = document.createElement('div');
        const removeButton = document.createElement('button');
        nameP.textContent = item.name;
        const cals = (item.fats * 9) + (item.carbs * 4) + (item.protein * 4);
        calP.textContent = Math.floor(cals) + " kcal";
        fatP.textContent = "Fat: " + item.fats + " g";
        carbP.textContent = "Carbs: " + item.carbs + " g";
        proteinP.textContent = "Protein: " + item.protein + " g";
        input.type = "number";
        input.value = 1;
        addButton.textContent = "ADD";
        removeButton.textContent = "X";

        // Make an add button that will add the macro nutrients from the tile to the data at the top of the page
        addButton.addEventListener("click", function (event) {
            event.preventDefault();
            fats.textContent = parseInt(fats.textContent) + (item.fats * input.value);
            carbs.textContent = parseInt(carbs.textContent) + (item.carbs * input.value);
            protein.textContent = parseInt(protein.textContent) + (item.protein * input.value);
            localStorage.setItem('fats', fats.textContent);
            localStorage.setItem('carbs', carbs.textContent);
            localStorage.setItem('protein', protein.textContent);
            const fatCals = parseInt(localStorage.getItem('fats')) * 9;
            const carbCals = parseInt(localStorage.getItem('carbs')) * 4;
            const proteinCals = parseInt(localStorage.getItem('protein')) * 4;
            const totalCals = fatCals + carbCals + proteinCals;
            localStorage.setItem('calories', totalCals);
            calories.textContent = totalCals;

            // Retrieve the log list from local storage in case any changes have been made
            log = JSON.parse(localStorage.getItem('log'));

            // Add the number of elements equivalent to the number entered in the form
            for (let i = 0; i < input.value; i++) {
                log.push({ name: nameP.textContent, fats: item.fats, carbs: item.carbs, protein: item.protein })
            }

            // Reset the form value
            input.value = 1;

            // Change the log list in local storage
            localStorage.setItem('log', JSON.stringify(log));
        });

        removeButton.addEventListener("click", function (event) {
            event.preventDefault();

            // Remove the item from the list, then save the list and render list without the item
            const index = foods.findIndex(food => food.name === item.name);
            foods.splice(index, 1);
            LoadFoods();
        });

        // Make a hierarchy for the elements created
        infoDiv.appendChild(nameP);
        macroDiv.appendChild(fatP);
        macroDiv.appendChild(carbP);
        macroDiv.appendChild(proteinP);
        macroCalDiv.appendChild(macroDiv);
        macroCalDiv.appendChild(calP);
        form.appendChild(input);
        form.appendChild(addButton);
        buttonDiv.appendChild(macroCalDiv);
        buttonDiv.appendChild(form);
        separationDiv.appendChild(infoDiv);
        separationDiv.appendChild(buttonDiv);
        separationDiv.appendChild(removeButton);
        foodDiv.appendChild(separationDiv);
        removeButton.classList.add("close");
        separationDiv.classList.add("foodItem");
        nameP.classList.add("foodItemName");
        buttonDiv.classList.add("buttonDiv");
        separationDiv.classList.add("sepDiv");
        calP.classList.add("circle");
        macroCalDiv.classList.add("macroCalDiv");
    });

    // Settings the new food list to local storage
    localStorage.setItem('foodList', JSON.stringify(foods));
};

// What to do when the submit button is pressed on the left hand side of the page
document.getElementById("macros").addEventListener("submit", function (event) {

    event.preventDefault();

    // Checking for null values
    if (addedFats.value.trim() == '') {
        addedFats.value = 0;
    }
    if (addedCarbs.value.trim() == '') {
        addedCarbs.value = 0;
    }
    if (addedProtein.value.trim() == '') {
        addedProtein.value = 0;
    }

    // Add the item to the log list
    log = JSON.parse(localStorage.getItem('log'));

    // Check if the user gave the food item a name, otherwise, use a placeholder name
    if (addedName.value.trim() === '') {
        log.push({ name: "Custom Entry", fats: addedFats.value, carbs: addedCarbs.value, protein: addedProtein.value })
    }
    else {
        log.push({ name: addedName.value.trim(), fats: addedFats.value, carbs: addedCarbs.value, protein: addedProtein.value })
    }

    // Update the log list in local storage
    localStorage.setItem('log', JSON.stringify(log));

    // Adding the macro nutrients to the information at the top of the page and in local storage
    fats.textContent = parseInt(fats.textContent) + parseInt(addedFats.value);
    carbs.textContent = parseInt(carbs.textContent) + parseInt(addedCarbs.value);
    protein.textContent = parseInt(protein.textContent) + parseInt(addedProtein.value);
    localStorage.setItem('fats', fats.textContent);
    localStorage.setItem('carbs', carbs.textContent);
    localStorage.setItem('protein', protein.textContent);

    // Calculate calories based on macro nutrients
    const fatCals = parseInt(localStorage.getItem('fats')) * 9;
    const carbCals = parseInt(localStorage.getItem('carbs')) * 4;
    const proteinCals = parseInt(localStorage.getItem('protein')) * 4;
    const totalCals = fatCals + carbCals + proteinCals;
    localStorage.setItem('calories', totalCals);
    calories.textContent = totalCals;

    // Set all of the values back to their placeholders once calculations are done
    var inputs = document.querySelectorAll("#macros input");
    inputs.forEach(function (input) {
        input.value = '';
    });
});

// When the new day button is pressed, call the newDay helper function after localStorage is updated
document.getElementById("reset").addEventListener("click", function () {

    // Update the history with the day's current values, then call NewDay
    history.push({ calories: JSON.parse(localStorage.getItem('calories')), fats: JSON.parse(localStorage.getItem('fats')), carbs: JSON.parse(localStorage.getItem('carbs')), protein: JSON.parse(localStorage.getItem('protein')) });
    localStorage.setItem('history', JSON.stringify(history));
    newDay();
});

// Helper function to set all the local storage values and values at the top of the page to 0
function newDay() {

    localStorage.setItem('fats', 0);
    localStorage.setItem('carbs', 0);
    localStorage.setItem('protein', 0);
    localStorage.setItem('calories', 0);
    localStorage.setItem('log', JSON.stringify([]));
    calories.textContent = "0";
    fats.textContent = "0";
    carbs.textContent = "0";
    protein.textContent = "0";
}

document.getElementById("newFood").addEventListener("click", function (event) {

    // Checking for no given name
    if (addedName.value === '') {
        alert("You must give your food a name.");
        return;
    }

    // Checking if the item already exists
    if (foods.some(food => food.name === addedName.value)) {
        alert("A food by this name already exists.");
        return;
    }

    // Checking for null values
    if (addedFats.value.trim() == '') {
        addedFats.value = 0;
    }
    if (addedCarbs.value.trim() == '') {
        addedCarbs.value = 0;
    }
    if (addedProtein.value.trim() == '') {
        addedProtein.value = 0;
    }

    // Adding the custom food to the list
    foods.push({ name: addedName.value, fats: addedFats.value, carbs: addedCarbs.value, protein: addedProtein.value });

    // Set all of the values back to their placeholders once calculations are done
    var inputs = document.querySelectorAll("#macros input");
    inputs.forEach(function (input) {
        input.value = '';
    });

    // Refreshing the list
    LoadFoods();
});
