const MODAL_MESSAGES = {
  confirmDeleteAll: 'Are you sure you want to delete all tasks?',
  noTasksToDelete: 'No tasks to delete.',
  closeButton: 'Close',
  deleteButton: 'Delete',
};

interface DeleteModalUIProps {
  handleDeleteAll: () => Promise<void>;
  handleCloseModal: () => void;
  hasTasks: boolean;
}

function DeleteModalUI({
  handleDeleteAll,
  handleCloseModal,
  hasTasks,
}: DeleteModalUIProps) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-10">
      <p>
        {hasTasks
          ? MODAL_MESSAGES.confirmDeleteAll
          : MODAL_MESSAGES.noTasksToDelete}
      </p>
      <div className="w-full flex flex-col md:flex-row md:justify-center gap-5">
        <div
          className="cursor-pointer border border-black text-center p-2 rounded-lg w-full md:max-w-xs hover:bg-cyan-100"
          onClick={handleCloseModal}
        >
          {MODAL_MESSAGES.closeButton}
        </div>
        {hasTasks ? (
          <div
            className="cursor-pointer border border-black text-center p-2 rounded-lg w-full md:max-w-xs hover:bg-cyan-100"
            onClick={() => void handleDeleteAll()}
          >
            {MODAL_MESSAGES.deleteButton}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default DeleteModalUI;
