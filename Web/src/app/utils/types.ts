export type TaskListDto = {
  id: number;
  tasks? : TaskDto[];
  name: string;
}

export type TaskDto = {
  id: number;
  taskListId: number;
  taskName: string;
  dueDate?: Date;
  isCompleted: boolean;
}