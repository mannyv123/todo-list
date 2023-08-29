import { Dispatch, SetStateAction } from 'react';
import { Task } from '../utils/types';
import TaskItemContainer from './TaskItemContainer';

interface TaskListUIProps {
  uncompletedTasks: Task[];
  completedTasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

const COMPLETED_TASKS = 10; //number of completed tasks to show

function TaskListUI({
  uncompletedTasks,
  completedTasks,
  setTasks,
}: TaskListUIProps) {
  return (
    <>
      <div className="w-full md:w-1/2">
        <h3 className="border-b border-black">To Do</h3>
        <ul>
          {uncompletedTasks.map((task) => (
            <li key={task._id}>
              <TaskItemContainer task={task} setTasks={setTasks} />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-1/2">
        <h3 className="border-b border-black">Done</h3>
        <ul>
          {completedTasks.slice(0, COMPLETED_TASKS).map((task) => (
            <li key={task._id}>
              <TaskItemContainer task={task} setTasks={setTasks} />
            </li>
          ))}
          {completedTasks.length > COMPLETED_TASKS && <li>...</li>}
        </ul>
      </div>
    </>
  );
}

export default TaskListUI;
