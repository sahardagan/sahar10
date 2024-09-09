(function() {
    const squareElements = document.querySelectorAll(".board-square");
    const btnStart = document.querySelector(".btn-start");
    const levelElement = document.querySelector(".level");
    const turnIndicationElement = document.querySelector(".turn-indication");

    let sequence = [];
    let userSequence = [];
    let level = 1;
    let isUserTurn = false;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const colorNotes = {
        red: 261.63,
        blue: 293.66,
        yellow: 329.63,
        green: 349.23,
    };

    function addToSequence() {
        const colors = ["red", "yellow", "green", "blue"];
        const randomNumber = Math.floor(Math.random() * 4);
        sequence.push(colors[randomNumber]);
    }

    function resetGame() {
        sequence = [];
        userSequence = [];
        level = 1;
        levelElement.textContent = "Level:1";
        turnIndicationElement.classList.add("hidden");
    }

    function playSequence() {
        isUserTurn = false;
        turnIndicationElement.classList.add("hidden");
        for (let i = 0; i < sequence.length; i++) {
            setTimeout(() => {
                lightUpSquare(sequence[i]);
                playNote(colorNotes[sequence[i]]);
            }, i * 1000);
        }

        setTimeout(() => {
            isUserTurn = true;
            turnIndicationElement.classList.remove("hidden");
        }, sequence.length * 1000);
    }

    function lightUpSquare(color) {
        const square = document.querySelector(`[data-color="${color}"]`);
        square.classList.add("lit");
        setTimeout(() => {
            square.classList.remove("lit");
        }, 500);
    }

    function handleUserClick(event) {
        if (isUserTurn) {
            const selectedColor = event.target.dataset.color;
            lightUpSquare(selectedColor);
            userSequence.push(selectedColor);
            playNote(colorNotes[selectedColor]);
            if (checkUserInput()) {
                if (sequence.length === userSequence.length) {
                    level++;
                    levelElement.textContent = `Level:${level}`;
                    userSequence = [];
                    addToSequence();
                    setTimeout(playSequence, 2000);
                }
            } else {
                alert("Game over! Try again");
                resetGame();
            }
        }
    }

    function checkUserInput() {
        for (let i = 0; i < userSequence.length; i++) {
            if (sequence[i] !== userSequence[i]) return false;
        }
        return true;
    }

    function playNote(frequency) {
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    btnStart.addEventListener("click", () => {
        resetGame();
        setTimeout(() => {
            addToSequence();
            playSequence();
        }, 1000);
    });

    squareElements.forEach((square) => {
        square.addEventListener("click", handleUserClick);
    });
})();
