document.addEventListener('DOMContentLoaded', function() {
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight && rect.bottom >= 0;
    }

    function checkVisibility() {
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('reveal_active');
            }
        });
    }

    function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = new Date().getTime();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    }

    checkVisibility();
    window.addEventListener('scroll', throttle(checkVisibility, 100));
    window.addEventListener('resize', throttle(checkVisibility, 200));
});