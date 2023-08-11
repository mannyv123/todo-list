import "./App.css";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { addTask, getTasks, updateTask } from "./utils/api";
import { Task } from "./utils/types";
import TaskList from "./components/TaskList/TaskList";
import DeleteModal from "./components/DeleteModal/DeleteModal";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]); //holds array of all tasks
    const [newTask, setNewTask] = useState<string>(""); //tracks new task input
    const [searchInput, setSearchInput] = useState<string>(""); //tracks search input

    //Ref for modal to delete tasks
    const deleteModalRef = useRef<HTMLDialogElement>(null);

    //Load tasks on mount
    useEffect(() => {
        getTasks()
            .then((data) => setTasks(data))
            .catch((err) => console.error(`Error fetching tasks: ${err}`));
    }, []);

    //Handle search input
    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    //Handle input for new task
    const handleTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
    };

    //Handle task completion change
    const handleTaskCompletionChange = async (taskId: string) => {
        try {
            await updateTask(taskId);
            const updatedTasks = await getTasks();
            setTasks(updatedTasks);
        } catch (err) {
            console.error(`Error updating task: ${err}`);
        }
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
        } catch (err) {
            console.error(`Error submitting new task: ${err}`);
        }
    };

    //Handle search filtering of tasks
    const filteredTasks = tasks.filter((task) => {
        if (searchInput === "") {
            return task;
        }

        const lowerCasedSearch = searchInput.toLowerCase();
        const taskContent = task.task.toLowerCase();

        return taskContent.includes(lowerCasedSearch);
    });

    return (
        <main>
            <DeleteModal deleteModalRef={deleteModalRef} tasks={tasks} setTasks={setTasks} />
            <div className="w-full h-full mx-auto max-w-7xl p-4">
                <section className="flex flex-col justify-between md:flex-row md:items-center gap-2 mb-12">
                    <h1 className="font-bold text-lg md:text-3xl ">Marvelous v2.0</h1>
                    <p
                        onClick={() => deleteModalRef.current?.showModal()}
                        className="cursor-pointer underline text-blue-500"
                    >
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
                            className="w-full border border-black rounded-md p-2"
                            placeholder="New task.."
                            type="text"
                            name="newTask"
                            id="newTask"
                            onChange={handleTaskInput}
                            value={newTask}
                        />
                        <button className="bg-cyan-300 rounded-md border border-black md:w-24 p-1">
                            Add
                        </button>
                    </form>
                    <input
                        className="w-full border border-black rounded-md p-2"
                        placeholder="Search.."
                        type="text"
                        name="search"
                        id="search"
                        onChange={handleSearchInput}
                        value={searchInput}
                    />
                </section>
                <TaskList tasks={filteredTasks} handleTaskCompletionChange={handleTaskCompletionChange} />
            </div>
        </main>
    );
}

export default App;
