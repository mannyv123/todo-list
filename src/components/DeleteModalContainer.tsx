import { RefObject, useRef } from 'react';
import { Task } from '../utils/types';
import DeleteModalUI from './DeleteModalUI';

interface DeleteModalContainerProps {
  handleModal: (modalRef: RefObject<HTMLDialogElement>) => void;
  closeDeleteModal: () => void;
  tasks: Task[];
  deleteAll: () => Promise<void>;
}

function DeleteModalContainer({
  handleModal,
  closeDeleteModal,
  tasks,
  deleteAll,
}: DeleteModalContainerProps) {
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  handleModal(deleteModalRef);

  //Handle deleting all tasks
  const handleTasksDelete = async () => {
    await deleteAll();
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
