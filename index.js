document.addEventListener("DOMContentLoaded", function () {
    const startScreen = document.getElementById("start-screen");
    const gameScreen = document.getElementById("game-screen");
    const singlePlayerButton = document.getElementById("single-player");
    const multiplayerButton = document.getElementById("multiplayer");
    const board = document.getElementById("board");
    const resultMessage = document.getElementById("result-message");
    const restartButton = document.getElementById("restart-button");
    const shareButton = document.getElementById("share-button");
    const pauseMusicButton = document.getElementById("pause-music-button");
    const backgroundMusic = document.getElementById("background-music");

    // Variáveis de controle do jogo
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
    let singlePlayerMode = false;

    // Função para verificar o vencedor
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        if (!gameBoard.includes("")) {
            return "Draw";
        }

        return null;
    }

    // Função para atualizar a mensagem do resultado
    function updateResultMessage() {
        const winner = checkWinner();
        if (winner === "Draw") {
            resultMessage.textContent = "Empate!";
        } else if (winner) {
            resultMessage.textContent = `O jogador "${winner}" venceu!`;
        }
    }

    // Função para realizar uma jogada
    function makeMove(cellIndex) {
        if (gameBoard[cellIndex] === "" && gameActive) {
            gameBoard[cellIndex] = currentPlayer;
            const cell = document.createElement("div");
            cell.textContent = currentPlayer;
            board.children[cellIndex].appendChild(cell);
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateResultMessage();
        }
    }

    // Evento de clique em uma célula do tabuleiro
    board.addEventListener("click", function (event) {
        const cell = event.target;
        const cellIndex = Array.from(board.children).indexOf(cell.parentElement);
        makeMove(cellIndex);
    });

    // Evento de clique no botão "Reiniciar Jogo"
    restartButton.addEventListener("click", function () {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        board.innerHTML = "";
        resultMessage.textContent = "";
        currentPlayer = "X";
        gameActive = true;
    });

    // Evento de clique no botão "Compartilhar Jogo"
    shareButton.addEventListener("click", function () {
        // Implemente a lógica para compartilhar o jogo, se necessário
    });

    // Evento de clique no botão "Pausar Música"
    pauseMusicButton.addEventListener("click", function () {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    });

    // Evento de clique no botão "Jogar contra o computador"
    singlePlayerButton.addEventListener("click", function () {
        singlePlayerMode = true;
        startScreen.style.display = "none";
        gameScreen.style.display = "block";
    });

    // Evento de clique no botão "Jogar multiplayer"
    multiplayerButton.addEventListener("click", function () {
        singlePlayerMode = false;
        startScreen.style.display = "none";
        gameScreen.style.display = "block";
    });
});