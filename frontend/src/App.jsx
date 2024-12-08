
import './App.css'
import { useState,useEffect } from 'react'
import { TaskProvider } from './taskContext'
import { Outlet } from 'react-router-dom'
import { useNavigate,useLocation } from 'react-router-dom'


function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToUpdate,setUpdate]=useState(null)
  const location = useLocation();
  const navigate=useNavigate()

  const isAddTaskRoute = location.pathname === "/addtask";

  
   
   
  useEffect(() => {

 fetch("http://127.0.0.1:5000/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data); // Assuming the API returns an array of tasks
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  
  }, []);

   const onUpdate=(taskUpdate)=>{
    setUpdate(taskUpdate)
    navigate("/addtask")
   }
   const addtask=(task)=>{

    if(taskToUpdate){
      //update the task;
      updatetask(taskToUpdate[0],task)
      setUpdate(null)
      return;
    }

    //save the new task
    try {
      const response = fetch("http://127.0.0.1:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
   
  
        setTasks((prevTasks) => [...prevTasks, [
          task.id,
          task.task_name,
          task.description,
          task.due_date,
          task.assigned_user,
          task.status,
        ]]);
        navigate("/")
      
    } catch (error) {
      console.error("Error adding task:", error);
    }
   }

   //update the task
   const updatetask = async (id, task) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
     
     setTasks((prevTasks) => {
        // Create a new tasks array where the task with the matching id is updated
        const newTasks = prevTasks.map((t) => 
          t[0] === id // Check if the id matches
            ? [
                t[0], // Keep the id the same
                t[1]= task.task_name, // Update the task name
                t[2]= task.description, // Update the description
                t[3]= task.due_date, // Update the due date
                t[4]= task.assigned_user, // Update the assigned user
                t[5]= task.status
              ]
            : t // Keep other tasks unchanged
        );
      
        // Return the updated tasks array
        return newTasks;
      });

     console.log("updated task",tasks)
    } catch (error) {
      console.error("Error updating task:", error);
    }
  
  };
  

   //delete the task
   const deletetask=(id)=>{
    fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter((task) => task[0] !== id));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
   }
   const handleClick = () => {
    navigate(isAddTaskRoute ? "/" : "/addtask");
  };

  return (
    <TaskProvider value={{tasks,addtask,updatetask,deletetask,onUpdate,taskToUpdate}}>
        <div className="navbarStyle">
        <h2 className="headingStyle">Task Management Application</h2>
        <button className="buttonStyle" onClick={handleClick}>
          {isAddTaskRoute ? "All Tasks" : "Add New Task"}
        </button>
      </div>
       <Outlet/>
    </TaskProvider>
  )
}

export default App
