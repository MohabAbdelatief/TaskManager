import React from 'react';
import '../styles/TaskList.css';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
    tasks: Task[];
    onToggleCompletion: (id: string) => void;
    onDeleteTask: (id: string) => void;
    onEditTask: (id: string, title: string, description: string) => void; // New prop
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleCompletion, onDeleteTask, onEditTask }) => {
    return (
        <div className="task-list">
            {tasks.length === 0 ? (
                <p className="no-tasks">No tasks yet</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleCompletion={onToggleCompletion}
                        onDeleteTask={onDeleteTask}
                        onEditTask={onEditTask} // Pass down here
                    />
                ))
            )}
        </div>
    );
};

export default TaskList;