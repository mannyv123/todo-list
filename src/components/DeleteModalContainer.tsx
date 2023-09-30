import { useEffect, useRef } from 'react';
import { Task } from '../utils/types';
import DeleteModalUI from './DeleteModalUI';
import { useTaskManager } from '../hooks/useTaskManager';

interface DeleteModalContainerProps {
  isModalOpen: boolean;
  closeDeleteModal: () => void;
  tasks: Task[];
}

function DeleteModalContainer({
  isModalOpen,
  closeDeleteModal,
  tasks,
}: DeleteModalContainerProps) {
  const { deleteAllTasksMutation } = useTaskManager();

  const deleteModalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      deleteModalRef.current?.showModal();
    } else {
      deleteModalRef.current?.close();
    }
  }, [isModalOpen]);

  //Handle deleting all tasks
  const handleTasksDelete = () => {
    deleteAllTasksMutation.mutate();
    closeDeleteModal();
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
        handleCloseModal={closeDeleteModal}
        hasTasks={hasTasks}
      />
    </dialog>
  );
}

export default DeleteModalContainer;
