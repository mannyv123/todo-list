import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskList from "../components/TaskList/TaskList";

describe("TaskList", () => {
    const tasks = [
        { _id: "1", task: "Task 1", completed: false, createdAt: new Date(), updatedAt: new Date() },
        { _id: "2", task: "Task 2", completed: true, createdAt: new Date(), updatedAt: new Date() },
    ];

    it("renders headings correclty", () => {
        const handleTaskCompletionChange = vi.fn();

        render(<TaskList tasks={tasks} handleTaskCompletionChange={handleTaskCompletionChange} />);

        const todoList = screen.getByRole("heading", { name: /to do/i });
        const doneList = screen.getByRole("heading", { name: /done/i });

        expect(todoList).toBeInTheDocument();
        expect(doneList).toBeInTheDocument();
    });
});
