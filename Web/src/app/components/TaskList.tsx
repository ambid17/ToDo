import { useState } from "react";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { TaskDto, TaskListDto } from "../utils/types";
import Task from "./Task";
import { FaRegEdit, FaCheck } from "react-icons/fa";
import { MdBlock } from 'react-icons/md';

type TaskListProps = {
  taskList: TaskListDto;
};

export default function TaskList({ taskList }: TaskListProps) {
  const [isEditingTaskList, setIsEditingTaskList] = useState<boolean>(false);
  const [taskListName, setTaskListName] = useState<string>(taskList.listName);
  const [showAddTaskForm, setShowAddTaskForm] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>("");

  function getTaskListHeader() {
    if (isEditingTaskList) {
      return (
        <Form className="w-full flex flex-row justify-around  p-2">
          <FormControl
            type="text"
            value={taskListName}
            onChange={(e) => setTaskListName(e.target.value)}
          ></FormControl>
          <Button onClick={() => setIsEditingTaskList(false)}>
            <FaCheck />
          </Button>
        </Form>
      );
    }

    return (
      <div className="flex flex-row justify-around my-2">
        <FormLabel>{taskListName}</FormLabel>
        <Button onClick={() => setIsEditingTaskList(true)}>
          <FaRegEdit size={16}/>
        </Button>
      </div>
    );
  }

  function addTask(event: any){
    event.preventDefault();
     setShowAddTaskForm(false);
     // TODO run mutation
  }

  function getNewTaskForm(){
    if(!showAddTaskForm){
        return;
    }
    return (
        <Form className="w-full flex flex-row justify-around  p-2" onSubmit={(e) => addTask(e)}>
          <FormControl
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          ></FormControl>
          <Button onClick={() => setShowAddTaskForm(false)}>
            <MdBlock />
          </Button>
        </Form>
    )
  }

  return (
    <div className="flex flex-col min-w-60 max-w-72">
      {getTaskListHeader()}
      {taskList.tasks.map((task) => (
        <Task task={task}></Task>
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
