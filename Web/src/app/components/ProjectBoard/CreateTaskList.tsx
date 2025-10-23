import { TaskListDto } from "@/app/utils/types";
import { FormEvent, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useAddTaskListMutation } from "./mutations";

export default function CreateTaskList() {
  const [isAddingTaskList, setIsAddingTaskList] = useState<boolean>(false);
  const [newTaskListName, setNewTaskListName] = useState<string>("");
  const addTaskListMutation = useAddTaskListMutation();


  function createTaskList(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setIsAddingTaskList(false);
    setNewTaskListName("");

    const newTaskList: TaskListDto = {
      id: 0,
      name: newTaskListName,
    };
    addTaskListMutation.mutate(newTaskList);
  }

  if (!isAddingTaskList) {
    return (
      <Button onClick={() => setIsAddingTaskList(true)} className="whitespace-nowrap">+ Add new List</Button>
    );
  }

  return (
    <Form className="flex flex-row " onSubmit={(e) => createTaskList(e)}>
      <FormControl
        type="text"
        value={newTaskListName}
        onChange={(e) => setNewTaskListName(e.target.value)}
        className="max-w-52 min-w-36"
      />
      <Button onClick={(e) => createTaskList()} className="m-1">
        <FaCheck />
      </Button>
      <Button
        onClick={() => {
          setNewTaskListName("");
          setIsAddingTaskList(false);
        }}
        className="m-1"
      >
        <MdCancel />
      </Button>
    </Form>
  );
}
