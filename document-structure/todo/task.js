const form = document.getElementById('tasks__form');
const input = document.getElementById('task__input');
const list = document.getElementById('tasks__list');

const STORAGE_KEY = 'tasks';

let tasks = loadTasks();

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTaskElement(text) {
  const task = document.createElement('div');
  task.className = 'task';

  const title = document.createElement('div');
  title.className = 'task__title';
  title.textContent = text;

  const remove = document.createElement('a');
  remove.href = '#';
  remove.className = 'task__remove';
  remove.innerHTML = '&times;';

  remove.addEventListener('click', event => {
    event.preventDefault();
    task.remove();

    tasks = tasks.filter(t => t !== text);
    saveTasks();
  });

  task.append(title, remove);
  return task;
}

tasks.forEach(text => {
  list.appendChild(createTaskElement(text));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  tasks.push(text);
  saveTasks();

  list.appendChild(createTaskElement(text));
  input.value = '';
});