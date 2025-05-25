const sex = document.getElementById("sex");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const age = document.getElementById("age");
const activity = document.getElementById("activity");
const cals = document.getElementById("caloriesFromCalc");

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

    cals.textContent = Math.floor(calories);
});
