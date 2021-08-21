window.addEventListener("DOMContentLoaded", () => {
    const tiles = Array.from(document.querySelectorAll(".tile"));
    const playerDisplay = document.querySelector(".display-player");
    const ngButton = document.querySelector("#ng");
    const result = document.querySelector(".result");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true;

    const PLAYERX_WON = "PLAYERX_WON";
    const PLAYERO_WON = "PLAYERO_WON";
    const TIE = "TIE";


    /*
        Board View
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    // TTT Win Rule
    const winningConditions = [
        // O - Piece
        // 4 Conditions
        [0, 1, 3, 4],
        [1, 2, 4, 5],
        [3, 4, 6, 7],
        [4, 5, 7, 8],

        // L or J - Piece
        // 16 Conditions
        [0, 3, 4, 5],
        [1, 4, 7, 8],
        [0, 1, 2, 3],
        [3, 4, 5, 6],
        [1, 2, 5, 8],
        [0, 1, 4, 7],
        [2, 3, 4, 5],
        [5, 6, 7, 8],
        [2, 5, 7, 8],
        [1, 4, 6, 7],
        [0, 3, 4, 5],
        [3, 6, 7, 8],
        [0, 1, 3, 6],
        [1, 2, 4, 7], 
        [0, 1, 2, 5],
        [3, 4, 5, 8],
        
        // S or Z - Piece
        // 8 Condititons
        [0, 3, 4, 7],
        [1, 4, 5, 8],
        [1, 2, 3, 4],
        [4, 5, 6, 7],
        [2, 4, 5, 7],
        [1, 3, 4, 6],
        [0, 1, 4, 5],
        [3, 4, 7, 8],

        // T - Piece
        // 8 Conditions
        [1, 3, 4, 5],
        [4, 6, 7, 8],
        [0, 3, 4, 6],
        [1, 4, 5, 7],
        [0, 1, 2, 4],
        [3, 4, 5, 7],
        [2, 4, 5, 8],
        [1, 3, 4, 7]
        
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 35; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            const d = board[winCondition[3]];
            if (a === "" || b === "" || c === "" || d === "") {
                continue;
            }
            if (a === b && b === c && c === d) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(""))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                result.innerHTML = '<span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                result.innerHTML = '<span class="playerX">X</span> Won';
                break;
            case TIE:
                result.innerText = "It Is a Tie";
        }
        result.classList.remove("hide");
    };

    const isValidAction = (tile) => {
        if (tile.innerText === "X" || tile.innerText === "O"){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const ngBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        isGameActive = true;
        result.classList.add("hide");

        if (currentPlayer === "O") {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = "";
            tile.classList.remove("playerX");
            tile.classList.remove("playerO");
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener("click", () => userAction(tile, index));
    });

    ngButton.addEventListener("click", ngBoard);
});