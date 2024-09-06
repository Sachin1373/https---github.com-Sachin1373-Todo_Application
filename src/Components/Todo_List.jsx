import React, { useState,useEffect } from 'react'
import './Todo_List.css'

function Todo_List() {
    const [inp,setInp]=useState('')
    const [tasks,setTasks]=useState([])
    const [donetask, setDoneTask] = useState([]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const storedDoneTasks = JSON.parse(localStorage.getItem('donetask')) || [];
        console.log('Loaded tasks from storage:', storedTasks);
        console.log('Loaded doneTasks from storage:', storedDoneTasks);
        setTasks(storedTasks);
        setDoneTask(storedDoneTasks);
    }, []);

    useEffect(() => {
        console.log('Saving tasks to storage:', tasks);
    console.log('Saving doneTasks to storage:', donetask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('donetask', JSON.stringify(donetask));
    }, [tasks, donetask]);

    function addTasks (){
        if(inp.trim()!==''){
            setTasks([...tasks,inp])
            setInp('')
        }
    }
    const task_done = (index) => {
        if (!donetask.includes(index)) {
          setDoneTask((prev) => [...prev, index]);
        }
      };
    
      
      function delete_task(index) {
        
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);

        
        
    }
    
    
  return (
    <div>
        <div className="container">
            <h1>Todo Application</h1>
            <input type="text" value={inp} placeholder='Enter Task...' onChange={(e)=> setInp(e.target.value)} />
            <button onClick={addTasks}>Add</button>

            <ol>
                {tasks.map((task, index) => (
                <li
                    key={index}
                    style={{
                    backgroundColor: donetask.includes(index) ? 'green' : 'white',
                    }}
                >
                    {task}
                    <button className="dbtn1" onClick={() => task_done(index)}>Done</button>
                    <button className="dbtn2" onClick={() => delete_task(index)}>Delete</button>
                </li>
                ))}
            </ol>
        </div>

    
    </div>
  )
}

export default Todo_List