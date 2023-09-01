import { Dispatch, RefObject, SetStateAction } from 'react';
import { Task } from '../utils/types';
import { deleteAllTasks } from '../utils/api';
import DeleteModalUI from './DeleteModalUI';

interface DeleteModalContainerProps {
  deleteModalRef: RefObject<HTMLDialogElement>;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

function DeleteModalContainer({
  deleteModalRef,
  tasks,
  setTasks,
}: DeleteModalContainerProps) {
  //Handle deleting all tasks
  const handleDeleteAll = async () => {
    try {
      await deleteAllTasks();
      setTasks([]);
      deleteModalRef.current?.close();
    } catch (err) {
      console.error('Error deleting all tasks:', err);
    }
  };

  //Handle closing the modal when it's open
  const handleCloseModal = () => {
    deleteModalRef.current?.close();
  };

  //Boolean to conditionally render options in modal
  const hasTasks: boolean = tasks.length > 0;

  return (
    <dialog
      ref={deleteModalRef}
      className="w-full md:w-[60vw] lg:w-[40vw] h-full md:h-[30vh] rounded-lg p-2 md:p-6"
    >
      <DeleteModalUI
        handleDeleteAll={handleDeleteAll}
        handleCloseModal={handleCloseModal}
        hasTasks={hasTasks}
      />
    </dialog>
  );
}

export default DeleteModalContainer;
