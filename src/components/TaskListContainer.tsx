import { Task } from '../utils/types';
import TaskListUI from './TaskListUI';

interface TaskListContainerProps {
  tasks: Task[];
  handleTaskCompletionChange: (taskId: string) => Promise<void>;
  handleSingleTaskDelete: (taskId: string) => Promise<void>;
}

function TaskListContainer({
  tasks,
  handleTaskCompletionChange,
  handleSingleTaskDelete,
}: TaskListContainerProps) {
  const uncompletedTasks = tasks.filter((task) => task.completed === false); //filter for uncompleted tasks
  const completedTasks = tasks
    .filter((task) => task.completed === true) //filter for completed tasks
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(), //sort filtered tasks by updatedAt time
    );

  return (
    <section className="flex flex-col md:flex-row gap-4 md:gap-20 lg:gap-40">
      <TaskListUI
        uncompletedTasks={uncompletedTasks}
        completedTasks={completedTasks}
        handleTaskCompletionChange={handleTaskCompletionChange}
        handleSingleTaskDelete={handleSingleTaskDelete}
      />
    </section>
  );
}

export default TaskListContainer;
