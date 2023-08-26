import './App.css';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { addTask, deleteSingleTask, getTasks, updateTask } from './utils/api';
import { Task } from './utils/types';
import TaskList from './components/TaskList/TaskList';
import DeleteModal from './components/DeleteModal/DeleteModal';
import HeaderContainer from './components/HeaderContainer';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]); //holds array of all tasks
  const [newTask, setNewTask] = useState<string>(''); //tracks new task input
  const [searchInput, setSearchInput] = useState<string>(''); //tracks search input
  const [isBlank, setIsBlank] = useState<boolean>(false);

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
    if (e.target.value) {
      setIsBlank(false);
    }
  };

  //Handle task completion change
  const handleTaskCompletionChange = async (taskId: string) => {
    try {
      await updateTask(taskId);
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  //Handle new task submission
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTask === '') {
      setIsBlank(true);
      return;
    }

    try {
      await addTask(newTask);
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
      setNewTask('');
    } catch (err) {
      console.error('Error submitting new task:', err);
    }
  };

  //Handle single task deletion
  const handleSingleTaskDelete = async (taskId: string) => {
    try {
      await deleteSingleTask(taskId);
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  //Handle search filtering of tasks
  const filteredTasks = tasks.filter((task) => {
    if (searchInput === '') {
      return task;
    }

    const lowerCasedSearch = searchInput.toLowerCase();
    const taskContent = task.task.toLowerCase();

    return taskContent.includes(lowerCasedSearch);
  });

  return (
    <main>
      <DeleteModal
        deleteModalRef={deleteModalRef}
        tasks={tasks}
        setTasks={setTasks}
      />
      <div className="w-full h-full mx-auto max-w-7xl p-4">
        <HeaderContainer deleteModalRef={deleteModalRef} />
        <section className="flex flex-col md:flex-row gap-8 md:gap-20 lg:gap-40 mb-12">
          <form
            action="submit"
            onSubmit={(e) => void handleFormSubmit(e)}
            className="w-full flex flex-col md:flex-row gap-5 md:gap-2"
          >
            <div className="relative w-full">
              <input
                className={`w-full border rounded-md p-2 ${
                  isBlank ? 'border-red-600' : 'border-black'
                }`}
                placeholder="New task.."
                type="text"
                name="newTask"
                id="newTask"
                onChange={handleTaskInput}
                value={newTask}
              />
              {isBlank && (
                <div className="absolute text-sm md:text-base top-full text-red-600">
                  Please fill in a description for the new task.
                </div>
              )}
            </div>

            <button className="bg-cyan-300 hover:bg-cyan-100 rounded-md border border-black md:w-24 p-1">
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
        <TaskList
          tasks={filteredTasks}
          handleTaskCompletionChange={handleTaskCompletionChange}
          handleSingleTaskDelete={handleSingleTaskDelete}
        />
      </div>
    </main>
  );
}

export default App;
