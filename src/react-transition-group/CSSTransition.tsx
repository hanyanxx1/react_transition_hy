import Transition from "./Transition";

function CSSTransition(props) {
  const getClassNames = (status) => {
    const { classNames } = props;
    return {
      base: `${classNames}-${status}`,
      active: `${classNames}-${status}-active`,
      done: `${classNames}-${status}-done`,
    };
  };

  const onEnter = (node) => {
    const exitClassNames = Object.values(getClassNames("exit")); //['fade-exit','fade-exit-active','fade-exit-done']
    reflowAndRemoveClass(node, exitClassNames);
    const enterClassName = getClassNames("enter").base; //fade-enter
    reflowAndAddClass(node, enterClassName);
  };

  const onEntering = (node) => {
    const enteringClassName = getClassNames("enter").active; //fade-enter-active
    reflowAndAddClass(node, enteringClassName);
  };

  const onEntered = (node) => {
    const enteringClassName = getClassNames("enter").active; //fade-enter-active
    const enterClassName = getClassNames("enter").base; //fade-enter
    reflowAndRemoveClass(node, [enterClassName, enteringClassName]);
    const enteredClassName = getClassNames("enter").done; //fade-enter-done
    reflowAndAddClass(node, enteredClassName);
    props.onEntered?.(node);
  };

  const onExit = (node) => {
    const enteredClassNames = Object.values(getClassNames("enter"));
    reflowAndRemoveClass(node, enteredClassNames);
    const exitClassName = getClassNames("exit").base;
    reflowAndAddClass(node, exitClassName);
  };

  const onExiting = (node) => {
    const exitingClassName = getClassNames("exit").active;
    reflowAndAddClass(node, exitingClassName);
  };
  const onExited = (node) => {
    const exitingClassName = getClassNames("exit").active;
    const exitClassName = getClassNames("exit").base;
    reflowAndRemoveClass(node, [exitClassName, exitingClassName]);
    const exitedClassName = getClassNames("exit").done;
    reflowAndAddClass(node, exitedClassName);
    props.onExited?.(node);
  };

  return (
    <Transition
      {...props}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      {props.children}
    </Transition>
  );
}

export default CSSTransition;

function reflowAndAddClass(nodeRef, classes) {
  const node = nodeRef.current;
  node.offsetWidth &&
    (Array.isArray(classes) ? classes : [classes]).forEach((className: any) => {
      node.classList.add(className);
    });
}

function reflowAndRemoveClass(nodeRef, classes) {
  const node = nodeRef.current;
  node.offsetWidth &&
    (Array.isArray(classes) ? classes : [classes]).forEach((className: any) => {
      node.classList.remove(className);
    });
}
