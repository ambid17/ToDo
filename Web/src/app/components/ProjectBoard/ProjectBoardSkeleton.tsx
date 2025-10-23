import ListContainer from "../ListContainer";
import TaskListSkeleton from "../TaskList/TaskListSkeleton";

export default function ProjectBoardSkeleton() {
  return (
    <ListContainer>
      <TaskListSkeleton />
    </ListContainer>
  );
}
