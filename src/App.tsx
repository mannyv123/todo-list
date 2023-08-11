import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList/TaskList";
import { addTask, deleteAllTasks, getTasks, updateTask } from "./utils/api";
import { Task } from "./utils/types";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>("");

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

    //Handle input for new task
    const handleTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
    };

    //Handle new task submission
    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        //TODO: add form validation
        if (newTask === "") {
            return;
        }

        try {
            await addTask(newTask);
            const updatedTasks = await getTasks();
            setTasks(updatedTasks);
            setNewTask("");
        } catch (error) {
            console.error(`Error submitting new task: ${error}`);
        }
    };

    //Handle deleting all tasks
    const handleDeleteAll = async () => {
        //TODO: add validation if no tasks to delete
        if (!tasks.length) {
            console.log("No tasks to delete");
            return;
        }
        try {
            const response = await deleteAllTasks();
            console.log(response.message);
            setTasks([]);
        } catch (error) {
            console.error(`Error deleting all tasks: ${error}`);
        }
    };

    return (
        <main className="mx-auto max-w-7xl p-4">
            <section className="flex flex-col justify-between md:flex-row md:items-center gap-2 mb-12">
                <h1 className="">Marvelous v2.0</h1>
                <p onClick={handleDeleteAll} className="cursor-pointer">
                    Delete all tasks
                </p>
            </section>
            <section className="flex flex-col md:flex-row gap-4 md:gap-20 lg:gap-40 mb-12">
                <form
                    action="submit"
                    onSubmit={handleFormSubmit}
                    className="w-full flex flex-col md:flex-row gap-1 md:gap-2"
                >
                    <input
                        className="w-full border border-black rounded-md p-1"
                        placeholder="New task.."
                        type="text"
                        name="newTask"
                        id="newTask"
                        onChange={handleTaskInput}
                        value={newTask}
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
