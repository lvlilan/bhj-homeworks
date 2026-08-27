const dead = document.getElementById('dead');
const lost = document.getElementById('lost');

function getHole(index) {
    return document.getElementById(`hole${index}`);
}

function resetGame() {
    dead.textContent = 0;
    lost.textContent = 0;
}

function checkWin() {
    if (parseInt(dead.textContent) >= 10) {
        alert('Вы победили!');
        resetGame();
    }
}

function checkLose() {
    if (parseInt(lost.textContent) >= 5) {
        alert('Вы проиграли!');
        resetGame();
    }
}

for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    
    hole.onclick = function() {
        if (hole.classList.contains('hole_has-mole')) {
            dead.textContent = parseInt(dead.textContent) + 1;
            checkWin();
        } else {
            lost.textContent = parseInt(lost.textContent) + 1;
            checkLose();
        }
    };
}