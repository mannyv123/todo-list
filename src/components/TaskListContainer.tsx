import { Dispatch, SetStateAction } from 'react';
import { Task } from '../utils/types';
import TaskListUI from './TaskListUI';

interface TaskListContainerProps {
  tasks: Task[];
  updateTaskData: Dispatch<SetStateAction<Task[]>>;
}

//Helper function to filter tasks by completion status
const filterTasksByCompletionStatus = (tasks: Task[], completed: boolean) => {
  return tasks.filter((task) => task.completed === completed);
};

function TaskListContainer({ tasks, updateTaskData }: TaskListContainerProps) {
  //Filter for uncompleted tasks
  const uncompletedTasks = filterTasksByCompletionStatus(tasks, false);
  //Filter for completed tasks and sort latest to oldest
  const completedTasks = filterTasksByCompletionStatus(tasks, true).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <section className="flex flex-col md:flex-row gap-4 md:gap-20 lg:gap-40">
      <TaskListUI
        uncompletedTasks={uncompletedTasks}
        completedTasks={completedTasks}
        updateTaskData={updateTaskData}
      />
    </section>
  );
}

export default TaskListContainer;
