import { Col, Container, ListGroup, Row } from "reactstrap";
import Todo from "./Todo";

const TodoList = ({
  todos,
  onDeleteButtonClick,
  onEditButtonClick,
  onCheckboxClick,
}) => {
  return (
    <Container>
      <Row className="mt-3">
        {/* offset minimum 3 items comes */}
        <Col md={{ size: 6, offset: 3 }}>
          {/* Bootstrap ListGroup: a flexible and powerful component for displaying a series of content */}
          <ListGroup>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onDeleteButtonClick={onDeleteButtonClick}
                onEditButtonClick={onEditButtonClick}
                onCheckboxClick={onCheckboxClick}
              />
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
