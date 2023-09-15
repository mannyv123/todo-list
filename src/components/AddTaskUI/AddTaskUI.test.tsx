import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AddTaskUI from './AddTaskUI';

describe('AddTaskUI', () => {
  it('renders the input field and button correclty', () => {
    const handleTaskInput = vi.fn();
    render(
      <AddTaskUI
        isBlank={false}
        handleTaskInput={handleTaskInput}
        newTask=""
      />,
    );

    const inputElement = screen.getByPlaceholderText('New task..');
    const addButton = screen.getByText('Add');

    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it('calls handleTaskInput when input value changes', () => {
    const handleTaskInput = vi.fn();

    render(
      <AddTaskUI
        isBlank={false}
        handleTaskInput={handleTaskInput}
        newTask=""
      />,
    );

    const inputElement = screen.getByPlaceholderText('New task..');
    fireEvent.change(inputElement, {
      target: { value: 'New task description' },
    });

    expect(handleTaskInput).toHaveBeenCalledWith('New task description');
  });
});
