import { Task } from '../utils/types';
import TaskItem from './TaskItem';

interface TaskListUIProps {
  uncompletedTasks: Task[];
  completedTasks: Task[];
  handleTaskCompletionChange: (taskId: string) => Promise<void>;
  handleSingleTaskDelete: (taskId: string) => Promise<void>;
}

const COMPLETED_TASKS = 10; //number of completed tasks to show

function TaskListUI({
  uncompletedTasks,
  completedTasks,
  handleTaskCompletionChange,
  handleSingleTaskDelete,
}: TaskListUIProps) {
  return (
    <>
      <div className="w-full md:w-1/2">
        <h3 className="border-b border-black">To Do</h3>
        <ul>
          {uncompletedTasks.map((task) => (
            <li key={task._id}>
              <TaskItem
                task={task}
                handleTaskCompletionChange={handleTaskCompletionChange}
                handleSingleTaskDelete={handleSingleTaskDelete}
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
              <TaskItem
                task={task}
                handleTaskCompletionChange={handleTaskCompletionChange}
                handleSingleTaskDelete={handleSingleTaskDelete}
              />
            </li>
          ))}
          {completedTasks.length > COMPLETED_TASKS && <li>...</li>}
        </ul>
      </div>
    </>
  );
}

export default TaskListUI;
