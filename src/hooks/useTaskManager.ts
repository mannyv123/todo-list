import {
  addTask,
  deleteAllTasks,
  deleteSingleTask,
  getTasks,
  updateTask,
} from '../utils/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useTaskManager() {
  const queryClient = useQueryClient();

  //Query to get all tasks
  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const tasksData = tasksQuery.data ? tasksQuery.data : [];

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

  return {
    tasksData,
    createTaskMutation,
    updateTaskCompletionMutation,
    deleteAllTasksMutation,
    deleteSingleTaskMutation,
  };
}
