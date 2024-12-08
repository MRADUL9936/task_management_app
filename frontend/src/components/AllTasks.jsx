import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { usetask } from '../taskContext';

function AllTasks() {
  const { tasks, deletetask, onUpdate } = usetask();

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleDelete = (taskId) => {
    deletetask(taskId);
  };

  const handleUpdate = (taskToUpdate) => {
    onUpdate(taskToUpdate);
  };
  const handleSearch = () => {
    setFilteredTasks(
      tasks.filter((task) =>
        task[1].toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };
useEffect(
 () => {
  if(statusFilter){
    setFilteredTasks(
      statusFilter
        ? tasks.filter((task) => task[5] === statusFilter)
        : tasks
    );
  }
  },[statusFilter])

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const containerStyle = {
    width: '80%',
    maxWidth: '1200px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '0 auto',
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#333',
    marginBottom: '30px',
  };

  const noTasksStyle = {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#888',
  };

  const filterContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '10px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    flex: '1',
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const dropdownStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    flex: '1',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>All Tasks</h1>
      <div style={filterContainerStyle}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Search tasks"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button style={buttonStyle} onClick={handleSearch}>
          Search
        </button>
        <select
          style={dropdownStyle}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="to-do">To-Do</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
        {/* <button style={buttonStyle} onClick={handleFilter}>
          Filter
        </button> */}
      </div>
      {(filteredTasks.length>0 || statusFilter ) ? (
        filteredTasks.length>0?
  (filteredTasks.map((task) => (
    <TaskItem
      key={task[0]}
      task={task}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
          )) ):(
     <h3>No taks Available</h3>
          )
) :(tasks &&  tasks.length > 0) ? (
  tasks.map((task) => (
    <TaskItem
      key={task[0]}
      task={task}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  ))
) : (
  <p style={noTasksStyle}>No tasks available.</p>
)}
    </div>
  );
}

export default AllTasks;
