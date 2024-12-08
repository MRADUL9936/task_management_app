import React, { useState,useEffect } from "react";
import { usetask } from "../taskContext";
import { useNavigate } from "react-router-dom";
function TaskForm() {
  const [formData, setFormData] = useState({
    task_name: "",
    description: "",
    due_date: "",
    assigned_user: "",
    status: "to-do",
  });
const navigate=useNavigate()

  const {taskToUpdate}=usetask()
  const {addtask}=usetask()
  useEffect(()=>{
    if(taskToUpdate){
    setFormData({
        task_name: taskToUpdate[1],
        description: taskToUpdate[2],
        due_date: new Date(taskToUpdate[3]).toISOString().slice(0, 10), // Convert to YYYY-MM-DD format
        assigned_user: taskToUpdate[4],
        status: taskToUpdate[5],
      });}
   

  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    addtask(formData)
    // Add your API call or logic here to save the task
    navigate("/")
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add/Edit Task</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Task Name */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="task_name">Task Name</label>
          <input
            type="text"
            id="task_name"
            name="task_name"
            value={formData.task_name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Description */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
          />
        </div>

        {/* Due Date */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="due_date">Due Date</label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Assigned User */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="assigned_user">Assigned User</label>
          <input
            type="text"
            id="assigned_user"
            name="assigned_user"
            value={formData.assigned_user}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Status */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="to-do">To-Do</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Save Button */}
        <button type="submit" style={styles.button}>
          Save
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  select: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default TaskForm;
