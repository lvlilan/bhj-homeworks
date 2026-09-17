const form = document.getElementById('form');
const progress = document.getElementById('progress');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');

    xhr.upload.addEventListener('progress', function (e) {
        if (e.lengthComputable) {
            progress.value = e.loaded / e.total;
        }
    });

    xhr.onload = function () {
        progress.value = 1;
    };

    xhr.send(formData);
});