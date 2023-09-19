import { RefObject } from 'react';
import { Task } from '../utils/types';
import DeleteModalUI from './DeleteModalUI';
import { useTaskManager } from '../hooks/useTaskManager';

interface DeleteModalContainerProps {
  deleteModalRef: RefObject<HTMLDialogElement>;
  tasks: Task[];
}

function DeleteModalContainer({
  deleteModalRef,
  tasks,
}: DeleteModalContainerProps) {
  const { deleteAllTasksMutation } = useTaskManager();

  //Handle deleting all tasks
  const handleTasksDelete = () => {
    deleteAllTasksMutation.mutate();
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
