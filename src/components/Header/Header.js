import React, { useState } from "react";
import { prefix } from '../../globals';
import { getStorage, setStorage } from '../../utilities';
import Controls from '../Controls/Controls';
import classNames from 'classnames';
import "./index.scss";

const storedTitle = getStorage('air-title') || { val: 'Timeline' };

/**
 * Renders the page header and controls
 * @returns renders page header
 */
const Header = ({ manageEditor }) => {
  const [title, setTitle] = useState(storedTitle);

  return (
    <header className={`${prefix}--header`}>
      <Controls manageEditor={manageEditor} />
      <h1
        onKeyUp={(e) => {
          setStorage('air-title', { val: e.target.innerText })
        }}
        className={`${prefix}--page-title`}
        suppressContentEditableWarning={true}
        contentEditable="true">{title.val}</h1>
    </header>
  );
}

export default Header;
