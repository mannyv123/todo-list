import {
  addTask,
  deleteAllTasks,
  deleteSingleTask,
  getTasks,
  updateTask,
} from '../utils/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '../utils/types';

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
    onMutate: async (newTask: string) => {
      //Cancel any outgoing refetches (so that they don't overwrite the optimistic update)
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      //Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      //Optimistically update to the new value
      if (previousTasks) {
        const newTaskObj: Task = {
          _id: Math.random().toString(),
          task: newTask,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        queryClient.setQueryData<Task[]>(
          ['tasks'],
          [newTaskObj, ...previousTasks],
        );

        return { previousTasks };
      }
    },

    //If the mutation fails, use the context returned from onMutate to roll back data
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData<Task[]>(['tasks'], context.previousTasks);
      }
    },

    //Always refetch after error or success
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
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
