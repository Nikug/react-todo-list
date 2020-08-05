import React, { useState } from "react";

function AddTask(props) {

  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(name.trim().length > 0) {
      props.addTask(name);
    }
    setName("");
  }

  return(
    <div>
      <form onSubmit={handleSubmit}> 
        <input
          type="text"
          onChange={handleChange}
          placeholder="Add task..."
          value={name}
        />

        <button
          type="submit"
          className="btn-primary"
        >
          Add
        </button>
        
      </form>
    </div>
  );
}

export default AddTask;