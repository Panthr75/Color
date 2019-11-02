// TEST the functions with this function
function TestValue(hex, devTools) {
    fromString(devTools, hex);
    fromString2(devTools, hex);
}


document.getElementById("testButton").addEventListener("click", function() {
    TestValue(prompt("Enter hex value to test", "#111111"), document.getElementById("canDevTools").checked);
});
