import { describe, it, vi } from 'vitest';
import AddTaskContainer from './AddTaskContainer';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('AddTaskContainer', () => {
  it('calls addNew() with task description as argument when form is submitted', async () => {
    const addNew = vi.fn();
    render(<AddTaskContainer addNew={addNew} />);

    //Type a task description in the input field
    const inputElement = screen.getByPlaceholderText('New task..');
    fireEvent.change(inputElement, {
      target: { value: 'New task description' },
    });

    //Click the submit button
    const submitButton = screen.getByText('Add');
    fireEvent.click(submitButton);

    //Assert that addNew() was called with the correct description
    await waitFor(() => {
      expect(addNew).toHaveBeenCalledWith('New task description');
    });
  });
});
