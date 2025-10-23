import { env } from "@/app/utils/env";
import { TaskListDto } from "@/app/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteTaskListMutation = () => {
  const queryClient = useQueryClient();
  const addTaskList = (taskListId: number) => {
    return axios.delete(`${env.apiUrl}/Task/TaskList/${taskListId}`);
  };

  const mutation = useMutation({
    mutationFn: (taskListId: number) => addTaskList(taskListId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskLists"], refetchType: "all" });
    },
  });

  return mutation;
};

export const useUpdateTaskListMutation = () => {
  const queryClient = useQueryClient();
  const updateTaskList = (taskList: TaskListDto) => {
    return axios.put(`${env.apiUrl}/Task/TaskList`, taskList);
  };

  const mutation = useMutation({
    mutationFn: (taskList: TaskListDto) => updateTaskList(taskList),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskLists"], refetchType: "all" });
    },
  });

  return mutation;
};