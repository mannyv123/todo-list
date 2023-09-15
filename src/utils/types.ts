//Task definition
export interface Task {
  _id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

//Generic callback function type that accepts a value of any type and returns void
export type UpdateCallback<T> = (value: T) => void;
