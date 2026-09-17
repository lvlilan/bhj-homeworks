const itemsContainer = document.getElementById('items');
const loader = document.getElementById('loader');

function renderValutes(valutes) {
    itemsContainer.innerHTML = '';

    for (const key in valutes) {
        const valute = valutes[key];

        const item = document.createElement('div');
        item.className = 'item';

        const code = document.createElement('div');
        code.className = 'item__code';
        code.textContent = valute.CharCode;

        const value = document.createElement('div');
        value.className = 'item__value';
        value.textContent = valute.Value;

        const currency = document.createElement('div');
        currency.className = 'item__currency';
        currency.textContent = 'руб.';

        item.appendChild(code);
        item.appendChild(value);
        item.appendChild(currency);

        itemsContainer.appendChild(item);
    }
}

const cached = localStorage.getItem('valutes');

if (cached) {
    renderValutes(JSON.parse(cached));
    loader.classList.remove('loader_active');
}

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');

xhr.onload = function () {
    const data = JSON.parse(xhr.responseText);
    const valutes = data.response.Valute;

    renderValutes(valutes);

    localStorage.setItem('valutes', JSON.stringify(valutes));

    loader.classList.remove('loader_active');
};

xhr.send();