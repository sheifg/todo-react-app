import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import ModalForm from "./ModalForm";

import {
  addTodoApi,
  deleteTodoApi,
  editTodoApi,
  getTodos,
  patchTodoDone,
} from "../helper/api";
import { Button } from "reactstrap";

const Home = () => {
  const [todos, setTodos] = useState([]);

  const [isModalShown, setIsModalShown] = useState(false);

  // null means explicitly that editedTodo has no value
  // It is created to have the value that it is being edited and also to use to alternate between "add" and "edit" in the modal form
  const [editedTodo, setEditedTodo] = useState(null);

  useEffect(() => {
    async function fetchTodos() {
      const todos = await getTodos();
      console.log(todos);
      setTodos(todos);
    }
    fetchTodos();
  }, []);

  const showModalForm = () => {
    setIsModalShown(true);
  };
  const hideModalForm = () => {
    setIsModalShown(false);
    setEditedTodo(null);
  };

  const addNewTodo = async (todoToStore) => {
    const storedTodo = await addTodoApi(todoToStore);
    // With the spread operator it is spreading the current value of the todos inisde in an array and then it is adding the new todo that it is being created with this function
    setTodos([...todos, storedTodo]);
  };

  const editTodo = async (updatedTodo) => {
    await editTodoApi(updatedTodo);
    const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
    // Making a copy of todos to include the updated todo
    let updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    setTodos(updatedTodos);
  };

  const deleteTask = async (id) => {
    await deleteTodoApi(id);
    const filteredTasks = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTasks);
  };

  const toggleTodoCompletion = async (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const todo = todos[index];
    todo.done = !todo.done;

    await patchTodoDone(todo.id, todo.done);

    const updatedTodos = [...todos];
    updatedTodos[index] = todo;
    setTodos(updatedTodos);
  };

  // Open the modal form and show edit mode in the todo that it is being clicked the edit button
  const showEditMode = (todo) => {
    setEditedTodo(todo);
    showModalForm();
  };

  return (
    <div>
      <div className="m-2 d-flex justify-content-end">
        <Button onClick={showModalForm} color="primary">Add</Button>
      </div>
      <TodoList
        todos={todos}
        onDeleteButtonClick={deleteTask}
        onEditButtonClick={showEditMode}
        onCheckboxClick={toggleTodoCompletion}
      />
      <ModalForm
        onTaskCreation={addNewTodo}
        onTaskEdition={editTodo}
        isShown={isModalShown}
        onClose={hideModalForm}
        editedTodo={editedTodo}
      />
    </div>
  );
};

export default Home;
