import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

const ModalForm = ({
  onTaskCreation,
  onTaskEdition,
  isShown,
  onClose,
  editedTodo,
}) => {
  const isEditMode = editedTodo !== null;

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);

  // Every time that editedTodo changes, useEffect is calling and is requesting data
  // At the start of the modal form if there is editable data, it should fill form inputs with data itself, otherwise it should be empty for creating todo

  useEffect(() => {
    setTask(isEditMode ? editedTodo.task : "");
    setDescription(isEditMode ? editedTodo.description : "");
    setDone(isEditMode ? editedTodo.done : false);
  }, [editedTodo]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // It is needed to create a todo that collects the information from the form when the form is submitted and then also needed to close the modal
    const todo = {
      task: task,
      description: description,
      done: done,
    };

    if (isEditMode) {
      todo.id = editedTodo.id;
    }
    // Adding/Updating the new todo with the info from form to the rest of the todos
    isEditMode ? onTaskEdition(todo) : onTaskCreation(todo);

    onClose();
  };

  const actionLabel = isEditMode ? "Edit" : "Add";

  return (
    <>
      {/* <Modal show={isShown} onHide={onClose}> */}
      <Modal show={isShown} onHide={onClose}>
        <ModalHeader closeButton={onClose}>{actionLabel} ToDo</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <Label>Enter a task</Label>
              <Input
                type="text"
                name="task"
                id="task"
                value={task}
                onChange={(event) => setTask(event.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label>Enter a description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label check>
                <Input
                  type="checkbox"
                  name="done"
                  id="done"
                  checked={done}
                  onChange={(event) => setDone(event.target.checked)}
                />
                Done
              </Label>
            </FormGroup>
            <div className="d-flex justify-content-end">
              <Button color="primary" type="submit" className="me-4">
                {actionLabel}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalForm;
