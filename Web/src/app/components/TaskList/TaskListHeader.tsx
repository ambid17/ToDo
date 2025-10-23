import { TaskListDto } from "@/app/utils/types";
import { FormEvent, useEffect, useState } from "react";
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
import { FaCheck } from "react-icons/fa";
import { useDeleteTaskListMutation, useUpdateTaskListMutation } from "./mutations";

type TaskListHeaderProps = {
  taskList: TaskListDto
};

export default function TaskList({taskList}: TaskListHeaderProps) {
  const [taskListName, setTaskListName] = useState<string>("");
  const [isEditingTaskList, setIsEditingTaskList] = useState<boolean>(false);
  const deleteTaskListMutation = useDeleteTaskListMutation();
  const updateTaskListMutation = useUpdateTaskListMutation();


  useEffect(() => {
    setTaskListName(taskList.name)
    setIsEditingTaskList(false);
  }, [taskList])

  function deleteTaskList() {
    deleteTaskListMutation.mutate(taskList.id);
  }

  function saveTaskListName(event?: FormEvent<HTMLFormElement>){
    event?.preventDefault();

    setIsEditingTaskList(false);

    var newTaskList: TaskListDto = {
        id: taskList.id,
        name: taskListName
    }

    updateTaskListMutation.mutate(newTaskList);
  }


  if (isEditingTaskList) {
    return (
      <Form className="w-full flex flex-row justify-around px-1 py-2 gap-2" onSubmit={(e) => saveTaskListName(e)}>
        <FormControl
          type="text"
          value={taskListName}
          onChange={(e) => setTaskListName(e.target.value)}
          
        ></FormControl>
        <Button onClick={() => saveTaskListName()}>
          <FaCheck />
        </Button>
      </Form>
    );
  }

  return (
    <div className="flex flex-row justify-between my-2 items-center">
      <p className="m-0">{taskListName}</p>
      <Dropdown>
        <DropdownToggle />
        <DropdownMenu>
          <DropdownItem onClick={() => setIsEditingTaskList(true)}>
            Edit
          </DropdownItem>
          <DropdownItem onClick={() => deleteTaskList()}>Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
