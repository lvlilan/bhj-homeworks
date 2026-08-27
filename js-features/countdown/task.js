const timerElement = document.getElementById('timer');
let totalSeconds = parseInt(timerElement.textContent);

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

timerElement.textContent = formatTime(totalSeconds);

function downloadFile() {
    const link = document.createElement('a');
    link.href = 'https://example.com/prize.zip';
    link.download = 'prize.zip';
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function updateTimer() {
    totalSeconds--;
    timerElement.textContent = formatTime(totalSeconds);
    if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        alert('Вы победили в конкурсе!');
        downloadFile();
    }
}

const timerInterval = setInterval(updateTimer, 1000);