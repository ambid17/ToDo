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
import CreateTaskList from "./CreateTaskList";

export default function ProjectBoard() {
  const [formTaskLists, setFormTaskLists] = useState<TaskListDto[]>([]);
  const { isPending, error, data: serverTaskList } = useGetProjectBoardQuery();

  // Splitting out the reference to the server's taskLists and our local copy of them.
  // This enables features such as "discard changes" with minimal changes.
  useEffect(() => {
    if (!isPending && !error) {
      setFormTaskLists(serverTaskList ?? []);
    }
  }, [JSON.stringify(serverTaskList)]);
  

  if(isPending){
    return (<ProjectBoardSkeleton/>)
  }

  // If the API isn't started or available, give a mock dataset to prove the UI functionality with.
  if(error){
    setFormTaskLists(mockTaskList);
  }

  return (
    <ListContainer>
      {formTaskLists?.map((taskList) => (
        <TaskList key={taskList.id.toString()} taskList={taskList} />
      ))}
      <CreateTaskList/>
    </ListContainer>
  );
}
