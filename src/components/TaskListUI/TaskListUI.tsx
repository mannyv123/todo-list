import { Task } from '../../utils/types';
import TaskItemContainer from '../TaskItemContainer';

interface TaskListUIProps {
  incompletedTasks: Task[];
  completedTasks: Task[];
  updateTaskCompletion: (taskId: string) => Promise<void>;
  deleteSingleTaskHandler: (taskId: string) => Promise<void>;
}

const COMPLETED_TASKS = 10; //number of completed tasks to show

function TaskListUI({
  incompletedTasks,
  completedTasks,
  updateTaskCompletion,
  deleteSingleTaskHandler,
}: TaskListUIProps) {
  return (
    <>
      <div className="w-full md:w-1/2">
        <h3 className="border-b border-black">To Do</h3>
        <ul>
          {incompletedTasks.map((task) => (
            <li key={task._id}>
              <TaskItemContainer
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
          {completedTasks.slice(0, COMPLETED_TASKS).map((task) => (
            <li key={task._id}>
              <TaskItemContainer
                task={task}
                updateTaskCompletion={updateTaskCompletion}
                deleteSingleTaskHandler={deleteSingleTaskHandler}
              />
            </li>
          ))}
          {completedTasks.length > COMPLETED_TASKS ? <li>...</li> : null}
        </ul>
      </div>
    </>
  );
}

export default TaskListUI;
