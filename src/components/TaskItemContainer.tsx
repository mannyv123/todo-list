import { Task } from '../utils/types';
import TaskItemUI from './TaskItemUI/TaskItemUI';
import { useTaskManager } from '../hooks/useTaskManager';

interface TaskItemContainerProps {
  task: Task;
}

function TaskItemContainer({ task }: TaskItemContainerProps) {
  const { updateTaskCompletionMutation, deleteSingleTaskMutation } =
    useTaskManager();

  const handleTaskCompletionChange = (taskId: string) => {
    updateTaskCompletionMutation.mutate(taskId);
  };

  const handleSingleTaskDelete = (taskId: string) => {
    deleteSingleTaskMutation.mutate(taskId);
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
