import React, { useState, useEffect } from "react";
import { prefix } from '../../globals';
import { handleZoom, mobileWidth, getStorage, setStorage, defaultZoomLevel } from '../../utilities';
import classNames from 'classnames';
import Button from '../Button/Button';
import "./index.scss";

let init = false;

/**
 * Set of controls that changes the zoom settings
 * @returns renders buttons
 */
const Zoom = ({ onZoom }) => {
  const [zoom, setZoom] = useState(getStorage('air-zoom') || defaultZoomLevel);
  const [screenSize, setScreenSize] = useState((window.innerWidth < mobileWidth) ? 'mobile' : 'desktop');

  function changeZoom (zoom, upDown) {
    const newZoom = handleZoom(zoom, upDown);

    setZoom(newZoom);
    setStorage('air-zoom', newZoom);
    onZoom(newZoom);
  }

  useEffect(() => {
    if (init) { // ignore first render
      changeZoom(defaultZoomLevel, null);
    }
  }, [screenSize]);

  useEffect(() => {
    init = true;

    window.addEventListener('resize', () => {
      if (window.innerWidth < mobileWidth) {
        setScreenSize('mobile');
      } else {
        setScreenSize('desktop');
      }
    });
  }, []);

  return (
    <aside className={`${prefix}--zoom`}>
      <Button
        aria-label="Zoom out"
        onClick={() => changeZoom(zoom, true)}
        disabled={zoom.max}>
        <i className="fas fa-minus"></i>
      </Button>
      <Button
        aria-label="Zoom in"
        onClick={() => changeZoom(zoom, false)}
        disabled={zoom.min}>
        <i className="fas fa-plus"></i>
      </Button>
    </aside>
  );
}

export default Zoom;
