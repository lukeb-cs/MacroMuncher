const darkMode = document.getElementById("darkMode");

let mode;

window.onload = function () {

    mode = 0;
    if (localStorage.getItem('mode')) {
        mode = JSON.parse(localStorage.getItem('mode'));
    }
    if (mode === 0) {
        darkMode.textContent = '🌙';

    }
    else {
        darkMode.textContent = '☀️';
    }
    // here, depending on the value of mode, change how the page looks
    // icon
    // background
    // text color
    // !!! put a class on everything that should change, then query select and forEach
};

darkMode.addEventListener("click", function (event) {

    event.preventDefault();

    if (mode === 0) {
        mode = 1;
        darkMode.textContent = '☀️';
    }
    else {
        mode = 0;
        darkMode.textContent = '🌙';
    }
    localStorage.setItem('mode', mode);
});
