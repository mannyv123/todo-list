import { Task } from "../../App";

interface TaskProps {
    task: Task;
}

function TaskItem({ task }: TaskProps) {
    const taskId = `task-${task.id}`; // Unique ID for the input element

    return (
        <div className="flex gap-4">
            <input type="checkbox" name="task" id={taskId} checked={task.completed} />
            <label htmlFor={taskId}>{task.task}</label>
        </div>
    );
}

export default TaskItem;
