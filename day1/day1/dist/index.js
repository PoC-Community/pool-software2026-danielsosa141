"use strict";
const storage = "todos";
const form = document.getElementById("todoForm");
const input = document.getElementById("task");
const list = document.getElementById("todoList");
const filterDone = document.getElementById("filterDone");
let todos = [];
let showOnlyDone = false;
let taskId = 1;
function loadTodos() {
    const take = localStorage.getItem(storage);
    if (!take) {
        todos = [];
        taskId = 1;
        return;
    }
    try {
        todos = JSON.parse(take);
        const maxId = todos.reduce((max, t) => (t.id > max ? t.id : max), 0);
        taskId = maxId + 1;
    }
    catch (_a) {
        todos = [];
        taskId = 1;
    }
}
function saveTodos() {
    localStorage.setItem(storage, JSON.stringify(todos));
}
function addTodo(text) {
    if (!text.trim())
        return;
    todos.unshift({
        id: taskId++,
        text,
        done: false,
    });
    saveTodos();
    render();
}
function render() {
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
        if (todo.done)
            span.style.textDecoration = "line-through";
        const doneBtn = document.createElement("button");
        doneBtn.type = "button";
        doneBtn.textContent = todo.done ? "Undo" : "Done";
        doneBtn.addEventListener("click", () => toggleTodo(todo.id));
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTodo(todo.id));
        li.append(checkbox, span, deleteBtn);
        list === null || list === void 0 ? void 0 : list.appendChild(li);
    }
}
function toggleTodo(id) {
    const t = todos.find((t) => t.id === id);
    if (!t)
        return;
    t.done = !t.done;
    saveTodos();
    render();
}
function deleteTodo(id) {
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    render;
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo(input.value);
    input.value = "";
});
loadTodos();
render();
//# sourceMappingURL=index.js.map