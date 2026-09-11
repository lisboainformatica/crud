export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
  dueDate?: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
}

export interface UpdateTaskDto {
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
}
