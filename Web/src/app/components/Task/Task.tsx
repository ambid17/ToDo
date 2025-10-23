import { Form, FormCheck, FormControl } from "react-bootstrap";
import { TaskDto } from "../../utils/types";
import { useEffect, useState } from "react";
import { useUpdateTaskMutation } from "./mutations";

type TaskProps = {
    task: TaskDto;
}

export default function Task({task}:TaskProps){
    const [taskName, setTaskName] = useState<string>("");
    const updateTaskMutation = useUpdateTaskMutation();

    function toggleTaskCompletion(){
        var newTaskState : TaskDto = task;
        newTaskState.isCompleted = !newTaskState.isCompleted;
        updateTaskMutation.mutate(newTaskState);
    }

    useEffect(() => {
        setTaskName(task.taskName)
    }, [task])
    return (
        <Form className="flex items-center">
            <FormCheck checked={task.isCompleted} onChange={toggleTaskCompletion}/>
            <FormControl value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        </Form>
    )
}