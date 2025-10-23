import { env } from "@/app/utils/env";
import { TaskListDto } from "@/app/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteTaskListMutation = () => {
  const queryClient = useQueryClient();
  const addTaskList = (taskListId: number) => {
    return axios.delete(`${env.apiUrl}/Task/DeleteTaskList/${taskListId}`);
  };

  const mutation = useMutation({
    mutationFn: (taskListId: number) => addTaskList(taskListId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskLists"], refetchType: "all" });
    },
  });

  return mutation;
};