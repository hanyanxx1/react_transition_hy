import React, { cloneElement } from "react";
import TransitionGroupContext from "./TransitionGroupContext";
import { ENTERING, ENTERED } from "./Transition";

class TransitionGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: {},
      status: ENTERED,
      firstRender: true,
      handleExited: this.handleExited,
    };
  }

  static getDerivedStateFromProps(
    nextProps,
    { children, firstRender, handleExited },
  ) {
    return {
      children: firstRender
        ? getInitialChildrenMapping(nextProps.children)
        : getNextChildrenMapping(nextProps, children, handleExited),
      firstRender: false,
    };
  }

  componentDidMount() {
    this.setState({
      status: ENTERING,
    });
  }

  handleExited = (child) => {
    this.setState((state) => {
      const children = { ...state.children };
      delete children[child.key];
      return { children };
    });
  };

  render() {
    const { children, status } = this.state;
    const component = Object.values(children);
    return (
      <TransitionGroupContext.Provider value={{ status }}>
        {component}
      </TransitionGroupContext.Provider>
    );
  }
}

export default TransitionGroup;

function getChildrenMapping(children, mapFn = (c) => c) {
  const result = Object.create(null);
  React.Children.forEach(children, (c) => {
    result[c.key] = mapFn(c);
  });
  return result;
}

function getInitialChildrenMapping(children) {
  return getChildrenMapping(children, (c) => cloneElement(c, { in: true }));
}

function mergeChildMappings(prev, next) {
  return Object.keys(prev).length > Object.keys(next).length ? prev : next;
}

function getNextChildrenMapping(nextProps, prevChildrenMapping, handleExited) {
  const result = Object.create(null);
  const nextChildrenMapping = getChildrenMapping(nextProps.children);
  const mergeMappings = mergeChildMappings(
    prevChildrenMapping,
    nextChildrenMapping,
  );
  Object.keys(mergeMappings).forEach((key) => {
    const isNext = key in nextChildrenMapping;
    const isPrev = key in prevChildrenMapping;
    //老没有，新的有，新增元素
    if (!isPrev && isNext) {
      result[key] = React.cloneElement(nextChildrenMapping[key], { in: true });
    }
    //老的有，新的没有，先渲染老的，动画结束后删除元素
    if (isPrev && !isNext) {
      result[key] = React.cloneElement(prevChildrenMapping[key], {
        in: false,
        onExited() {
          handleExited(prevChildrenMapping[key]);
        },
      });
    }
    //新老都有，更新用新的
    if (isNext && isPrev) {
      result[key] = React.cloneElement(nextChildrenMapping[key], { in: true });
    }
  });
  return result;
}
