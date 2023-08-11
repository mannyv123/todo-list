import { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList/TaskList";
import { getTasks, updateTask } from "./utils/api";
import { Task } from "./utils/types";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    //Load tasks on mount
    useEffect(() => {
        getTasks()
            .then((data) => setTasks(data))
            .catch((error) => console.error(`Error fetching tasks: ${error}`));
    }, []);

    //Handle task completion change
    const handleTaskCompletionChange = async (taskId: string) => {
        try {
            await updateTask(taskId);
            const updatedTasks = await getTasks();
            setTasks(updatedTasks);
        } catch (error) {
            console.error(`Error updating task: ${error}`);
        }
    };

    return (
        <main className="mx-auto max-w-7xl p-4">
            <section className="flex flex-col justify-between md:flex-row md:items-center gap-2 mb-12">
                <h1 className="">Marvelous v2.0</h1>
                <p className="">Delete all tasks</p>
            </section>
            <section className="flex flex-col md:flex-row gap-4 md:gap-20 lg:gap-40 mb-12">
                <form action="submit" className="w-full flex flex-col md:flex-row gap-1 md:gap-2">
                    <input
                        className="w-full border border-black rounded-md p-1"
                        placeholder="New task.."
                        type="text"
                        name="newTask"
                        id="newTask"
                    />
                    <button className="bg-cyan-300 rounded-md border border-black md:w-24">Add</button>
                </form>
                <input
                    className="w-full border border-black rounded-md p-1"
                    placeholder="Search.."
                    type="text"
                    name="search"
                    id="search"
                />
            </section>
            <TaskList tasks={tasks} handleTaskCompletionChange={handleTaskCompletionChange} />
        </main>
    );
}

export default App;
