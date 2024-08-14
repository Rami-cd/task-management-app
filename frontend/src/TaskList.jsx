import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    useEffect(() => {
        axios.get('/api/tasks/')
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleAddTask = () => {
        axios.post('/api/tasks/', newTask)
            .then(response => setTasks([...tasks, response.data]))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <input
                type="text"
                placeholder="Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <button onClick={handleAddTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
