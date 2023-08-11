import "./App.css";
import TaskList from "./components/TaskList/TaskList";

export interface Task {
    id: number;
    task: string;
    completed: boolean;
    timestamp: number;
}

//temp data
const tasks: Task[] = [
    {
        id: 1,
        task: "Task 1",
        completed: false,
        timestamp: 1691722357505,
    },
    {
        id: 2,
        task: "Task 2",
        completed: false,
        timestamp: 1691722357505,
    },
    {
        id: 3,
        task: "Task 3",
        completed: true,
        timestamp: 1691722357505,
    },
    {
        id: 4,
        task: "Task 4",
        completed: true,
        timestamp: 1691722357505,
    },
    {
        id: 5,
        task: "Task 5",
        completed: true,
        timestamp: 1691722357505,
    },
    {
        id: 6,
        task: "Task 6",
        completed: false,
        timestamp: 1691722357505,
    },
    {
        id: 7,
        task: "Task 7",
        completed: true,
        timestamp: 1691722357505,
    },
];

function App() {
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
            <TaskList tasks={tasks} />
        </main>
    );
}

export default App;
