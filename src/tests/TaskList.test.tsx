import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskListContainer';

describe('TaskList', () => {
  const tasks = [
    {
      _id: '1',
      task: 'Task 1',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '2',
      task: 'Task 2',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '3',
      task: 'Task 3',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  it('renders headings correclty', () => {
    const handleTaskCompletionChange = vi.fn();
    const handleSingleTaskDelete = vi.fn();

    render(
      <TaskList
        tasks={tasks}
        handleTaskCompletionChange={handleTaskCompletionChange}
        handleSingleTaskDelete={handleSingleTaskDelete}
      />,
    );

    const todoList = screen.getByRole('heading', { name: /to do/i });
    const doneList = screen.getByRole('heading', { name: /done/i });

    expect(todoList).toBeInTheDocument();
    expect(doneList).toBeInTheDocument();
  });

  it('renders the correct amount of tasks for each section', () => {
    const handleTaskCompletionChange = vi.fn();
    const handleSingleTaskDelete = vi.fn();

    render(
      <TaskList
        tasks={tasks}
        handleTaskCompletionChange={handleTaskCompletionChange}
        handleSingleTaskDelete={handleSingleTaskDelete}
      />,
    );

    const uncompletedTasks = screen.getAllByRole('checkbox', {
      checked: false,
    });
    const completedTasks = screen.getAllByRole('checkbox', { checked: true });

    expect(uncompletedTasks).toHaveLength(1);
    expect(completedTasks).toHaveLength(2);
  });
});
