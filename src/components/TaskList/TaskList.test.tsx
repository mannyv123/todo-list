import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskList from '../TaskList/TaskList';
import { mockPosts } from '../../tests/mocks/handlers';

describe('TaskList', () => {
  it('renders headings correclty', () => {
    const updateTaskCompletion = vi.fn();
    const deleteSingleTaskHandler = vi.fn();

    render(
      <TaskList
        tasks={mockPosts}
        updateTaskCompletion={updateTaskCompletion}
        deleteSingleTaskHandler={deleteSingleTaskHandler}
      />,
    );

    const todoList = screen.getByRole('heading', { name: /to do/i });
    const doneList = screen.getByRole('heading', { name: /done/i });

    expect(todoList).toBeInTheDocument();
    expect(doneList).toBeInTheDocument();
  });

  it('renders the correct amount of tasks for each section', () => {
    const updateTaskCompletion = vi.fn();
    const deleteSingleTaskHandler = vi.fn();

    render(
      <TaskList
        tasks={mockPosts}
        updateTaskCompletion={updateTaskCompletion}
        deleteSingleTaskHandler={deleteSingleTaskHandler}
      />,
    );

    const incompleteTasks = screen.getAllByRole('checkbox', {
      checked: false,
    });
    const completedTasks = screen.getAllByRole('checkbox', { checked: true });

    expect(incompleteTasks).toHaveLength(1);
    expect(completedTasks).toHaveLength(2);
  });
});
