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

  //function to snapshot original state of tasks data before optimistically updating
  const prevTasksState = () => {
    return queryClient.getQueryData<Task[]>(['tasks']);
  };

  //Query to get all tasks
  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    initialData: [],
  });

  const tasksData = tasksQuery.data;

  //Query to create new task
  const createTaskMutation = useMutation({
    mutationFn: addTask,
    onMutate: async (newTask: string) => {
      //Cancel any outgoing refetches (so that they don't overwrite the optimistic update)
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      //Snapshot the previous value
      const previousTasks = prevTasksState();

      //Optimistically update to the new value
      if (previousTasks) {
        const newTaskObj: Task = {
          _id: Math.random().toString(),
          task: newTask,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const updatedTasks: Task[] = [...previousTasks, newTaskObj];
        updatedTasks.sort((a, b) => {
          const taskA = a.task.toLocaleLowerCase();
          const taskB = b.task.toLocaleLowerCase();

          if (taskA < taskB) {
            return -1;
          }
          if (taskA > taskB) {
            return 1;
          }
          return 0;
        });

        queryClient.setQueryData<Task[]>(['tasks'], updatedTasks);

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
    onMutate: async (taskId: string) => {
      //Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      //Snapshot previous value
      const previousTasks = prevTasksState();

      //Optimistically update to new value
      const updatedTasks = previousTasks?.map((task) =>
        task._id === taskId
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task,
      );

      queryClient.setQueryData<Task[]>(['tasks'], updatedTasks);

      return { previousTasks };
    },
    //If mutation fails, use the context returned from onMutate to roll back data
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
