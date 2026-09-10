const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);

let activeElement = null;

document.querySelectorAll('.has-tooltip').forEach(element => {
  element.addEventListener('click', event => {
    event.preventDefault();

    if (activeElement === element) {
      tooltip.classList.remove('tooltip_active');
      activeElement = null;
      return;
    }

    activeElement = element;
    tooltip.textContent = element.getAttribute('title');
    tooltip.classList.add('tooltip_active');

    const rect = element.getBoundingClientRect();
    const position = element.dataset.position || 'bottom';

    tooltip.style.left = '0px';
    tooltip.style.top = '0px';

    const tooltipRect = tooltip.getBoundingClientRect();

    let left = 0;
    let top = 0;

    switch (position) {
      case 'top':
        left = rect.left;
        top = rect.top - tooltipRect.height;
        break;
      case 'left':
        left = rect.left - tooltipRect.width;
        top = rect.top;
        break;
      case 'right':
        left = rect.right;
        top = rect.top;
        break;
      case 'bottom':
      default:
        left = rect.left;
        top = rect.bottom;
        break;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  });
});