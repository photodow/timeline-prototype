import React, { useState, useEffect } from "react";
import { prefix } from '../../globals';
import { setStorage, getStorage } from '../../utilities';
import classNames from 'classnames';
import Button from '../Button/Button';
import "./index.scss";

/**
 * Switches the theme of the page
 * @returns changes page theme
 */
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(getStorage('air-theme') || false);

  useEffect(onThemeChange);

  function onThemeChange () {
    if (theme) {
      document.body.classList.add(`${prefix}--theme--dark`);
    } else {
      document.body.classList.remove(`${prefix}--theme--dark`);
    }
  }

  function changeTheme (e) {
    const checked = e.target.checked;
    setTheme(checked);
    setStorage('air-theme', checked);
  }

  return (
    <label className={`${prefix}--theme-switcher`} title="Switch themes" aria-label="Switch themes">
      <input type="checkbox" checked={theme} onChange={changeTheme} />
      <span className={`${prefix}--button`}>
        <i className={classNames('fas', theme ? 'fa-sun' : 'fa-moon')}></i>
      </span>
    </label>
  );
}

export default ThemeSwitcher;
