import { describe, it } from 'vitest';
import AddTaskContainer from './AddTaskContainer';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

describe('AddTaskContainer', () => {
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

  it('to have been rendered correctly', () => {
    render(<AddTaskContainer />, { wrapper: createWrapper() });

    const inputElement = screen.getByPlaceholderText('New task..');

    const submitButton = screen.getByText('Add');

    //Assert that elements are in the document

    expect(inputElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
