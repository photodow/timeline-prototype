import React from "react";
import classNames from 'classnames';
import { prefix } from '../../globals';
import "./index.scss";

const Input = ({ className, ...otherProps }) => {

  return (
    <input
      className={classNames(`${prefix}--input`, className)}
      {...otherProps}
    />
  );
}

export default Input;
