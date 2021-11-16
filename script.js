const gameBoard = (() => {
    let gameBoardArr = ['', '', '', '', '', '', '', '', '']; //store the moves players have made
    let whosTurn = true; //true if it's player one's turn false for player two

    const setWhosTurn = (turn) => {
        whosTurn = turn;
    };

    const getTurn = () => {
        return whosTurn;
    };

    const squareSelected = (square) => {
        if (gameBoardArr[square] === '') {
            if (whosTurn) {
                gameBoardArr[square] = playerOne.playerToken;
                displayController.fillGameBoard(gameBoardArr);
                displayController.changeTurn();
            } else {
                gameBoardArr[square] = playerTwo.playerToken;
                displayController.fillGameBoard(gameBoardArr);
                displayController.changeTurn();
            }
        }
        isThereAWinner();
    };

    const isThereAWinner = () => {
        const winners = [ //sets the current array into patterns to check against winning scores
            [gameBoardArr[0] + gameBoardArr[1] + gameBoardArr[2],
            gameBoardArr[3] + gameBoardArr[4] + gameBoardArr[5],
            gameBoardArr[6] + gameBoardArr[7] + gameBoardArr[8]],
            [gameBoardArr[0] + gameBoardArr[3] + gameBoardArr[6],
            gameBoardArr[1] + gameBoardArr[4] + gameBoardArr[7],
            gameBoardArr[2] + gameBoardArr[5] + gameBoardArr[8]],
            [gameBoardArr[0] + gameBoardArr[4] + gameBoardArr[8],
            gameBoardArr[2] + gameBoardArr[4] + gameBoardArr[6]]
        ];

        winners.forEach(direction => { //loop through the array checking for a winner
            direction.forEach(i => {
                if (i === 'XXX') {
                    playerOne.winner();
                    displayController.updateScore();
                    clearBoard();
                } else if (i === 'OOO') {
                    playerTwo.winner();
                    displayController.updateScore();
                    clearBoard();
                }

            });

        });
        if (isItATie()) {
            window.alert(`It's a Tie!`);
            clearBoard();
        }
    };

    const isItATie = () => { //check if all spaces are filled
        if (!gameBoardArr.includes('')) {
            return true;
        }
    };

    const clearBoard = () => {
        gameBoardArr = ['', '', '', '', '', '', '', '', ''];
        displayController.fillGameBoard(gameBoardArr);
    };

    return {
        setWhosTurn,
        getTurn,
        squareSelected,
    }
})();

const displayController = (() => {
    const createGameBoard = () => { //creating the grid for the gameboard
        for (i = 0; i < 9; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('playingSquare');
            newDiv.setAttribute('id', 'square-' + i);
            newDiv.setAttribute('onClick', `gameBoard.squareSelected(${i})`);
            document.getElementById('gameBoard').appendChild(newDiv);
        };
    };

    const fillGameBoard = (gameBoardArr) => { //populating the gameboard with the array and filling in as player pick squares
        for (i = 0; i < 9; i++) {
            document.getElementById('square-' + i).textContent = gameBoardArr[i];
        }
    };

    const changeTurn = () => {
        const playerOneTurn = document.getElementById('playerOneTurn');
        const playerTwoTurn = document.getElementById('playerTwoTurn');
        if (gameBoard.getTurn()) {
            playerOneTurn.style.backgroundColor = 'white';
            playerTwoTurn.style.backgroundColor = 'yellow';
        } else {
            playerOneTurn.style.backgroundColor = 'yellow';
            playerTwoTurn.style.backgroundColor = 'white';
        }
        gameBoard.setWhosTurn(!gameBoard.getTurn());
    };

    const updateScore = () => {
        const playerOneScore = document.getElementById('playerOneScore');
        const playerTwoScore = document.getElementById('playerTwoScore');
        playerOneScore.textContent = playerOne.getScore();
        playerTwoScore.textContent = playerTwo.getScore(); 
    }

    return {
        createGameBoard,
        fillGameBoard,
        changeTurn,
        updateScore
    };
})();

const playerFactory = (name, turn, token) => {
    let isTurn = turn;
    let playerName = name;
    let playerToken = token;
    let score = 0;
    const winner = () => {
        score++;
        window.alert(playerName + ' Wins!')
    };
    const getScore = () => {
        return score;
    }
    return { isTurn, playerName, playerToken, getScore, winner };
}

displayController.createGameBoard();

const playerOne = playerFactory('Player 1', true, 'X');
const playerTwo = playerFactory('Player 2', false, 'O');