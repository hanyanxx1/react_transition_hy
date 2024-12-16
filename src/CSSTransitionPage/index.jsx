import { useState, useRef } from "react";
import { Container, Button } from "react-bootstrap";
import { CSSTransition } from "../react-transition-group";
import "./index.css";
const duration = 1000;

function CSSTransitionPage() {
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);

  return (
    <Container>
      <CSSTransition
        nodeRef={nodeRef}
        in={inProp}
        timeout={duration}
        classNames="fade"
      >
        <Button className="fade" ref={nodeRef}>
          fade
        </Button>
      </CSSTransition>
      <br />
      <button onClick={() => setInProp(!inProp)}>
        {inProp ? "hide" : "show"}
      </button>
    </Container>
  );
}
export default CSSTransitionPage;
