import { ChangeEvent } from 'react';
import clsx from 'clsx';

interface AddTaskUIProps {
  isBlank: boolean;
  handleTaskInput: (e: ChangeEvent<HTMLInputElement>) => void;
  newTask: string;
}

function AddTaskUI({ isBlank, handleTaskInput, newTask }: AddTaskUIProps) {
  return (
    <>
      <div className="relative w-full">
        <input
          className={clsx('w-full border rounded-md p-2', {
            'border-red-600': isBlank,
            'border-black': !isBlank,
          })}
          placeholder="New task.."
          type="text"
          name="newTask"
          id="newTask"
          onChange={handleTaskInput}
          value={newTask}
        />
        {isBlank ? (
          <div className="absolute text-sm md:text-base top-full text-red-600">
            Please fill in a description for the new task.
          </div>
        ) : null}
      </div>
      <button className="bg-cyan-300 hover:bg-cyan-100 rounded-md border border-black md:w-24 p-1">
        Add
      </button>
    </>
  );
}

export default AddTaskUI;
