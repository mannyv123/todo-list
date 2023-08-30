import { Task } from '../../utils/types';
import TaskItem from '../TaskItem/TaskItem';

interface TaskListProps {
  tasks: Task[];
  updateTaskCompletion: (taskId: string) => Promise<void>;
  deleteSingleTaskHandler: (taskId: string) => Promise<void>;
}

function TaskList({
  tasks,
  updateTaskCompletion,
  deleteSingleTaskHandler,
}: TaskListProps) {
  const uncompletedTasks = tasks.filter((task) => task.completed === false); //filter for uncompleted tasks
  const completedTasks = tasks
    .filter((task) => task.completed === true) //filter for completed tasks
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    ); //sort filtered tasks by updatedAt time

  return (
    <section className="flex flex-col md:flex-row gap-4 md:gap-20 lg:gap-40">
      <div className="w-full md:w-1/2">
        <h3 className="border-b border-black">To Do</h3>
        <ul>
          {uncompletedTasks.map((task) => (
            <li key={task._id}>
              <TaskItem
                task={task}
                updateTaskCompletion={updateTaskCompletion}
                deleteSingleTaskHandler={deleteSingleTaskHandler}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-1/2">
        <h3 className="border-b border-black">Done</h3>
        <ul>
          {completedTasks.slice(0, 10).map((task) => (
            <li key={task._id}>
              <TaskItem
                task={task}
                updateTaskCompletion={updateTaskCompletion}
                deleteSingleTaskHandler={deleteSingleTaskHandler}
              />
            </li>
          ))}
          {completedTasks.length > 10 && <li>...</li>}
        </ul>
      </div>
    </section>
  );
}

export default TaskList;
