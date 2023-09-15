import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import TaskItem from '../TaskItem/TaskItem';
import { mockPosts } from '../tests/mocks/handlers';
import { Task } from '../utils/types';

const mockTask: Task = mockPosts[0];

describe('TaskItem', () => {
  it('renders task item correctly', () => {
    const updateTaskCompletion = vi.fn();
    const deleteSingleTaskHandler = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        updateTaskCompletion={updateTaskCompletion}
        deleteSingleTaskHandler={deleteSingleTaskHandler}
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

  it('should call updateTaskCompletion when checkbox is clicked', () => {
    const updateTaskCompletion = vi.fn();
    const deleteSingleTaskHandler = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        updateTaskCompletion={updateTaskCompletion}
        deleteSingleTaskHandler={deleteSingleTaskHandler}
      />,
    );

    const checkbox = screen.getByRole('checkbox', { name: /Task 1/i });

    fireEvent.click(checkbox);
    expect(updateTaskCompletion).toHaveBeenCalledWith('1');
  });

  it('should call deleteSingleTaskHandler when the delete icon is clicked', () => {
    const updateTaskCompletion = vi.fn();
    const deleteSingleTaskHandler = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        updateTaskCompletion={updateTaskCompletion}
        deleteSingleTaskHandler={deleteSingleTaskHandler}
      />,
    );

    const deleteIcon = screen.getByRole('img');

    fireEvent.click(deleteIcon);
    expect(deleteSingleTaskHandler).toHaveBeenCalledWith('1');
  });
});
