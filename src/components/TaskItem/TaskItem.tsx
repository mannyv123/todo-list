import { Task } from '../../utils/types';
import deleteIcon from '../../assets/icon-delete.svg';

interface TaskProps {
  task: Task;
  updateTaskCompletion: (taskId: string) => Promise<void>;
  deleteSingleTaskHandler: (taskId: string) => Promise<void>;
}

function TaskItem({
  task,
  updateTaskCompletion,
  deleteSingleTaskHandler,
}: TaskProps) {
  const taskId = `task-${task._id}`; // Unique ID for the input element

  return (
    <div className="flex hover:bg-gray-300 px-2 rounded-lg group">
      <div className="w-full flex gap-4">
        <input
          className="checked:accent-white cursor-pointer"
          type="checkbox"
          name="task"
          id={taskId}
          checked={task.completed}
          onChange={() => void updateTaskCompletion(task._id)}
        />
        <label className="cursor-pointer w-full" htmlFor={taskId}>
          {task.task}
        </label>
      </div>
      <img
        className="lg:hidden group-hover:block w-3 hover:w-4 cursor-pointer"
        src={deleteIcon}
        alt="delete"
        onClick={() => void deleteSingleTaskHandler(task._id)}
      />
    </div>
  );
}

export default TaskItem;
