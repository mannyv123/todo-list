import { RefObject } from 'react';
import { Task } from '../utils/types';
import DeleteModalUI from './DeleteModalUI';

interface DeleteModalContainerProps {
  deleteModalRef: RefObject<HTMLDialogElement>;
  tasks: Task[];
  deleteAll: () => Promise<void>;
}

function DeleteModalContainer({
  deleteModalRef,
  tasks,
  deleteAll,
}: DeleteModalContainerProps) {
  //Handle deleting all tasks
  const handleTasksDelete = async () => {
    await deleteAll();
    deleteModalRef.current?.close();
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
        handleDeleteAll={handleTasksDelete}
        handleCloseModal={handleCloseModal}
        hasTasks={hasTasks}
      />
    </dialog>
  );
}

export default DeleteModalContainer;
