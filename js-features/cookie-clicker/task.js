const cookie = document.getElementById('cookie');
const counter = document.getElementById('clicker__counter');
const speedDisplay = document.getElementById('clicker__speed');
let clickCount = 0;
let lastClickTime = new Date();

cookie.onclick = function() {
    const currentTime = new Date();
    const timeDiff = (currentTime - lastClickTime) / 1000;
    
    clickCount++;
    counter.textContent = clickCount;
    
    if (timeDiff > 0) {
        const speed = (1 / timeDiff).toFixed(2);
        speedDisplay.textContent = speed;
    }
    
    lastClickTime = currentTime;
    
    if (clickCount % 2 === 0) {
        cookie.width = 200;
        cookie.height = 200;
    } else {
        cookie.width = 220;
        cookie.height = 220;
    }
};