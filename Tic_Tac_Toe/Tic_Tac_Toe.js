(function (){
    "use strict";

    //TODO:
    // Make number of players selection div
    // call beginGame funcion with appropriate inputs
    // Make bot logic
    
    function howManyPlayers(numberOfPlayers) {
        if (numberOfPlayers === 2) {
            //show divs to collect both players names
            //beginGame()
        }
        else {
            //show div to collect single player name
            // show div to ask who will go first
            //beginGame()


        }
    }


    function beginGame(player1Name, player2Name) {

        //Make PlayerNameArray to display player turn in div
        let playerNameArray = [player1Name, player2Name];

        // Make a tic tac toe array to hold a value for each 3x3 cell (bottom left is #1, top right is #9)
        let tttArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        // Make a winning numbers array to check if a player has a winning combo
        let winningNumbers = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ]

        // Create player array for use in adding text to 3x3 grid cells when clicked
        let playerArray = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

        // Create turn number to iterate as cells are clicked; for use in injecting html and determining which player array to push selected cell value
        let turnNumber = 0;

        // Make winner boolean to halt progression through the function once a player wins
        let winner = false;

        // Make player arrays to record selected player cells
        let player1Array = [];
        let player2Array = [];

        // Check for a winning combo
        function checkWinCondition(arr, player) {

            // Loop through each element in the winning numbers array
            winningNumbers.forEach(function (element) {

                // If each number in the winning numbers element exists, that player wins
                if (
                    (arr.indexOf(element[0]) !== -1) &&
                    (arr.indexOf(element[1]) !== -1) &&
                    (arr.indexOf(element[2]) !== -1)
                ) {
                    // Remove click event listeners from the grid
                    $(".cell").off("click");

                    // Change winner to true
                    winner = true;

                    // Update the playerTurnDiv to declare the winner
                    $("#playerTurnDiv").text("Player " + player + " Wins!")
                }
            })
        }

        // Create a function to display which players turn it is in playerTurnDiv
        function displayPlayerTurn() {
            if (turnNumber % 2 === 0) {
                $("#playerTurnDiv").text(playerNameArray[0] + "'s turn")
            } else {
                $("#playerTurnDiv").text(playerNameArray[1] + "'s turn")
            }
        }

        // Add click event listeners to the 3x3 grid
        $(".cell").click(function (e) {

            // Use the click event to create cell int (equal to title) for pushing to player arrays
            let cell = parseInt(e.currentTarget.title);

            // Use cell to create index int to reassign the value of the element in tttArray
            let index = cell - 1;

            // Only do things to the cell if it hasn't been clicked already
            if (tttArray[index] === cell) {

                // Change the value of this element in the tttArray so the above conditional fails the next time this cell is clicked (couldn't remove the individual click event listener so here we are)
                tttArray[index] = playerArray[turnNumber]

                // Update the cell with that players char
                this.innerText = playerArray[turnNumber];

                // Determine which player is clicking
                if (turnNumber % 2 === 0) {
                    // Add the cell int to the player's array
                    player1Array.push(cell)
                    // Check if the player has won
                    checkWinCondition(player1Array, 1);
                } else {
                    player2Array.push(cell)
                    checkWinCondition(player2Array, 2);
                }

                // If a player hasn't won
                if (winner === false) {

                    // Iterate turn number
                    turnNumber++;

                    // If turn number equals 9, all 3x3 grid cells have been clicked (turnNumber started at 0)
                    if (turnNumber === 9) {

                        // Update playerTurnDiv to announce a tie
                        $("#playerTurnDiv").text("Dill's game")
                    } else {
                        // Update the displayPlayerTurn div to show the current player turn
                        displayPlayerTurn();
                    }
                }
            }
        })

        // Show the player turn before a click is made
        displayPlayerTurn();
        ;
    }

    
})();
