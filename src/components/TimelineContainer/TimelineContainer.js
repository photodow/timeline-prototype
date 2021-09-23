import React, { useEffect } from "react";
import { prefix } from '../../globals';
import classNames from 'classnames';
import "./index.scss";

/**
 * Takes an array of groups and their children to render labels and grid for the timeline.
 * @returns renders background labels and grid
 */
const TimelineContainer = ({ manageEditor, children, onScroll, inView, groups = [] }) => {

  return (
    <div className={`${prefix}--timeline-bg`} onScroll={onScroll}>
      {children}
      <ul className={`${prefix}--timeline-bg__groups`}>
      {groups.map(({ label, items }) => {
        return (
          <li key={label}>
            <p className={`${prefix}--timeline-bg__group-label`}>
              <span>{label}</span>
            </p>
            <ul className={`${prefix}--timeline-bg__items`}>
              {items.map(({ date, label, labelTitle, active }) => {
                return (
                  <li onClick={newEvent}
                    data-date={date}
                    className={classNames(`${prefix}--timeline-bg__item`, active ? `${prefix}--timeline-bg--item-active` : '')}
                    key={labelTitle}
                    title={labelTitle}
                    style={{ width: `calc((100vw - 2rem) / ${inView})` }}>
                    {label}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
      </ul>
    </div>
  );

  function newEvent (e) {
    const startDate = new Date(e.target.dataset['date']);

    manageEditor({
      isOpen: true,
      startDate: `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`
    });
  }
}

export default TimelineContainer;
