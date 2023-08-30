import { useEffect, useState } from 'react';
import { Task } from '../utils/types';
import {
  addTask,
  deleteAllTasks,
  deleteSingleTask,
  getTasks,
  updateTask,
} from '../utils/api';

function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks()
      .then(() => {})
      .catch((err) => {
        console.error('Error getting tasks: ', err);
      });
  }, []);

  //Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
    } catch (err) {
      console.error('Error fetching tasks: ', err);
    }
  };

  //Add a new task
  const addNewTask = async (taskDescription: string) => {
    try {
      await addTask(taskDescription);
      await fetchTasks();
    } catch (err) {
      console.error('Error adding task: ', err);
    }
  };

  //Update task completion status
  const updateTaskCompletion = async (taskId: string) => {
    try {
      await updateTask(taskId);
      await fetchTasks();
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
      await fetchTasks();
    } catch (err) {
      console.error('Error deleting task: ', err);
    }
  };

  return {
    tasks,
    addNewTask,
    updateTaskCompletion,
    deleteAllTasksHandler,
    deleteSingleTaskHandler,
  };
}

export default useTaskManager;
