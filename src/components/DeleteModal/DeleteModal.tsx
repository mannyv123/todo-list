import { Dispatch, RefObject, SetStateAction } from "react";
import { Task } from "../../utils/types";
import { deleteAllTasks } from "../../utils/api";

interface DeleteModalProps {
    deleteModalRef: RefObject<HTMLDialogElement>;
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
}

function DeleteModal({ deleteModalRef, tasks, setTasks }: DeleteModalProps) {
    //Handle deleting all tasks
    const handleDeleteAll = async () => {
        try {
            const response = await deleteAllTasks();
            console.log(response.message);
            setTasks([]);
            deleteModalRef.current?.close();
        } catch (error) {
            console.error(`Error deleting all tasks: ${error}`);
        }
    };
    return (
        <dialog
            ref={deleteModalRef}
            className="w-full md:w-[60vw] lg:w-[40vw] h-full md:h-[30vh] rounded-lg p-2 md:p-6"
        >
            <div className="h-full w-full flex flex-col justify-center items-center gap-10">
                <p>{tasks.length ? "Are you sure you want to delete all tasks?" : "No tasks to delete."}</p>
                <div className="w-full flex flex-col md:flex-row md:justify-center gap-5">
                    {tasks.length > 0 && (
                        <div
                            className="cursor-pointer border border-black text-center p-2 rounded-lg w-full md:max-w-xs hover:bg-cyan-100"
                            onClick={handleDeleteAll}
                        >
                            Delete
                        </div>
                    )}
                    <div
                        className="cursor-pointer border border-black text-center p-2 rounded-lg w-full md:max-w-xs hover:bg-cyan-100"
                        onClick={() => deleteModalRef.current?.close()}
                    >
                        Close
                    </div>
                </div>
            </div>
        </dialog>
    );
}

export default DeleteModal;
