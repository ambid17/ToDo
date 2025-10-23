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
import { useDeleteTaskListMutation } from "./mutations";
import TaskListHeader from "./TaskListHeader";

type TaskListProps = {
  taskList: TaskListDto;
};

export default function TaskList({ taskList }: TaskListProps) {
  const [showAddTaskForm, setShowAddTaskForm] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>("");

  // reset to default state if our backing data changes
  useEffect(() => {
    setShowAddTaskForm(false);
    setNewTaskName("");
  }, [taskList]);

  

  function getTaskListHeader() {}

  function addTask(event: any) {
    event.preventDefault();
    setShowAddTaskForm(false);
    // TODO run mutation
  }

  function getNewTaskForm() {
    if (!showAddTaskForm) {
      return;
    }
    return (
      <Form
        className="w-full flex flex-row justify-around  p-2"
        onSubmit={(e) => addTask(e)}
      >
        <FormControl
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        ></FormControl>
        <Button onClick={() => setShowAddTaskForm(false)}>
          <MdBlock />
        </Button>
      </Form>
    );
  }

  return (
    <div className="flex flex-col min-w-60 max-w-72 border rounded-md p-4">
      <TaskListHeader
        taskList={taskList}
      />
      {taskList.tasks.map((task) => (
        <Task task={task} key={task.id.toString()}></Task>
      ))}
      {getNewTaskForm()}

      <Button
        variant="primary"
        className="text-sm m-4"
        onClick={() => setShowAddTaskForm(true)}
      >
        <span>+ Add a card</span>
      </Button>
    </div>
  );
}
