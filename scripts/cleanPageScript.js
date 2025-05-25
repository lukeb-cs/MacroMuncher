// When button is pressed, clear all local storage items and reload the page
document.getElementById("clean").addEventListener("click", function (event) {
    localStorage.clear();
    location.reload();
});
