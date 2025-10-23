import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TaskListDto } from "../utils/types";
import { env } from "../utils/env";

export const useGetTaskListsQuery = () => {
  const fetchItem = (): Promise<TaskListDto[]> =>
    axios
      .get(`${env.apiUrl}/Task/TaskLists`)
      .then((response) => response.data);

  const { isPending, error, data } = useQuery({
    queryKey: ["taskLists"],
    queryFn: fetchItem,
  });

  return { isPending, error, data };
};