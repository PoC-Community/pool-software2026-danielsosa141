type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const storage = "todos";
const form = document.getElementById("todoForm") as HTMLFormElement;
const input = document.getElementById("task") as HTMLInputElement;
const list = document.getElementById("todoList") as HTMLUListElement;
const filterDone = document.getElementById("filterDone") as HTMLButtonElement;

let todos: Todo[] = [];
let showOnlyDone = false;

let taskId = 1;

function loadTodos(): void {
  const take = localStorage.getItem(storage);
  if (!take) {
    todos = [];
    taskId = 1;
    return;
  }
  try {
    todos = JSON.parse(take) as Todo[];
    const maxId = todos.reduce((max, t) => (t.id > max ? t.id : max), 0);
    taskId = maxId + 1;
  } catch {
    todos = [];
    taskId = 1;
  }
}
function saveTodos(): void {
  localStorage.setItem(storage, JSON.stringify(todos));
}

function addTodo(text: string): void {
  if (!text.trim()) return;
  todos.unshift({
    id: taskId++,
    text,
    done: false,
  });
  saveTodos();
  render();
}

function render(): void {
  list.innerHTML = "";

  const visible = showOnlyDone ? todos.filter((t) => t.done) : todos;

  for (const todo of visible) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const span = document.createElement("span");
    span.textContent = todo.text;
    if (todo.done) span.style.textDecoration = "line-through";

    const doneBtn = document.createElement("button");
    doneBtn.type = "button";
    doneBtn.textContent = todo.done ? "Undo" : "Done";
    doneBtn.addEventListener("click", () => toggleTodo(todo.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    li.append(checkbox, span, deleteBtn);
    list?.appendChild(li);
  }
}

function toggleTodo(id: number): void {
  const t = todos.find((t) => t.id === id);
  if (!t) return;
  t.done = !t.done;
  saveTodos();
  render();
}

function deleteTodo(id: number): void {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  render;
}

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  addTodo(input.value);
  input.value = "";
});

loadTodos();
render();
