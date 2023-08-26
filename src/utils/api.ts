import { Task } from './types';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/tasks/`;

//Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
    });
    const data = (await response.json()) as Task[];
    return data;
  } catch (err) {
    throw new Error(`Error fetching tasks: ${(err as Error).message}`);
  }
};

//Change completion status of tasks
export const updateTask = async (taskId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}${taskId}`, {
      method: 'PUT',
    });

    if (!response.ok) {
      throw new Error(`Error updating task: ${response.statusText}`);
    }
  } catch (err) {
    throw new Error(`Error updating task: ${(err as Error).message}`);
  }
};

//Add new task
export const addTask = async (task: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        task,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error creating task: ${response.statusText}`);
    }

    return (await response.json()) as Task;
  } catch (err) {
    throw new Error(`Error creating task: ${(err as Error).message}`);
  }
};

//Delete all tasks
export const deleteAllTasks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}deleteAll`, {
      method: 'DELETE',
    });

    return (await response.json()) as { message: string };
  } catch (err) {
    throw new Error(`Error deleting tasks: ${(err as Error).message}`);
  }
};

//Delete single task
export const deleteSingleTask = async (taskId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}${taskId}`, {
      method: 'DELETE',
    });

    return (await response.json()) as {
      acknowledged: boolean;
      deletedCount: number;
    };
  } catch (err) {
    throw new Error(`Error deleting task: ${(err as Error).message}`);
  }
};
