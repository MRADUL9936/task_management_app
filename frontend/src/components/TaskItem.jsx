import React from 'react';

function TaskItem({ task, onDelete, onUpdate }) {
  const containerStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  };

  const headingStyle = {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
  };

  const textStyle = {
    color: '#555',
    margin: '5px 0',
  };

  const dueDateStyle = {
    fontStyle: 'italic',
    color: '#888',
  };

  const buttonStyle = {
    padding: '10px 15px',
    fontSize: '0.9rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginRight: '10px',
  };

  const updateButtonStyle = { ...buttonStyle, backgroundColor: '#007bff', color: 'white' };
  const deleteButtonStyle = { ...buttonStyle, backgroundColor: '#dc3545', color: 'white' };

  return (
    <div style={containerStyle}>
      <h3 style={headingStyle}>{task[1]}</h3>
      <p style={textStyle}>{task[2]}</p>
      <p style={dueDateStyle}><strong>Due Date:</strong> {new Date(task[3]).toLocaleDateString()}</p>
      <p style={textStyle}><strong>Assigned User:</strong> {task[4]}</p>
      <p style={textStyle}><strong>Status:</strong> {task[5]}</p>

      <button
        onClick={() => onUpdate(task)}
        style={updateButtonStyle}
      >
        Update
      </button>
      <button
        onClick={() => onDelete(task[0])}
        style={deleteButtonStyle}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
