import { describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import TaskItem from "../components/TaskItem/TaskItem";

describe("TaskItem", () => {
    it("renders task item correctly", () => {
        const task = {
            _id: "1",
            task: "Example task",
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const handleTaskCompletionChange = vi.fn();
        handleTaskCompletionChange("1");

        render(<TaskItem task={task} handleTaskCompletionChange={handleTaskCompletionChange} />);

        const taskDesc = screen.getByText(/example task/i);
        expect(taskDesc).toBeInTheDocument();

        const checkbox = screen.getByRole("checkbox", { name: /example task/i });
        expect(checkbox).not.toBeChecked();

        fireEvent.change(checkbox);
        expect(handleTaskCompletionChange).toHaveBeenCalledWith("1");
    });
});
