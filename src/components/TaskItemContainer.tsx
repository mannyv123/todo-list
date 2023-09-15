import { Task } from '../utils/types';
import TaskItemUI from './TaskItemUI';

interface TaskItemContainerProps {
  task: Task;
  updateTaskCompletion: (taskId: string) => Promise<void>;
  deleteSingleTaskHandler: (taskId: string) => Promise<void>;
}

function TaskItemContainer({
  task,
  updateTaskCompletion,
  deleteSingleTaskHandler,
}: TaskItemContainerProps) {
  return (
    <>
      <TaskItemUI
        task={task}
        handleTaskCompletionChange={updateTaskCompletion}
        handleSingleTaskDelete={deleteSingleTaskHandler}
      />
    </>
  );
}

export default TaskItemContainer;
