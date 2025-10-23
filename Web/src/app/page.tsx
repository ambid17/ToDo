"use client";
import Image from "next/image";
import ListContainer from "./components/ListContainer";
import { FormEvent, useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import { TaskListDto } from "./utils/types";
import { mockTaskList } from "./utils/mockData";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useGetTaskListsQuery } from "./components/queries";

export default function Home() {
  const [taskLists, setTaskLists] = useState<TaskListDto[]>(mockTaskList);
  const [isAddingTaskList, setIsEditingTaskList] = useState<boolean>(false);
  const [newTaskListName, setNewTaskListName] = useState<string>("");
  const { isPending, error, data } = useGetTaskListsQuery();

  useEffect(() => {
    if(!isPending && !error){
      setTaskLists(data ?? [])
    }
  }, [isPending])

  function createTaskList(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setIsEditingTaskList(false);
    // TODO: mutation
  }

  function getNewTaskContainer() {
    if (!isAddingTaskList) {
      return (
        <Button onClick={() => setIsEditingTaskList(true)}>
          + Add new List
        </Button>
      );
    }

    return (
      <Form className="flex flex-row" onSubmit={(e) => createTaskList(e)}>
        <FormControl
          type="text"
          value={newTaskListName}
          onChange={(e) => setNewTaskListName(e.target.value)}
        />
        <Button onClick={(e) => createTaskList()} className="m-1">
          <FaCheck />
        </Button>
        <Button
          onClick={() => {
            setNewTaskListName("");
            setIsEditingTaskList(false);
          }}
          className="m-1"
        >
          <MdCancel />
        </Button>
      </Form>
    );
  }

  return (
    <div className="">
      <ListContainer>
        {taskLists?.map((taskList) => (
          <TaskList key={taskList.id.toString()} taskList={taskList} />
        ))}
        {getNewTaskContainer()}
      </ListContainer>
    </div>
  );
}
