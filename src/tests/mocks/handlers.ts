import { rest } from 'msw';

const API_BASE_URL = 'http://localhost:3001';

//Mock data
export let mockPosts = [
  {
    _id: '1',
    task: 'Task 1',
    completed: false,
    createdAt: new Date('2023-09-02T20:44:24.326Z'),
    updatedAt: new Date('2023-09-02T20:44:24.326Z'),
  },
  {
    _id: '2',
    task: 'Task 2',
    completed: true,
    createdAt: new Date('2023-09-03T20:44:24.326Z'),
    updatedAt: new Date('2023-09-03T20:44:24.326Z'),
  },
  {
    _id: '3',
    task: 'Task 3',
    completed: true,
    createdAt: new Date('2023-09-04T20:44:24.326Z'),
    updatedAt: new Date('2023-09-04T20:44:24.326Z'),
  },
];

//Handlers that catch the corresponding requests and returns the mock data
export const handlers = [
  //Get all tasks endpoint
  rest.get(`${API_BASE_URL}/api/tasks/`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockPosts));
  }),
  //Add new task endpoint
  rest.post(`${API_BASE_URL}/api/tasks/`, async (req, res, ctx) => {
    const newTask: string = await req.json();
    const newTaskId = String(mockPosts.length + 1);
    const taskToAdd = {
      _id: newTaskId,
      task: newTask,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockPosts.push(taskToAdd);
    return res(ctx.status(201), ctx.json(taskToAdd));
  }),
  //Change task completion status endpoint
  rest.put(`${API_BASE_URL}/api/tasks/:taskId`, (req, res, ctx) => {
    //Extract taskId from the req params
    const { taskId } = req.params;
    //Find the task with the matching _id in mock data
    const taskToUpdate = mockPosts.find((task) => task._id === taskId);
    //If task not found, return 404 response
    if (!taskToUpdate) {
      return res(ctx.status(404), ctx.json({ message: 'Task not found' }));
    }
    //Update task completion status
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
    //Update task in mock data
    mockPosts = mockPosts.map((task) =>
      task._id === taskId ? updatedTask : task,
    );
    //Return response with updated task
    return res(ctx.status(200), ctx.json(updatedTask));
  }),
  //Delete all tasks endpoint
  rest.delete(`${API_BASE_URL}/api/tasks/`, (_req, res, ctx) => {
    //Set mock data to equal an empty array
    mockPosts = [];
    //Return response with successful message
    return res(ctx.status(200), ctx.json({ message: 'All tasks deleted' }));
  }),
  //Delete single task endpoint
  rest.delete(`${API_BASE_URL}/api/tasks/:taskId`, (req, res, ctx) => {
    //Extract taskId from the req params
    const { taskId } = req.params;
    //Find index of task with the matching _id in mock data
    const taskIndex = mockPosts.findIndex((task) => task._id === taskId);
    //Return 404 response if task not found
    if (taskIndex === -1) {
      return res(ctx.status(404), ctx.json({ message: 'Task not found' }));
    }
    //Remove task from mockPosts array
    mockPosts.splice(taskIndex, 1);
    //Return response indicating successful deletion
    return res(ctx.status(200), ctx.json({ message: 'Task deleted' }));
  }),
];
