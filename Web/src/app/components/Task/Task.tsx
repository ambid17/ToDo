import { Form, FormCheck, FormControl } from "react-bootstrap";
import { TaskDto } from "../../utils/types";
import { FormEvent, useEffect, useState } from "react";
import { useUpdateTaskMutation } from "./mutations";

type TaskProps = {
    task: TaskDto;
}

export default function Task({task}:TaskProps){
    const [taskName, setTaskName] = useState<string>("");
    const updateTaskMutation = useUpdateTaskMutation();

    function toggleTaskCompletion(){
        var newTaskState : TaskDto = {
            id : task.id,
            taskListId: task.taskListId,
            isCompleted: !task.isCompleted,
            dueDate: task.dueDate,
            taskName: task.taskName
        }
        updateTaskMutation.mutate(newTaskState);
    }

    function updateTask(event?: FormEvent<HTMLFormElement>){
        event?.preventDefault();
        var newTaskState : TaskDto = {
            id : task.id,
            taskListId: task.taskListId,
            isCompleted: task.isCompleted,
            dueDate: task.dueDate,
            taskName: taskName
        }
        updateTaskMutation.mutate(newTaskState);
    }

    useEffect(() => {
        setTaskName(task.taskName)
    }, [task])
    return (
        <Form className="flex items-center gap-2" onSubmit={(e) => updateTask(e)}>
            <FormCheck checked={task.isCompleted} onChange={toggleTaskCompletion}/>
            <FormControl value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        </Form>
    )
}