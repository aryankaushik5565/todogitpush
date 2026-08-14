const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function createTaskElement(text, completed) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;
  if (completed) {
    span.classList.add('completed');
  }

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.classList.add('delete-btn');

  span.addEventListener('click', function() {
    span.classList.toggle('completed');
    saveTasks();
  });

  deleteBtn.addEventListener('click', function() {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = createTaskElement(taskText, false);
  taskList.appendChild(li);

  taskInput.value = '';
  saveTasks();
}

function saveTasks() {
  const tasks = [];

  Array.from(taskList.children).forEach(function(li) {
    const span = li.querySelector('span');
    tasks.push({
      text: span.textContent,
      completed: span.classList.contains('completed')
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];

  saved.forEach(function(task) {
    const li = createTaskElement(task.text, task.completed);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

loadTasks();