import { useState, useRef } from "react";
import { SwitchTransition, CSSTransition } from "../react-transition-group";
import "./index.css";

function SwitchTransitionPage() {
  const [state, setState] = useState(true);
  const helloRef = useRef(null);
  const goodbyeRef = useRef(null);
  const nodeRef = state ? goodbyeRef : helloRef;
  const buttonStyle = {
    width: "200px",
    height: "80px",
    fontSize: "40px",
    border: "none",
    backgroundColor: "green",
    color: "white",
  };

  return (
    <SwitchTransition>
      <CSSTransition
        key={state}
        nodeRef={nodeRef}
        timeout={2000}
        classNames="panel"
      >
        <button
          ref={nodeRef}
          style={buttonStyle}
          onClick={() => setState((state) => !state)}
        >
          {state ? "A" : "B"}
        </button>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default SwitchTransitionPage;
