import React, { useState, useEffect } from 'react';
import './Todo_List.css';

function Todo_List() {
  const [inp, setInp] = useState('');
  const [tasks, setTasks] = useState([]);
  const [donetask, setDoneTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // State to track the index being edited
  const [editInp, setEditInp] = useState(''); // State to hold the edited task text

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedDoneTasks = JSON.parse(localStorage.getItem('donetask')) || [];
    setTasks(storedTasks);
    setDoneTask(storedDoneTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('donetask', JSON.stringify(donetask));
  }, [tasks, donetask]);

  function addTasks() {
    if (inp.trim() !== '') {
      setTasks([...tasks, inp]);
      setInp('');
    }
  }

  const task_done = (index) => {
    if (donetask.includes(index)) {
      setDoneTask(donetask.filter((i) => i !== index));
    } else {
      setDoneTask((prev) => [...prev, index]);
    }
  };

  function delete_task(index) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);

    const newDoneTasks = donetask
      .filter((i) => i !== index)
      .map((i) => (i > index ? i - 1 : i));
    setDoneTask(newDoneTasks);
  }

  function Edit(index) {
    setEditIndex(index); // Set the index of the task being edited
    setEditInp(tasks[index]); // Set the input to the current task value
  }

  function saveEdit(index) {
    const updatedTasks = tasks.map((task, i) => (i === index ? editInp : task));
    setTasks(updatedTasks);
    setEditIndex(null); // Reset the edit index
    setEditInp(''); // Reset the input field
  }

  return (
    <div>
      <div className="container">
        <h1>Todo Application</h1>
        <input
          type="text"
          value={inp}
          placeholder="Enter Task..."
          onChange={(e) => setInp(e.target.value)}
        />
        <button onClick={addTasks}>Add</button>

        <ol>
          {tasks.map((task, index) => (
            <li
              key={index}
              style={{
                backgroundColor: donetask.includes(index) ? 'green' : 'white',
              }}
            >
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editInp}
                    onChange={(e) => setEditInp(e.target.value)}
                  />
                  <button onClick={() => saveEdit(index)}>Save</button>
                  <button onClick={() => setEditIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {task}
                  <button className="edit" onClick={() => Edit(index)}>
                    Edit
                  </button>
                  <button
                    className="dbtn1"
                    onClick={() => task_done(index)}
                  >
                    {donetask.includes(index) ? 'Undone' : 'Done'}
                  </button>
                  <button className="dbtn2" onClick={() => delete_task(index)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Todo_List;
