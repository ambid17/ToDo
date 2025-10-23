import { TaskDto, TaskListDto } from "./types";

export const mockTaskList: TaskListDto[] = [
  {
    id: 1,
    listName: "Chores",
    tasks: [
      {
        id: 1,
        taskListId: 1,
        taskName: "Clean Garage",
        dueDate: new Date(),
      } as TaskDto,
      {
        id: 2,
        taskListId: 1,
        taskName: "Rake Leaves",
        dueDate: new Date(),
      } as TaskDto,
    ] as TaskDto[],
  },
  {
    id: 2,
    listName: "Finances",
    tasks: [
      {
        id: 3,
        taskListId: 2,
        taskName: "Pay Taxes",
        dueDate: new Date(),
      } as TaskDto,
      {
        id: 4,
        taskListId: 2,
        taskName: "Update Budget",
        dueDate: new Date(),
      } as TaskDto,
    ] as TaskDto[],
  },
];
