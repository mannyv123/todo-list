import { describe, it } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useTaskManager } from './useTaskManager';
import { mockPosts } from '../tests/mocks/handlers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

describe('useTaskManager', () => {
  const createWrapper = () => {
    // creates a new QueryClient for each test
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    return function QueryClientProviderWrapper({
      children,
    }: {
      children: ReactNode;
    }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    };
  };

  it('tasks state is initially empty array', () => {
    const { result } = renderHook(() => useTaskManager(), {
      wrapper: createWrapper(),
    });
    expect(result.current.tasksData).toEqual([]);
  });

  it('fetches task data from the API and updates the tasks state', async () => {
    const { result } = renderHook(() => useTaskManager(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      const stringifiedMockPosts = JSON.stringify(mockPosts);
      expect(result.current.tasksData).toEqual(
        JSON.parse(stringifiedMockPosts),
      );
    });
  });

  it('adds a new task and correctly updates the tasks state', async () => {
    const newTaskDesc = 'This is a new task';
    const { result } = renderHook(() => useTaskManager(), {
      wrapper: createWrapper(),
    });

    act(() => {
      void result.current.createTaskMutation.mutate(newTaskDesc);
    });

    await waitFor(() => {
      const stringifiedMockPosts = JSON.stringify(mockPosts);
      expect(result.current.tasksData).toEqual(
        JSON.parse(stringifiedMockPosts),
      );
    });
  });

  it('changes task completion status and updates the tasks state', async () => {
    const taskIdToUpdate = '1';
    const { result } = renderHook(() => useTaskManager(), {
      wrapper: createWrapper(),
    });

    act(() => {
      void result.current.updateTaskCompletionMutation.mutate(taskIdToUpdate);
    });

    await waitFor(() => {
      expect(mockPosts[0].completed).toEqual(true);
    });
  });

  it('deletes a single task and updates the tasks state', async () => {
    const taskIdToDelete = '1';
    const { result } = renderHook(() => useTaskManager(), {
      wrapper: createWrapper(),
    });

    act(() => {
      void result.current.deleteSingleTaskMutation.mutate(taskIdToDelete);
    });

    await waitFor(() => {
      const stringifiedMockPosts = JSON.stringify(mockPosts);
      expect(result.current.tasksData).toEqual(
        JSON.parse(stringifiedMockPosts),
      );
    });
  });

  it('deletes all tasks and updates the tasks state', async () => {
    const { result } = renderHook(() => useTaskManager(), {
      wrapper: createWrapper(),
    });

    act(() => {
      void result.current.deleteAllTasksMutation.mutate();
    });

    await waitFor(() => {
      expect(result.current.tasksData).toEqual([]);
    });
  });
});
