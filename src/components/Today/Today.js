import React, { useState, useEffect } from "react";
import { prefix } from '../../globals';
import { setStorage, getStorage } from '../../utilities';
import classNames from 'classnames';
import Button from '../Button/Button';
import "./index.scss";

let scrollState, clickedToday;

/**
 * Resets the current view back to the centered active state of today.
 * @returns renders button
 */
const Today = () => {

  const [disabled, setDisabled] = useState(true);

  useEffect(listenForScroll, []);

  return (
    <Button
      onClick={centerActiveState}
      disabled={disabled}>
      Today
    </Button>
  );

  // offsets scroll area when clicked to center active item
  function centerActiveState () {
    const timelineBg = document.querySelector(`.${prefix}--timeline-bg`);
    const active = timelineBg.querySelector(`.${prefix}--timeline-bg--item-active`);

    timelineBg.scroll({
      left: active.offsetLeft - ((timelineBg.offsetWidth - active.offsetWidth) / 2),
      behavior: 'smooth'
    });

    setDisabled(true);

    listenForScroll();
  }

  // determines when to enable the button on scroll
  function handleDisable (e) {
    const timelineBg = e.target;

    clearInterval(scrollState);

    scrollState = setTimeout(() => {
      if (clickedToday) {
        clickedToday = false;
      }
    }, 200);

    if (!clickedToday) {
       setDisabled(false);
       timelineBg.removeEventListener('scroll', handleDisable);
     }
  }

  // starts the event listener for scroll
  function listenForScroll () {
    const timelineBg = document.querySelector(`.${prefix}--timeline-bg`);
    clickedToday = true;
    timelineBg.addEventListener('scroll', handleDisable);
  }
}

export default Today;
