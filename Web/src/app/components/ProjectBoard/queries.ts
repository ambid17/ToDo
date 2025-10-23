import { env } from "@/app/utils/env";
import { TaskListDto } from "@/app/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProjectBoardQuery = () => {
  const fetchItem = (): Promise<TaskListDto[]> =>
    axios
      .get(`${env.apiUrl}/Tasks/TaskLists`)
      .then((response) => response.data);

  const { isPending, error, data } = useQuery({
    queryKey: ["taskLists"],
    queryFn: fetchItem,
  });

  return { isPending, error, data };
};