import { env } from "@/app/utils/env";
import { TaskDto } from "@/app/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();
  const updateTask = (task: TaskDto) => {
    return axios.put(`${env.apiUrl}/Tasks/Task`, task);
  };

  const mutation = useMutation({
    mutationFn: (task: TaskDto) => updateTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskLists"], refetchType: "all" });
    },
  });

  return mutation;
};