import React, { useState, useEffect } from "react";
import { prefix } from '../../globals';
import { daysBetween, monthsBetween } from '../../utilities';
import classNames from 'classnames';
import "./index.scss";

/**
 * Takes an array of events and renders them on the page
 * @returns renders events
 */
const TimelineEvents = ({ manageEditor, zoom, startRangeDate, lanes = [] }) => {
  const [hideEvents, setHideEvents] = useState(`${prefix}--timeline-events--hide`);
  const now = new Date();
  const nowTickerPosition = (zoom.type === 'month') ? monthsBetween(startRangeDate, now, true) - 1 : daysBetween(startRangeDate, now);

  useEffect(() => {
    console.log(lanes);
    setHideEvents('');
  }, [])

  return (
    <div className={classNames(`${prefix}--timeline-events`, hideEvents)}>
      <ul>
        {lanes.map((lane, i) => {
          console.log(lanes);
          return (lane.map((event) => {
            const gutter = .25;
            const startDate = new Date(event.start + ' 00:00:00');
            const endDate = new Date(event.end + ' 23:59:59');

            const itemSpan = (zoom.type === 'month') ? monthsBetween(startDate, endDate) : daysBetween(startDate, endDate);
            const itemOffset = (zoom.type === 'month') ? monthsBetween(startRangeDate, startDate, true) - 1 : daysBetween(startRangeDate, startDate) - 1;

            const expired = now >= endDate;
            const expiredClass = expired ? `${prefix}--timeline-event--expired` : '';
            const expiredText = expired ? `(expired) ` : '';

            return (
              <li
                style={{
                  minHeight: zoom.height + 'rem',
                  left: `calc((100vw - 2rem) / ${zoom.count} * ${itemOffset} + ${gutter/2}rem)`,
                  top: `${(zoom.height + gutter) * i}rem`,
                  width: `calc((100vw - 2rem) / ${zoom.count} * ${itemSpan} - ${gutter}rem)`,
                  borderRadius: `${(zoom.height / 2)}rem`,
                  transitionDelay: i * 150 + 'ms'
                }}
                data-event={JSON.stringify(event)}
                title={`${expiredText}${event.name}: ${event.start} – ${event.end}` }
                key={event.start + event.end}
                className={classNames(`${prefix}--timeline-event`, `${prefix}--timeline-event--${zoom.type}`, `${prefix}--timeline-event--${zoom.count}`, expiredClass)}
                onClick={editEvent}>
                <span className={`${prefix}--timeline-event__title`}>{event.name}</span>
              </li>
            );
          }));
        })}
      </ul>
    </div>
  );

  function editEvent (e) {
    const event = JSON.parse(e.target.dataset.event);
    manageEditor({ isOpen: true, event: event });
  }
}

export default TimelineEvents;
