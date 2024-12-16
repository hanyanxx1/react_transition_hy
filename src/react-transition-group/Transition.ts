import React from "react";

export const ENTERING = "entering"; //进入中
export const ENTERED = "entered"; //进入后
export const EXITING = "exiting"; //退出中
export const EXITED = "exited"; //退出后

class Transition extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      status: this.props.in ? ENTERED : EXITED,
    };
  }

  componentDidUpdate() {
    let { status } = this.state;
    //更新后当属性发生改变时更改状态
    if (this.props.in) {
      //in为true时执行进场动画
      if (status !== ENTERING && status !== ENTERED) {
        this.updateStatus(ENTERING);
      }
    } else {
      //in为false时执行离场动画
      if (status === ENTERING || status === ENTERED) {
        this.updateStatus(EXITING);
      }
    }
  }

  onTransitionEnd(timeout, callback) {
    if (timeout) {
      setTimeout(callback, timeout);
    }
  }

  performEnter() {
    const { timeout, nodeRef, onEnter, onEntering, onEntered } = this.props;
    const node = nodeRef;
    onEnter?.(node);
    this.setState({ status: ENTERING }, () => {
      onEntering?.(node);
      this.onTransitionEnd(timeout, () => {
        this.setState({ status: ENTERED }, () => onEntered?.(node));
      });
    });
  }

  performExit() {
    const { timeout, nodeRef, onExit, onExiting, onExited } = this.props;
    const node = nodeRef;
    onExit?.(node);
    this.setState({ status: EXITING }, () => {
      onExiting?.(node);
      this.onTransitionEnd(timeout, () => {
        this.setState({ status: EXITED }, () => onExited?.(node));
      });
    });
  }

  updateStatus(nextStatus) {
    if (nextStatus) {
      if (nextStatus === ENTERING) {
        this.performEnter();
      } else {
        this.performExit();
      }
    }
  }

  render() {
    const { children } = this.props;
    const { status } = this.state;
    return typeof children === "function" ? children(status) : children;
  }
}

export default Transition;
