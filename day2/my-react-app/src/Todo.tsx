import { Fragment } from "react/jsx-runtime";

function Todo() {
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">My todo list</legend>
      <div className="join">
        <input
          type="text"
          className="input join-item"
          placeholder="Write your tasks here"
        />
        <button className="btn btn-success join-item">add</button>
      </div>
    </fieldset>
  );
}

export default Todo;
