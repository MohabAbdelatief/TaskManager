import React, { useState } from 'react';
import '../styles/TaskItem.css';
import { Task } from '../types';

interface TaskItemProps {
    task: Task;
    onToggleCompletion: (id: string) => void;
    onDeleteTask: (id: string) => void;
    onEditTask: (id: string, title: string, description: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleCompletion, onDeleteTask, onEditTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || '');

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editTitle.trim()) {
            onEditTask(task.id, editTitle, editDescription);
            setIsEditing(false);
        }
    };

    return (
        <div className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
            {!isEditing ? (
                <>
                    <div className="task-details">
                        <h3>{task.title}</h3>
                        {task.description && <p>{task.description}</p>}
                    </div>
                    <div className="task-actions">
                        <button className="toggle-button" onClick={() => onToggleCompletion(task.id)}>
                            {task.isCompleted ? 'Undo' : 'Complete'}
                        </button>
                        <button className="edit-button" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                        <button className="delete-button" onClick={() => onDeleteTask(task.id)}>Delete</button>
                    </div>
                </>
            ) : (
                <form className="edit-form" onSubmit={handleEditSubmit}>
                    <div className="edit-form-fields">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Task title"
                        />
                        <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Task description (optional)"
                        />
                    </div>
                    <div className="edit-form-actions">
                        <button type="submit" className="save-button">Save</button>
                        <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default TaskItem;