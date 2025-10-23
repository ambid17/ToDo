import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { TaskDto, TaskListDto } from "../../utils/types";
import Task from "../Task/Task";
import { FaCheck } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useCreateTaskMutation, useDeleteTaskListMutation } from "./mutations";
import TaskListHeader from "./TaskListHeader";
import NewTaskForm from "./NewTaskForm";

type TaskListProps = {
  taskList: TaskListDto;
};

export default function TaskList({ taskList }: TaskListProps) {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false);

  // reset to default state if our backing data changes
  useEffect(() => {
    setShowCreateTaskForm(false);
  }, [taskList]);

  function getTaskListHeader() {}

  function addTask(event: any) {
    event.preventDefault();
    setShowCreateTaskForm(false);
    // TODO run mutation
  }

  return (
    <div className="flex flex-col min-w-60 max-w-72 border rounded-md p-4">
      <TaskListHeader taskList={taskList} />
      {taskList.tasks?.map((task) => (
        <Task task={task} key={task.id.toString()}></Task>
      ))}
      <NewTaskForm taskList={taskList} showCreateTaskForm={showCreateTaskForm} setShowCreateTaskForm={setShowCreateTaskForm} />

      <Button
        variant="primary"
        className="text-sm m-4"
        onClick={() => setShowCreateTaskForm(true)}
      >
        <span>+ Add a card</span>
      </Button>
    </div>
  );
}
