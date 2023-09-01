import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import { addTask, getTasks } from '../utils/api';
import { Task } from '../utils/types';
import AddTaskUI from './AddTaskUI';

interface AddTaskContainerProps {
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

function AddTaskContainer({ setTasks }: AddTaskContainerProps) {
  const [newTask, setNewTask] = useState(''); //tracks new task input
  const [isBlank, setIsBlank] = useState(false); //tracks if input is blank on submit

  //Handle input for new task
  const handleTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
    if (e.target.value) {
      setIsBlank(false);
    }
  };

  //Handle new task submission
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isBlank && newTask !== '') {
      try {
        await addTask(newTask);
        const updatedTasks = await getTasks();
        setTasks(updatedTasks);
        setNewTask('');
      } catch (err) {
        console.error('Error submitting new task:', err);
      }
    } else {
      setIsBlank(true);
    }
  };

  return (
    <form
      action="submit"
      onSubmit={(e) => void handleFormSubmit(e)}
      className="w-full flex flex-col md:flex-row gap-5 md:gap-2"
    >
      <AddTaskUI
        isBlank={isBlank}
        handleTaskInput={handleTaskInput}
        newTask={newTask}
      />
    </form>
  );
}

export default AddTaskContainer;
