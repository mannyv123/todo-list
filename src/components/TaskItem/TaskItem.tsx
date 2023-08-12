import { Task } from "../../utils/types";

interface TaskProps {
    task: Task;
    handleTaskCompletionChange: (taskId: string) => void;
}

function TaskItem({ task, handleTaskCompletionChange }: TaskProps) {
    const taskId = `task-${task._id}`; // Unique ID for the input element

    return (
        <div className="flex gap-4">
            <input
                className="checked:accent-white"
                type="checkbox"
                name="task"
                id={taskId}
                checked={task.completed}
                onChange={() => handleTaskCompletionChange(task._id)}
            />
            <label htmlFor={taskId}>{task.task}</label>
        </div>
    );
}

export default TaskItem;
