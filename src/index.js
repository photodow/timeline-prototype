import React, { useState } from "react";
import { render } from "react-dom";
import { reformatDates, getStorage, setStorage } from './utilities';
import timelineItems from "./data/timelineItems";
import Timeline from "./components/Timeline/Timeline";
import Header from "./components/Header/Header";
import EventEditor from "./components/EventEditor/EventEditor";
import defaultEvents from './data/timelineItems';
import "./index.scss";

if (!getStorage('air-events')) {
  setStorage('air-events', reformatDates(defaultEvents));
}

const App = () => {

  const [editorStatus, setEditorStatus] = useState({});
  const [events, setEvents] = useState(getStorage('air-events') || []);

  return (
    <>
      <Header manageEditor={manageEditor} />
      <Timeline
        manageEditor={manageEditor}
        events={events}
      />
      <EventEditor
        editorStatus={editorStatus}
        settings={manageEditor}
        events={events}
        setEvents={updateEvents}
      />
    </>
  );

  function manageEditor (status) {
    setEditorStatus(status);
  }

  function updateEvents (events) {
    setEvents(events);
    setStorage('air-events', events);
  }
};

render(<App />, document.getElementById("root"));
