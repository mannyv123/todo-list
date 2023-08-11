import { Task } from "../../App";

interface TaskListProps {
    tasks: Task[];
}

function TaskList({ tasks }: TaskListProps) {
    const uncompletedTasks = tasks.filter((task) => task.completed === false);
    const completedTasks = tasks.filter((task) => task.completed === true);

    return (
        <section className="flex flex-col md:flex-row gap-4 md:gap-20 lg:gap-40">
            <div className="w-full md:w-1/2">
                <h3 className="border-b border-black">To Do</h3>
                <ul>
                    {uncompletedTasks.map((task) => (
                        <p key={task.id}>{task.task}</p>
                    ))}
                </ul>
            </div>
            <div className="w-full md:w-1/2">
                <h3 className="border-b border-black">Done</h3>
                <ul>
                    {completedTasks.map((task) => (
                        <p key={task.id}>{task.task}</p>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default TaskList;
