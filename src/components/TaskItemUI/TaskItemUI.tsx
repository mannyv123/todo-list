import deleteIcon from '../../assets/icon-delete.svg';
import { Task } from '../../utils/types';

interface TaskItemUIProps {
  task: Task;
  handleTaskCompletionChange: (taskId: string) => void;
  handleSingleTaskDelete: (taskId: string) => void;
}

function TaskItemUI({
  task,
  handleTaskCompletionChange,
  handleSingleTaskDelete,
}: TaskItemUIProps) {
  return (
    <div className="flex hover:bg-gray-300 px-2 rounded-lg group">
      <div className="w-full flex gap-4">
        <input
          className="checked:accent-white cursor-pointer"
          type="checkbox"
          name="task"
          id={task._id}
          checked={task.completed}
          onChange={() => void handleTaskCompletionChange(task._id)}
        />
        <label className="cursor-pointer w-full" htmlFor={task._id}>
          {task.task}
        </label>
      </div>
      <img
        className="lg:hidden group-hover:block w-3 hover:w-4 cursor-pointer"
        src={deleteIcon}
        alt="delete"
        onClick={() => void handleSingleTaskDelete(task._id)}
      />
    </div>
  );
}

export default TaskItemUI;
