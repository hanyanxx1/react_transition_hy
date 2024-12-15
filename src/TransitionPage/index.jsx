import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Transition } from "../react-transition-group/";

//动画的持续时间
const duration = 1000;
//默认样式
const defaultStyle = {
  opacity: 0,
  transition: `opacity ${duration}ms`,
};

const transitionStyles = {
  entering: { opacity: 1 }, //进入动画的展示状态
  entered: { opacity: 1 }, //进入动画的最终状态
  exiting: { opacity: 0.1 }, //离开动画的展示状态
  exited: { opacity: 0.1 }, //离开动画的最终状态
};

function TransitionPage() {
  const [inProp, setInProp] = useState(false);
  return (
    <Container>
      <Transition in={inProp} timeout={duration}>
        {(state) => {
          return (
            <Button style={{ ...defaultStyle, ...transitionStyles[state] }}>
              {state}
            </Button>
          );
        }}
      </Transition>
      <br />
      <button onClick={() => setInProp(!inProp)}>
        {inProp ? "hide" : "show"}
      </button>
    </Container>
  );
}

export default TransitionPage;
