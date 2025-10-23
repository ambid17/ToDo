import { Form, FormControl } from "react-bootstrap";
import { TaskDto } from "../utils/types";
import { useState } from "react";

type TaskProps = {
    task: TaskDto;
}

export default function Task({task}:TaskProps){
    const [taskName, setTaskName] = useState<string>(task.taskName);
    return (
        <Form>
            <FormControl value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        </Form>
    )
}