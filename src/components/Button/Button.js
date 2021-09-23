import React from "react";
import classNames from 'classnames';
import { prefix } from '../../globals';
import "./index.scss";

const Button = ({ type, children, className, href, ...otherProps}) => {

  let CompBtn = href ? 'a' : 'button';

  return (
    <CompBtn href={href}
       className={classNames(`${prefix}--button`, `${prefix}--button--${type}`, className)}
      {...otherProps}>
      {children}
    </CompBtn>
  );
}

export default Button;
