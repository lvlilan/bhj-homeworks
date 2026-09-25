document.addEventListener('DOMContentLoaded', () => {
  const signinForm = document.getElementById('signin__form');
  const signinBlock = document.getElementById('signin');
  const welcomeBlock = document.getElementById('welcome');
  const userIdSpan = document.getElementById('user_id');

  function showWelcome(userId) {
    signinBlock.classList.remove('signin_active');
    welcomeBlock.classList.add('welcome_active');
    userIdSpan.textContent = userId;
  }

  function showSignin() {
    welcomeBlock.classList.remove('welcome_active');
    signinBlock.classList.add('signin_active');
    signinForm.reset();

    const errorEl = signinBlock.querySelector('.error-message');
    if (errorEl) {
      errorEl.remove();
    }
  }

  function showError(message) {
    const existingError = signinBlock.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    const form = document.getElementById('signin__form');
    signinBlock.insertBefore(errorDiv, form);
  }

  function saveUserId(userId) {
    localStorage.setItem('user_id', userId);
  }

  function getUserId() {
    return localStorage.getItem('user_id');
  }

  function removeUserId() {
    localStorage.removeItem('user_id');
  }

  const savedUserId = getUserId();
  if (savedUserId) {
    showWelcome(savedUserId);
  } else {
    showSignin();
  }

  signinForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(signinForm);

    fetch('https://students.netoservices.ru/nestjs-backend/auth', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      return response.json();
    })
    .then(data => {
      signinForm.reset();

      if (data.success) {
        const userId = data.user_id;
        saveUserId(userId);
        showWelcome(userId);
      } else {
        showError('Неверный логин/пароль');
      }
    })
    .catch(error => {
      console.error('Ошибка при авторизации:', error);
      showError('Произошла ошибка при отправке запроса. Попробуйте позже.');
    });
  });

  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'btn btn-logout';
  logoutBtn.textContent = 'Выйти';
  logoutBtn.addEventListener('click', () => {
    removeUserId();
    showSignin();
  });

  welcomeBlock.appendChild(logoutBtn);
});