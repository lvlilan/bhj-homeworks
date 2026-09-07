document.addEventListener('DOMContentLoaded', function() {
    const rotators = document.querySelectorAll('.rotator');
    
    rotators.forEach(rotator => {
        const cases = rotator.querySelectorAll('.rotator__case');
        let currentIndex = 0;
        let currentSpeed = parseInt(cases[0].dataset.speed) || 1000;
        
        cases.forEach((caseElement, index) => {
            if (caseElement.classList.contains('rotator__case_active')) {
                currentIndex = index;
                if (caseElement.dataset.color) {
                    caseElement.style.color = caseElement.dataset.color;
                }
            }
        });
        
        function rotate() {
            const currentCase = cases[currentIndex];
            currentCase.classList.remove('rotator__case_active');
            
            currentIndex = (currentIndex + 1) % cases.length;
            
            const nextCase = cases[currentIndex];
            nextCase.classList.add('rotator__case_active');
            
            if (nextCase.dataset.color) {
                nextCase.style.color = nextCase.dataset.color;
            }
            
            const speed = parseInt(nextCase.dataset.speed) || 1000;
            clearInterval(intervalId);
            intervalId = setInterval(rotate, speed);
        }
        
        let intervalId = setInterval(rotate, currentSpeed);
    });
});