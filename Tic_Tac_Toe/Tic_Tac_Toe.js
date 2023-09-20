(function () {
    "use strict";

    //Disable the submit button for the number of players form initially (until a choice is selected)
    $("#numberOfPlayersFormSubmit").prop('disabled', true);

    //Enable the submit button for the number of players form once a choice has been selected.
    //Deselct the other radio button
    $("#1Player").on('click', function () {
        $("#numberOfPlayersFormSubmit").prop('disabled', false);
        $("#2Players").prop('checked', false);
    })

    $("#2Players").on('click', function () {
        $("#numberOfPlayersFormSubmit").prop('disabled', false);
        $("#1Player").prop('checked', false);
    })

    // Make a player number global variable to dictate how to evaluate player name validation and game setup function
    let numberOfPlayers = 0;

    // Make a nameErrorHtml variable to populate the name error div
    let nameErrorHtml = "";

    //Prevent get request
    //TODO build out which divs to show based on which choice was selected
    $("#numberOfPlayersForm").submit(function (e) {
        e.preventDefault();
        if (e.target[0].checked) {
            numberOfPlayers = 1;
        } else if (e.target[1].checked) {
            numberOfPlayers = 2;
            $("#player2NameDiv").css("display", "block");
        } else {
            alert("An error occured setting the 'numberOfPlayers' variable.");
        }
        $("#playerNameFormDiv").css("display", "block");
        $("#numberOfPlayersDiv").css("display", "none");
    });

    // Hide player name div initially
    $("#playerNameFormDiv").css("display", "none");

    // Hide the 2nd player name div initially
    $("#player2NameDiv").css("display", "none");

    // Disable player name form submit button (until a value is entered)
    $("#playerNameFormSubmit").prop('disabled', true);

    function hideErrorDivs() {
        $("#nameIsEmptyErrorDiv").css("display", "none");
        $("#nameIsTobbotErrorDiv").css("display", "none");
        $("#nameIsDillErrorDiv").css("display", "none");
        $("#namesMatchErrorDiv").css("display", "none");
    };

    // Hide error divs initially
    hideErrorDivs();

    // Create validation function to check that an arguement is not empty
    function checkNameHasLength(name) {
        if (name.length > 0) {
            return true;
        } else {
            $("#playerNameFormSubmit").prop('disabled', true);
            $("#nameIsEmptyErrorDiv").css("display", "block");
            return false;
        }
    };

    // Create validation function to check that the arguement is not 'tobbot'
    function checkNameNotEqualTobbot(name) {
        if (name.toLowerCase() !== 'tobbot') {
            return true;
        } else {
            $("#playerNameFormSubmit").prop('disabled', true);
            $("#nameIsTobbotErrorDiv").css("display", "block");
            return false;
        }
    };

    // Create validation function to check that the arguement is not 'dill'
    function checkNameNotEqualDill(name) {
        if (name.toLowerCase() !== 'dill') {
            return true;
        } else {
            $("#playerNameFormSubmit").prop('disabled', true);
            $("#nameIsDillErrorDiv").css("display", "block");
            return false;
        }
    };

    // Create validation function to check that the arguements are not the same
    function checkNamesNotSame(name1, name2) {
        if (name1.toLowerCase() !== name2.toLowerCase()) {
            return true;
        } else {
            $("#playerNameFormSubmit").prop('disabled', true);
            $("#namesMatchErrorDiv").css("display", "block");
            return false;
        }
    };

    // Check if the player name is valid
    // Cannot be empty, 'tobbot', or 'dill'
    function checkPlayerNameValid(name) {
        if (checkNameHasLength(name) &
            checkNameNotEqualTobbot(name) &
            checkNameNotEqualDill(name)) {
            return true;
        }
        return false;
    };

    function checkPlayerNamesAreValid() {
        let p1Name = $("#player1Name").val();
        let p2Name = $("#player2Name").val();

        hideErrorDivs();

        if (numberOfPlayers === 1) {
            if (checkPlayerNameValid(p1Name)) {
                $("#playerNameFormSubmit").prop('disabled', false);
                return true;
            }
            return false;
        }

        if (numberOfPlayers === 2) {
            let condition1 = (checkNamesNotSame(p1Name, p2Name));
            let condition2 = (checkPlayerNameValid(p1Name));
            let condition3 = (checkPlayerNameValid(p2Name));

            if (condition1 &&
                condition2 &&
                condition3) {
                $("#playerNameFormSubmit").prop('disabled', false);
                return true;
            }
            return false;
        }
        alert("Error occured in 'checkBothPlayerNamesAreValid function");
    }

    // Call checkPlayerNamesAreValid function on player name text input field class changes
    $(".playerNameTextInput").keyup(function () {
        checkPlayerNamesAreValid();
    });

    // Disable two player game form submit button (until valid names are input)
    $("#twoPlayerGameFormSubmit").prop('disabled', true);

    //TODO:
    // Create rules for 2 player inputs and submit button
    // Hide/display single player or two player divs based on number of players choice
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
