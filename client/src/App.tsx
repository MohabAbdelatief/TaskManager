import React, { useState, useEffect } from 'react';
import './App.css';
import { Task } from './types';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/tasks')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return res.json();
      })
      .then(data => {
        const mappedTasks: Task[] = data.map((t: any) => ({
          id: t._id,
          title: t.title,
          description: t.description,
          isCompleted: t.isCompleted
        }));
        setTasks(mappedTasks);
      })
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  const addTask = async (title: string, description: string) => {
    try {
      const res = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      if (!res.ok) {
        throw new Error('Error adding task');
      }
      const newTaskData = await res.json();
      const newTask: Task = {
        id: newTaskData._id,
        title: newTaskData.title,
        description: newTaskData.description,
        isCompleted: newTaskData.isCompleted
      };
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    try {
      const res = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !task.isCompleted })
      });
      if (!res.ok) {
        throw new Error('Error toggling task completion');
      }
      const updatedData = await res.json();
      const updatedTask: Task = {
        id: updatedData._id,
        title: updatedData.title,
        description: updatedData.description,
        isCompleted: updatedData.isCompleted
      };
      setTasks(prev => prev.map(t => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Error deleting task');
      }
      // If successful, remove from local state
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async (id: string, newTitle: string, newDescription: string) => {
    try {
      const res = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDescription })
      });
      if (!res.ok) {
        throw new Error('Error editing task');
      }
      const updatedData = await res.json();
      const updatedTask: Task = {
        id: updatedData._id,
        title: updatedData.title,
        description: updatedData.description,
        isCompleted: updatedData.isCompleted
      };
      setTasks(prev => prev.map(t => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggleCompletion={toggleTaskCompletion}
        onDeleteTask={deleteTask}
        onEditTask={editTask}
      />
    </div>
  );
};

export default App;