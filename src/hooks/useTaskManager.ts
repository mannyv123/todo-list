import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Task } from '../utils/types';
import {
  addTask,
  deleteAllTasks,
  deleteSingleTask,
  getTasks,
  updateTask,
} from '../utils/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();

  //Query to get all tasks
  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  //Query to create new task
  const createTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['tasks']);
    },
  });

  //Query to update task completion status
  const updateTaskCompletionMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['tasks']);
    },
  });

  //Query to delete all tasks
  const deleteAllTasksMutation = useMutation({
    mutationFn: deleteAllTasks,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['tasks']);
    },
  });

  //Query to delete specific task
  const deleteSingleTaskMutation = useMutation({
    mutationFn: deleteSingleTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['tasks']);
    },
  });

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

  return {
    tasksQuery,
    createTaskMutation,
    updateTaskCompletionMutation,
    deleteAllTasksMutation,
    deleteSingleTaskMutation,
    tasks,
    addNewTask,
    updateTaskCompletion,
    deleteAllTasksHandler,
    deleteSingleTaskHandler,
  };
}
