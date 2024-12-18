import React, { useState, createRef } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "../react-transition-group";
// import uuid from "uuid";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

function TransitionGroupPage() {
  const [items, setItems] = useState(() => [
    {
      id: uuidv4(),
      text: "吃饭",
      nodeRef: createRef(null),
    },
    {
      id: uuidv4(),
      text: "睡觉",
      nodeRef: createRef(null),
    },
    {
      id: uuidv4(),
      text: "打豆豆",
      nodeRef: createRef(null),
    },
  ]);
  return (
    <Container>
      <ListGroup>
        <TransitionGroup>
          {items.map(({ id, text, nodeRef }) => (
            <CSSTransition
              key={id}
              nodeRef={nodeRef}
              timeout={500}
              classNames="item"
            >
              <ListGroup.Item ref={nodeRef}>
                <Button
                  style={{ marginRight: "10px" }}
                  onClick={() =>
                    setItems((items) => items.filter((item) => item.id !== id))
                  }
                >
                  &times;
                </Button>
                {text}
              </ListGroup.Item>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
      <Button
        onClick={() => {
          setItems((items) => [
            ...items,
            { id: uuidv4(), text: items.length, nodeRef: createRef(null) },
          ]);
        }}
      >
        Add Item
      </Button>
    </Container>
  );
}

export default TransitionGroupPage;
