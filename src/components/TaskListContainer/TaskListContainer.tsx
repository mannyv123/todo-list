import { Task } from '../../utils/types';
import TaskListUI from '../TaskListUI/TaskListUI';

interface TaskListContainerProps {
  tasks: Task[];
}

//Helper function to filter tasks by completion status
const filterTasksByCompletionStatus = (
  tasks: Task[] = [],
  completed: boolean,
) => {
  return tasks.filter((task) => task.completed === completed);
};

function TaskListContainer({ tasks }: TaskListContainerProps) {
  //Filter for incompleted tasks
  const incompletedTasks = filterTasksByCompletionStatus(tasks, false);

  //Filter for completed tasks and sort latest to oldest
  const completedTasks = filterTasksByCompletionStatus(tasks, true).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <section className="flex flex-col md:flex-row gap-4 md:gap-20 lg:gap-40">
      <TaskListUI
        incompletedTasks={incompletedTasks}
        completedTasks={completedTasks}
      />
    </section>
  );
}

export default TaskListContainer;
