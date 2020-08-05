import React, { useState } from 'react';
import { nanoid } from "nanoid";
import './App.scss';

import Todo from "./components/Todo";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";

const Tasks = [
  { id: 1, key: 1, name: "Do work", completed: false, isEdited: false} ,
  { id: 2, key: 2, name: "Watch Youtube", completed: false, isEdited: false },
  { id: 3, key: 3, name: "Eat lunch", completed: false, isEdited: false },
]

function App(props) {

  const [tasks, setTasks] = useState(Tasks);

  function editTask(id, name, isEdited) {
    const editedTasks = tasks.map(task => {
      if(id === task.id) {
        return{...task, name: name, isEdited: isEdited}
      }
      return(task);
    });
    setTasks(editedTasks);
  }

  function setEditing(id, value) {
    const tasksBeingEdited = tasks.map(task => {
      if(id === task.id) {
        return{...task, isEdited: value}
      }
      return{...task, isEdited: false}
    });
    setTasks(tasksBeingEdited);
  }

  function removeTask(id) {
    const tasksLeft = tasks.filter(task => task.id !== id);
    setTasks(tasksLeft);
  }

  function addTask(name) {
    const id = "todo-" + nanoid();
    setTasks([...tasks, {
      id: id,
      key: id,
      name: name,
      completed: false
    }]);
  }

  const taskList = tasks.map(task =>
    <Todo
      key={task.key}
      task={task}
      editTask={editTask}
      removeTask={removeTask}
      setEditing={setEditing}
    />
  );

  return (
    <div className="Container">
      <div className="App">
        <div className="Header">
          <AddTask addTask={addTask} />
        </div>
        <div className="Body">
          {taskList}
        </div>
        <div className="Footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
