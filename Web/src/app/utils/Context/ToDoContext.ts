import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type ToDoContextType = {
  filterCompleted: boolean;
  setFilterCompleted: Dispatch<SetStateAction<boolean>>;
};

const toDoContextDefaults: ToDoContextType = {
  filterCompleted: false,
  setFilterCompleted: () => {}
}

const ToDoContext = createContext<ToDoContextType>(toDoContextDefaults);

export default ToDoContext;