import './App.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { deleteSingleTask, getTasks, updateTask } from './utils/api';
import { Task } from './utils/types';
import TaskList from './components/TaskList/TaskList';
import DeleteModal from './components/DeleteModal/DeleteModal';
import HeaderContainer from './components/HeaderContainer';
import AddTaskContainer from './components/AddTaskContainer';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]); //holds array of all tasks

  const [searchInput, setSearchInput] = useState<string>(''); //tracks search input

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
          <AddTaskContainer setTasks={setTasks} />
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
