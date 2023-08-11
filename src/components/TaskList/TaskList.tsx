import { Task } from "../../utils/types";
import TaskItem from "../TaskItem/TaskItem";

interface TaskListProps {
    tasks: Task[];
    handleTaskCompletionChange: (taskId: string) => void;
}

function TaskList({ tasks, handleTaskCompletionChange }: TaskListProps) {
    const uncompletedTasks = tasks.filter((task) => task.completed === false);
    const completedTasks = tasks
        .filter((task) => task.completed === true)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 10);

    return (
        <section className="flex flex-col md:flex-row gap-4 md:gap-20 lg:gap-40">
            <div className="w-full md:w-1/2">
                <h3 className="border-b border-black">To Do</h3>
                <ul>
                    {uncompletedTasks.map((task) => (
                        <li key={task._id}>
                            <TaskItem task={task} handleTaskCompletionChange={handleTaskCompletionChange} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full md:w-1/2">
                <h3 className="border-b border-black">Done</h3>
                <ul>
                    {completedTasks.map((task) => (
                        <li key={task._id}>
                            <TaskItem task={task} handleTaskCompletionChange={handleTaskCompletionChange} />
                        </li>
                    ))}
                    {completedTasks.length > 10 && <li>...</li>}
                </ul>
            </div>
        </section>
    );
}

export default TaskList;
