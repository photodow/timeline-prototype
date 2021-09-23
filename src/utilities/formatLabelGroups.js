import { dayInMs } from './';
import { months, days } from '../globals/dates';

/**
 * formats a group label (e.g. June 2021)
 * @returns returns string
 */
export const formatGroupLabel = (type, date) => {
  switch (type) {
    case 'month':
      return `${date.getFullYear()}`;
      break;
    default:
      return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }
}

/**
 * formats an item label (e.g. Monday, June 23, 2021)
 * @returns returns string
 */
export const formatItemLabel = (type, date) => {
  switch (type) {
    case 'month':
      return `${months[date.getMonth()].substring(0,3)}`;
      break;
    default:
      return `${date.getDate()}`;
  }
}

/**
 * formats an item label title attribute (e.g. Monday, June 23, 2021)
 * @returns returns string
 */
export const formatItemLabelTitle = (type, date) => {
  switch (type) {
    case 'month':
      return `${months[date.getMonth()]} ${date.getFullYear()}`;
      break;
    default:
      return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }
}

/**
 * creates and formats a group of labels based on a date range
 * @returns returns array of objects
 */
export const createGroups = (type, start, end) => {
  const groups = [];
  const now = new Date();
  let groupItems = [];
  let next = new Date(start);
  let last = new Date(start);
  let i = 0;

  while (next < end) {
    if (type === 'month') {
      next.setMonth(next.getMonth() + 1);
      now.setDate(1);
    } else {
      next.setDate(next.getDate() + 1);
    }

    if (type === 'day' && last.getMonth() !== next.getMonth()) {
      groups.push({
        label: formatGroupLabel(type, last),
        items: groupItems
      });
      groupItems = [];
    } else if (type === 'month' && last.getFullYear() !== next.getFullYear()) {
      groups.push({
        label: formatGroupLabel(type, last),
        items: groupItems
      });
      groupItems = [];
    }

    groupItems.push({
      labelTitle: formatItemLabelTitle(type, next),
      label: formatItemLabel(type, next),
      active: next.toDateString() === now.toDateString(),
      date: new Date(next)
    });

    i += 1;
    last = new Date(next);
  }

  groups.push({ // add the last group
    label: formatGroupLabel(type, last),
    items: groupItems
  });

  return groups;
}
