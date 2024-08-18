//Timer
const timerInput = document.querySelector(".timer-screen input");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let timerInterval;
let alarmInterval;

function formatTime(input) {
    let sanitizedInput = input.value.replace(/[^0-9]/g, '');

    if (sanitizedInput.length >= 2) {
        const minutes = sanitizedInput.slice(0, 2);
        const seconds = sanitizedInput.slice(2, 4);
        input.value = `${minutes}:${seconds}`;
    } else {
        input.value = sanitizedInput
    }
}

function handleStart() {
    const [mm, ss] = timerInput.value.split(":");
    let totalSeconds = +ss + (+mm * 60);
    let alarmCount = 10;
    if (!totalSeconds) return;

    timerInterval = setInterval(() => {
        totalSeconds--;
        const mm = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
        const ss = (totalSeconds % 60).toString().padStart(2, "0");
        timerInput.value = `${mm}:${ss}`;
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alarmInterval = setInterval(() => {
                playNote(261.63, 0.5);
                playNote(329.63, 0.5);
                playNote(392.00, 0.5);
                alarmCount--
                if (alarmCount === 0) clearInterval(alarmInterval)
            }, 300)

        }
    }, 1000)
}

function handleStop() {
    clearInterval(timerInterval);
}

function playNote(frequency, duration) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}