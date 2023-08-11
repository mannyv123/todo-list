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
