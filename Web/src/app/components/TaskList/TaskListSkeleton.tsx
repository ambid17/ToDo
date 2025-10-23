import { Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

export default function TaskListSkeleton() {
  return (
    <div className="flex flex-col min-w-60 max-w-72 border rounded-md p-4">
      <div className="w-full flex flex-row justify-around  p-2">
          <Skeleton/>
          <Button>
            <FaCheck />
          </Button>
        </div>
      <Skeleton/>
      <Skeleton/>
      <Skeleton/>

      <Button
        variant="primary"
        className="text-sm m-4"
      >
        <span>+ Add a card</span>
      </Button>
    </div>
  );
}
