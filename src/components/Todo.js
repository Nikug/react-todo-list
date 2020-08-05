import React, { useState, useRef, useEffect } from "react";

function Todo(props) {

  const [name, setName] = useState("");
  //const [isEditing, setEditing] = useState(props.task.isEdited);
  const [isComplete, setComplete] = useState(false);

  const inputRef = useRef();
  const mouseTargetRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if(name.trim().length > 0) {
      props.editTask(props.task.id, name, false);
    }
    setName("");
  }

  function handleCancel(e) {
    setName("");
    props.setEditing(props.task.id, false);
  }

  function handleSetComplete(e) {
    setComplete(e.target.checked);
  }

  function handleRemove(e) {
    props.removeTask(props.task.id);
  }

  function handleEdit(e) {
    props.setEditing(props.task.id, true);
  }

  function handleClick(e) {
    if(!mouseTargetRef.current) return;
    if(mouseTargetRef.current.contains(e.target)) {
      return;
    }

    handleCancel(e);
  }

  const taskView = (
    <div
      className={`todo ${isComplete ? "completed" : ""}`}
    >
      <input
        className="checkbox"
        type="checkbox"
        onChange={handleSetComplete}
      />
      <span
        className="todo-text"
        onClick={handleEdit}
        tabIndex="0"
      >
        {props.task.name}
      </span>
      <span>
        <button
          type="button"
          className="btn-x float-right"
          onClick={handleRemove}
        >
          X
        </button>
      </span>
    </div>
  );

  const taskEdit = (
    <div className="todo" ref={mouseTargetRef}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-text"
          ref={inputRef}
          placeholder={props.task.name}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <span>
          <button
            className="btn-primary"
            type="submit"
            >
            Save
          </button>
        </span>
        <span>
          <button
            className="btn-secondary"
            type="button"
            onClick={handleCancel}
            >
            Cancel
          </button>
        </span>
      </form>
    </div>
  );

    useEffect(() => {
      if(inputRef.current) {
        inputRef.current.focus();
      }

      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      }
    });

  return(
    <div className="well">
      <li>
        {props.task.isEdited ? taskEdit : taskView}
      </li>
    </div>
  );
}

export default Todo;