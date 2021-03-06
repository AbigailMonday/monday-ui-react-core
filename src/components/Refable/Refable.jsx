/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { chainFunctions } from "../../utils/function-utils";

export const Refable = React.forwardRef(({ children, ...rest }, ref) => {
  return React.Children.map(children, child => {
    if (typeof child.type !== "string") {
      return (
        <span ref={ref} {...rest}>
          {React.cloneElement(child, { ...child.props })}
        </span>
      );
    }

    return React.cloneElement(child, {
      ...child.props,
      ...rest,
      onClick: getChainedFunction("onClick", child.props, rest),
      onBlur: getChainedFunction("onBlur", child.props, rest),
      onMouseEnter: getChainedFunction("onMouseEnter", child.props, rest),
      onMouseLeave: getChainedFunction("onMouseLeave", child.props, rest),
      onMouseDown: getChainedFunction("onMouseDown", child.props, rest),
      onFocus: getChainedFunction("onFocus", child.props, rest),
      ref: chainFunctions([child.ref, ref])
    });
  });
});

function getChainedFunction(name, childProps, wrapperProps) {
  return chainFunctions([childProps[name], wrapperProps[name]], true);
}
