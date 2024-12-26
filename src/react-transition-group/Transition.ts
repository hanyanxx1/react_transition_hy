import React from "react";
import TransitionGroupContext from "./TransitionGroupContext";

export const ENTERING = "entering"; //进入中
export const ENTERED = "entered"; //进入后
export const EXITING = "exiting"; //退出中
export const EXITED = "exited"; //退出后

// Transition会自动帮我们管理过渡状态(entering, entered, exiting, exited)
class Transition extends React.Component {
  static contextType = TransitionGroupContext;

  constructor(props: any) {
    super(props);
    //我们可以向Transition传递in和timeout属性
    this.state = {
      status: this.props.in ? ENTERED : EXITED,
    };
  }

  componentDidMount() {
    if (this.context) {
      const { status } = this.context;
      if (status === ENTERING) {
        this.updateStatus(status);
      }
    }
  }

  componentDidUpdate() {
    //通过in来控制组件是否显示
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
    //通过timeout来控制显示或消失的时间间隔
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
    return typeof children === "function"
      ? // Transition组件的children是一个函数，当状态发生改变时，
        // 会把新的状态传递给children函数参数，
        // 从而可以根据不同的状态渲染不同的样式
        children(status)
      : children;
  }
}

export default Transition;
