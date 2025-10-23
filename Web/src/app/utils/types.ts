export type TaskListDto = {
  id: number;
  tasks : TaskDto[];
  listName: string;
}

export type TaskDto = {
  id: number;
  taskListId: number;
  taskName: string;
  dueDate?: Date;
}