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
    { "name": "Large Egg (50g)", "fats": 5, "carbs": 0, "protein": 6 },
    { "name": "White Rice, cooked (1 cup / 186g)", "fats": 0.4, "carbs": 45, "protein": 4.2 },
    { "name": "Ground Beef 80% lean, cooked (3oz / 85g)", "fats": 17, "carbs": 0, "protein": 22 },
    { "name": "Ground Beef 85% lean, cooked (3oz / 85g)", "fats": 13, "carbs": 0, "protein": 23 },
    { "name": "Ground Beef 90% lean, cooked (3oz / 85g)", "fats": 10, "carbs": 0, "protein": 22 },
    { "name": "Ground Beef 93% lean, cooked (3oz / 85g)", "fats": 8, "carbs": 0, "protein": 23 },
    { "name": "Ground Beef 95% lean, cooked (3oz / 85g)", "fats": 5, "carbs": 0, "protein": 23 },
    { "name": "Ground Turkey (85% lean), cooked (3oz / 85g)", "fats": 9, "carbs": 0, "protein": 22 },
    { "name": "Fat‑Free Greek Yogurt (170g)", "fats": 0, "carbs": 6, "protein": 17 },
    { "name": "Regular Greek Yogurt (170g)", "fats": 5, "carbs": 9, "protein": 17 },
    { "name": "White Bread (1 slice / 25g)", "fats": 1.2, "carbs": 12, "protein": 2 },
    { "name": "Wheat Bread (1 slice / 25g)", "fats": 1, "carbs": 11, "protein": 2 },
    { "name": "Plain Bagel (99g)", "fats": 1, "carbs": 56, "protein": 10 },
    { "name": "Cream Cheese (2 tbsp / 30g)", "fats": 10, "carbs": 1, "protein": 2 },
    { "name": "Banana, medium (150g)", "fats": 0.3, "carbs": 23, "protein": 1 },
    { "name": "Apple, medium (130g)", "fats": 0.2, "carbs": 18, "protein": 0.3 },
    { "name": "Orange, medium (130g)", "fats": 0.2, "carbs": 15, "protein": 1 },
    { "name": "Corn, canned (1 cup / 200g)", "fats": 2.2, "carbs": 41, "protein": 5 },
    { "name": "Broccoli, steamed (1 cup / 150g)", "fats": 0.6, "carbs": 8, "protein": 5 },
    { "name": "Salmon, cooked (3oz / 85g)", "fats": 10.5, "carbs": 0, "protein": 17 },
    { "name": "All‑Purpose Flour (1 cup / 110g)", "fats": 1.2, "carbs": 84, "protein": 12 },
    { "name": "Peanuts (1oz / 28g)", "fats": 14, "carbs": 6, "protein": 7 },
    { "name": "Almonds (1oz / 28g)", "fats": 14, "carbs": 6, "protein": 6 },
    { "name": "Cashews (1oz / 28g)", "fats": 12, "carbs": 8, "protein": 5 },
    { "name": "Olive Oil (1 tbsp / 14g)", "fats": 14, "carbs": 0, "protein": 0 },
    { "name": "Avocado (1/2 medium / 108g)", "fats": 18, "carbs": 6, "protein": 2 },
    { "name": "Bacon (3 slices / 34g)", "fats": 13, "carbs": 0, "protein": 10 },
    { "name": "Turkey Bacon (3 slices / 30g)", "fats": 6, "carbs": 0, "protein": 6 },
    { "name": "American Cheese (1 slice / 21g)", "fats": 6.5, "carbs": 2, "protein": 5 },
    { "name": "Cheddar Cheese (1 slice / 28g)", "fats": 9, "carbs": 0.4, "protein": 7 },
    { "name": "Ranch Dressing (2 tbsp / 30g)", "fats": 14, "carbs": 2, "protein": 0.2 },
    { "name": "Canned Tuna in water (3oz / 85g)", "fats": 1, "carbs": 0, "protein": 20 },
    { "name": "Peanut Butter (2 tbsp / 32g)", "fats": 16, "carbs": 6, "protein": 8 },
    { "name": "Chicken Breast, cooked (3oz / 85g)", "fats": 3, "carbs": 0, "protein": 26 },
    { "name": "Strawberries (1 cup / 150g)", "fats": 0.5, "carbs": 11.7, "protein": 1 },
    { "name": "Blueberries (1 cup / 144g)", "fats": 0.5, "carbs": 19, "protein": 1 },
    { "name": "Ketchup (2 tbsp / 34g)", "fats": 0, "carbs": 5, "protein": 0 },
    { "name": "Mayonnaise (1 tbsp / 14g)", "fats": 10, "carbs": 0, "protein": 0 },
    { "name": "Whole Milk (1 cup / 244g)", "fats": 8, "carbs": 12, "protein": 8 },
    { "name": "2% Milk (1 cup / 244g)", "fats": 5, "carbs": 12, "protein": 8 },
    { "name": "Skim Milk (1 cup / 244g)", "fats": 0, "carbs": 12, "protein": 8 },
    { "name": "Half‑and‑Half (2 tbsp / 30g)", "fats": 10, "carbs": 1, "protein": 0.3 },
    { "name": "Parmesan Cheese (1 tbsp / 5g)", "fats": 2, "carbs": 0, "protein": 2 },
    { "name": "Protein Powder (1 scoop / ~30g)", "fats": 1.5, "carbs": 3, "protein": 24 },
    { "name": "Salsa (2 tbsp / 30g)", "fats": 0, "carbs": 4, "protein": 0 },
    { "name": "Shrimp, cooked (3oz / 85g)", "fats": 1, "carbs": 0, "protein": 20 },
    { "name": "Potato, baked medium (173g)", "fats": 0, "carbs": 37, "protein": 4 },
    { "name": "Sweet Potato, baked medium (110g)", "fats": 0, "carbs": 36, "protein": 2 },
    { "name": "Flour Tortilla (8\" / 49g)", "fats": 4, "carbs": 24, "protein": 4 },
    { "name": "Low‑Carb Tortilla (e.g. 6\" / 40g)", "fats": 5, "carbs": 15, "protein": 7 }
]

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

    // event.preventDefault();

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

// selectors for the search bar and list contents
const searchInput = document.getElementById('searchInput');
const items = document.querySelectorAll('#foodDiv .foodItem');

// Filtering items based on their content
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

const searchSubmit = document.getElementById('searchSubmit');

searchSubmit.addEventListener('submit', function (event) {

    event.preventDefault();
});
