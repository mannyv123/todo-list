import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import TaskItemUI from './TaskItemUI';
import { mockPosts } from '../../tests/mocks/handlers';
import { Task } from '../../utils/types';

const mockTask: Task = mockPosts[0];

describe('TaskItemUI', () => {
  it('renders task item correctly', () => {
    const handleTaskCompletionChange = vi.fn();
    const handleSingleTaskDelete = vi.fn();

    render(
      <TaskItemUI
        task={mockTask}
        handleTaskCompletionChange={handleTaskCompletionChange}
        handleSingleTaskDelete={handleSingleTaskDelete}
      />,
    );

    //Ensure task text is displayed
    const taskDesc = screen.getByText(/Task 1/i);
    expect(taskDesc).toBeInTheDocument();

    //Ensure checkbox is present and is unchecked
    const checkbox = screen.getByRole('checkbox', { name: /Task 1/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    //Ensure delete icon is present when hovering
    const deleteIcon = screen.getByRole('img');
    fireEvent.mouseOver(deleteIcon);
    expect(deleteIcon).toBeVisible();
  });

  it('should call handleTaskCompletionChange when checkbox is clicked', () => {
    const handleTaskCompletionChange = vi.fn();
    const handleSingleTaskDelete = vi.fn();

    render(
      <TaskItemUI
        task={mockTask}
        handleTaskCompletionChange={handleTaskCompletionChange}
        handleSingleTaskDelete={handleSingleTaskDelete}
      />,
    );

    const checkbox = screen.getByRole('checkbox', { name: /Task 1/i });

    fireEvent.click(checkbox);
    expect(handleTaskCompletionChange).toHaveBeenCalledWith('1');
  });

  it('should call handleSingleTaskDelete when the delete icon is clicked', () => {
    const handleTaskCompletionChange = vi.fn();
    const handleSingleTaskDelete = vi.fn();

    render(
      <TaskItemUI
        task={mockTask}
        handleTaskCompletionChange={handleTaskCompletionChange}
        handleSingleTaskDelete={handleSingleTaskDelete}
      />,
    );

    const deleteIcon = screen.getByRole('img');

    fireEvent.click(deleteIcon);
    expect(handleSingleTaskDelete).toHaveBeenCalledWith('1');
  });
});
