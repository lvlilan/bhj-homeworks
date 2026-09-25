document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  const clearBtn = document.getElementById('clear__btn');

  const savedText = localStorage.getItem('editor_text');
  if (savedText !== null) {
    editor.value = savedText;
  }

  editor.addEventListener('input', () => {
    localStorage.setItem('editor_text', editor.value);
  });

  clearBtn.addEventListener('click', () => {
    editor.value = '';
    localStorage.removeItem('editor_text');
  });
});