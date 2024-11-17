import { FaCheck, FaTrash } from "react-icons/fa";
import { ListGroupItem } from "reactstrap";
import { MdOutlineRemoveDone } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Todo = ({
  todo,
  onDeleteButtonClick,
  onEditButtonClick,
  onCheckboxClick,
}) => {
  const handleCompletionClick = () => {
    onCheckboxClick(todo.id);
  };

  const handleDeletionClick = () => {
    onDeleteButtonClick(todo.id);
  };

  const handleEditionClick = () => {
    onEditButtonClick(todo);
  };

  return (
    <ListGroupItem className="d-flex justify-content-between align-item-center">
      <div className={todo.done ? "completed" : ""}>
        <span>{todo.task}</span>
        <br />
        <span>{todo.description}</span>
      </div>
      <div className="icon-container">
        {todo.done ? (
          <MdOutlineRemoveDone
            className="me-3 undone-icon"
            onClick={handleCompletionClick}
          />
        ) : (
          <FaCheck className="me-3 done-icon" onClick={handleCompletionClick} />
        )}
        <CiEdit className="me-3 undone-icon" onClick={handleEditionClick} />
        <FaTrash className="me-3 trash-icon" onClick={handleDeletionClick} />
      </div>
    </ListGroupItem>
  );
};

export default Todo;
