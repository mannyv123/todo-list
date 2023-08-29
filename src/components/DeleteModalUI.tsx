interface DeleteModalUIProps {
  handleDeleteAll: () => Promise<void>;
  handleCloseModal: () => void;
  tasksExist: boolean;
}

function DeleteModalUI({
  handleDeleteAll,
  handleCloseModal,
  tasksExist,
}: DeleteModalUIProps) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-10">
      <p>
        {tasksExist
          ? 'Are you sure you want to delete all tasks?'
          : 'No tasks to delete.'}
      </p>
      <div className="w-full flex flex-col md:flex-row md:justify-center gap-5">
        <div
          className="cursor-pointer border border-black text-center p-2 rounded-lg w-full md:max-w-xs hover:bg-cyan-100"
          onClick={handleCloseModal}
        >
          Close
        </div>
        {tasksExist && (
          <div
            className="cursor-pointer border border-black text-center p-2 rounded-lg w-full md:max-w-xs hover:bg-cyan-100"
            onClick={() => void handleDeleteAll()}
          >
            Delete
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteModalUI;
