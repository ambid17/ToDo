"use client";
import Image from "next/image";
import ListContainer from "../../components/ListContainer";
import { FormEvent, useEffect, useState } from "react";
import TaskList from "../../components/TaskList/TaskList";
import { TaskListDto } from "../../utils/types";
import { mockTaskList } from "../../utils/mockData";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import ProjectBoardSkeleton from "./ProjectBoardSkeleton";
import { useGetProjectBoardQuery } from "./queries";
import { useAddTaskListMutation } from "./mutations";

export default function ProjectBoard() {
  const [taskLists, setTaskLists] = useState<TaskListDto[]>([]);
  const [isAddingTaskList, setIsEditingTaskList] = useState<boolean>(false);
  const [newTaskListName, setNewTaskListName] = useState<string>("");
  const { isPending, error, data } = useGetProjectBoardQuery();
  const addTaskListMutation = useAddTaskListMutation();

  useEffect(() => {
    if (!isPending && !error) {
      setTaskLists(data ?? []);
    }
  }, [isPending]);

  function createTaskList(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setIsEditingTaskList(false);

    const newTaskList: TaskListDto = {
        id: 0,
        name: newTaskListName,
    }
    addTaskListMutation.mutate(newTaskList);
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

  if(isPending){
    return (<ProjectBoardSkeleton/>)
  }

  // If the API isn't started or available, give a mock dataset to prove the UI functionality with.
  if(error){
    setTaskLists(mockTaskList);
  }

  return (
    <ListContainer>
      {taskLists?.map((taskList) => (
        <TaskList key={taskList.id.toString()} taskList={taskList} />
      ))}
      {getNewTaskContainer()}
    </ListContainer>
  );
}
