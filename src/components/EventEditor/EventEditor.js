import React, { useState, useEffect } from "react";
import classNames from 'classnames';
import { prefix } from '../../globals';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Input from '../Input/Input';
import "./index.scss";

const EventEditor = ({ events, setEvents, settings, editorStatus, ...otherProps}) => {

  let actionTitle = editorStatus.event ? 'Edit' : 'New';
  let id = Math.round(Math.random() * 1000);
  let start = editorStatus.startDate || '';
  let end = '';
  let name = '';

  if (editorStatus.event) {
    id = editorStatus.event.id || id;
    start = editorStatus.event.start;
    end = editorStatus.event.end || end;
    name = editorStatus.event.name || name;
  }

  return (
    <Modal
      className={`${prefix}--timeline-editor`}
      isOpen={editorStatus.isOpen}
      settings={settings}
      onClose={close}>
      {editorStatus.isOpen && (
        <form
          className={`${prefix}--timeline-editor__form`}
          onSubmit={saveEvent}>
           <h2 className={`${prefix}--timeline-editor__title`}>{actionTitle} event</h2>
           <div
              className={`${prefix}--timeline-editor__group`}>
             <label
                className={`${prefix}--timeline-editor__label`}
                htmlFor="name">Event name</label>
             <Input
                className={`${prefix}--timeline-editor__input`}
                type="text"
                name="name"
                id="name"
                defaultValue={name} />
           </div>
           <div
              className={`${prefix}--timeline-editor__group`}>
             <label
                className={`${prefix}--timeline-editor__label`}
                htmlFor="start">Start date</label>
             <Input
                className={`${prefix}--timeline-editor__input`}
                type="text"
                name="start"
                id="start"
                placeholder="mm/dd/yyyy"
                defaultValue={start} />
           </div>
           <div
              className={`${prefix}--timeline-editor__group`}>
             <label
                className={`${prefix}--timeline-editor__label`}
                htmlFor="end">End date</label>
             <Input
                className={`${prefix}--timeline-editor__input`}
                type="text"
                name="end"
                id="end"
                placeholder="mm/dd/yyyy"
                defaultValue={end} />
           </div>
           <input type="hidden" name="id" id="id" defaultValue={id} />
           <Button
              className={`${prefix}--timeline-editor__btn`}
              type="primary">Save</Button>
              {(actionTitle === 'Edit') && (
                 <Button
                    className={`${prefix}--timeline-editor__btn`}
                    type="danger" aria-label="Delete" onClick={deleteEvent}>
                    <i className="fas fa-trash-alt"></i>
                 </Button>
              )}
         </form>
       )}
    </Modal>
  );

  function getData (target) {
    const data = {};
    const form = document.querySelector(`.${prefix}--timeline-editor__form`);
    const formData = new FormData(form);

    for (var [key, value] of formData.entries()) {
      data[key] = value;
    }

    if (!data.end) {
      data.end = data.start;
    }

    if (!data.name) {
      data.name = `${data.start}-${data.end}`;
    }

    return data;
  }

  function deleteEvent (e) {
    e.preventDefault();
    const data = getData();
    const i = getEventIndex(events, data.id);

    if (events[i]) {
      events.splice(i, 1);
    }

    setEvents(events);
    close();
  }

  function saveEvent (e) {
    e.preventDefault();
    const data = getData();
    const i = getEventIndex(events, data.id);

    if (events[i]) {
      events[i] = data;
    } else {
      events.push(data);
    }

    setEvents(events);
    close();
  }

  function getEventIndex(events, id) {
    let ref;

    events.forEach((event, i) => {
      if ('' + event.id === id) {
        ref = i;
      }
    });

    return ref;
  }

  function close () {
    settings({
      isOpen: false,
      startDate: '',
      event: {
        name: '',
        id: '',
        start: '',
        end: ''
      }
    });
  }

}

export default EventEditor;
