import { describe, it } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useTaskManager } from './useTaskManager';
import { mockPosts } from '../tests/mocks/handlers';

describe('useTaskManager', () => {
  it('tasks state is initially empty array', () => {
    const { result } = renderHook(() => useTaskManager());
    expect(result.current.tasksQuery.data).toEqual([]);
  });

  it('fetches task data from the API and updates the tasks state', async () => {
    const { result } = renderHook(() => useTaskManager());

    await waitFor(() => {
      const stringifiedMockPosts = JSON.stringify(mockPosts);
      expect(result.current.tasksQuery.data).toEqual(
        JSON.parse(stringifiedMockPosts),
      );
    });
  });

  it('adds a new task and correctly updates the tasks state', async () => {
    const newTaskDesc = 'This is a new task';
    const { result } = renderHook(() => useTaskManager());

    act(() => {
      void result.current.createTaskMutation.mutate(newTaskDesc);
    });

    await waitFor(() => {
      const stringifiedMockPosts = JSON.stringify(mockPosts);
      expect(result.current.tasksQuery.data).toEqual(
        JSON.parse(stringifiedMockPosts),
      );
    });
  });

  it('changes task completion status and updates the tasks state', async () => {
    const taskIdToUpdate = '1';
    const { result } = renderHook(() => useTaskManager());

    act(() => {
      void result.current.updateTaskCompletionMutation.mutate(taskIdToUpdate);
    });

    await waitFor(() => {
      if (result.current.tasksQuery.data) {
        expect(result.current.tasksQuery.data[0].completed).toEqual(true);
      }
    });
  });

  it('deletes all tasks and updates the tasks state', async () => {
    const { result } = renderHook(() => useTaskManager());

    act(() => {
      void result.current.deleteAllTasksMutation.mutate();
    });

    await waitFor(() => {
      expect(result.current.tasksQuery.data).toEqual([]);
    });
  });

  it('deletes a single task and updates the tasks state', async () => {
    const taskIdToDelete = '1';
    const { result } = renderHook(() => useTaskManager());

    act(() => {
      void result.current.deleteSingleTaskMutation.mutate(taskIdToDelete);
    });

    await waitFor(() => {
      expect(result.current.tasksQuery.data).not.toContainEqual(
        expect.objectContaining({ _id: taskIdToDelete }),
      );
    });
  });
});
