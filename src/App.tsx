import './App.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { getTasks } from './utils/api';
import { Task } from './utils/types';
import TaskListContainer from './components/TaskListContainer';
import DeleteModalContainer from './components/DeleteModalContainer';
import AddTaskContainer from './components/AddTaskContainer';
import HeaderUI from './components/HeaderUI';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]); //holds array of all tasks
  const [searchInput, setSearchInput] = useState<string>(''); //tracks search input

  const deleteModalRef = useRef<HTMLDialogElement>(null);

  const openDeleteModal = () => {
    deleteModalRef.current?.showModal();
  };

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
      <DeleteModalContainer
        deleteModalRef={deleteModalRef}
        tasks={tasks}
        setUpdateFunction={setTasks}
      />
      <div className="w-full h-full mx-auto max-w-7xl p-4">
        <HeaderUI openDeleteModal={openDeleteModal} />
        <section className="flex flex-col md:flex-row gap-8 md:gap-20 lg:gap-40 mb-12">
          <AddTaskContainer setUpdateFunction={setTasks} />
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
        <TaskListContainer tasks={filteredTasks} setUpdateFunction={setTasks} />
      </div>
    </main>
  );
}

export default App;
