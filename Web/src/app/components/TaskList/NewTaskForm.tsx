import { TaskDto, TaskListDto } from "@/app/utils/types";
import { FormEvent, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { MdBlock } from "react-icons/md";
import { useCreateTaskMutation } from "./mutations";

type NewTaskFormProps = {
  taskList: TaskListDto;
  showCreateTaskForm: boolean;
  setShowCreateTaskForm(show: boolean): void;
};

export default function NewTaskForm({
  taskList,
  showCreateTaskForm,
  setShowCreateTaskForm,
}: NewTaskFormProps) {
  const [newTaskName, setNewTaskName] = useState<string>("");
  const createTaskMutation = useCreateTaskMutation();

  function createTask(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    
    var newTask: TaskDto = {
      id: 0,
      taskName: newTaskName,
      isCompleted: false,
      taskListId: taskList.id,
    };

    createTaskMutation.mutate(newTask);
    setNewTaskName("");
  }

  if (!showCreateTaskForm) {
    return <></>;
  }
  return (
    <Form
      className="w-full flex flex-row justify-around  p-2"
      onSubmit={(e) => createTask(e)}
    >
      <FormControl
        type="text"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      ></FormControl>
      <Button onClick={() => setShowCreateTaskForm(false)}>
        <MdBlock />
      </Button>
    </Form>
  );
}
