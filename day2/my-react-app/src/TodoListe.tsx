import React, { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function addTask() {
    const trimmed = newTask.trim();
    if (!trimmed) return;

    setTasks((prev) => [...prev, trimmed]);
    setNewTask("");
  }

  function deleteTask(index: number) {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  }

  function moveTaskUp(index: number) {
    if (index === 0) return;
    setTasks((prev) => {
      const copy = [...prev];
      [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
      return copy;
    });
  }

  function moveTaskDown(index: number) {
    setTasks((prev) => {
      if (index >= prev.length - 1) return prev;
      const copy = [...prev];
      [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
      return copy;
    });
  }

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">My todo list</legend>

      <div className="join w-full">
        <input
          type="text"
          className="input input-bordered join-item w-full"
          placeholder="Write your tasks here"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="btn btn-success join-item" onClick={addTask}>
          add
        </button>
      </div>

      <ol className="mt-4 space-y-2">
        {tasks.map((task, index) => (
          <li key={`${task}-${index}`} className="flex items-center gap-2">
            <span className="flex-1">{task}</span>

            <button
              className="btn btn-ghost btn-sm"
              onClick={() => moveTaskUp(index)}
              disabled={index === 0}
              title="Move up"
            >
              ▲
            </button>

            <button
              className="btn btn-ghost btn-sm"
              onClick={() => moveTaskDown(index)}
              disabled={index === tasks.length - 1}
              title="Move down"
            >
              ▼
            </button>

            <button
              className="btn btn-error btn-sm"
              onClick={() => deleteTask(index)}
            >
              delete
            </button>
          </li>
        ))}
      </ol>
    </fieldset>
  );
}
export default TodoList;
