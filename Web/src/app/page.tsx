"use client";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import ToDoContextProvider from "./components/TodoContextProvider";
import ToDoNavbar from "./components/ToDoNavbar";

export default function Home() {
  return (
    <ToDoContextProvider>
      <ToDoNavbar />
      <ProjectBoard />
    </ToDoContextProvider>
  );
}
