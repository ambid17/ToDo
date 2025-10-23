import { env } from "@/app/utils/env";
import { TaskListDto } from "@/app/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddTaskListMutation = () => {
  const queryClient = useQueryClient();
  const addTaskList = (taskList: TaskListDto) => {
    return axios.post(`${env.apiUrl}/Task/TaskList`, taskList);
  };

  const mutation = useMutation({
    mutationFn: (taskList: TaskListDto) => addTaskList(taskList),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskLists"], refetchType: "all" });
    },
  });

  return mutation;
};