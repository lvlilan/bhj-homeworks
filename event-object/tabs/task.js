document.addEventListener('DOMContentLoaded', function() {
  const tabNavigations = document.querySelectorAll('.tab__navigation');

  tabNavigations.forEach(navigation => {
    const tabs = navigation.querySelectorAll('.tab');
    const contentsContainer = navigation.nextElementSibling;
    
    if (!contentsContainer || !contentsContainer.classList.contains('tab__contents')) {
      return;
    }

    const contents = contentsContainer.querySelectorAll('.tab__content');

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('tab_active'));
        this.classList.add('tab_active');

        contents.forEach(c => c.classList.remove('tab__content_active'));

        if (contents[index]) {
          contents[index].classList.add('tab__content_active');
        }
      });
    });
  });
});