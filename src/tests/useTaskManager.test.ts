import { describe, it } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useTaskManager } from '../hooks/useTaskManager';
import { mockPosts } from './mocks/handlers';

describe('useTaskManager', () => {
  it('tasks state is initially empty array', () => {
    const { result } = renderHook(() => useTaskManager());
    expect(result.current.tasks).toEqual([]);
  });

  it('fetches task data from the API and updates the tasks state', async () => {
    const { result } = renderHook(() => useTaskManager());

    await waitFor(() => {
      expect(result.current.tasks).toEqual(mockPosts);
    });
  });

  it('adds a new task and correctly updates the tasks state', async () => {
    const newTaskDesc = 'This is a new task';
    const { result } = renderHook(() => useTaskManager());

    act(() => {
      result.current.addNewTask(newTaskDesc);
    });

    await waitFor(() => {
      expect(result.current.tasks).toEqual(mockPosts);
    });
  });

  it('changes task completion status and updates the tasks state', async () => {
    const taskIdToUpdate = '1';
    const { result } = renderHook(() => useTaskManager());

    act(() => {
      result.current.updateTaskCompletion(taskIdToUpdate);
    });

    await waitFor(() => {
      expect(result.current.tasks[0].completed).toEqual(true);
    });
  });

  it('deletes all tasks and updates the tasks state', async () => {
    const { result } = renderHook(() => useTaskManager());

    act(() => {
      result.current.deleteAllTasksHandler();
    });

    await waitFor(() => {
      expect(result.current.tasks).toEqual([]);
    });
  });

  it('deletes a single task and updates the tasks state', async () => {
    const taskIdToDelete = '1';

    const { result } = renderHook(() => useTaskManager());

    act(() => {
      result.current.deleteSingleTaskHandler(taskIdToDelete);
    });

    await waitFor(() => {
      expect(result.current.tasks).toEqual(mockPosts);
    });
  });
});
