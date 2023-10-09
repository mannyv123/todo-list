import { Task } from '../../utils/types';
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';

interface TaskItemUIProps {
  task: Task;
  handleTaskCompletionChange: (taskId: string) => Promise<void>;
  handleSingleTaskDelete: (taskId: string) => Promise<void>;
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
      <div className="flex justify-center items-center cursor-pointer lg:hidden group-hover:block hover:scale-110">
        <MdOutlineModeEdit
          size={'1.5rem'}
          // onClick={() => void handleSingleTaskDelete(task._id)}
        />
      </div>
      <div className="flex justify-center items-center cursor-pointer lg:hidden group-hover:block hover:scale-110">
        <MdDeleteOutline
          size={'1.5rem'}
          onClick={() => void handleSingleTaskDelete(task._id)}
        />
      </div>
    </div>
  );
}

export default TaskItemUI;
