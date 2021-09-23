import React, { useState, useEffect } from "react";
import classNames from 'classnames';
import { prefix } from '../../globals';
import Button from '../Button/Button';
import "./index.scss";

const Modal = ({ onClose, settings, isOpen, children, className, ...otherProps }) => {

  let open = isOpen ? `${prefix}--modal--open` : '';

  return (
    <aside className={classNames(`${prefix}--modal`, open)}>
      <div className={classNames(`${prefix}--modal__container`, className)}>
        <Button className={`${prefix}--modal__close`} aria-label="Close" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </Button>
        {children}
      </div>
      <div className={`${prefix}--modal__bg`} onClick={closeModal}></div>
    </aside>
  );

  function closeModal () {
    settings({ isOpen: false });
    onClose();
  }
}

export default Modal;
