import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Task } from '../utils/types';
import {
  addTask,
  deleteAllTasks,
  deleteSingleTask,
  editTask,
  getTasks,
  updateTask,
} from '../utils/api';

//Fetch tasks from API
const fetchTasks = async (updateTaskData: Dispatch<SetStateAction<Task[]>>) => {
  try {
    const tasksData = await getTasks();
    updateTaskData(tasksData);
  } catch (err) {
    console.error('Error fetching tasks: ', err);
  }
};

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    void fetchTasks(setTasks); //Pass the setTasks function as a callback
  }, []);

  //Add a new task
  const addNewTask = async (taskDescription: string) => {
    try {
      await addTask(taskDescription);
      await fetchTasks(setTasks);
    } catch (err) {
      console.error('Error adding task: ', err);
    }
  };

  //Update task completion status
  const updateTaskCompletion = async (taskId: string) => {
    try {
      await updateTask(taskId);
      await fetchTasks(setTasks);
    } catch (err) {
      console.error('Error adding task: ', err);
    }
  };

  // Delete all tasks
  const deleteAllTasksHandler = async () => {
    try {
      await deleteAllTasks();
      setTasks([]);
    } catch (err) {
      console.error('Error deleting all task: ', err);
    }
  };

  // Delete a single task
  const deleteSingleTaskHandler = async (taskId: string) => {
    try {
      await deleteSingleTask(taskId);
      await fetchTasks(setTasks);
    } catch (err) {
      console.error('Error deleting task: ', err);
    }
  };

  // Edit a task
  const editSingleTask = async (taskId: string, taskDesc: string) => {
    try {
      await editTask(taskId, taskDesc);
      await fetchTasks(setTasks);
    } catch (err) {
      console.error('Error editing task: ', err);
    }
  };

  return {
    tasks,
    addNewTask,
    updateTaskCompletion,
    deleteAllTasksHandler,
    deleteSingleTaskHandler,
    editSingleTask,
  };
}
