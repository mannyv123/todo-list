import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import TaskListUI from './TaskListUI';
import { mockPosts } from '../../tests/mocks/handlers';
import { customRender } from '../../tests/test-utils';

const incompletedTasks = mockPosts.filter((task) => task.completed === false);
const completedTasks = mockPosts.filter((task) => task.completed === true);

describe('TaskListUI', () => {
  it('renders headings correclty', () => {
    customRender(
      <TaskListUI
        incompletedTasks={incompletedTasks}
        completedTasks={completedTasks}
      />,
    );

    const todoList = screen.getByRole('heading', { name: /to do/i });
    const doneList = screen.getByRole('heading', { name: /done/i });

    expect(todoList).toBeInTheDocument();
    expect(doneList).toBeInTheDocument();
  });

  it('renders the correct amount of tasks for each section', () => {
    customRender(
      <TaskListUI
        incompletedTasks={incompletedTasks}
        completedTasks={completedTasks}
      />,
    );

    expect(incompletedTasks).toHaveLength(1);
    expect(completedTasks).toHaveLength(2);
  });
});
