import './App.css';
import { ChangeEvent, RefObject, useState } from 'react';
import TaskListContainer from './components/TaskListContainer/TaskListContainer';
import DeleteModalContainer from './components/DeleteModalContainer';
import AddTaskContainer from './components/AddTaskContainer/AddTaskContainer';
import HeaderUI from './components/HeaderUI';
import { useTaskManager } from './hooks/useTaskManager';

function App() {
  const [searchInput, setSearchInput] = useState<string>(''); //tracks search input
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    tasks,
    addNewTask,
    updateTaskCompletion,
    deleteAllTasksHandler,
    deleteSingleTaskHandler,
  } = useTaskManager();

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const handleModal = (modalRef: RefObject<HTMLDialogElement>) => {
    if (isModalOpen === true) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  };

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
        closeDeleteModal={closeDeleteModal}
        handleModal={handleModal}
        deleteAll={deleteAllTasksHandler}
        tasks={tasks}
      />
      <div className="w-full h-full mx-auto max-w-7xl p-4">
        <HeaderUI openDeleteModal={openDeleteModal} />
        <section className="flex flex-col md:flex-row gap-8 md:gap-20 lg:gap-40 mb-12">
          <AddTaskContainer addNew={addNewTask} />
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
        <TaskListContainer
          tasks={filteredTasks}
          updateTaskCompletion={updateTaskCompletion}
          deleteSingleTaskHandler={deleteSingleTaskHandler}
        />
      </div>
    </main>
  );
}

export default App;
