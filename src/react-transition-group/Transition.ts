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
    console.log(status);
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
    const { timeout } = this.props;
    this.setState({ status: ENTERING }, () => {
      this.onTransitionEnd(timeout, () => {
        this.setState({ status: ENTERED });
      });
    });
  }

  performExit() {
    const { timeout } = this.props;
    this.setState({ status: EXITING }, () => {
      this.onTransitionEnd(timeout, () => {
        this.setState({ status: EXITED });
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
    return children(status);
  }
}

export default Transition;
