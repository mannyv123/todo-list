import { Task } from '../utils/types';
import { deleteSingleTask, getTasks, updateTask } from '../utils/api';
import { Dispatch, SetStateAction } from 'react';
import TaskItemUI from './TaskItemUI';

interface TaskItemContainerProps {
  task: Task;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

function TaskItemContainer({ task, setTasks }: TaskItemContainerProps) {
  const taskIdentifier = `task-${task._id}`; // Unique ID for the input element

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

  return (
    <>
      <TaskItemUI
        taskIdentifier={taskIdentifier}
        task={task}
        handleTaskCompletionChange={handleTaskCompletionChange}
        handleSingleTaskDelete={handleSingleTaskDelete}
      />
    </>
  );
}

export default TaskItemContainer;
