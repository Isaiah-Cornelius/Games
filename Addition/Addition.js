(function () {
    "use strict";

    function generateRandomNumber(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    function updateNumbersToAddDiv () {
        let num1 = generateRandomNumber(1, 11);
        let num2 = generateRandomNumber(1, 11);
        console.log("What is " + num1 + " + " + num2 + "?");

        const numbersToAddDiv = document.getElementById("numbersToAdd");
        numbersToAddDiv.innerHTML = "<div>What is " + num1 + " + " + num2 + "?</div>";
    }



    updateNumbersToAddDiv();

})();