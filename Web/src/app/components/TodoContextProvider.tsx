import { useState } from "react";
import React from "react";
import ToDoContext from "../utils/Context/ToDoContext";

type ToDoProviderProps = {
  children: React.ReactNode;
};

export default function ToDoContextProvider({ children }: ToDoProviderProps) {
  const [filterCompleted, setFilterCompleted] = useState<boolean>(false);

  const value = {
    filterCompleted,
    setFilterCompleted,
  };

  return (
    <>
      <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>
    </>
  );
}
