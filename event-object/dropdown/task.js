document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const valueElement = dropdown.querySelector('.dropdown__value');
    const listElement = dropdown.querySelector('.dropdown__list');
    const items = dropdown.querySelectorAll('.dropdown__item');

    valueElement.addEventListener('click', function(event) {
      event.stopPropagation();
      listElement.classList.toggle('dropdown__list_active');
    });

    items.forEach(item => {
      const link = item.querySelector('.dropdown__link');

      link.addEventListener('click', function(event) {
        event.preventDefault();
        valueElement.textContent = this.textContent.trim();
        listElement.classList.remove('dropdown__list_active');
      });
    });
  });

  document.addEventListener('click', function() {
    dropdowns.forEach(dropdown => {
      const list = dropdown.querySelector('.dropdown__list');
      list.classList.remove('dropdown__list_active');
    });
  });
});