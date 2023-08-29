import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import TaskItem from '../components/TaskItemContainer';

describe('TaskItem', () => {
  it('renders task item correctly', () => {
    const task = {
      _id: '1',
      task: 'Example task',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const handleTaskCompletionChange = vi.fn();
    const handleSingleTaskDelete = vi.fn();

    render(
      <TaskItem
        task={task}
        handleTaskCompletionChange={handleTaskCompletionChange}
        handleSingleTaskDelete={handleSingleTaskDelete}
      />,
    );

    const taskDesc = screen.getByText(/example task/i);
    expect(taskDesc).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /example task/i });
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(handleTaskCompletionChange).toHaveBeenCalled();
    expect(handleTaskCompletionChange).toHaveBeenCalledWith('1');

    const deleteIcon = screen.getByRole('img');
    fireEvent.mouseOver(deleteIcon);
    expect(deleteIcon).toBeVisible();

    fireEvent.click(deleteIcon);
    expect(handleSingleTaskDelete).toHaveBeenCalledWith('1');
  });
});
