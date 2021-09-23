/**
 * dates from the data provided aren't supported across all browsers.
 * this function reformats the date string that can work across all browsers.
 * going from unsupported `yyyy-mm-dd` to a cross browser support `mm-dd-yyy`
 * @returns returns date string
 */
export const reformatDates = (events) => {
  return events.map(event => {
    const startSplit = event.start.split('-');
    const endSplit = event.end.split('-');

    startSplit.push(startSplit.shift());
    endSplit.push(endSplit.shift());

    event.start = startSplit.join('/');
    event.end = endSplit.join('/');

    return event;
  });
}
