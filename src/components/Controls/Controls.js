import React from "react";
import { prefix } from '../../globals';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import Button from '../Button/Button';
import EventEditor from '../EventEditor/EventEditor';
import Today from '../Today/Today';
import classNames from 'classnames';
import "./index.scss";

/**
 * Contains and lists the a toolbar of controls
 * @returns lists out a controls for page
 */
const Controls = ({ manageEditor }) => {
  return (
    <aside className={`${prefix}--controls`}>
      <ul className={`${prefix}--controls__group`}>
        <li className={`${prefix}--controls__group-divider`}>
          <Button type="primary" onClick={newEvent}>
            New event
          </Button>
        </li>
        <li>
          <Today />
        </li>
        <li>
          <ThemeSwitcher />
        </li>
      </ul>
    </aside>
  );

  function newEvent () {
    manageEditor({ isOpen: true });
  }
}

export default Controls;
