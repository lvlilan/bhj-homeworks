document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('subscribe-modal');
  const closeBtn = modal.querySelector('.modal__close');

  function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  function setCookie(name, value, options = {}) {
    options = {
      path: '/',
      ...options
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += '; ' + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  if (!getCookie('modal_closed')) {
    modal.classList.add('modal_active');
  }

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('modal_active');
    setCookie('modal_closed', 'true', { 'max-age': 3600 * 24 * 365 });
  });
});