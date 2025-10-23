import { Form, FormControl } from "react-bootstrap";
import { TaskDto } from "../utils/types";

type TaskProps = {
    task: TaskDto;
}

export default function Task({task}:TaskProps){
    return (
        <Form>
            <FormControl value={task.taskName} />
        </Form>
    )
}