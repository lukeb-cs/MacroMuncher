// Get the inputs for the calorie calculator
const sex = document.getElementById("sex");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const age = document.getElementById("age");
const activity = document.getElementById("activity");
const cals = document.getElementById("caloriesFromCalc");

// Set default calorie goal
let goal = 2000;

// If there is a goal, change the current goal
if (localStorage.getItem('goal')) {
    goal = JSON.parse(localStorage.getItem('goal'));
}

// Set default history (no history)
let history = [];

// If there is a history, change the current history
if (localStorage.getItem('history')) {
    history = JSON.parse(localStorage.getItem('history'));
}

// Calculate calorie expenditure
document.getElementById("calculator").addEventListener("submit", function (event) {

    event.preventDefault();

    let BMR = (10 * (weight.value / 2.2046)) + (6.25 * (height.value * 2.54)) - (5 * age.value);
    let calories;

    if (sex.value == "male") {
        BMR += 5;
    }
    else {
        BMR -= 161;
    }

    switch (activity.value) {
        case '1':
            calories = 1.2 * BMR;
            break;
        case '2':
            calories = 1.375 * BMR;
            break;
        case '3':
            calories = 1.55 * BMR;
            break;
        case '4':
            calories = 1.725 * BMR;
            break;
        case '5':
            calories = 1.9 * BMR;
            break;
    }

    // Show the result to the user
    cals.textContent = Math.floor(calories);
});

// Update local storage with the goal the user calculated
document.getElementById("goalUpdate").addEventListener("click", function (event) {

    event.preventDefault();

    if (cals.textContent != '...') {
        localStorage.setItem('goal', cals.textContent);
    }
    else {
        localStorage.setItem('goal', '2000');
    }
    location.reload();
});

const ctx = document.getElementById('caloriesChart').getContext('2d');

let dayNums = [];
let goalNums = [];
let dataNums = [];

window.onload = Load();

// Loading the information from the history to the chart
function Load() {
    if (history.length != 0) {
        for (let i = 0; i < history.length; i++) {
            dayNums.push(i);
            goalNums.push(JSON.parse(localStorage.getItem('goal')));
            dataNums.push(JSON.parse(localStorage.getItem('history'))[i].calories);
        }
    }
    console.log(goalNums);
}

// Make the calorie chart
const caloriesChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dayNums,
        datasets: [
            {
                label: 'Calorie Goal (kcal)',
                data: goalNums,
                borderColor: 'rgb(63, 22, 126, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.3,
                pointBackgroundColor: 'rgb(63, 22, 126, 1)',
            }, {
                label: 'Caloric Intake (kcal)',
                data: dataNums,
                backgroundColor: 'rgb(87, 100, 196, 0.2)',
                borderColor: 'rgb(87, 100, 196, 0.8)',
                borderWidth: 2,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: 'rgb(87, 100, 196, 0.8)',
            }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day #'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Calories'
                }
            }
        }
    }
});
