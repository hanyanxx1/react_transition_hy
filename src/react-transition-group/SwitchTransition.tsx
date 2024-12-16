import React, { isValidElement, Component } from "react";
import { ENTERING, ENTERED, EXITING } from "./Transition";
import TransitionGroupContext from "./TransitionGroupContext";
class SwitchTransition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ENTERED,
      current: null,
    };
    this.mounted = false;
  }
  componentDidMount() {
    this.mounted = true;
  }
  static getDerivedStateFromProps(props, state) {
    console.log(
      "🚀 ~ SwitchTransition ~ getDerivedStateFromProps ~ props, state:",
      props,
      state,
    );
    if (state.current && areChildrenDifferent(state.current, props.children)) {
      return {
        status: EXITING,
      };
    }
    return {
      current: React.cloneElement(props.children, { in: true }),
    };
  }
  changeState = (status, current = this.state.current) => {
    this.setState({ status, current });
  };
  render() {
    const { status, current } = this.state;
    const { children } = this.props;
    console.log("🚀 ~ SwitchTransition ~ render ~ children:", children);
    let component;
    switch (status) {
      case ENTERING:
        component = React.cloneElement(children, {
          in: true,
          onEntered: () => {
            this.changeState(ENTERED);
          },
        });
        break;
      case EXITING:
        component = React.cloneElement(current, {
          in: false,
          onExited: () => {
            this.changeState(ENTERING, null);
          },
        });
        break;
      case ENTERED:
        component = current;
        break;
    }
    return (
      <TransitionGroupContext.Provider
        value={{ status: this.mounted ? ENTERING : ENTERED }}
      >
        {component}
      </TransitionGroupContext.Provider>
    );
  }
}
function areChildrenDifferent(oldChildren, newChildren) {
  if (oldChildren === newChildren) return false;
  if (
    isValidElement(oldChildren) &&
    isValidElement(newChildren) &&
    oldChildren.key !== null &&
    oldChildren.key === newChildren.key
  ) {
    return false;
  }
  return true;
}
export default SwitchTransition;
