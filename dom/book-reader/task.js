document.addEventListener('DOMContentLoaded', function() {
    const book = document.getElementById('book');
    
    const fontControls = document.querySelectorAll('.book__control_font-size .font-size');
    const colorControls = document.querySelectorAll('.book__control_color .color');
    const bgControls = document.querySelectorAll('.book__control_background .color');

    function removeFontClasses() {
        book.classList.remove('book_fs-big', 'book_fs-small');
    }

    function removeColorClasses() {
        book.classList.remove('book_color-gray', 'book_color-whitesmoke', 'book_color-black');
    }

    function removeBgClasses() {
        book.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white');
    }

    fontControls.forEach(control => {
        control.addEventListener('click', function(e) {
            e.preventDefault();
            
            fontControls.forEach(c => c.classList.remove('font-size_active'));
            this.classList.add('font-size_active');
            
            removeFontClasses();
            
            const size = this.dataset.size;
            if (size === 'small') {
                book.classList.add('book_fs-small');
            } else if (size === 'big') {
                book.classList.add('book_fs-big');
            }
        });
    });

    if (colorControls.length) {
        colorControls.forEach(control => {
            control.addEventListener('click', function(e) {
                e.preventDefault();
                
                colorControls.forEach(c => c.classList.remove('color_active'));
                this.classList.add('color_active');
                
                removeColorClasses();
                
                const color = this.dataset.textColor;
                if (color) {
                    book.classList.add(`book_color-${color}`);
                }
            });
        });
    }

    if (bgControls.length) {
        bgControls.forEach(control => {
            control.addEventListener('click', function(e) {
                e.preventDefault();
                
                bgControls.forEach(c => c.classList.remove('color_active'));
                this.classList.add('color_active');
                
                removeBgClasses();
                
                const bg = this.dataset.bgColor;
                if (bg) {
                    book.classList.add(`book_bg-${bg}`);
                }
            });
        });
    }
});