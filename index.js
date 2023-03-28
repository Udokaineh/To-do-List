// Get the todo form and input field
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');

// Get the todo list element
const todoList = document.getElementById('todo-list');

// Load any existing todo items from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Add event listener to the todo form
todoForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission
  const newTodo = todoInput.value.trim(); // Get the input value and trim whitespace
  if (newTodo !== '') {
    todos.unshift(newTodo); // Add the new todo to the beginning of the list
    localStorage.setItem('todos', JSON.stringify(todos)); // Save the updated todo list to local storage
    renderTodos(); // Update the todo list on the page
    todoInput.value = ''; // Reset the input field
  }
});

// Add event listener to the todo list
todoList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const index = event.target.parentElement.dataset.index; // Get the index of the todo item to remove
    todos.splice(index, 1); // Remove the todo item from the list
    localStorage.setItem('todos', JSON.stringify(todos)); // Save the updated todo list to local storage
    renderTodos(); // Update the todo list on the page
  }
});

// Render the todo list
function renderTodos() {
  todoList.innerHTML = ''; // Clear the existing todo list
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const li = document.createElement('li');
    li.innerText = todo;
    const button = document.createElement('button');
    button.innerText = 'Remove';
    li.appendChild(button);
    li.dataset.index = i; // Store the index of the todo item as a data attribute
    todoList.appendChild(li);
  }
}

renderTodos(); // Initial render of the todo list on page load
