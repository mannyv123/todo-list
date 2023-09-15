import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskListUI from './TaskListUI';
import { mockPosts } from '../../tests/mocks/handlers';

const incompletedTasks = mockPosts.filter((task) => task.completed === false);
const completedTasks = mockPosts.filter((task) => task.completed === true);

describe('TaskListUI', () => {
  it('renders headings correclty', () => {
    const updateTaskCompletion = vi.fn();
    const deleteSingleTaskHandler = vi.fn();

    render(
      <TaskListUI
        incompletedTasks={incompletedTasks}
        completedTasks={completedTasks}
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
      <TaskListUI
        incompletedTasks={incompletedTasks}
        completedTasks={completedTasks}
        updateTaskCompletion={updateTaskCompletion}
        deleteSingleTaskHandler={deleteSingleTaskHandler}
      />,
    );

    expect(incompletedTasks).toHaveLength(1);
    expect(completedTasks).toHaveLength(2);
  });
});
