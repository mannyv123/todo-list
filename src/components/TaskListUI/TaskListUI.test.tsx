import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskListUI from './TaskListUI';
import { mockPosts } from '../../tests/mocks/handlers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const incompletedTasks = mockPosts.filter((task) => task.completed === false);
const completedTasks = mockPosts.filter((task) => task.completed === true);

describe('TaskListUI', () => {
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
  it('renders headings correclty', () => {
    render(
      <TaskListUI
        incompletedTasks={incompletedTasks}
        completedTasks={completedTasks}
      />,
      { wrapper: createWrapper() },
    );

    const todoList = screen.getByRole('heading', { name: /to do/i });
    const doneList = screen.getByRole('heading', { name: /done/i });

    expect(todoList).toBeInTheDocument();
    expect(doneList).toBeInTheDocument();
  });

  it('renders the correct amount of tasks for each section', () => {
    render(
      <TaskListUI
        incompletedTasks={incompletedTasks}
        completedTasks={completedTasks}
      />,
      { wrapper: createWrapper() },
    );

    expect(incompletedTasks).toHaveLength(1);
    expect(completedTasks).toHaveLength(2);
  });
});
