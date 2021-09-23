import React, { useState, useEffect } from "react";
import { getStorage, setStorage, dayInMs, createGroups, defaultZoomLevel, assignLanes } from '../../utilities';
import { prefix } from '../../globals';
import classNames from 'classnames';
import TimelineContainer from '../TimelineContainer/TimelineContainer';
import TimelineEvents from '../TimelineEvents/TimelineEvents';
import Zoom from '../Zoom/Zoom';
import "./index.scss";

let rangeChanged = false;
let centered = false;

const Timeline = ({ events, manageEditor }) => {
  const storedZoom = getStorage('air-zoom') || defaultZoomLevel;
  let startDate = new Date();
  let endDate = new Date();
  const [zoom, setZoom] = useState(storedZoom);
  const [startRange, setStartRange] = useState(Math.floor(storedZoom.count / 2) + 1);
  const [endRange, setEndRange] = useState(Math.floor(storedZoom.count / 2) + 1);

  if (zoom.type === 'month') {
    startDate.setDate(1);
    startDate.setMonth(startDate.getMonth() - (startRange + 1));
    endDate.setDate(1);
    endDate.setMonth(endDate.getMonth() + endRange);
  } else {
    startDate.setDate(startDate.getDate() - (startRange + 1));
    endDate.setDate(endDate.getDate() + endRange);
  }

  useEffect(centerOnLoad, []);

  return (
    <article className={classNames(`${prefix}--timeline`)}>
      <TimelineContainer
        manageEditor={manageEditor}
        onScroll={infiniteScroll}
        groups={createGroups(zoom.type, startDate, endDate)}
        inView={zoom.count}>
          <TimelineEvents
            manageEditor={manageEditor}
            lanes={organizeEvents()}
            zoom={zoom}
            startRangeDate={startDate} />
      </TimelineContainer>
      <Zoom onZoom={onZoom} />
    </article>
  );

  function organizeEvents () {
    let lanes = assignLanes(events);

    lanes = lanes.map(lane => {
      return lane.filter(event => dateInRange(event))
    });
console.log(lanes);
    return lanes;
  }

  function onZoom (zoomLevel) {
    const count = Math.floor(zoomLevel.count / 2) + 1;
    setZoom(zoomLevel);

    // update ranges if smaller zoom count
    if (startRange < count || !rangeChanged) {
      setStartRange(count);
    }

    if (endRange < count || !rangeChanged) {
      setEndRange(count);
    }
  }

  // allows for infinite scrolling of dates and events, and sets new date range
  function infiniteScroll (e) {
    if (centered && !window.infinityScroll) {
      const timelineBg = e.target;
      const item = timelineBg.querySelectorAll(`.${prefix}--timeline-bg__item`);
      const groups = timelineBg.querySelector(`.${prefix}--timeline-bg__groups`);
      const events = timelineBg.querySelector(`.${prefix}--timeline-events`);

      const itemWidth = groups.scrollWidth / item.length;
      const updateBy = Math.floor(zoom.count / 2) + 1;

      if (timelineBg.scrollLeft <= itemWidth * .95) {
        timelineBg.scroll({
          left: ((updateBy + 1) * itemWidth)
        });

        setStartRange(startRange + updateBy);
        rangeChanged = true;
      } else if (timelineBg.scrollLeft >= (groups.scrollWidth - groups.offsetWidth - itemWidth * .95)) {

        setEndRange(endRange + updateBy);
        rangeChanged = true;
      }
    }
  }

  // intended to center the scroll area on load.
  function centerOnLoad () {
      const timelineBg = document.querySelector(`.${prefix}--timeline-bg`);
      const offset = (timelineBg.scrollWidth - timelineBg.offsetWidth) / 2;

      timelineBg.scroll({
        left: offset + 8
      });

      centered = true;
  }

  function dateInRange (event) {
    const start = new Date(event.start + ' 00:00:00');
    const end = new Date(event.end + ' 23:59:59');

    return (start >= startDate && start <= endDate) || (end >= startDate && end <= endDate);
  }
}

export default Timeline;
