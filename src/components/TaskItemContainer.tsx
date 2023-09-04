import { Task, UpdateCallback } from '../utils/types';
import { deleteSingleTask, getTasks, updateTask } from '../utils/api';
import TaskItemUI from './TaskItemUI';

interface TaskItemContainerProps {
  task: Task;
  setUpdateFunction: UpdateCallback<Task[]>;
}

function TaskItemContainer({
  task,
  setUpdateFunction,
}: TaskItemContainerProps) {
  //Handle task completion change
  const handleTaskCompletionChange = async (taskId: string) => {
    try {
      await updateTask(taskId);
      const updatedTasks = await getTasks();
      setUpdateFunction(updatedTasks);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  //Handle single task deletion
  const handleSingleTaskDelete = async (taskId: string) => {
    try {
      await deleteSingleTask(taskId);
      const updatedTasks = await getTasks();
      setUpdateFunction(updatedTasks);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <>
      <TaskItemUI
        task={task}
        handleTaskCompletionChange={handleTaskCompletionChange}
        handleSingleTaskDelete={handleSingleTaskDelete}
      />
    </>
  );
}

export default TaskItemContainer;
