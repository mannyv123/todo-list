import { Task } from "./types";

const API_BASE_URL = "http://localhost:3001/api/tasks/";

//Get all tasks
export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: "GET",
        });
        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(`Error fetching tasks: ${err}`);
    }
};

//Change completion status of tasks
export const updateTask = async (taskId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}${taskId}`, {
            method: "PUT",
        });

        if (!response.ok) {
            throw new Error(`Error updating task: ${response.statusText}`);
        }
    } catch (err) {
        throw new Error(`Error updating task: ${err}`);
    }
};

//Add new task
export const addTask = async (task: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: "POST",
            body: JSON.stringify({
                task,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error creating task: ${response.statusText}`);
        }

        return await response.json();
    } catch (err) {
        throw new Error(`Error creating task: ${err}`);
    }
};

//Delete all tasks
export const deleteAllTasks = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}deleteAll`, {
            method: "DELETE",
        });

        return await response.json();
    } catch (err) {
        throw new Error(`Error deleting tasks: ${err}`);
    }
};
